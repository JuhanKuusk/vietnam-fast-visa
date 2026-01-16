import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: '#c41e3a',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '6px',
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Passport book shape */}
          <rect x="8" y="4" width="48" height="56" rx="4" fill="#1e3a5f" stroke="white" strokeWidth="2"/>

          {/* Globe/world icon */}
          <circle cx="32" cy="28" r="14" fill="none" stroke="white" strokeWidth="2"/>
          <ellipse cx="32" cy="28" rx="6" ry="14" fill="none" stroke="white" strokeWidth="1.5"/>
          <line x1="18" y1="28" x2="46" y2="28" stroke="white" strokeWidth="1.5"/>

          {/* Text lines */}
          <line x1="16" y1="50" x2="48" y2="50" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
