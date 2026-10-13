import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Instagram,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Video,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowRight,
  Bookmark,
  Share2,
  Heart,
  MessageCircle,
  RotateCcw,
  AlertCircle,
  Loader2
} from 'lucide-react';
import {
  INSTAGRAM_SHOWCASE_POSTS,
  InstagramShowcasePost
} from '../data/instagramPosts';

export const InstagramShowcase: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [savedPosts, setSavedPosts] = useState<Record<string, boolean>>({});
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const posts = INSTAGRAM_SHOWCASE_POSTS;
  const currentPost: InstagramShowcasePost = posts[currentIndex] || posts[0];
  const totalReels = posts.length;

  const formattedPosition = `${String(currentIndex + 1).padStart(2, '0')} / ${String(
    totalReels
  ).padStart(2, '0')}`;

  /**
   * Performance optimization:
   * When navigating to another reel, immediately stop and detach active video,
   * reset buffers, and free memory decoders on mobile.
   */
  const unloadCurrentVideo = useCallback(() => {
    if (videoRef.current) {
      try {
        videoRef.current.pause();
        videoRef.current.removeAttribute('src');
        videoRef.current.load(); // Releases decoder buffer and network connection
      } catch {
        // Safe ignore
      }
    }
    setIsPlaying(false);
    setIsLoaded(false);
    setIsBuffering(false);
    setHasError(false);
    setCurrentTime(0);
    setDuration(0);
  }, []);

  useEffect(() => {
    unloadCurrentVideo();
  }, [currentIndex, unloadCurrentVideo]);

  const handleNextPost = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalReels);
  }, [totalReels]);

  const handlePrevPost = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? totalReels - 1 : prev - 1));
  }, [totalReels]);

  /**
   * On-demand video initialization:
   * Video source is ONLY assigned when the visitor presses Play.
   * Never preloads video files eagerly on page load.
   */
  const startVideoPlayback = () => {
    setHasError(false);
    setIsBuffering(true);
    setIsLoaded(true);

    // Give DOM a microtask tick to mount the video element with src
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.muted = isMuted;
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setIsBuffering(false);
            })
            .catch(() => {
              // Try muted if browser autoplay restrictions blocked unmuted
              if (videoRef.current) {
                videoRef.current.muted = true;
                setIsMuted(true);
                videoRef.current
                  .play()
                  .then(() => {
                    setIsPlaying(true);
                    setIsBuffering(false);
                  })
                  .catch(() => {
                    setIsBuffering(false);
                    setHasError(true);
                  });
              }
            });
        }
      }
    }, 50);
  };

  const togglePlay = () => {
    if (!isLoaded) {
      startVideoPlayback();
      return;
    }

    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsBuffering(true);
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsBuffering(false);
        })
        .catch(() => {
          setIsBuffering(false);
          setHasError(true);
        });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (!duration && videoRef.current.duration) {
        setDuration(videoRef.current.duration);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsBuffering(false);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!videoRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    videoRef.current.currentTime = percentage * duration;
    setCurrentTime(percentage * duration);
  };

  const handleVideoError = () => {
    // If fallback video path exists and wasn't tried, attempt it
    if (
      currentPost.fallbackVideoUrl &&
      videoRef.current &&
      videoRef.current.src.endsWith(currentPost.videoUrl)
    ) {
      videoRef.current.src = currentPost.fallbackVideoUrl;
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        setHasError(true);
        setIsBuffering(false);
      });
      return;
    }
    setHasError(true);
    setIsBuffering(false);
    setIsPlaying(false);
  };

  const toggleLike = (id: string) => {
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSave = (id: string) => {
    setSavedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = (url: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      });
    }
  };

  // Touch swipe support for smartphone viewport
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

    // Minimum swipe threshold: 45px horizontal and predominantly horizontal
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX < 0) {
        handleNextPost();
      } else {
        handlePrevPost();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  // Keyboard navigation support
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNextPost();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrevPost();
    } else if (e.key === ' ') {
      e.preventDefault();
      togglePlay();
    }
  };

  const formatSeconds = (sec: number) => {
    if (isNaN(sec) || sec <= 0) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  return (
    <section
      id="instagram-showcase"
      className="relative overflow-hidden py-16 md:py-24 bg-[#0A0D14] text-slate-100 border-b border-slate-800"
      aria-labelledby="instagram-showcase-heading"
    >
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-rose-500/5 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Heading, Supporting Text, and Controls */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Section Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-semibold uppercase tracking-[0.16em] text-pink-400 mb-4 w-fit shadow-xs">
              <Instagram className="w-3.5 h-3.5 text-pink-500" />
              <span>CONTENT & EXPERIMENTATION</span>
            </div>

            {/* Exact Required Heading */}
            <h2
              id="instagram-showcase-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4"
            >
              Beyond SEO & PPC
            </h2>

            {/* Exact Required Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed mb-4">
              Exploring marketing through content, ideas, and experimentation.
            </p>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 max-w-xl">
              Alongside performance SEO and paid acquisition, I create marketing-related talking-head
              reels breaking down brand psychology, campaign attribution, consumer behavior, and
              high-growth case studies.
            </p>

            {/* Reel Series Badge */}
            <div className="flex items-center gap-3 mb-6 p-2 rounded-xl bg-slate-900/90 border border-slate-800 w-fit">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                <Video className="w-3.5 h-3.5 text-rose-400" />
                <span>Talking-Head Reels Series ({totalReels})</span>
              </span>
              <span className="text-xs font-mono text-slate-400 pr-2">
                Reel {formattedPosition}
              </span>
            </div>

            {/* Active Reel Meta Quick-Info Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 shadow-sm backdrop-blur-md mb-6">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    <Video className="w-3 h-3" />
                    <span>REEL</span>
                  </span>
                  <span className="text-xs font-mono font-medium text-slate-400">
                    {currentPost.topicTag}
                  </span>
                </div>

                {/* Counter indicator */}
                <div className="text-xs font-mono font-bold tracking-wider text-slate-300 px-2 py-0.5 rounded bg-slate-800/70">
                  {formattedPosition}
                </div>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-white mb-1.5 leading-snug">
                {currentPost.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {currentPost.captionSummary}
              </p>

              {/* Action Buttons: Play/Pause and View on Instagram */}
              <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-800/70">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-slate-950 text-xs font-bold hover:bg-slate-200 active:scale-95 transition-all cursor-pointer shadow-sm"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span>Pause Reel</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      <span>{isLoaded ? 'Resume Playback' : 'Play in Smartphone'}</span>
                    </>
                  )}
                </button>

                <a
                  href={currentPost.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 text-white text-xs font-bold hover:brightness-110 active:scale-95 transition-all shadow-sm"
                  aria-label={`Open reel on Instagram: ${currentPost.title}`}
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Watch on Instagram</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                </a>

                {copiedLink && (
                  <span className="text-[11px] text-emerald-400 font-medium">Link copied!</span>
                )}
              </div>
            </div>

            {/* Desktop Navigation Arrows and Reel Jump Dots */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevPost}
                  aria-label="Previous Instagram reel"
                  className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-2xs"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNextPost}
                  aria-label="Next Instagram reel"
                  className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-2xs"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <span className="text-xs text-slate-400 font-mono ml-2">
                  Reel {formattedPosition}
                </span>
              </div>

              {/* Quick Jump Dots for All 8 Reels */}
              <div
                className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-[220px] sm:max-w-none scrollbar-none"
                role="tablist"
                aria-label="Instagram reel selection"
              >
                {posts.map((post, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={post.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Switch to reel ${idx + 1}: ${post.title}`}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 transition-all rounded-full cursor-pointer ${
                        isActive
                          ? 'w-6 bg-gradient-to-r from-pink-500 to-rose-500'
                          : 'w-2 bg-slate-800 hover:bg-slate-700'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Realistic Smartphone Mockup */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <div className="relative w-full max-w-[320px] sm:max-w-[340px] md:max-w-[360px]">
              {/* Outer Phone Hardware Chassis (Matte Titanium / Deep Slate Finish) */}
              <div
                className="relative bg-[#1A1D24] p-3 rounded-[46px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.1),0_0_40px_rgba(244,63,94,0.12)] border border-slate-800"
                tabIndex={0}
                onKeyDown={handleKeyDown}
                role="region"
                aria-label="Interactive Smartphone Reel Player"
              >
                {/* Hardware Side Buttons */}
                <div className="absolute -left-[2px] top-24 w-[3px] h-10 bg-slate-700 rounded-l-sm" />
                <div className="absolute -left-[2px] top-38 w-[3px] h-12 bg-slate-700 rounded-l-sm" />
                <div className="absolute -left-[2px] top-54 w-[3px] h-12 bg-slate-700 rounded-l-sm" />
                <div className="absolute -right-[2px] top-28 w-[3px] h-16 bg-slate-700 rounded-r-sm" />

                {/* Inner Screen Bezel */}
                <div
                  className="relative bg-black rounded-[38px] overflow-hidden aspect-[9/18.5] flex flex-col justify-between select-none shadow-inner"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  {/* Dynamic Island / Camera Notch */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 z-40 w-24 h-5 bg-black rounded-full flex items-center justify-between px-2.5 border border-slate-800/60 shadow-xs pointer-events-none">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
                    <div className="w-2 h-2 rounded-full bg-slate-950 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-blue-950" />
                    </div>
                  </div>

                  {/* Top Status Bar Inside Screen */}
                  <div className="relative z-30 pt-3 px-5 flex items-center justify-between text-[11px] font-semibold text-white/90">
                    <span className="font-mono">9:41</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px]">5G</span>
                      <div className="w-5 h-2.5 border border-white/60 rounded-xs p-[1px] flex items-center">
                        <div className="w-full h-full bg-white rounded-2xs" />
                      </div>
                    </div>
                  </div>

                  {/* Instagram App Header inside Phone */}
                  <div className="relative z-30 px-4 py-2 border-b border-white/10 flex items-center justify-between bg-black/60 backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 p-[1.5px]">
                        <img
                          src="/images/adarssh_bhagwat_portrait_1791812346827.jpg"
                          alt="Adarssh Bhagwat"
                          className="w-full h-full rounded-full object-cover bg-slate-800"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              '/images/adarssh_bhagwat_photo.jpg';
                          }}
                        />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-white flex items-center gap-1 leading-tight">
                          <span>adarsshbhagwat</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
                        </div>
                        <div className="text-[9px] text-slate-400 leading-none">
                          Reels · Original Audio
                        </div>
                      </div>
                    </div>

                    <a
                      href={currentPost.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-full bg-white/15 hover:bg-white/25 text-[10px] font-semibold text-white transition-colors"
                      title="Open on Instagram"
                    >
                      Follow
                    </a>
                  </div>

                  {/* Main Screen Content Area (Reel Viewport) */}
                  <div className="relative flex-1 flex flex-col justify-center overflow-hidden bg-black">
                    {/* VIDEO CONTAINER: Mounted on demand with preload="none" */}
                    {isLoaded && !hasError ? (
                      <div
                        className="relative w-full h-full flex items-center justify-center cursor-pointer group"
                        onClick={togglePlay}
                      >
                        {/* Native HTML5 video with preload="none" and playsInline */}
                        <video
                          ref={videoRef}
                          src={currentPost.videoUrl}
                          preload="none"
                          playsInline
                          loop
                          muted={isMuted}
                          className="w-full h-full object-cover"
                          onTimeUpdate={handleTimeUpdate}
                          onLoadedMetadata={handleLoadedMetadata}
                          onEnded={handleVideoEnded}
                          onError={handleVideoError}
                          onWaiting={() => setIsBuffering(true)}
                          onPlaying={() => {
                            setIsBuffering(false);
                            setIsPlaying(true);
                          }}
                        />

                        {/* Buffering Indicator */}
                        {isBuffering && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-2xs z-20 pointer-events-none">
                            <Loader2 className="w-9 h-9 text-white animate-spin" />
                          </div>
                        )}

                        {/* Centered Play/Pause Click Overlay */}
                        {!isPlaying && !isBuffering && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/35 z-20 transition-all">
                            <div className="w-14 h-14 rounded-full bg-black/70 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-transform">
                              <Play className="w-7 h-7 ml-1 fill-current text-white" />
                            </div>
                          </div>
                        )}

                        {/* Audio Mute/Unmute Quick Toggle */}
                        <button
                          type="button"
                          onClick={toggleMute}
                          aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
                          className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white border border-white/20 hover:bg-black/80 transition-all z-20 cursor-pointer shadow-md"
                        >
                          {isMuted ? (
                            <VolumeX className="w-3.5 h-3.5 text-rose-300" />
                          ) : (
                            <Volume2 className="w-3.5 h-3.5 text-emerald-300" />
                          )}
                        </button>

                        {/* In-Video Scrubber Progress Bar */}
                        <div
                          className="absolute bottom-10 left-3 right-3 z-20 p-1 cursor-pointer"
                          onClick={handleSeek}
                        >
                          <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden backdrop-blur-xs">
                            <div
                              className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full transition-[width] duration-150"
                              style={{
                                width: `${
                                  duration > 0 ? (currentTime / duration) * 100 : 0
                                }%`,
                              }}
                            />
                          </div>
                          <div className="flex justify-between items-center text-[9px] font-mono text-white/80 mt-1">
                            <span>{formatSeconds(currentTime)}</span>
                            <span>{formatSeconds(duration || 45)}</span>
                          </div>
                        </div>
                      </div>
                    ) : hasError ? (
                      /* Graceful Error Fallback Card */
                      <div className="relative w-full h-full flex flex-col justify-center items-center p-6 text-center bg-gradient-to-b from-slate-900 to-black">
                        <div className="w-12 h-12 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-3">
                          <AlertCircle className="w-6 h-6" />
                        </div>
                        <h4 className="text-xs font-bold text-white mb-1">
                          Video Playback Notice
                        </h4>
                        <p className="text-[11px] text-slate-300 leading-relaxed mb-4 max-w-[240px]">
                          Local video stream is currently buffering or unavailable on this connection.
                          You can view the full reel directly on Instagram.
                        </p>
                        <div className="flex flex-col gap-2 w-full max-w-[200px]">
                          <a
                            href={currentPost.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white text-[11px] font-bold hover:brightness-110 transition-all shadow-sm"
                          >
                            <Instagram className="w-3.5 h-3.5" />
                            <span>Watch on Instagram</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                          <button
                            type="button"
                            onClick={() => {
                              setHasError(false);
                              startVideoPlayback();
                            }}
                            className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 text-[11px] font-medium hover:bg-slate-700 transition-colors cursor-pointer"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Retry Playback</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* LIGHTWEIGHT POSTER CARD (Pre-Play State - Zero Video Preload) */
                      <div className="relative w-full h-full flex flex-col justify-between p-4 text-left bg-gradient-to-b from-slate-950 via-[#111624] to-black">
                        {/* Ambient background glows */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-rose-950/30 via-purple-950/20 to-slate-950 pointer-events-none" />
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-500/15 rounded-full blur-2xl pointer-events-none" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />

                        {/* Top Badge Inside Reel */}
                        <div className="relative z-10 flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/25 border border-rose-500/40 text-[10px] font-bold text-rose-300">
                            <Video className="w-3 h-3 text-rose-400" />
                            <span>REEL {formattedPosition}</span>
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            ⏱ {currentPost.durationLabel}
                          </span>
                        </div>

                        {/* Center Talking-Head Video Teaser & Large Play Trigger */}
                        <div className="relative z-10 my-auto text-center py-2">
                          <div className="relative w-18 h-18 mx-auto mb-3.5 group cursor-pointer">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-500 animate-pulse opacity-75 blur-sm" />
                            <button
                              type="button"
                              onClick={startVideoPlayback}
                              aria-label={`Play reel: ${currentPost.title}`}
                              className="relative w-full h-full rounded-full bg-slate-900 border-2 border-white/50 flex items-center justify-center text-white shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
                            >
                              <Play className="w-8 h-8 ml-1 text-white fill-current" />
                            </button>
                          </div>

                          <span className="inline-block text-[9.5px] uppercase font-bold tracking-widest text-pink-400 mb-1">
                            {currentPost.topicTag}
                          </span>
                          <h4 className="text-[13px] font-extrabold text-white leading-tight px-2 mb-2 line-clamp-2">
                            {currentPost.title}
                          </h4>
                          <p className="text-[11px] text-slate-300 px-3 line-clamp-3 leading-relaxed mb-3">
                            {currentPost.captionSummary}
                          </p>

                          <button
                            type="button"
                            onClick={startVideoPlayback}
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-slate-950 text-[11px] font-bold hover:bg-slate-200 transition-colors shadow-sm cursor-pointer"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>Tap to Play Video</span>
                          </button>
                        </div>

                        {/* Floating Right Interaction Rail (Heart, Comment, Share, Bookmark) */}
                        <div className="absolute right-3 bottom-14 z-20 flex flex-col items-center gap-3">
                          <button
                            type="button"
                            onClick={() => toggleLike(currentPost.id)}
                            aria-label="Like post"
                            className="p-1.5 rounded-full bg-black/40 backdrop-blur-md text-white hover:text-rose-500 transition-colors cursor-pointer"
                          >
                            <Heart
                              className={`w-4 h-4 ${
                                likedPosts[currentPost.id]
                                  ? 'text-rose-500 fill-rose-500'
                                  : 'text-white'
                              }`}
                            />
                          </button>
                          <a
                            href={currentPost.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Comments on Instagram"
                            className="p-1.5 rounded-full bg-black/40 backdrop-blur-md text-white hover:text-blue-400 transition-colors"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>
                          <button
                            type="button"
                            onClick={() => handleShare(currentPost.url)}
                            aria-label="Share post link"
                            className="p-1.5 rounded-full bg-black/40 backdrop-blur-md text-white hover:text-cyan-400 transition-colors cursor-pointer"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleSave(currentPost.id)}
                            aria-label="Bookmark post"
                            className="p-1.5 rounded-full bg-black/40 backdrop-blur-md text-white hover:text-amber-400 transition-colors cursor-pointer"
                          >
                            <Bookmark
                              className={`w-4 h-4 ${
                                savedPosts[currentPost.id]
                                  ? 'text-amber-400 fill-amber-400'
                                  : 'text-white'
                              }`}
                            />
                          </button>
                        </div>

                        {/* Reel Bottom Meta */}
                        <div className="relative z-10 text-[10px] text-slate-400 flex items-center justify-between border-t border-white/10 pt-2">
                          <span className="truncate max-w-[150px]">
                            🎵 Original audio · adarsshbhagwat
                          </span>
                          <span className="text-[9px] uppercase font-mono">
                            {currentPost.topicTag}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Instagram Interactive Action Bar inside Phone Bottom */}
                  <div className="relative z-30 px-4 py-2 border-t border-white/10 bg-black/70 backdrop-blur-md flex items-center justify-between">
                    <div className="flex items-center gap-3 text-white">
                      {/* Prev Reel Button */}
                      <button
                        type="button"
                        onClick={handlePrevPost}
                        aria-label="Previous reel"
                        className="text-slate-300 hover:text-white p-1 hover:bg-white/10 rounded transition-colors cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <span className="text-[11px] font-mono text-slate-400">
                        {formattedPosition}
                      </span>

                      {/* Next Reel Button */}
                      <button
                        type="button"
                        onClick={handleNextPost}
                        aria-label="Next reel"
                        className="text-slate-300 hover:text-white p-1 hover:bg-white/10 rounded transition-colors cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <a
                      href={currentPost.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] font-bold text-pink-400 hover:text-pink-300 transition-colors"
                    >
                      <Instagram className="w-3 h-3" />
                      <span>Open on IG</span>
                    </a>
                  </div>

                  {/* Phone Bottom Home Bar Indicator */}
                  <div className="relative z-30 pb-2 pt-1 flex justify-center bg-black">
                    <div className="w-28 h-1 bg-white/40 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Floating Decorative Badge Beside Phone */}
              <div className="hidden sm:flex absolute -bottom-4 -right-4 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 shadow-lg items-center gap-2 text-xs font-semibold text-slate-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Swipe left/right to change reel</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
