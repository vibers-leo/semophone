/**
 * Localized @vibers/storage/dual
 */

import type { StoragePlatform, StorageCategory } from './types';

export type StorageMode = 'firebase-only' | 'dual' | 'ncp-only';

function getMode(): StorageMode {
  const mode = (
    process.env.NEXT_PUBLIC_STORAGE_MODE ??
    process.env.STORAGE_MODE ??
    'dual'
  ) as StorageMode;
  return mode;
}

export interface DualUploadResult {
  url: string;
  ncpUrl?: string;
  firebaseUrl?: string;
  source: 'ncp' | 'firebase';
}

export async function dualUploadFile(
  file: File,
  firebaseUploader: (file: File) => Promise<string>,
  platform: StoragePlatform,
  category: StorageCategory,
  presignEndpoint = '/api/storage/presign'
): Promise<DualUploadResult> {
  const mode = getMode();

  if (mode === 'firebase-only') {
    const firebaseUrl = await firebaseUploader(file);
    return { url: firebaseUrl, firebaseUrl, source: 'firebase' };
  }

  if (mode === 'ncp-only') {
    const ncpUrl = await uploadToNcpViaPresign(file, platform, category, presignEndpoint);
    return { url: ncpUrl, ncpUrl, source: 'ncp' };
  }

  const [ncpResult, firebaseResult] = await Promise.allSettled([
    uploadToNcpViaPresign(file, platform, category, presignEndpoint),
    firebaseUploader(file),
  ]);

  const ncpUrl = ncpResult.status === 'fulfilled' ? ncpResult.value : undefined;
  const firebaseUrl = firebaseResult.status === 'fulfilled' ? firebaseResult.value : undefined;

  if (ncpResult.status === 'rejected') {
    console.warn('[storage:dual] NCP 업로드 실패, Firebase로 fallback:', ncpResult.reason);
  }
  
  const url = ncpUrl ?? firebaseUrl;
  if (!url) throw new Error('[storage:dual] NCP, Firebase 모두 업로드 실패');

  return {
    url,
    ncpUrl,
    firebaseUrl,
    source: ncpUrl ? 'ncp' : 'firebase',
  };
}

async function uploadToNcpViaPresign(
  file: File,
  platform: StoragePlatform,
  category: StorageCategory,
  presignEndpoint: string
): Promise<string> {
  const res = await fetch(presignEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filename: file.name,
      contentType: file.type,
      platform,
      category,
    }),
  });

  if (!res.ok) throw new Error(`presign 실패: ${await res.text()}`);
  const { uploadUrl, publicUrl } = await res.json();

  const uploadRes = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  });

  if (!uploadRes.ok) throw new Error(`NCP PUT 실패: ${uploadRes.status}`);
  return publicUrl;
}
