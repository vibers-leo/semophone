/**
 * ⚠️ 이 파일은 @vibers/storage 패키지로 통합되었습니다 (2026-03-31)
 *
 * 직접 수정하지 마세요. packages/storage/src/server.ts 를 수정하세요.
 * 환경변수 변경: NCP_STORAGE_ACCESS_KEY → NCP_ACCESS_KEY
 *               NCP_STORAGE_SECRET_KEY → NCP_SECRET_KEY
 *               NCP_STORAGE_BUCKET    → NCP_BUCKET_NAME=wero-bucket
 */

import { uploadBuffer, deleteFile } from '@vibers/storage/server';
import { v4 as uuidv4 } from 'uuid';

/**
 * 이력서 파일을 NCP Object Storage에 업로드
 * (기존 인터페이스 유지)
 */
export async function uploadResumeToNCP(
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string
): Promise<string> {
  const key = `semophone/resumes/${fileName}`;
  return uploadBuffer(fileBuffer, key, mimeType);
}
