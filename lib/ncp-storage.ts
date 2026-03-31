/**
 * NCP Object Storage 업로드 유틸
 * S3 호환 API 사용 — @aws-sdk/client-s3
 *
 * 필요 환경변수:
 *   NCP_STORAGE_ACCESS_KEY   — NCP 콘솔 > 인증키 관리
 *   NCP_STORAGE_SECRET_KEY
 *   NCP_STORAGE_BUCKET       — 버킷 이름 (예: semophone-resumes)
 *   NCP_STORAGE_ENDPOINT     — 기본값: https://kr.object.ncloudstorage.com
 */

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

function getClient() {
  const endpoint = process.env.NCP_STORAGE_ENDPOINT || 'https://kr.object.ncloudstorage.com';
  return new S3Client({
    region: 'kr-standard',
    endpoint,
    credentials: {
      accessKeyId: process.env.NCP_STORAGE_ACCESS_KEY!,
      secretAccessKey: process.env.NCP_STORAGE_SECRET_KEY!,
    },
    forcePathStyle: true, // NCP 필수
  });
}

/**
 * 이력서 파일을 NCP Object Storage에 업로드
 * @param fileBuffer  파일 바이트
 * @param fileName    저장할 파일명 (e.g. "1234567890_홍길동.pdf")
 * @param mimeType    MIME 타입
 * @returns 퍼블릭 다운로드 URL
 */
export async function uploadResumeToNCP(
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string,
): Promise<string> {
  const bucket = process.env.NCP_STORAGE_BUCKET;
  if (!bucket || !process.env.NCP_STORAGE_ACCESS_KEY || !process.env.NCP_STORAGE_SECRET_KEY) {
    throw new Error('NCP 스토리지 환경변수가 설정되지 않았습니다.');
  }

  const key = `resumes/${fileName}`;
  const client = getClient();

  await client.send(new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: fileBuffer,
    ContentType: mimeType,
    ACL: 'public-read', // 이메일 링크에서 바로 다운로드 가능하게
  }));

  const endpoint = process.env.NCP_STORAGE_ENDPOINT || 'https://kr.object.ncloudstorage.com';
  return `${endpoint}/${bucket}/${key}`;
}
