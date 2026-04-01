/**
 * Localized @vibers/storage/client
 */

import { v4 as uuidv4 } from 'uuid';
import type { StoragePlatform, StorageCategory } from './types';

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/avif',
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/x-hwp',
  'application/haansofthwp',
  'application/vnd.hancom.hwpx',
  'application/octet-stream',
];

const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export async function uploadFile(
  file: File,
  platform: StoragePlatform,
  category: StorageCategory,
  customName?: string,
  presignEndpoint = '/api/storage/presign'
): Promise<string> {
  if (!file) throw new Error('파일이 없습니다.');

  if (file.type === 'application/octet-stream') {
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext !== 'hwp' && ext !== 'hwpx') {
      throw new Error('application/octet-stream 타입은 HWP/HWPX 파일만 허용됩니다.');
    }
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error(`지원하지 않는 파일 형식입니다. (현재: ${file.type})`);
  }

  if (file.size > MAX_SIZE) {
    throw new Error('파일 크기는 10MB 이하여야 합니다.');
  }

  const res = await fetch(presignEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filename: file.name,
      contentType: file.type,
      platform,
      category,
      customName,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`presign 실패: ${err}`);
  }

  const { uploadUrl, publicUrl } = await res.json();

  const uploadRes = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  });

  if (!uploadRes.ok) {
    throw new Error(`NCP 업로드 실패: ${uploadRes.status}`);
  }

  return publicUrl;
}

export async function deleteFile(
  url: string,
  deleteEndpoint = '/api/storage/delete'
): Promise<void> {
  const res = await fetch(deleteEndpoint, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });

  if (!res.ok) {
    throw new Error(`삭제 실패: ${await res.text()}`);
  }
}
