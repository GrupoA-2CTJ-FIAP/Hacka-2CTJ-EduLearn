import { useState } from 'react';

interface ThumbnailProps {
  youtubeId?: string;
}

export default function Thumbnail({ youtubeId }: ThumbnailProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!youtubeId) {
    return null; // Don't render anything if youtubeId is not provided
  }

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const videoUrl = `https://www.youtube.com/watch?v=${youtubeId}`;

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        width: '300px',
        textAlign: 'center',
        margin: '0 auto', 
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Pré-visualizar Vídeo</div>
      <a href={videoUrl} target="_blank" rel="noopener noreferrer">
        <img
          src={`http://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`}
          alt="YouTube Thumbnail"
          onLoad={handleImageLoad}
          style={{
            width: '100%',
            height: 'auto',
            maxWidth: '280px',
            maxHeight: '160px',
            opacity: isLoaded ? 1 : 0, // Fade-in effect
            transition: 'opacity 0.5s ease-in-out', // Smooth transition
            cursor: 'pointer', // Change cursor to indicate it's clickable
          }}
        />
      </a>
    </div>
  );
}
