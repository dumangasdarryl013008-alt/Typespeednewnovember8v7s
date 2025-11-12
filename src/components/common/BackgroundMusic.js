import React, { useEffect, useRef, useState } from 'react';

const BackgroundMusic = ({ isPlaying }) => {
  const audioRef = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.3;

    const attemptPlay = () => {
      if (isPlaying && audio.paused) {
        audio.play().catch(error => {
          console.log('Auto-play prevented, waiting for user interaction:', error);
        });
      }
    };

    const handleFirstInteraction = () => {
      if (!hasInteracted && isPlaying) {
        setHasInteracted(true);
        attemptPlay();
      }
    };

    if (isPlaying) {
      attemptPlay();
      
      if (!hasInteracted) {
        document.addEventListener('click', handleFirstInteraction, { once: true });
        document.addEventListener('keydown', handleFirstInteraction, { once: true });
      }
    } else {
      audio.pause();
    }

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [isPlaying, hasInteracted]);

  return (
    <audio
      ref={audioRef}
      src="/typeblast-bgm.mp3"
      loop
      style={{ display: 'none' }}
    />
  );
};

export default BackgroundMusic;
