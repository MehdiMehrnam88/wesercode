import type { ReactNode } from 'react';

type Kind = 'conversation' | 'principles' | 'process' | 'technology';

const drawings = {
  conversation: <><path className="home-art-line" d="M56 307 178 186l121 89 115-151 128 103" /><path className="home-art-line home-art-line-soft" d="m56 307 243-32 115-151 128 103" /><circle className="home-art-node" cx="56" cy="307" r="8" /><circle className="home-art-node" cx="178" cy="186" r="9" /><circle className="home-art-node" cx="299" cy="275" r="11" /><circle className="home-art-node" cx="414" cy="124" r="8" /><circle className="home-art-node" cx="542" cy="227" r="10" /><circle className="home-art-halo" cx="299" cy="275" r="38" /></>,
  principles: <><ellipse className="home-art-ring" cx="395" cy="230" rx="210" ry="94" /><ellipse className="home-art-ring" cx="395" cy="230" rx="158" ry="150" transform="rotate(42 395 230)" /><ellipse className="home-art-ring" cx="395" cy="230" rx="135" ry="202" transform="rotate(-38 395 230)" /><circle className="home-art-node" cx="224" cy="126" r="7" /><circle className="home-art-node" cx="537" cy="298" r="8" /></>,
  process: <><path className="home-art-line" d="M72 231h120c70 0 72-119 142-119h80c61 0 66 111 124 111h32" /><path className="home-art-line home-art-line-soft" d="M72 286h120c70 0 72-119 142-119h80c61 0 66 111 124 111h32" /><g className="home-art-tile"><rect x="48" y="205" width="48" height="48" rx="12" /><rect x="310" y="88" width="48" height="48" rx="12" /><rect x="514" y="199" width="48" height="48" rx="12" /></g><circle className="home-art-node" cx="192" cy="231" r="5" /><circle className="home-art-node" cx="414" cy="112" r="5" /></>,
  technology: <><g className="home-art-stack"><path d="m294 88 170 97-170 98-170-98z" /><path d="m124 185v148l170 98V283z" /><path d="m464 185v148l-170 98V283z" /><path d="m174 195 120 69 120-69" /><path d="M174 239v47l120 69 120-69v-47" /><path d="M174 286v39l120 69 120-69v-39" /></g><path className="home-art-line" d="m75 177 50-29m290 195 70 40m-286-10-60 35" /><circle className="home-art-node" cx="74" cy="177" r="7" /><circle className="home-art-node" cx="485" cy="383" r="8" /><circle className="home-art-node" cx="139" cy="408" r="6" /></>,
} satisfies Record<Kind, ReactNode>;

export function HomeVisualModule({ kind, className = '' }: { kind: Kind; className?: string }) {
  return <svg className={`home-visual-module home-visual-module-${kind} ${className}`} data-parallax="0.08" viewBox="0 0 600 460" aria-hidden="true" focusable="false">{drawings[kind]}</svg>;
}
