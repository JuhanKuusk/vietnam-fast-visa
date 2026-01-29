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
          background: '#ffffff',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '40px',
        }}
      >
        <svg
          width="140"
          height="140"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background passport (orange/visa behind) */}
          <rect x="22" y="6" width="34" height="42" rx="3" fill="#f97316" stroke="#1e3a5f" strokeWidth="1.5"/>

          {/* Main passport book - teal/blue */}
          <rect x="8" y="14" width="38" height="44" rx="3" fill="#67b8c4" stroke="#1e3a5f" strokeWidth="2"/>

          {/* Light reflection */}
          <path d="M8 18 L8 54 Q8 58 12 58 L22 58 L22 18 Q22 14 18 14 L12 14 Q8 14 8 18" fill="#8ed4dc" opacity="0.5"/>

          {/* Globe */}
          <circle cx="27" cy="36" r="10" fill="none" stroke="#1e3a5f" strokeWidth="2"/>
          <path d="M17 36 h20" stroke="#1e3a5f" strokeWidth="1.5"/>
          <ellipse cx="27" cy="36" rx="10" ry="4" fill="none" stroke="#1e3a5f" strokeWidth="1"/>
          <ellipse cx="27" cy="36" rx="4" ry="10" fill="none" stroke="#1e3a5f" strokeWidth="1"/>

          {/* Lines */}
          <line x1="14" y1="50" x2="40" y2="50" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
          <line x1="16" y1="54" x2="38" y2="54" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
