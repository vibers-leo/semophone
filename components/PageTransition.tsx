'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * 페이지 전환 애니메이션 컴포넌트
 * 네이티브 앱처럼 부드러운 페이지 전환 효과
 * SSR 안전하게 클라이언트에서만 실행
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // SSR 중에는 애니메이션 없이 렌더링
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1] // easeInOutCubic
      }}
    >
      {children}
    </motion.div>
  );
}
