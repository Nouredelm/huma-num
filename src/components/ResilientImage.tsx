import {useState} from 'react';
import {BookOpen} from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle = 'Archive documentaire',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#EAF2F7] to-[#D5E4EE] dark:from-[#234760] dark:to-[#2D5876] text-[#425E73] dark:text-[#C3D7E5] p-6 text-center ${className}`}
      >
        <BookOpen className="w-8 h-8 text-[#2D5876]/60 dark:text-[#D8C497]/70 mb-3" strokeWidth={1.5} />
        <p className="font-serif text-lg text-[#193B55] dark:text-[#F4F7F9]">{fallbackTitle}</p>
        <p className="text-xs text-[#526A7C] dark:text-[#C3D7E5] mt-1 max-w-xs">{alt}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      decoding="async"
      loading={src.includes("hero_dh_archive") ? "eager" : "lazy"}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
