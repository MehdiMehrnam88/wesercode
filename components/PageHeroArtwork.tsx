import type { ReactNode } from 'react';

type Kind = 'services' | 'process' | 'about' | 'faq' | 'contact' | 'imprint' | 'privacy';

const artwork = {
  services: (
    <>
      <g className="page-art-orbit">
        <ellipse cx="1080" cy="500" rx="420" ry="210" />
        <ellipse cx="1080" cy="500" rx="340" ry="270" transform="rotate(-35 1080 500)" />
        <ellipse cx="1080" cy="500" rx="260" ry="360" transform="rotate(44 1080 500)" />
      </g>
      <path className="page-art-path" d="M705 655 925 525 1075 585 1280 365 1488 430" />
      <path className="page-art-path page-art-path-soft" d="M790 285 945 380 1135 270 1330 310 1490 220" />
      <g className="page-art-drift-a">
        <path className="page-art-glass" d="m952 334 154-87 153 88-154 89z" />
        <path className="page-art-glass-side" d="m1105 424 154-89v177l-154 89z" />
        <path className="page-art-glass-side" d="m952 334 153 90v177l-153-90z" />
        <path className="page-art-edge" d="m952 334 154-87 153 88-154 89zm153 90v177m-153-267v177" />
      </g>
      <g className="page-art-drift-b">
        <path className="page-art-panel" d="m1218 550 105-61 105 61v121l-105 61-105-61z" />
        <path className="page-art-panel-line" d="M1250 568h146M1250 592h146M1250 616h92M1250 640h117" />
      </g>
      <g className="page-art-points"><circle cx="705" cy="655" r="7" /><circle cx="925" cy="525" r="8" /><circle cx="1280" cy="365" r="9" /><circle cx="1488" cy="430" r="6" /></g>
    </>
  ),
  process: (
    <>
      <g className="page-art-orbit page-art-orbit-slow">
        <ellipse cx="1100" cy="500" rx="440" ry="155" />
        <ellipse cx="1100" cy="500" rx="350" ry="260" transform="rotate(32 1100 500)" />
        <ellipse cx="1100" cy="500" rx="350" ry="260" transform="rotate(-32 1100 500)" />
      </g>
      <path className="page-art-path" d="M702 556c72-218 238-300 385-177 128 107 230 111 314-12" />
      <path className="page-art-path page-art-path-soft" d="M720 700c125 99 244 28 350-110s233-195 365-72" />
      <g className="page-art-drift-a">
        <circle className="page-art-sphere page-art-sphere-a" cx="812" cy="430" r="88" />
        <ellipse className="page-art-sphere-line" cx="812" cy="430" rx="87" ry="35" />
        <ellipse className="page-art-sphere-line" cx="812" cy="430" rx="42" ry="87" />
      </g>
      <g className="page-art-drift-b">
        <circle className="page-art-sphere page-art-sphere-b" cx="1110" cy="515" r="132" />
        <ellipse className="page-art-sphere-line" cx="1110" cy="515" rx="130" ry="50" />
        <ellipse className="page-art-sphere-line" cx="1110" cy="515" rx="62" ry="130" />
      </g>
      <g className="page-art-drift-c">
        <circle className="page-art-sphere page-art-sphere-c" cx="1390" cy="370" r="70" />
        <ellipse className="page-art-sphere-line" cx="1390" cy="370" rx="68" ry="26" />
      </g>
      <g className="page-art-points"><circle cx="812" cy="430" r="6" /><circle cx="1110" cy="515" r="8" /><circle cx="1390" cy="370" r="6" /></g>
    </>
  ),
  about: (
    <>
      <g className="page-art-orbit"><ellipse cx="1120" cy="490" rx="420" ry="236" /><ellipse cx="1120" cy="490" rx="330" ry="300" transform="rotate(56 1120 490)" /></g>
      <path className="page-art-path" d="M800 410 984 300l208 86 158-145m-366 59 46 228 270 110m-316-338-139 260 185-32 270 110 130-213" />
      <g className="page-art-drift-a">
        <path className="page-art-building" d="M1018 433h84v185h-84zm102-95h92v280h-92zm110 63h82v217h-82zm98-133h93v350h-93zm111 104h85v246h-85z" />
        <path className="page-art-building-lights" d="M1038 464h10v10h-10zm30 0h10v10h-10zm0 35h10v10h-10zm72-120h11v11h-11zm32 0h11v11h-11zm0 38h11v11h-11zm80 42h10v10h-10zm32 0h10v10h-10zm78-105h11v11h-11zm34 0h11v11h-11zm0 39h11v11h-11zm64 43h11v11h-11zm34 0h11v11h-11z" />
      </g>
      <g className="page-art-points"><circle cx="800" cy="410" r="7" /><circle cx="984" cy="300" r="6" /><circle cx="1192" cy="386" r="8" /><circle cx="1350" cy="241" r="6" /><circle cx="1030" cy="628" r="7" /><circle cx="1380" cy="490" r="8" /></g>
      <path className="page-art-ground" d="M670 705c190-35 384-34 580 0s302 31 390-6" />
    </>
  ),
  faq: (
    <>
      <g className="page-art-orbit page-art-orbit-slow"><circle cx="1120" cy="490" r="330" /><circle cx="1120" cy="490" r="260" /><circle cx="1120" cy="490" r="190" /></g>
      <g className="page-art-drift-a">
        <path className="page-art-glass" d="m1000 258 242-77 190 110-242 78z" />
        <path className="page-art-glass-side" d="m1190 369 242-78v252l-242 77z" />
        <path className="page-art-glass-side" d="m1000 258 190 111v251l-190-110z" />
        <path className="page-art-edge" d="m1000 258 242-77 190 110-242 78zm190 111v251m-190-362v251" />
      </g>
      <g className="page-art-drift-b">
        <path className="page-art-panel" d="m824 462 160-52 128 74v154l-160 52-128-74z" />
        <path className="page-art-panel-line" d="m865 484 142-46m-142 75 142-46m-142 75 142-46m-142 75 95-31" />
      </g>
      <g className="page-art-points"><circle cx="1000" cy="258" r="7" /><circle cx="1432" cy="291" r="8" /><circle cx="1190" cy="620" r="7" /><circle cx="824" cy="462" r="6" /></g>
    </>
  ),
  contact: (
    <>
      <g className="page-art-orbit"><ellipse cx="1125" cy="500" rx="420" ry="185" /><ellipse cx="1125" cy="500" rx="300" ry="300" transform="rotate(46 1125 500)" /></g>
      <path className="page-art-path" d="M720 690c155-50 212-145 330-142 91 2 102 83 181 70 97-16 77-173 166-224 62-36 102-3 145-42" />
      <path className="page-art-path page-art-path-soft" d="M765 336c113 94 180 75 278 18 119-70 235-44 299 28 67 75 110 77 194 28" />
      <g className="page-art-drift-a">
        <path className="page-art-pin" d="M1130 222c-102 0-184 80-184 180 0 131 184 327 184 327s184-196 184-327c0-100-82-180-184-180z" />
        <circle className="page-art-pin-core" cx="1130" cy="402" r="62" />
        <circle className="page-art-pin-inner" cx="1130" cy="402" r="22" />
      </g>
      <g className="page-art-points"><circle cx="720" cy="690" r="7" /><circle cx="1050" cy="548" r="6" /><circle cx="1390" cy="394" r="8" /><circle cx="1542" cy="352" r="6" /></g>
      <path className="page-art-ground" d="M692 750c240-70 451-60 654 0s316 44 412 10" />
    </>
  ),
  imprint: (
    <>
      <g className="page-art-orbit"><ellipse cx="1120" cy="488" rx="420" ry="230" /><ellipse cx="1120" cy="488" rx="315" ry="300" transform="rotate(-48 1120 488)" /></g>
      <g className="page-art-drift-a">
        <path className="page-art-panel" d="m972 246 275-83 216 126-275 84z" />
        <path className="page-art-panel" d="m972 246 216 127v315l-216-127z" />
        <path className="page-art-glass-side" d="m1188 373 275-84v315l-275 84z" />
        <path className="page-art-edge" d="m972 246 275-83 216 126-275 84zm216 127v315m-216-442v315" />
        <path className="page-art-panel-line" d="m1020 285 171-51m-171 88 122-36m-122 74 150 88m-150-50 150 88m-150-50 122 72m147-193 190-58m-190 95 155-47m-155 84 155-47m-155 84 155-47" />
      </g>
      <path className="page-art-path" d="M756 622 930 520m555 70 92 52" />
      <g className="page-art-points"><circle cx="756" cy="622" r="7" /><circle cx="930" cy="520" r="6" /><circle cx="1485" cy="590" r="8" /><circle cx="1577" cy="642" r="6" /></g>
    </>
  ),
  privacy: (
    <>
      <g className="page-art-orbit page-art-orbit-slow"><ellipse cx="1120" cy="482" rx="410" ry="230" /><ellipse cx="1120" cy="482" rx="310" ry="300" transform="rotate(45 1120 482)" /></g>
      <path className="page-art-path" d="m786 470 144-88 130 72 142-132 160 93m-442 39 18 172 179-96 116 133 151-115" />
      <g className="page-art-drift-a">
        <path className="page-art-shield" d="M1120 190 1370 284v185c0 170-105 268-250 340-145-72-250-170-250-340V284z" />
        <path className="page-art-shield-inner" d="M1120 260 1308 330v140c0 130-75 209-188 269-113-60-188-139-188-269V330z" />
        <circle className="page-art-pin-core" cx="1120" cy="452" r="76" />
        <circle className="page-art-pin-inner" cx="1120" cy="452" r="28" />
      </g>
      <g className="page-art-points"><circle cx="786" cy="470" r="7" /><circle cx="930" cy="382" r="6" /><circle cx="1190" cy="454" r="8" /><circle cx="1322" cy="322" r="6" /><circle cx="1482" cy="415" r="8" /><circle cx="1300" cy="666" r="7" /></g>
    </>
  ),
} satisfies Record<Kind, ReactNode>;

export function PageHeroArtwork({ kind }: { kind: Kind }) {
  const id = `page-art-${kind}`;
  return (
    <svg className={`page-hero-artwork page-hero-artwork-${kind}`} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--bg)" />
          <stop offset=".62" stopColor="var(--surface-muted)" />
          <stop offset="1" stopColor="var(--bg)" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="70%" cy="48%" r="62%">
          <stop offset="0" stopColor="var(--accent)" stopOpacity=".32" />
          <stop offset=".5" stopColor="var(--accent-2)" stopOpacity=".16" />
          <stop offset="1" stopColor="var(--bg)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--accent)" stopOpacity=".3" />
          <stop offset="1" stopColor="var(--accent-2)" stopOpacity=".12" />
        </linearGradient>
        <linearGradient id={`${id}-line`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--accent)" stopOpacity=".08" />
          <stop offset=".55" stopColor="var(--accent)" stopOpacity=".75" />
          <stop offset="1" stopColor="var(--accent-2)" stopOpacity=".34" />
        </linearGradient>
        <pattern id={`${id}-grid`} width="52" height="52" patternUnits="userSpaceOnUse">
          <path d="M52 0H0v52" fill="none" stroke="var(--line)" strokeOpacity=".42" strokeWidth="1" />
          <circle cx="0" cy="0" r="1.5" fill="var(--accent)" fillOpacity=".48" />
        </pattern>
        <filter id={`${id}-blur`} x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="42" /></filter>
      </defs>
      <rect width="1600" height="900" fill={`url(#${id}-bg)`} />
      <ellipse cx="1150" cy="470" rx="560" ry="430" fill={`url(#${id}-glow)`} />
      <ellipse cx="1300" cy="700" rx="360" ry="140" fill="var(--accent-2)" opacity=".08" filter={`url(#${id}-blur)`} />
      <path d="M650 0h950v900H650z" fill={`url(#${id}-grid)`} opacity=".56" />
      {artwork[kind]}
    </svg>
  );
}

