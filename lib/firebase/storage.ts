import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './config';

/**
 * 혜택 배너 이미지 업로드 및 최적화
 * @param benefitId 혜택 ID (신규 생성 시 'new')
 * @param file 업로드할 이미지 파일
 * @returns Firebase Storage URL
 */
export async function uploadBenefitImage(benefitId: string, file: File): Promise<string> {
  const timestamp = Date.now();
  const fileName = `${timestamp}_${file.name}`;
  const storageRef = ref(storage, `benefits/${benefitId}/${fileName}`);

  // 클라이언트 사이드 리사이징 (1200x600, JPEG 85%) - 배너 비율
  const resizedFile = await resizeImage(file, 1200, 600);

  await uploadBytes(storageRef, resizedFile);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
}

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
 * Firebase Storage에서 혜택 이미지 삭제
 * @param imageUrl 삭제할 이미지 URL
 */
export async function deleteBenefitImage(imageUrl: string): Promise<void> {
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
  } catch (error) {
    console.error('이미지 삭제 오류:', error);
    // URL 형식이 아닌 경우 무시
  }
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
 * 이력서 파일 업로드 (PDF, DOCX 등)
 * @param applicantName 지원자 이름
 * @param file 업로드할 이력서 파일
 * @returns Firebase Storage URL
 */
export async function uploadResumeFile(applicantName: string, file: File): Promise<string> {
  const timestamp = Date.now();
  // 파일명에 특수문자 제거 및 공백을 언더스코어로 변경
  const sanitizedName = applicantName.replace(/[^a-zA-Z0-9가-힣]/g, '_');
  const fileExtension = file.name.split('.').pop();
  const fileName = `${timestamp}_${sanitizedName}.${fileExtension}`;
  const storageRef = ref(storage, `resumes/${fileName}`);

  // 파일 크기 제한 (10MB)
  if (file.size > 10 * 1024 * 1024) {
    throw new Error('파일 크기는 10MB를 초과할 수 없습니다.');
  }

  // 허용된 파일 타입 확인
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  if (!allowedTypes.includes(file.type)) {
    throw new Error('PDF 또는 Word 문서만 업로드 가능합니다.');
  }

  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
}

/**
 * Firebase Storage에서 이력서 파일 삭제
 * @param resumeUrl 삭제할 이력서 URL
 */
export async function deleteResumeFile(resumeUrl: string): Promise<void> {
  try {
    const resumeRef = ref(storage, resumeUrl);
    await deleteObject(resumeRef);
  } catch (error) {
    console.error('이력서 삭제 오류:', error);
  }
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
