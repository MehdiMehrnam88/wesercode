import Image from 'next/image';

export function HeroScene() {
  return (
    <div className="hero-scene" aria-hidden="true">
      <Image
        className="hero-scene-image"
        data-parallax="0.15"
        src="/banners/HomepageBanner.png"
        alt="WeserCode digital systems and software development in Bremen"
        fill
        priority
        sizes="100vw"
      />
      <div className="hero-scene-fade" />
      <div className="hero-scene-glow glow-one" data-parallax="0.1" />
      <div className="hero-scene-glow glow-two" data-parallax="0.18" />
      <div className="hero-scene-mesh" data-parallax="0.05" />
      <div className="hero-system-depth" data-parallax="0.12">
        <div className="hero-system-stage">
          <div className="hero-system-orbit hero-system-orbit-a" />
          <div className="hero-system-orbit hero-system-orbit-b" />
          <div className="hero-system-orbit hero-system-orbit-c" />
          <svg className="hero-system-wires" viewBox="0 0 560 500" fill="none">
            <path d="M76 125 204 203 402 116M76 125l34 244 94-166m198-87-12 260-186-173m-94 166 292 7" />
            <circle cx="76" cy="125" r="4" /><circle cx="402" cy="116" r="4" />
            <circle cx="110" cy="369" r="4" /><circle cx="390" cy="376" r="4" />
          </svg>
          <div className="hero-system-cube"><span>W</span><i /><b /></div>
          <div className="hero-system-card hero-system-card-data" data-parallax="0.16">
            <div className="hero-system-bars"><i /><i /><i /><i /><i /><i /><i /></div>
          </div>
          <div className="hero-system-card hero-system-card-cloud" data-parallax="0.08">
            <div className="hero-system-cloud"><i /><i /><i /><span /><b /></div>
          </div>
          <div className="hero-system-card hero-system-card-ai" data-parallax="0.2">
            <div className="hero-system-wave"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
          </div>
          <div className="hero-system-node hero-system-node-a" />
          <div className="hero-system-node hero-system-node-b" />
          <div className="hero-system-node hero-system-node-c" />
        </div>
      </div>
    </div>
  );
}
