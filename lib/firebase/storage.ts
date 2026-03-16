import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './config';

/**
 * 매장 이미지 업로드 및 최적화
 * @param storeId 매장 ID
 * @param file 업로드할 이미지 파일
 * @returns Firebase Storage URL
 */
export async function uploadStoreImage(storeId: string, file: File): Promise<string> {
  const timestamp = Date.now();
  const fileName = `${timestamp}_${file.name}`;
  const storageRef = ref(storage, `stores/${storeId}/${fileName}`);

  // 클라이언트 사이드 리사이징 (1200x800, JPEG 85%)
  const resizedFile = await resizeImage(file, 1200, 800);

  await uploadBytes(storageRef, resizedFile);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
}

/**
 * Firebase Storage에서 이미지 삭제
 * @param imageUrl 삭제할 이미지 URL
 */
export async function deleteStoreImage(imageUrl: string): Promise<void> {
  const imageRef = ref(storage, imageUrl);
  await deleteObject(imageRef);
}

/**
 * Canvas API를 사용한 클라이언트 사이드 이미지 리사이징
 * @param file 원본 이미지 파일
 * @param maxWidth 최대 너비
 * @param maxHeight 최대 높이
 * @returns 리사이징된 Blob
 */
async function resizeImage(file: File, maxWidth: number, maxHeight: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      let { width, height } = img;

      // 비율 유지하면서 리사이징
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);

      // JPEG 85% 품질로 변환
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('이미지 변환 실패'));
        }
      }, 'image/jpeg', 0.85);
    };

    img.onerror = () => reject(new Error('이미지 로드 실패'));
    img.src = URL.createObjectURL(file);
  });
}
