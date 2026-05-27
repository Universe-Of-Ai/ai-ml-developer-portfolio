'use client';

import { useState, useCallback } from 'react';
import Lightbox, { ImagesListType } from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import 'yet-another-react-lightbox/styles.css';

interface LightboxGalleryProps {
  images: Array<{
    id: number;
    src: string;
    alt: string;
    title: string;
  }>;
  open: boolean;
  currentIndex: number;
  onClose: () => void;
}

export default function LightboxGallery({
  images,
  open,
  currentIndex,
  onClose,
}: LightboxGalleryProps) {
  const slides: ImagesListType = images.map((img) => ({
    src: img.src,
    alt: img.alt,
    title: img.title,
  }));

  return (
    <Lightbox
      open={open}
      close={onClose}
      index={currentIndex}
      slides={slides}
      plugins={[Captions, Counter]}
      styles={{
        container: { backgroundColor: 'rgba(0,0,0,0.95)' },
        button: { filter: 'invert(1)' },
        caption: {
          color: '#f5f5f5',
          fontFamily: 'var(--font-playfair)',
          fontSize: '16px',
        },
        counter: { color: '#888', fontSize: '12px' },
      }}
      animation={{ fade: 200 }}
      carousel={{ finite: false }}
      render={{
        buttonPrev: () => null,
        buttonNext: () => null,
      }}
      on={{
        clickPrev: undefined,
        clickNext: undefined,
      }}
      keyboard={{ prev: true, next: true, close: true }}
    />
  );
}

export function useLightbox() {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<Array<{ id: number; src: string; alt: string; title: string }>>([]);

  const openLightbox = useCallback(
    (index: number, imgs: Array<{ id: number; src: string; alt: string; title: string }>) => {
      setCurrentIndex(index);
      setImages(imgs);
      setOpen(true);
    },
    []
  );

  const closeLightbox = useCallback(() => {
    setOpen(false);
    setTimeout(() => setImages([]), 300);
  }, []);

  return { open, currentIndex, images, openLightbox, closeLightbox };
}
