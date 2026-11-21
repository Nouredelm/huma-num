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
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F3F1EC] to-[#E6E2D8] dark:from-[#1F1F23] dark:to-[#27272A] text-[#52525B] dark:text-[#A1A1AA] p-6 text-center ${className}`}
      >
        <BookOpen className="w-8 h-8 text-[#1E3A8A]/60 dark:text-[#60A5FA]/70 mb-3" strokeWidth={1.5} />
        <p className="font-serif text-lg text-[#18181B] dark:text-[#F4F4F5]">{fallbackTitle}</p>
        <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] mt-1 max-w-xs">{alt}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
