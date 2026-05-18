import React, { useState } from 'react';

export default function FallbackImage({ src, fallbackText, width, height, style }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div style={{
        width: width || 200, height: height || 150,
        background: '#ccc', border: '1px solid #999',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: 8, fontSize: 11, color: '#555',
        margin: '0 auto', ...style
      }}>
        {fallbackText}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={fallbackText}
      onError={() => setFailed(true)}
      style={{ width: width || 200, display: 'block', margin: '0 auto', ...style }}
    />
  );
}
