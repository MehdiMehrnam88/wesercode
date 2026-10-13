'use client';

import { useEffect } from 'react';

const REVEAL_SELECTOR = [
  '.hero-copy', '.bremen-hero-card', '.page-hero-panel', '.section-heading',
  '.intro-grid > *', '.service-card', '.audience-item', '.principle',
  '.process-phase', '.process-step', '.tech-item', '.conversation-card',
  '.conversation-bridge', '.service-detail', '.history-current',
  '.history-facts > *', '.project-card', '.team-card', '.value-grid > *',
  '.contact-meta', '.contact-form-card', '.map-section > *', '.faq-item',
  '.legal-section', '.visual-page-hero-scroll',
  '.not-found-content > *',
].join(',');

export function ScrollEffects() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (reducedMotion) return;
    if (connection?.saveData) {
      document.documentElement.dataset.saveDataMotion = 'off';
      return () => { delete document.documentElement.dataset.saveDataMotion; };
    }

    let revealObserver: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('motion-visible');
          revealObserver?.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -4% 0px' });

    }
    const revealElements = new Set<HTMLElement>();
    const parallaxElements = new Set<HTMLElement>();
    let frame = 0;

    const select = (root: ParentNode, selector: string) => {
      const elements: HTMLElement[] = [];
      if (root instanceof HTMLElement && root.matches(selector)) elements.push(root);
      elements.push(...root.querySelectorAll<HTMLElement>(selector));
      return elements;
    };
    const registerElements = (root: ParentNode = document) => {
      select(root, REVEAL_SELECTOR).forEach((element) => {
        if (revealElements.has(element)) return;
        revealElements.add(element);
        element.classList.add('motion-reveal');
        const delay = (Array.from(element.parentElement?.children ?? []).indexOf(element) % 4) * 55;
        element.style.setProperty('--motion-delay', `${delay}ms`);
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.94 && rect.bottom > 0) {
          element.classList.add('motion-visible');
        } else if (revealObserver) {
          revealObserver.observe(element);
        } else {
          element.classList.add('motion-visible');
        }
      });
      select(root, '[data-parallax]').forEach((element) => parallaxElements.add(element));
    };

    registerElements();
    document.documentElement.dataset.scrollMotion = 'ready';

    const updateParallax = () => {
      frame = 0;
      const viewportCenter = window.innerHeight * 0.5;
      const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty('--page-scroll-progress', String(scrollRange > 0 ? window.scrollY / scrollRange : 0));
      parallaxElements.forEach((element) => {
        if (!element.isConnected) {
          parallaxElements.delete(element);
          return;
        }
        const rect = element.getBoundingClientRect();
        if (rect.bottom < -100 || rect.top > window.innerHeight + 100) {
          element.style.setProperty('--parallax-y', '0px');
          return;
        }
        const speed = Number(element.dataset.parallax) || 0.12;
        const distance = (viewportCenter - (rect.top + rect.height * 0.5)) * speed;
        const offset = Math.max(-55, Math.min(55, distance));
        element.style.setProperty('--parallax-y', `${offset.toFixed(1)}px`);
      });
      const conversationSection = document.querySelector<HTMLElement>('.conversation-section');
      if (conversationSection) {
        const conversationBounds = conversationSection.getBoundingClientRect();
        const followingBounds = document.querySelector<HTMLElement>('.home-depth-services')?.getBoundingClientRect();
        const conversationInView = conversationBounds.top < window.innerHeight * 0.82 && conversationBounds.bottom > window.innerHeight * 0.18;
        const followingSectionInView = Boolean(followingBounds && followingBounds.top < window.innerHeight && followingBounds.bottom > 0);
        conversationSection.classList.toggle('conversation-in-view', conversationInView && !followingSectionInView);
      }
    };
    const scheduleParallax = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    };
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) registerElements(node);
        });
        record.removedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          select(node, '.motion-reveal').forEach((element) => {
            revealObserver?.unobserve(element);
            revealElements.delete(element);
          });
          select(node, '[data-parallax]').forEach((element) => parallaxElements.delete(element));
        });
      });
      scheduleParallax();
    });
    mutations.observe(document.querySelector('main') ?? document.body, { childList: true, subtree: true });
    window.addEventListener('scroll', scheduleParallax, { passive: true });
    window.addEventListener('resize', scheduleParallax, { passive: true });
    scheduleParallax();

    return () => {
      revealObserver?.disconnect();
      mutations.disconnect();
      window.removeEventListener('scroll', scheduleParallax);
      window.removeEventListener('resize', scheduleParallax);
      if (frame) window.cancelAnimationFrame(frame);
      delete document.documentElement.dataset.scrollMotion;
    };
  }, []);

  return null;
}
