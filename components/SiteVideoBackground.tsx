'use client';

import { useEffect, useRef, useState } from 'react';

const LOCAL_LIGHT_VIDEO = '/media/light-background.mp4';
const LOCAL_DARK_VIDEO = '/media/dark-background.mp4';
const REMOTE_LIGHT_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260815_034306_165449ef-7d2e-4e81-850f-1939c5cb442d.mp4';
const REMOTE_DARK_VIDEO = 'https://stream.mux.com/Jwr2RhmsNrd6GEspBNgm02vJsRZAGlaoQIh4AucGdASw.m3u8';

interface HlsInstance {
  destroy: () => void;
  loadSource: (src: string) => void;
  attachMedia: (media: HTMLMediaElement) => void;
  on?: (event: string, handler: (...args: unknown[]) => void) => void;
}

declare global {
  interface Window {
    Hls?: new (config?: Record<string, unknown>) => HlsInstance;
  }
}

function loadHlsScript() {
  return new Promise<void>((resolve, reject) => {
    if (window.Hls) {
      resolve();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>('script[data-hls-loader]');
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('Unable to load HLS player')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/hls.js@1.6.19/dist/hls.min.js';
    script.async = true;
    script.dataset.hlsLoader = 'true';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Unable to load HLS player'));
    document.head.appendChild(script);
  });
}

export function SiteVideoBackground() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<HlsInstance | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);
  const [saveData, setSaveData] = useState(false);

  useEffect(() => {
    const readTheme = () => setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
    readTheme();

    const observer = new MutationObserver(readTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: EventTarget & { saveData?: boolean } }).connection;
    const sync = () => {
      setReducedMotion(media.matches);
      setSaveData(connection?.saveData === true);
    };
    sync();
    media.addEventListener('change', sync);
    connection?.addEventListener('change', sync);
    return () => {
      media.removeEventListener('change', sync);
      connection?.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion === null) return;

    if (reducedMotion || saveData) {
      video.pause();
      video.removeAttribute('src');
      video.load();
      return;
    }

    let cancelled = false;
    let usingLocal = true;
    let remoteStarted = false;

    const cleanupHls = () => {
      hlsRef.current?.destroy();
      hlsRef.current = null;
    };

    const play = () => {
      if (!cancelled) void video.play().catch(() => undefined);
    };

    const attachNative = (src: string) => {
      if (cancelled) return;
      cleanupHls();
      video.removeAttribute('crossorigin');
      video.src = src;
      video.addEventListener('loadedmetadata', play, { once: true });
      video.addEventListener('canplay', play, { once: true });
      video.load();
    };

    const attachRemoteDark = async () => {
      if (cancelled || remoteStarted) return;
      remoteStarted = true;
      video.setAttribute('crossorigin', 'anonymous');

      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        attachNative(REMOTE_DARK_VIDEO);
        return;
      }

      try {
        await loadHlsScript();
        if (cancelled || !window.Hls) return;
        cleanupHls();
        const hls = new window.Hls({
          enableWorker: true,
          lowLatencyMode: false,
          backBufferLength: 30,
        });
        hlsRef.current = hls;
        hls.loadSource(REMOTE_DARK_VIDEO);
        hls.attachMedia(video);
        hls.on?.('MANIFEST_PARSED', play);
      } catch {
        if (!cancelled) attachNative(REMOTE_DARK_VIDEO);
      }
    };

    const handleLocalError = () => {
      if (cancelled || !usingLocal) return;
      usingLocal = false;
      video.removeEventListener('error', handleLocalError);
      if (theme === 'light') attachNative(REMOTE_LIGHT_VIDEO);
      else void attachRemoteDark();
    };

    cleanupHls();
    video.pause();
    video.removeAttribute('src');
    video.addEventListener('loadedmetadata', play);
    video.addEventListener('canplay', play);
    video.addEventListener('error', handleLocalError);
    video.src = theme === 'light' ? LOCAL_LIGHT_VIDEO : LOCAL_DARK_VIDEO;
    video.load();

    return () => {
      cancelled = true;
      video.removeEventListener('loadedmetadata', play);
      video.removeEventListener('canplay', play);
      video.removeEventListener('error', handleLocalError);
      cleanupHls();
      video.pause();
      video.removeAttribute('src');
      video.load();
    };
  }, [theme, reducedMotion, saveData]);

  return (
    <div className="site-video-bg" aria-hidden="true">
      <video
        ref={videoRef}
        className="site-video-bg-media"
        muted
        autoPlay
        loop
        playsInline
        preload="metadata"
      />
      <div className="site-video-bg-tint" />
      <div className="site-video-bg-vignette" />
    </div>
  );
}
