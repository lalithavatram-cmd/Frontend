export function AiHeroImage({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="relative mx-auto aspect-[16/10] w-full max-w-[560px]">
        {/* Background glows */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 rounded-[2.25rem] bg-gradient-to-br from-indigo-500/25 via-fuchsia-500/10 to-emerald-500/15 blur-2xl"
        />
        <div
          aria-hidden="true"
          className="absolute -inset-10 -z-10 rounded-[3rem] bg-indigo-500/10 blur-3xl"
        />

        <div className="absolute inset-0 rounded-[2.25rem] border border-[var(--app-border)] bg-[#0b1020]/60 shadow-[0_20px_60px_-30px_rgba(99,102,241,0.55)] backdrop-blur overflow-hidden flex items-center justify-center">
          <svg
            viewBox="0 0 300 300"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full"
          >
            <defs>
              <radialGradient id="bgGrad" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="#1a3060" />
                <stop offset="100%" stopColor="#060c1e" />
              </radialGradient>
              <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="strongGlow">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#38bdf8" strokeWidth="0.3" opacity="0.5" />
              </pattern>
            </defs>

            {/* Background */}
            <rect width="300" height="300" fill="url(#bgGrad)" />

            {/* Ambient glow */}
            <ellipse cx="150" cy="160" rx="100" ry="80" fill="#1d4ed8" opacity="0.12" />
            <ellipse cx="150" cy="220" rx="60" ry="35" fill="#0ea5e9" opacity="0.18" />

            {/* Light shaft from bottom */}
            <polygon points="120,290 180,290 165,160 135,160" fill="#0ea5e9" opacity="0.08" />

            {/* Torso */}
            <rect x="105" y="155" width="90" height="70" rx="12" fill="#0d1f3c" stroke="#38bdf8" strokeWidth="1.2" />
            <rect x="105" y="155" width="90" height="70" rx="12" fill="url(#grid)" opacity="0.5" />
            <line x1="105" y1="178" x2="195" y2="178" stroke="#38bdf8" strokeWidth="0.5" opacity="0.4" />

            {/* Chest panel */}
            <rect x="122" y="183" width="56" height="28" rx="6" fill="#0a1628" stroke="#38bdf8" strokeWidth="0.8" />
            <circle cx="135" cy="197" r="5" fill="#38bdf8" opacity="0.8" filter="url(#glow)" />
            <circle cx="150" cy="197" r="5" fill="#818cf8" opacity="0.8" filter="url(#glow)" />
            <circle cx="165" cy="197" r="5" fill="#34d399" opacity="0.8" filter="url(#glow)" />

            {/* Left arm */}
            <rect x="72" y="160" width="32" height="16" rx="8" fill="#0d1f3c" stroke="#38bdf8" strokeWidth="1" transform="rotate(-12 88 168)" />
            <rect x="72" y="160" width="32" height="16" rx="8" fill="url(#grid)" opacity="0.5" transform="rotate(-12 88 168)" />

            {/* Right arm (raised) */}
            <rect x="196" y="155" width="32" height="16" rx="8" fill="#0d1f3c" stroke="#38bdf8" strokeWidth="1" transform="rotate(18 212 163)" />
            <rect x="196" y="155" width="32" height="16" rx="8" fill="url(#grid)" opacity="0.5" transform="rotate(18 212 163)" />

            {/* Neck */}
            <rect x="138" y="143" width="24" height="14" rx="4" fill="#0d1f3c" stroke="#38bdf8" strokeWidth="0.8" />

            {/* Head */}
            <rect x="100" y="88" width="100" height="58" rx="16" fill="#0d1f3c" stroke="#38bdf8" strokeWidth="1.4" />
            <rect x="100" y="88" width="100" height="58" rx="16" fill="url(#grid)" opacity="0.4" />

            {/* Ear panels */}
            <rect x="83" y="101" width="18" height="24" rx="6" fill="#0d1f3c" stroke="#38bdf8" strokeWidth="0.9" />
            <rect x="199" y="101" width="18" height="24" rx="6" fill="#0d1f3c" stroke="#38bdf8" strokeWidth="0.9" />

            {/* Eyes */}
            <circle cx="132" cy="117" r="16" fill="#0a1628" stroke="#38bdf8" strokeWidth="1" />
            <circle cx="168" cy="117" r="16" fill="#0a1628" stroke="#38bdf8" strokeWidth="1" />
            <circle cx="132" cy="117" r="12" fill="none" stroke="#60a5fa" strokeWidth="1.2" opacity="0.6" />
            <circle cx="168" cy="117" r="12" fill="none" stroke="#60a5fa" strokeWidth="1.2" opacity="0.6" />
            <circle cx="132" cy="117" r="8" fill="#1e3a8a" />
            <circle cx="168" cy="117" r="8" fill="#1e3a8a" />
            <circle cx="132" cy="117" r="6" fill="white" opacity="0.95" filter="url(#strongGlow)" />
            <circle cx="168" cy="117" r="6" fill="white" opacity="0.95" filter="url(#strongGlow)" />
            <circle cx="132" cy="117" r="3" fill="#93c5fd" />
            <circle cx="168" cy="117" r="3" fill="#93c5fd" />

            {/* Antenna */}
            <line x1="150" y1="88" x2="150" y2="65" stroke="#38bdf8" strokeWidth="1.5" opacity="0.85" />
            <circle cx="150" cy="60" r="5" fill="#38bdf8" opacity="0.9" filter="url(#glow)" />

            {/* Floating particles */}
            <circle cx="60" cy="100" r="2" fill="#60a5fa" opacity="0.7" />
            <circle cx="50" cy="150" r="1.5" fill="#818cf8" opacity="0.5" />
            <circle cx="240" cy="95" r="2" fill="#34d399" opacity="0.7" />
            <circle cx="250" cy="145" r="1.5" fill="#f0abfc" opacity="0.5" />
            <circle cx="75" cy="200" r="2" fill="#38bdf8" opacity="0.4" />
            <circle cx="230" cy="195" r="2" fill="#60a5fa" opacity="0.4" />
          </svg>
        </div>
      </div>
    </div>
  );
}