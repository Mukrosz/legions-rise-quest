'use client';

export function VisibleTestOverlay({ theme }: { theme: string }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        padding: '20px',
        background: 'rgba(255, 0, 0, 0.9)',
        color: 'white',
        fontSize: '24px',
        fontWeight: 'bold',
        zIndex: 9999,
        border: '4px solid yellow',
        borderRadius: '10px',
      }}
    >
      🎨 ANIMATION TEST: {theme.toUpperCase()}
      <div style={{ fontSize: '14px', marginTop: '10px' }}>
        If you see this, components are loading!
      </div>
    </div>
  );
}

