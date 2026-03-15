'use client';

import { forwardRef } from 'react';
import Image from 'next/image';

const GallerySection = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} className="py-32 px-3 bg-[#1A1A1A] text-center overflow-hidden">
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 className="text-[36px] md:text-[42px] font-black text-white leading-tight mb-16">
          수도권 어디서든<br className="md:hidden" /> 세모폰이 가까이
        </h2>

        <div className="relative rounded-xl overflow-hidden border border-white/20 shadow-2xl">
          <div className="relative w-full aspect-square">
            <Image
              src="/landing/stores-collage.png"
              alt="매장"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 600px"
            />
          </div>
        </div>
      </div>
    </section>
  );
});

GallerySection.displayName = 'GallerySection';

export default GallerySection;
