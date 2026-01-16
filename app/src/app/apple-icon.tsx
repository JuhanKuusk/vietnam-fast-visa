import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#c41e3a',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '40px',
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Passport book shape */}
          <rect x="12" y="6" width="40" height="52" rx="4" fill="#1e3a5f" stroke="white" strokeWidth="2"/>

          {/* Globe/world icon */}
          <circle cx="32" cy="28" r="12" fill="none" stroke="white" strokeWidth="2"/>
          <ellipse cx="32" cy="28" rx="5" ry="12" fill="none" stroke="white" strokeWidth="1.5"/>
          <line x1="20" y1="28" x2="44" y2="28" stroke="white" strokeWidth="1.5"/>

          {/* Text lines */}
          <line x1="18" y1="47" x2="46" y2="47" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <line x1="22" y1="52" x2="42" y2="52" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
