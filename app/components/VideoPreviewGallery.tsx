'use client';

import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/** ------------------------------------------------------------------
 * Data – keep the same shape, easy to hydrate from CMS later
 * ------------------------------------------------------------------ */
const videos = [
  { id: 1, title: '5 Passive Income Ideas That Work', caption: '"Number 3 will change your life..."', views: '2.3M', category: 'Finance', videoSrc: '/passive-income.mp4' },
  { id: 2, title: 'Anime Characters Who Could End Reality', caption: '"These powers are actually terrifying..."', views: '1.8M', category: 'Anime', videoSrc: '/anime-reality.mp4' },
  { id: 3, title: 'Gym Mistakes Killing Your Gains', caption: '"Stop doing this immediately..."', views: '3.1M', category: 'Fitness', videoSrc: '/gym-mistakes.mp4' },
  { id: 4, title: 'Psychology Tricks That Control Minds', caption: '"This works on everyone..."', views: '4.2M', category: 'Psychology', videoSrc: '/psychology-tricks.mp4' },
  { id: 5, title: 'Ancient Mysteries Still Unsolved', caption: '"Scientists are baffled..."', views: '1.9M', category: 'History', videoSrc: '/ancient-mysteries.mp4' },
];

/** ------------------------------------------------------------------
 * Lightbox (fullscreen player)
 * ------------------------------------------------------------------ */
function Lightbox({
  open,
  onClose,
  index,
  setIndex,
}: {
  open: boolean;
  onClose: () => void;
  index: number;
  setIndex: (i: number) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIndex((index + 1) % videos.length);
      if (e.key === 'ArrowLeft') setIndex((index - 1 + videos.length) % videos.length);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, index, setIndex, onClose]);

  useEffect(() => {
    // autoplay when index changes
    if (!videoRef.current || !open) return;
    const v = videoRef.current;
    v.currentTime = 0;
    v.play().catch(() => {});
    return () => {
      v.pause();
    };
  }, [index, open]);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    if (Math.abs(dx) > 50) {
      // swipe
      setIndex(dx < 0 ? (index + 1) % videos.length : (index - 1 + videos.length) % videos.length);
    }
    touch.current = null;
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Video lightbox"
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-[420px] aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl"
            initial={{ scale: shouldReduceMotion ? 1 : 0.96, y: shouldReduceMotion ? 0 : 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: shouldReduceMotion ? 1 : 0.98, y: shouldReduceMotion ? 0 : 8 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <video
              ref={videoRef}
              src={videos[index].videoSrc}
              className="w-full h-full object-cover"
              playsInline
              controls
              autoPlay
            />
            {/* Overlay meta + controls */}
            <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent">
              <div className="text-xs text-white/90">
                <div className="font-semibold">{videos[index].category}</div>
                <div className="text-white/70">{videos[index].views} views</div>
              </div>
              <button
                onClick={onClose}
                className="px-3 py-1 rounded-md bg-white/15 text-white text-xs hover:bg-white/25"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
              <div className="text-white text-sm font-semibold">{videos[index].title}</div>
              <div className="text-[#C2886D] text-xs italic">{videos[index].caption}</div>
            </div>
            {/* Prev/Next */}
            <div className="absolute inset-y-0 left-0 flex items-center">
              <button
                aria-label="Previous"
                onClick={() => setIndex((index - 1 + videos.length) % videos.length)}
                className="m-2 h-10 w-10 rounded-full bg-white/15 text-white hover:bg-white/25"
              >
                ‹
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                aria-label="Next"
                onClick={() => setIndex((index + 1) % videos.length)}
                className="m-2 h-10 w-10 rounded-full bg-white/15 text-white hover:bg-white/25"
              >
                ›
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** ------------------------------------------------------------------
 * Card video that only loads/plays when visible
 * ------------------------------------------------------------------ */
function SmartVideo({
  src,
  active,
  large,
}: {
  src: string;
  active: boolean;
  large?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    // lazy enable src when scrolled into view (first intersection handled by parent)
    setCanPlay(true);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (active) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
    return () => v.pause();
  }, [active]);

  return (
    <video
      ref={ref}
      src={canPlay ? src : undefined}
      className="w-full h-full object-cover"
      playsInline
      loop
      muted
      preload="metadata"
      style={{ borderRadius: large ? '1.75rem' : '1.25rem' }}
    />
  );
}

/** ------------------------------------------------------------------
 * Main gallery
 * ------------------------------------------------------------------ */
export default function VideoPreviewGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [lbOpen, setLbOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // Observe cards and choose the one closest to the horizontal center
  const updateActiveFromScroll = useCallback(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    const centerX = scroller.scrollLeft + scroller.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const left = rect.left + scroller.scrollLeft - scroller.getBoundingClientRect().left;
      const mid = left + rect.width / 2;
      const dist = Math.abs(mid - centerX);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActive(best);
  }, []);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    updateActiveFromScroll();
    const onScroll = () => {
      // throttle a little
      if (shouldReduceMotion) updateActiveFromScroll();
      else requestAnimationFrame(updateActiveFromScroll);
    };
    scroller.addEventListener('scroll', onScroll, { passive: true });
    return () => scroller.removeEventListener('scroll', onScroll);
  }, [updateActiveFromScroll, shouldReduceMotion]);

  return (
    <section className="relative bg-gradient-to-br from-[#0B0814] via-[#1e004b] to-[#0B0814] py-24 px-4 overflow-x-hidden">
      {/* Ambient blobs */}
      <motion.div
        className="absolute w:[600px] h-[600px] bg-gradient-to-br from-[#6A00FF]/20 via-[#C2886D]/30 to-[#43009C]/10 blur-[160px] rounded-full -top-40 -left-40 z-0 pointer-events-none"
        animate={shouldReduceMotion ? {} : { scale: [1, 1.06, 1] }}
        transition={{ repeat: Infinity, duration: 18, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[420px] h-[420px] bg-[#6A00FF]/30 blur-[110px] rounded-full -bottom-24 -right-24 z-0 pointer-events-none"
        animate={shouldReduceMotion ? {} : { scale: [1, 1.03, 1] }}
        transition={{ repeat: Infinity, duration: 14, ease: 'easeInOut' }}
      />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.h2
          className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-[#C2886D] via-[#6A00FF] to-white bg-clip-text text-transparent drop-shadow-xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Viral Videos Made by <span className="text-[#C2886D]">QuietlyRich</span>
        </motion.h2>
        <motion.p
          className="text-gray-300 max-w-2xl mx-auto mb-10 text-lg"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Real faceless videos going viral right now. Each one created in under 30 seconds.
        </motion.p>

        {/* Snap-scrolling row */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 hide-scrollbar justify-start px-1 snap-x snap-mandatory pb-4"
          aria-label="Video preview gallery"
        >
          {videos.map((video, i) => {
            const isActive = i === active;
            const isHero = i === 0; // first card a bit larger
            return (
              <motion.div
                key={video.id}
                ref={(el) => {
                  cardRefs.current[i] = el; // ✅ important: do not return anything
                }}
                className={`relative snap-center flex-shrink-0 ${isHero ? 'min-w-[280px] md:min-w-[320px]' : 'min-w-[240px] md:min-w-[260px]'}`}
                initial={{ opacity: 0, y: 28, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                {/* Card */}
                <button
                  onClick={() => {
                    setLbIndex(i);
                    setLbOpen(true);
                  }}
                  className={`group relative w-full ${isHero ? 'h-80 md:h-96' : 'h-72'} bg-white/10 backdrop-blur-lg border border-[#C2886D]/30 rounded-3xl overflow-hidden shadow-[0_8px_32px_0_rgba(106,0,255,0.17)] transition-transform focus:outline-none focus:ring-2 focus:ring-[#C2886D] hover:scale-[1.02]`}
                  aria-label={`Open ${video.title}`}
                >
                  {/* Pulsing glow */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl z-0 pointer-events-none"
                    animate={
                      shouldReduceMotion
                        ? {}
                        : { opacity: [0.7, 1, 0.7], scale: [0.98, 1, 0.98] }
                    }
                    transition={{ repeat: Infinity, repeatType: 'reverse', duration: 3 + i * 0.4, delay: i * 0.15, ease: 'easeInOut' }}
                    style={{
                      background: 'radial-gradient(circle, rgba(106,0,255,0.16) 60%, rgba(194,136,109,0.09) 100%)',
                      filter: 'blur(10px)',
                    }}
                  />
                  {/* Video frame */}
                  <div className="relative w-full h-full bg-black rounded-3xl overflow-hidden z-10">
                    <SmartVideo src={video.videoSrc} active={isActive} large={isHero} />
                    {/* Category pill */}
                    <div
                      className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold shadow-lg"
                      style={{
                        background: 'linear-gradient(90deg, #6A00FF 0%, #C2886D 100%)',
                        color: '#fff',
                        border: '1px solid #fff3',
                      }}
                    >
                      {video.category}
                    </div>
                    {/* Views badge */}
                    <div
                      className="absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-semibold shadow-sm border border-[#C2886D]/30"
                      style={{
                        background: 'linear-gradient(90deg, #C2886D 0%, #6A00FF 100%)',
                        color: '#fff',
                      }}
                    >
                      👁 {video.views}
                    </div>
                    {/* Play overlay on hover/tap */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition text-white text-3xl">►</div>
                    </div>
                  </div>
                </button>

                {/* Meta */}
                <div className="px-1 pt-3 text-left">
                  <h3 className="text-sm font-bold leading-snug mb-1 text-white line-clamp-2">{video.title}</h3>
                  <p className="text-xs italic text-[#C2886D] line-clamp-1">{video.caption}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Metrics with subtle in-view pop */}
        <div className="flex flex-wrap justify-center gap-8 mt-16 text-center text-base sm:text-lg">
          {[
            { label: 'Total Views', value: '12M+' },
            { label: 'Videos Created', value: '850K+' },
            { label: 'Viral Niches', value: '25' },
            { label: 'Creator Rating', value: '4.9/5' },
          ].map((m, i) => (
            <motion.div
              key={m.label}
              className="backdrop-blur bg-white/5 border border-[#C2886D]/30 rounded-xl px-7 py-4 shadow-md"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.05 * i }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <span className="bg-gradient-to-r from-[#C2886D] via-[#6A00FF] to-white bg-clip-text text-transparent font-bold text-2xl">
                {m.value}
              </span>
              <span className="block text-white mt-1 font-normal text-sm">{m.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Conversion CTA */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <a href="#try-demo" className="inline-block">
            <button
              className="relative bg-gradient-to-tr from-[#C2886D] via-[#fff7f3] to-[#6A00FF] text-black font-semibold px-8 py-3 rounded-2xl shadow-2xl text-base border border-[#C2886D]/60 backdrop-blur-lg transition hover:scale-105"
              style={{ boxShadow: '0 0 32px 0 #C2886D44' }}
            >
              Make videos like this — Try the Demo →
            </button>
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lbOpen}
        onClose={() => setLbOpen(false)}
        index={lbIndex}
        setIndex={setLbIndex}
      />
    </section>
  );
}