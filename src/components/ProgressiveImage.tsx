import React, { useState, useEffect } from 'react';
import { loadedImagesSet } from '../utils/imagePreloader';
import { Sparkles, ImageOff } from 'lucide-react';

interface ProgressiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  aspectRatio?: string;
}

export const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  priority = false,
  aspectRatio,
  style,
  ...props
}) => {
  const isAlreadyLoaded = loadedImagesSet.has(src);
  const [isLoaded, setIsLoaded] = useState<boolean>(isAlreadyLoaded);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    if (!src) return;

    if (loadedImagesSet.has(src)) {
      setIsLoaded(true);
      return;
    }

    // Check if HTML image was already cached
    const testImg = new Image();
    testImg.src = src;
    if (testImg.complete && testImg.naturalWidth > 0) {
      loadedImagesSet.add(src);
      setIsLoaded(true);
      return;
    }

    testImg.onload = () => {
      loadedImagesSet.add(src);
      setIsLoaded(true);
    };

    testImg.onerror = () => {
      setHasError(true);
    };
  }, [src]);

  return (
    <div
      className={`relative overflow-hidden ${containerClassName}`}
      style={{
        ...(aspectRatio ? { aspectRatio } : {}),
        ...style,
      }}
    >
      {/* Shimmer skeleton while loading */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-[#F5EFEB] flex items-center justify-center overflow-hidden z-10">
          {/* Animated golden gradient sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E5C158]/25 to-transparent animate-[skeleton-shimmer_1.6s_infinite]" />
          <Sparkles className="w-5 h-5 text-[#C5A059]/40 animate-pulse" />
        </div>
      )}

      {/* Fallback if load fails */}
      {hasError ? (
        <div className="absolute inset-0 bg-[#F5EFEB] flex flex-col items-center justify-center text-[#A38675] p-4 text-center z-10">
          <ImageOff className="w-6 h-6 mb-1 text-[#C5A059]/60" />
          <span className="text-[11px] font-sans">Imagem indisponível</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          decoding="async"
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => {
            loadedImagesSet.add(src);
            setIsLoaded(true);
          }}
          onError={() => setHasError(true)}
          className={`${className} ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-300 ease-out`}
          {...props}
        />
      )}
    </div>
  );
};
