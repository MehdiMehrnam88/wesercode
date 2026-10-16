'use client';

import type { PointerEvent, ReactNode } from 'react';

type Kind = 'services' | 'process' | 'about' | 'faq' | 'contact' | 'imprint' | 'privacy';

const artwork: Record<Kind, ReactNode> = {
  services: (
    <>
      <g className="scene-depth scene-services-back">
        <g className="scene-orbits"><ellipse cx="1190" cy="470" rx="510" ry="230" /><ellipse cx="1190" cy="470" rx="385" ry="330" transform="rotate(-35 1190 470)" /><ellipse cx="1190" cy="470" rx="255" ry="420" transform="rotate(34 1190 470)" /></g>
        <path className="scene-network" d="m754 570 132-197 131 103 136-268 134 202 149-108m-682 71 123 304 161-201 181 177 206-152m-408-426 100 204 191-76 146 136 179-111m-598 571 155-214 170 88 170-206 179 71" />
        <g className="scene-starfield"><circle cx="840" cy="205" r="4"/><circle cx="991" cy="692" r="5"/><circle cx="1450" cy="218" r="4"/><circle cx="1545" cy="558" r="6"/><circle cx="724" cy="446" r="3"/><circle cx="1360" cy="720" r="4"/></g>
      </g>
      <g className="scene-globe">
        <circle className="scene-globe-aura" cx="1190" cy="464" r="268" />
        <circle className="scene-globe-surface" cx="1190" cy="464" r="222" />
        <ellipse className="scene-globe-grid" cx="1190" cy="464" rx="220" ry="83"/><ellipse className="scene-globe-grid" cx="1190" cy="464" rx="220" ry="153"/><ellipse className="scene-globe-grid" cx="1190" cy="464" rx="88" ry="220"/><ellipse className="scene-globe-grid" cx="1190" cy="464" rx="158" ry="220"/>
        <path className="scene-globe-meridian" d="M1004 343c97 84 275 159 371 242M1017 574c94-98 249-186 347-218" />
        <g className="scene-orbit-rider"><ellipse cx="1190" cy="464" rx="335" ry="108" transform="rotate(-24 1190 464)"/><circle cx="1515" cy="325" r="12"/></g>
        <circle className="scene-globe-core" cx="1190" cy="464" r="53" />
        <g className="scene-glass-stack"><path d="m1070 415 120-70 120 70-120 70z"/><path d="m1070 415 120 70v138l-120-70z"/><path d="m1190 485 120-70v138l-120 70z"/><path className="scene-stack-seam" d="m1070 415 120 70 120-70m-120 70v138"/></g>
      </g>
      <g className="scene-floating-card scene-card-one"><path d="m744 308 175-50 99 58-175 50z"/><path d="m744 308 99 58v110l-99-58z"/><path d="m843 366 175-50v110l-175 50z"/><path className="scene-card-lines" d="m777 312 125-36m-120 57 88-25m9 68 109-31m-109 53 73-21"/></g>
      <g className="scene-floating-card scene-card-two"><path d="m1385 589 118-34 78 46-118 34z"/><path d="m1385 589 78 46v88l-78-46z"/><path d="m1463 635 118-34v88l-118 34z"/><path className="scene-card-lines" d="m1409 592 80-23m-70 42 63-18m75 12-76 22"/></g>
      <g className="scene-data-ribbon"><path d="M740 676c196-124 298-116 424-22 103 77 195 74 341-92"/><path d="M741 690c196-124 298-116 424-22 103 77 195 74 341-92"/></g>
    </>
  ),
  process: (
    <>
      <g className="scene-funnel-back"><ellipse cx="1180" cy="206" rx="470" ry="142"/><ellipse cx="1180" cy="315" rx="370" ry="112"/><ellipse cx="1180" cy="417" rx="275" ry="83"/><ellipse cx="1180" cy="510" rx="185" ry="56"/><ellipse cx="1180" cy="590" rx="106" ry="34"/></g>
      <path className="scene-funnel-wall" d="M710 204c35 144 212 131 315 220 85 73 54 130 155 170 101 39 190-13 246 48 29 31 40 87 46 142"/>
      <path className="scene-funnel-wall scene-funnel-wall-b" d="M1650 204c-48 144-220 130-323 220-85 73-54 130-155 170-101 39-190-13-246 48-29 31-40 87-46 142"/>
      <path className="scene-funnel-light" d="M710 204c35 144 212 131 315 220 85 73 54 130 155 170 101 39 190-13 246 48 29 31 40 87 46 142"/>
      <g className="scene-funnel-lips"><ellipse cx="1180" cy="206" rx="470" ry="142"/><ellipse cx="1180" cy="315" rx="370" ry="112"/><ellipse cx="1180" cy="417" rx="275" ry="83"/><ellipse cx="1180" cy="510" rx="185" ry="56"/><ellipse cx="1180" cy="590" rx="106" ry="34"/></g>
      <g className="scene-funnel-particles"><circle cx="760" cy="170" r="9"/><circle cx="855" cy="227" r="7"/><circle cx="974" cy="269" r="8"/><circle cx="1088" cy="354" r="7"/><circle cx="1300" cy="420" r="9"/><circle cx="1407" cy="518" r="7"/><circle cx="1255" cy="605" r="8"/><circle cx="1207" cy="728" r="6"/></g>
      <g className="scene-process-orbit"><ellipse cx="1180" cy="450" rx="540" ry="285" transform="rotate(18 1180 450)"/><circle cx="718" cy="553" r="15"/><circle cx="1598" cy="358" r="11"/></g>
      <g className="scene-process-floor"><path d="M730 770h850M840 799h650M960 828h450"/><ellipse cx="1180" cy="772" rx="305" ry="45"/></g>
    </>
  ),
  about: <><g className="page-art-orbit"><ellipse cx="1120" cy="490" rx="420" ry="236"/><ellipse cx="1120" cy="490" rx="330" ry="300" transform="rotate(56 1120 490)"/></g></>,
  faq: (
    <>
      <g className="scene-rain scene-rain-far">{Array.from({ length: 12 }, (_, i) => <text key={i} x={780 + i * 78} y={80 + (i % 4) * 31}>{['01','&lt;','010','::','{ }','λ','//','AI'][i % 8]}</text>)}</g>
      <g className="scene-rain">{Array.from({ length: 11 }, (_, i) => <text key={i} x={820 + i * 76} y={170 + (i % 3) * 26}>{['0101','scope','{ }','build','//','001','ship','&gt;'][i % 8]}</text>)}</g>
      <g className="scene-terminal-depth"><path d="m856 190 596-96 255 150-596 96z"/><path d="m856 190 255 150v384l-255-150z"/><path d="m1111 340 596-96v384l-596 96z"/><path className="scene-terminal-screen" d="m893 215 516-83 211 123-516 84z"/><path className="scene-terminal-side" d="m1409 216 211 39v343l-211 79z"/><path className="scene-terminal-base" d="m1111 724 596-96-91 66-505 105z"/></g>
      <g className="scene-terminal-content"><path d="m932 256 228-37m-218 67 360-58m-351 88 270-44m-261 74 400-65m-390 95 178-29m-170 58 282-46"/><circle cx="943" cy="217" r="7"/><circle cx="967" cy="213" r="7"/><circle cx="991" cy="209" r="7"/></g>
      <g className="scene-terminal-glints"><path d="M1200 165 1268 154m-34 23 69-11M1374 604l84-14m-40 25 72-12"/><circle cx="1500" cy="198" r="4"/><circle cx="842" cy="560" r="5"/></g>
      <g className="scene-terminal-cursor"><circle cx="1257" cy="454" r="46"/><path d="m1246 433 38 48-22-4-6 22z"/></g>
    </>
  ),
  contact: (
    <>
      <g className="scene-map-horizon"><path d="m610 706 500-290 565 290-500 290z"/><path d="m710 706 465-270m-365 340 465-270m-365 340 465-270m-365 340 465-270m-365 340 465-270M810 820l-122-70m222 12-122-70m222 12-122-70m222 12-122-70m222 12-122-70m222 12-122-70m222 12-122-70m222 12-122-70m-866 547 566-328m-619 26 566-328m-471 385 566-328"/></g>
      <g className="scene-city-blocks"><path d="m790 479 97-56 111 64-97 56z"/><path d="m790 479 111 64v78l-111-64z"/><path d="m901 543 97-56v78l-97 56z"/><path d="m1035 402 116-67 127 73-116 67z"/><path d="m1035 402 127 73v114l-127-73z"/><path d="m1162 475 116-67v114l-116 67z"/><path d="m1298 528 78-45 92 53-78 45z"/><path d="m1298 528 92 53v70l-92-53z"/><path d="m1390 581 78-45v70l-78 45z"/><path d="m865 665 66-38 80 46-66 38z"/><path d="m865 665 80 46v50l-80-46z"/><path d="m945 711 66-38v50l-66 38z"/></g>
      <g className="scene-map-route"><path d="M730 667c117-92 176-115 277-72 86 37 111-104 211-137s143 65 219 7 93-141 191-184"/><circle cx="730" cy="667" r="10"/><circle cx="1437" cy="465" r="11"/></g>
      <g className="scene-map-pin"><ellipse cx="1200" cy="700" rx="105" ry="30"/><path d="M1190 218c-105 0-190 85-190 190 0 139 190 344 190 344s190-205 190-344c0-105-85-190-190-190z"/><circle cx="1190" cy="407" r="93"/><circle cx="1190" cy="407" r="54"/><circle cx="1190" cy="407" r="15"/></g>
      <g className="scene-map-signal"><ellipse cx="1190" cy="408" rx="260" ry="94" transform="rotate(-22 1190 408)"/><circle cx="946" cy="315" r="10"/><circle cx="1426" cy="500" r="8"/></g>
    </>
  ),
  imprint: (
    <>
      <g className="scene-imprint-orbit"><ellipse cx="1160" cy="480" rx="500" ry="230"/><ellipse cx="1160" cy="480" rx="340" ry="350" transform="rotate(-28 1160 480)"/></g>
      <g className="scene-imprint-structure"><path d="m880 254 300-118 345 174-300 119z"/><path d="m880 254 345 175v365L880 618z"/><path d="m1225 429 300-119v365l-300 119z"/><path className="scene-imprint-glass" d="m944 278 232-91 262 132-233 92z"/><path d="m944 278 261 133v293L944 571z"/><path d="m1205 411 233-92v293l-233 92z"/><path className="scene-imprint-page" d="m1004 316 175-68 187 95-175 68z"/><path className="scene-imprint-lines" d="m1035 326 137-53m-129 72 156-60m-147 80 147-57m-137 77 116-45m-82 96 156-60m-147 80 156-60m-147 80 156-60m-147 80 110-42"/><path className="scene-imprint-edge" d="m880 254 345 175 300-119m-300 119v365m-345-540v364"/></g>
      <g className="scene-imprint-stamp"><circle cx="1394" cy="643" r="71"/><circle cx="1394" cy="643" r="54"/><path d="m1364 643 20 20 42-48"/></g>
      <path className="scene-imprint-floor" d="M696 755c210-64 444-50 662 12s335 48 442 4"/>
    </>
  ),
  privacy: (
    <>
      <g className="scene-privacy-aura"><circle cx="1190" cy="465" r="320"/><circle cx="1190" cy="465" r="260"/></g>
      <g className="scene-privacy-orbits"><ellipse cx="1190" cy="465" rx="490" ry="180" transform="rotate(-24 1190 465)"/><ellipse cx="1190" cy="465" rx="340" ry="285" transform="rotate(44 1190 465)"/><circle cx="732" cy="285" r="12"/><circle cx="1520" cy="605" r="10"/></g>
      <g className="scene-shield"><path className="scene-shield-shadow" d="M1190 145 1460 246v210c0 180-110 299-270 385-160-86-270-205-270-385V246z"/><path className="scene-shield-front" d="M1190 180 1425 268v183c0 155-95 258-235 334-140-76-235-179-235-334V268z"/><path className="scene-shield-rim" d="M1190 226 1380 298v152c0 126-74 213-190 278-116-65-190-152-190-278V298z"/><path className="scene-shield-reflection" d="M1190 181v604m-235-517 235 180 235-180"/>
        <path className="scene-lock" d="M1118 438v-38c0-43 31-75 72-75s72 32 72 75v38m-167 0h190v139h-190z"/><circle className="scene-lock-keyhole" cx="1190" cy="492" r="15"/><path d="M1190 506v33"/>
      </g>
      <g className="scene-privacy-data"><path d="m850 480 105-58m470 120 156-84m-537 213 138-79m-331-73 108 64m454-154 93 56"/><circle cx="850" cy="480" r="9"/><circle cx="1425" cy="542" r="9"/><circle cx="1200" cy="693" r="7"/></g>
    </>
  ),
};

export function PageHeroArtwork({ kind }: { kind: Kind }) {
  const id = `page-art-${kind}`;
  const moveScene = (event: PointerEvent<SVGSVGElement>) => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    const svg = event.currentTarget;
    svg.style.setProperty('--scene-back-x', `${-x * 20}px`);
    svg.style.setProperty('--scene-back-y', `${-y * 14}px`);
    svg.style.setProperty('--scene-mid-x', `${-x * 38}px`);
    svg.style.setProperty('--scene-mid-y', `${-y * 28}px`);
    svg.style.setProperty('--scene-front-x', `${-x * 58}px`);
    svg.style.setProperty('--scene-front-y', `${-y * 42}px`);
  };
  const resetScene = (event: PointerEvent<SVGSVGElement>) => {
    const svg = event.currentTarget;
    svg.style.setProperty('--scene-back-x', '0px'); svg.style.setProperty('--scene-back-y', '0px');
    svg.style.setProperty('--scene-mid-x', '0px'); svg.style.setProperty('--scene-mid-y', '0px');
    svg.style.setProperty('--scene-front-x', '0px'); svg.style.setProperty('--scene-front-y', '0px');
  };
  return (
    <svg className={`page-hero-artwork page-hero-artwork-${kind}`} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false" onPointerMove={moveScene} onPointerLeave={resetScene}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="var(--bg)"/><stop offset=".58" stopColor="var(--surface-muted)"/><stop offset="1" stopColor="var(--bg)"/></linearGradient>
        <radialGradient id={`${id}-glow`} cx="72%" cy="46%" r="60%"><stop offset="0" stopColor="var(--accent)" stopOpacity=".42"/><stop offset=".42" stopColor="var(--accent-2)" stopOpacity=".2"/><stop offset="1" stopColor="var(--bg)" stopOpacity="0"/></radialGradient>
        <radialGradient id={`${id}-sphere`} cx="34%" cy="28%" r="75%"><stop offset="0" stopColor="var(--accent-2)" stopOpacity=".96"/><stop offset=".38" stopColor="var(--accent)" stopOpacity=".54"/><stop offset="1" stopColor="var(--bg)" stopOpacity=".08"/></radialGradient>
        <radialGradient id={`${id}-sphere`} cx="34%" cy="28%" r="75%"><stop offset="0" stopColor="var(--accent-2)" stopOpacity=".96"/><stop offset=".38" stopColor="var(--accent)" stopOpacity=".42"/><stop offset="1" stopColor="var(--bg)" stopOpacity=".06"/></radialGradient>
        <linearGradient id={`${id}-glass`} x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stopColor="white" stopOpacity=".6"/><stop offset=".24" stopColor="var(--accent)" stopOpacity=".28"/><stop offset=".62" stopColor="var(--accent-2)" stopOpacity=".22"/><stop offset="1" stopColor="var(--bg)" stopOpacity=".48"/></linearGradient>
        <linearGradient id={`${id}-beam`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="var(--accent)" stopOpacity="0"/><stop offset=".48" stopColor="var(--accent)" stopOpacity=".95"/><stop offset="1" stopColor="var(--accent-2)" stopOpacity=".1"/></linearGradient>
        <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="white" stopOpacity=".64"/><stop offset=".2" stopColor="var(--accent)" stopOpacity=".62"/><stop offset=".58" stopColor="var(--accent-2)" stopOpacity=".4"/><stop offset="1" stopColor="var(--bg)" stopOpacity=".82"/></linearGradient>
        <pattern id={`${id}-grid`} width="56" height="56" patternUnits="userSpaceOnUse"><path d="M56 0H0v56" fill="none" stroke="var(--line)" strokeOpacity=".25" strokeWidth="1"/><circle cx="0" cy="0" r="1.5" fill="var(--accent)" fillOpacity=".42"/></pattern>
        <filter id={`${id}-bloom`} x="-70%" y="-70%" width="240%" height="240%"><feGaussianBlur stdDeviation="13" result="blur"/><feColorMatrix in="blur" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id={`${id}-shadow`} x="-60%" y="-60%" width="240%" height="240%"><feGaussianBlur in="SourceAlpha" stdDeviation="20"/><feOffset dy="22"/><feComponentTransfer><feFuncA type="linear" slope=".44"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <rect width="1600" height="900" fill={`url(#${id}-bg)`}/>
      <ellipse cx="1210" cy="465" rx="600" ry="460" fill={`url(#${id}-glow)`}/>
      <path d="M660 0h940v900H660z" fill={`url(#${id}-grid)`} opacity=".34"/>
      {artwork[kind]}
    </svg>
  );
}
