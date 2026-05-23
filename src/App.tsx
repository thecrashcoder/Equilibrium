/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronDown, 
  Infinity, 
  Menu, 
  X, 
  ArrowRight, 
  Sparkles, 
  Heart, 
  Activity, 
  Award,
  Snowflake,
  Bell,
  Droplet,
  RefreshCw,
  Mountain,
  ExternalLink
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

const HERO_VIDEO = 'https://cdn.leonardo.ai/users/1c61d68f-8e1f-4cef-80e5-29acce3505bc/generations/1f15679a-aa86-6430-8d7f-f781569abd09/motion_2.0-fast_Animate_a_continuous_seamless_loop_that_progresses_from_its_initial_state_to_its-0.mp4';

interface NavLink {
  label: string;
  active?: boolean;
  dropdown?: boolean;
  items?: string[];
}

const navLinks: NavLink[] = [
  { label: 'Home', active: true },
  { 
    label: 'Wellness', 
    dropdown: true,
    items: ['Mindfulness', 'Physical Health', 'Sleep Analysis', 'Nutrition Plan']
  },
  { label: 'Routine' },
  { label: 'Our Team' }
];

interface PanelSpec {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  image: string;
  icon: React.ComponentType<any>;
}

const PANELS: PanelSpec[] = [
  {
    id: 'mindfulness',
    title: 'Mindfulness Catalyst',
    subtitle: 'Equilibrium Mind',
    desc: 'Binaural auditory beat maps and real-time biometric haptic pacing designed to lower cognitive noise and mental overstimulation.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1400&q=85',
    icon: Mountain,
  },
  {
    id: 'circadian',
    title: 'Circadian Shield',
    subtitle: 'Equilibrium Sleep',
    desc: 'Align master biological circadian clocks by managing blue-light exposure, natural light timing, and optimizing core sleep latency.',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1400&q=85',
    icon: Snowflake,
  },
  {
    id: 'sensory',
    title: 'Sensory Sanctuary',
    subtitle: 'Equilibrium Space',
    desc: 'Calibrate your immediate environment by reducing high-amplitude sound spikes and adapting home light spectrums dynamically.',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1400&q=85',
    icon: Bell,
  },
  {
    id: 'cellular',
    title: 'Cellular Stamina',
    subtitle: 'Equilibrium Bio',
    desc: 'Optimize physical mitochondrial stamina through custom chronobiological nutrient timing systems that bypass digestive fatigue.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1400&q=85',
    icon: Droplet,
  },
  {
    id: 'habits',
    title: 'Adaptive Routines',
    subtitle: 'Equilibrium Protocol',
    desc: 'Friction-free behavioral sequence chains that pair essential physical and mindfulness acts onto intuitive spatial morning anchors.',
    image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=1400&q=85',
    icon: RefreshCw,
  },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [wellnessDropdownOpen, setWellnessDropdownOpen] = useState(false);

  // Wellness Accordion States
  const [activeId, setActiveId] = useState<string>('mindfulness');
  const panelRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
  const infoCardRefs = useRef<{[key: string]: HTMLDivElement | null}>({});

  // Breathing Sanctuary State
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'Ready' | 'Inhale' | 'Hold' | 'Exhale'>('Ready');
  const [breathCount, setBreathCount] = useState(0);

  // Animation Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLVideoElement>(null);
  const bleedPinkRef = useRef<HTMLDivElement>(null);
  const bleedBlueRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  // Mobile Menu Refs
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Mobile Menu Transition logic with advanced backdrop-blur and slide-in entry animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (menuOpen) {
      // Clean up running animations
      gsap.killTweensOf(mobileMenuRef.current);
      gsap.killTweensOf('.mobile-menu-item');

      // Set initial entry states
      gsap.set(mobileMenuRef.current, {
        display: 'flex',
        visibility: 'visible',
        opacity: 0,
        scale: 0.96,
        y: -10,
        backdropFilter: 'blur(0px)',
        webkitBackdropFilter: 'blur(0px)',
      });

      // Animate container and build high-intensity backdrop blur
      gsap.to(mobileMenuRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        backdropFilter: 'blur(28px)', // Increased backdrop-blur intensity
        webkitBackdropFilter: 'blur(28px)',
        duration: 0.45,
        ease: 'power3.out',
      });

      // Stagger slide entry animation for active elements
      const validItems = menuItemsRef.current.filter(Boolean);
      if (validItems.length > 0) {
        gsap.fromTo(validItems,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power2.out',
            delay: 0.08,
            overwrite: 'auto',
          }
        );
      }
    } else {
      // Outward transition
      gsap.killTweensOf(mobileMenuRef.current);
      gsap.killTweensOf('.mobile-menu-item');

      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        scale: 0.96,
        y: -10,
        backdropFilter: 'blur(0px)',
        webkitBackdropFilter: 'blur(0px)',
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(mobileMenuRef.current, { display: 'none', visibility: 'hidden' });
        }
      });
    }
  }, [menuOpen]);

  // Core Breathing Loop
  useEffect(() => {
    if (!isBreathing) {
      setBreathingPhase('Ready');
      return;
    }

    let currentPhase: 'Inhale' | 'Hold' | 'Exhale' = 'Inhale';
    setBreathingPhase('Inhale');
    
    const interval = setInterval(() => {
      if (currentPhase === 'Inhale') {
        currentPhase = 'Hold';
        setBreathingPhase('Hold');
      } else if (currentPhase === 'Hold') {
        currentPhase = 'Exhale';
        setBreathingPhase('Exhale');
      } else {
        currentPhase = 'Inhale';
        setBreathingPhase('Inhale');
        setBreathCount(prev => prev + 1);
      }
    }, 4000); // 4 seconds per phase

    return () => clearInterval(interval);
  }, [isBreathing]);

  useEffect(() => {
    // GSAP Context for safety and simple cleanup
    const ctx = gsap.context(() => {
      // 1. Entrance timeline (runs once on mount)
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Portrait fades in with subtle scale
      if (heroImageRef.current) {
        tl.fromTo(heroImageRef.current,
          { scale: 1.08, opacity: 0 },
          { scale: 1, opacity: 0.9, duration: 1.6 },
          0
        );
      }

      // Chromatic bleeds fade in
      const bleeds = [bleedBlueRef.current, bleedPinkRef.current].filter((el): el is HTMLDivElement => el !== null);
      if (bleeds.length > 0) {
        tl.fromTo(bleeds,
          { opacity: 0, scale: 0.6 },
          { opacity: 0.55, scale: 1, duration: 2, stagger: 0.2 },
          0.5
        );
      }

      // Text content reveal
      if (titleRef.current) {
        tl.fromTo(titleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          1
        );
      }

      if (subtitleRef.current) {
        tl.fromTo(subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          1.15
        );
      }

      if (buttonsRef.current) {
        tl.fromTo(Array.from(buttonsRef.current.children),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
          1.3
        );
      }

      // 2. Ambient floating loop (infinite, runs after entrance)
      if (bleedBlueRef.current) {
        gsap.to(bleedBlueRef.current, {
          x: 80,
          y: 40,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }

      if (bleedPinkRef.current) {
        gsap.to(bleedPinkRef.current, {
          x: -60,
          y: -30,
          duration: 10,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }

      // 3. ScrollTrigger for parallax fade/slide of hero elements as we scroll down
      ScrollTrigger.create({
        trigger: "#hero-root",
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          // Subtly scale up and slowly slide up/down the image
          if (heroImageRef.current) {
            gsap.set(heroImageRef.current, { 
              y: p * 200, 
              scale: 1 + p * 0.04,
              opacity: 0.9 * (1 - p * 0.8)
            });
          }
          const heroContent = document.getElementById("hero-content-block");
          if (heroContent) {
            gsap.set(heroContent, { 
              opacity: Math.max(0, 1 - p * 1.8), 
              y: p * -100 
            });
          }
        }
      });

      // 4. ScrollTrigger for subsequent section headers & cards fade and slide in when scrolling down
      gsap.fromTo(".scroll-fade-in-card", 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: "#wellness-ecosystem",
            start: "top 78%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(".scroll-fade-in-step", 
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.18,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: "#journey-section",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(".scroll-fade-in-breathing", 
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: "#breathing-sanctuary",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Expandable Accordion GSAP activeId effect
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Width / Flex animation on activeId change (Power4 out for instant responsiveness & premium slow-down)
      PANELS.forEach((p) => {
        const el = panelRefs.current[p.id];
        if (!el) return;
        const isActive = p.id === activeId;
        gsap.to(el, {
          flexGrow: isActive ? 1 : 0,
          flexBasis: isActive ? '0%' : '70px',
          duration: 0.85,
          ease: 'power4.out',
          overwrite: 'auto',
        });
      });

      // 2. Info card crossfade + subtle slide
      PANELS.forEach((p) => {
        const card = infoCardRefs.current[p.id];
        if (!card) return;
        const isActive = p.id === activeId;
        gsap.to(card, {
          opacity: isActive ? 1 : 0,
          x: isActive ? 0 : -15,
          duration: isActive ? 0.7 : 0.25,
          delay: isActive ? 0.22 : 0,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      });

      // 3. Image subtle zoom & filters fade on activation
      PANELS.forEach((p) => {
        const el = panelRefs.current[p.id];
        if (!el) return;
        const img = el.querySelector('img');
        const isActive = p.id === activeId;
        if (img) {
          gsap.to(img, {
            scale: isActive ? 1 : 1.12,
            filter: isActive ? 'brightness(1) saturate(1)' : 'brightness(0.6) saturate(0.85)',
            duration: 0.85,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        }
      });

      // 4. Collapsed icon button animation
      PANELS.forEach((p) => {
        const el = panelRefs.current[p.id];
        if (!el) return;
        const btn = el.querySelector('.collapsed-icon-btn');
        const isActive = p.id === activeId;
        if (btn) {
          gsap.to(btn, {
            opacity: isActive ? 0 : 1,
            scale: isActive ? 0.75 : 1,
            y: isActive ? 12 : 0,
            duration: isActive ? 0.35 : 0.6,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeId]);

  // Expandable Accordion Entrance Mount Effect
  useEffect(() => {
    // Set initial scale to 1.15 for non-active images on mount
    PANELS.forEach((p) => {
      const el = panelRefs.current[p.id];
      if (!el) return;
      const img = el.querySelector('img');
      if (img && p.id !== activeId) {
        gsap.set(img, { scale: 1.15 });
      }
    });

    const ctx = gsap.context(() => {
      // 4. Entrance animation on mount
      gsap.from('.accordion-container', { 
        opacity: 0, 
        scale: 0.96, 
        duration: 1, 
        ease: 'power3.out' 
      });

      const panelElements = Object.values(panelRefs.current).filter((el): el is HTMLDivElement => el !== null);
      if (panelElements.length > 0) {
        gsap.from(panelElements, {
          y: 30, 
          opacity: 0, 
          duration: 0.8, 
          stagger: 0.08, 
          delay: 0.2, 
          ease: 'power3.out'
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#0a0e1a] overflow-x-hidden text-white selection:bg-white/10 selection:text-white">
      {/* SECTION 1: HERO CONTAINER */}
      <div id="hero-root" className="relative w-full h-screen overflow-hidden bg-[#0a0e1a]">
      {/* Background gradient base (z-0) */}
      <div id="bg-glow" className="absolute inset-0 bg-gradient-to-br from-[#1a2440] via-[#0f1729] to-[#0a0e1a] z-0" />

      {/* Chromatic bleed layers (z-5, behind portrait) */}
      <div 
        id="bleed-blue"
        ref={bleedBlueRef} 
        className="chromatic-bleed top-[10%] left-[-10%] w-[600px] h-[600px] rounded-full z-[5]" 
        style={{ background: 'radial-gradient(circle, #6FA8DC 0%, transparent 70%)' }}
      />
      <div 
        id="bleed-pink"
        ref={bleedPinkRef} 
        className="chromatic-bleed top-[35%] right-[15%] w-[500px] h-[500px] rounded-full z-[5]" 
        style={{ background: 'radial-gradient(circle, #E8B4C8 0%, transparent 70%)' }}
      />

      {/* Hero portrait video (z-10) - Scaled to full screen background with focus on the right */}
      <video 
        id="landscape-portrait"
        ref={heroImageRef} 
        src={HERO_VIDEO} 
        className="absolute inset-0 w-full h-full object-cover object-center md:object-right opacity-90 z-10" 
        playsInline
        autoPlay
        muted
        loop
      />

      {/* Vignette overlay (z-18) */}
      <div id="vignette" className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0a0e1a]/60 via-transparent to-transparent z-[18]" />

      {/* NAVBAR (z-30) */}
      <nav id="headline-navigation" className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-5 sm:px-8 py-5">
        {/* Logo */}
        <div className="flex items-center gap-2 text-white font-medium text-base select-none cursor-pointer hover:opacity-90 transition-opacity">
          <Infinity size={22} strokeWidth={1.5} className="text-white animate-pulse" />
          <span className="tracking-wide text-white">Equilibrium</span>
        </div>

        {/* Nav pill (center, desktop) */}
        <div className="hidden md:flex items-center gap-1 rounded-xl px-2 py-1.5 border border-white/10 bg-white/5 backdrop-blur-sm">
          {navLinks.map((link) => {
            const isActive = activeLink === link.label;
            if (link.dropdown) {
              return (
                <div 
                  key={link.label} 
                  className="relative"
                  onMouseEnter={() => setWellnessDropdownOpen(true)}
                  onMouseLeave={() => setWellnessDropdownOpen(false)}
                >
                  <button 
                    onClick={() => {
                      setActiveLink(link.label);
                      setWellnessDropdownOpen(!wellnessDropdownOpen);
                    }}
                    className={`flex items-center gap-0.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      isActive ? 'bg-white/15 text-white' : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown size={13} className={`mt-px transition-transform duration-300 ${wellnessDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {wellnessDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 rounded-xl p-2 border border-white/15 shadow-2xl z-50 animate-fade-in flex flex-col gap-0.5 bg-[#0e1628]/95 backdrop-blur-xl">
                      {link.items?.map((item) => (
                        <button
                          key={item}
                          onClick={() => {
                            setActiveLink(link.label);
                            setWellnessDropdownOpen(false);
                          }}
                          className="flex items-center justify-between w-full text-left px-3 py-2 rounded-lg text-xs text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                        >
                          <span>{item}</span>
                          <Sparkles size={10} className="opacity-40" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={link.label}
                onClick={() => {
                  setActiveLink(link.label);
                  setWellnessDropdownOpen(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isActive ? 'bg-white/15 text-white' : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* CTAs (right, desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <button className="text-white text-sm font-medium px-4 py-2.5 rounded-full hover:bg-white/10 transition-colors border border-white/15 cursor-pointer bg-white/5 backdrop-blur-sm">
            Log in
          </button>
          <button className="bg-white text-black text-sm font-medium px-5 py-2.5 rounded-full hover:bg-white/90 transition-all hover:scale-[1.03] active:scale-[0.98] transition-colors shadow-lg shadow-white/5 cursor-pointer flex items-center gap-1.5">
            <span>Begin Now</span>
            <ArrowRight size={14} className="mt-[1px]" />
          </button>
        </div>

        {/* Mobile toggle (md:hidden) */}
        <button 
          onClick={() => {
            setMenuOpen(!menuOpen);
            setWellnessDropdownOpen(false);
          }}
          className="md:hidden text-white p-2.5 rounded-lg border border-white/15 cursor-pointer flex items-center justify-center bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile menu (always in DOM, animated via GSAP) */}
      <div 
        ref={mobileMenuRef}
        style={{ display: 'none' }}
        className="absolute top-[72px] left-4 right-4 z-40 md:hidden rounded-2xl p-4 border border-white/15 shadow-2xl flex flex-col gap-1.5 bg-[#0c1324]/90"
      >
        {navLinks.map((link, idx) => {
          const isActive = activeLink === link.label;
          return (
            <div 
              key={link.label} 
              ref={(el) => { menuItemsRef.current[idx] = el; }}
              className="w-full mobile-menu-item"
            >
              <button
                onClick={() => {
                  setActiveLink(link.label);
                  if (!link.dropdown) {
                    setMenuOpen(false);
                  } else {
                    setWellnessDropdownOpen(!wellnessDropdownOpen);
                  }
                }}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm transition-all cursor-pointer ${
                  isActive ? 'bg-white/15 text-white font-medium' : 'text-white/80 hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-2">
                  {link.dropdown && <Heart size={14} className="text-[#E8B4C8]" />}
                  {!link.dropdown && link.label === 'Home' && <Activity size={14} className="text-[#6FA8DC]" />}
                  {link.label}
                </span>
                {link.dropdown && (
                  <ChevronDown 
                    size={14} 
                    className={`text-white/50 transition-transform duration-200 ${wellnessDropdownOpen ? 'rotate-180' : ''}`} 
                  />
                )}
              </button>

              {/* Mobile Dropdown Sub-Items */}
              {link.dropdown && wellnessDropdownOpen && (
                <div className="mt-1 ml-4 pl-3 border-l border-white/10 flex flex-col gap-1">
                  {link.items?.map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setActiveLink(link.label);
                        setMenuOpen(false);
                        setWellnessDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs text-white/60 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Bottom CTA row inside Mobile Menu */}
        <div 
          ref={(el) => { menuItemsRef.current[navLinks.length] = el; }}
          className="flex gap-3 mt-3 pt-4 border-t border-white/10 mobile-menu-item w-full"
        >
          <button 
            onClick={() => setMenuOpen(false)}
            className="flex-1 text-white text-center py-2.5 rounded-full font-medium text-sm border border-white/15 hover:bg-white/10 bg-white/5 transition-colors cursor-pointer"
          >
            Log in
          </button>
          <button 
            onClick={() => setMenuOpen(false)}
            className="flex-1 bg-white text-black text-center py-2.5 rounded-full font-medium text-sm hover:bg-white/90 transition-colors cursor-pointer"
          >
            Begin Now
          </button>
        </div>
      </div>

      {/* HERO CONTENT (bottom-left, z-25) */}
      <div 
        id="hero-content-block"
        className="absolute bottom-0 left-0 z-25 px-6 sm:px-12 pb-10 sm:pb-16 md:pb-20 max-w-2xl select-none"
      >
        <h1 
          ref={titleRef} 
          className="text-white text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.12] tracking-tight mb-4 drop-shadow-sm"
        >
          Live Better, <br className="hidden sm:inline" />Feel Whole Every Day
        </h1>
        <p 
          ref={subtitleRef} 
          className="text-white/60 text-sm sm:text-[15px] leading-relaxed mb-8 max-w-md"
        >
          Take charge of how you feel with a companion built for your journey—build routines, follow your growth, and unlock tailored insights for a steadier, more vibrant life each day.
        </p>
        
        {/* Buttons Row */}
        <div 
          ref={buttonsRef} 
          className="flex flex-wrap items-center gap-3.5"
        >
          <button className="bg-white text-black text-sm sm:text-base font-medium px-6 sm:px-8 py-3 rounded-full hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2">
            <span>Start Today</span>
            <Sparkles size={15} className="text-black/75 animate-bounce" />
          </button>
          <button className="liquid-glass text-white text-sm sm:text-base font-medium px-6 sm:px-8 py-3 rounded-full hover:bg-white/10 transition-colors border border-white/5 cursor-pointer">
            Discover How
          </button>
        </div>
      </div>
    </div>

    {/* SECTION 2: WELLNESS ECOSYSTEM */}
    <section 
      id="wellness-ecosystem" 
      className="relative py-28 px-6 sm:px-8 md:px-12 bg-[#0a0e1a] overflow-hidden border-t border-white/5"
    >
      {/* Glow backdrop decor */}
      <div className="absolute top-[20%] left-[80%] w-[400px] h-[400px] rounded-full bg-[#6FA8DC]/10 filter blur-[80px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] font-mono tracking-widest text-[#6FA8DC] mb-4 uppercase">
            <Activity size={12} className="text-[#6FA8DC]" />
            <span>Wellness Offerings</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-medium tracking-tight mb-5 text-white">
            Cultivate Inner Stability
          </h2>
          <p className="text-white/50 text-base max-w-xl mx-auto">
            Unlock a set of integrated modalities designed to harmonize your sensory baseline and anchor daily resilience. Click any pathway to expand details.
          </p>
        </div>

        {/* 5-panel Expandable Accordion Container for tablet and desktop */}
        <div className="w-full max-w-5xl aspect-[2/1] relative mx-auto my-12 hidden md:block">
          <div className="accordion-container w-full h-full flex gap-3">
            {PANELS.map((p) => {
              const isActive = activeId === p.id;
              const isDefaultActive = p.id === 'mindfulness';
              return (
                <div
                  key={p.id}
                  ref={(el) => { panelRefs.current[p.id] = el; }}
                  onClick={() => setActiveId(p.id)}
                  className={`relative rounded-[22px] overflow-hidden cursor-pointer h-full accordion-panel-transition ${
                    isActive ? 'cursor-default shadow-2xl shadow-black/50' : 'hover:brightness-110 hover:scale-[1.015] shadow-md shadow-black/20'
                  } ${
                    isDefaultActive ? 'flex-grow basis-0' : 'flex-none basis-[70px]'
                  }`}
                  style={{ minWidth: '70px' }}
                >
                  {/* Image — always full-cover inside its current width */}
                  <img
                    src={p.image}
                    alt={p.title}
                    className="absolute inset-0 w-full h-full object-cover origin-center z-0"
                    style={{
                      filter: isDefaultActive ? 'none' : 'brightness(0.6) saturate(0.85)',
                      transform: isDefaultActive ? 'scale(1)' : 'scale(1.12)'
                    }}
                  />

                  {/* Subtle dark gradient at bottom for legibility */}
                  <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/50 to-transparent pointer-events-none z-10" />

                  {/* Info card — only visible when active, forced to absolute bottom with absolute position override */}
                  <div
                    ref={(el) => { infoCardRefs.current[p.id] = el; }}
                    className={`liquid-glass rounded-b-[22px] p-6 flex flex-col gap-3 border-t border-white/10 text-left pointer-events-none z-20 ${
                      isDefaultActive ? 'opacity-100' : 'opacity-0 translate-x-[-15px]'
                    }`}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      pointerEvents: isActive ? 'auto' : 'none'
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/15 border border-white/10 flex items-center justify-center text-white shrink-0">
                        <p.icon size={20} className="text-white" strokeWidth={1.8} />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-white text-base font-semibold tracking-tight">{p.title}</span>
                        <span className="text-[#6FA8DC] text-xs font-medium uppercase tracking-wider flex items-center gap-1">
                          <ExternalLink size={11} /> {p.subtitle}
                        </span>
                      </div>
                    </div>
                    <div className="text-white/95 text-sm md:text-[14px] lg:text-base leading-relaxed select-none">
                      {p.desc}
                    </div>
                  </div>

                  {/* Collapsed-state icon button at bottom — only visible when NOT active */}
                  <div
                    className={`absolute bottom-4 left-1/2 -translate-x-1/2 liquid-glass rounded-full w-12 h-12 flex items-center justify-center border border-white/15 z-20 collapsed-icon-btn ${
                      isDefaultActive ? 'opacity-0 scale-75 translate-y-3' : 'opacity-100 scale-100'
                    }`}
                    style={{ pointerEvents: isActive ? 'none' : 'auto' }}
                  >
                    <p.icon size={18} className="text-white" strokeWidth={1.8} />
                  </div>

                  {/* Outer liquid-glass stroke effect border on top */}
                  <div className="absolute inset-0 rounded-[22px] liquid-glass border-none pointer-events-none z-30 bg-transparent" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Fallback mobile stack (screens < md:768px) */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {PANELS.map((p) => {
            const isActive = activeId === p.id;
            return (
              <div 
                key={p.id}
                onClick={() => setActiveId(p.id)}
                className={`relative rounded-2xl overflow-hidden cursor-pointer min-h-[160px] border transition-all duration-300 ${isActive ? 'border-white/30 bg-white/10 scale-[1.01]' : 'border-white/10 bg-white/[0.02]'}`}
              >
                <img 
                  src={p.image} 
                  alt={p.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
                  style={{ filter: isActive ? 'brightness(0.6)' : 'brightness(0.4) saturate(0.8)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 flex flex-col justify-end">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#6FA8DC]">{p.subtitle}</span>
                        <h3 className="text-xl font-medium text-white tracking-tight">{p.title}</h3>
                      </div>
                      <div className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center border border-white/10 shrink-0">
                        <p.icon size={16} className="text-white" />
                      </div>
                    </div>
                    {isActive && (
                      <p className="text-white/95 text-xs font-sans mt-1 leading-relaxed border-t border-white/15 pt-2 animate-fade-in text-left">
                        {p.desc}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* SECTION 3: PROGRESSIVE ALIGNMENT JOURNEY */}
    <section 
      id="journey-section" 
      className="py-28 px-6 sm:px-8 md:px-12 bg-[#0a0e1a] border-t border-white/5 relative overflow-hidden"
    >
      {/* Glow background */}
      <div className="absolute top-[50%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/5 filter blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-20 text-center scroll-fade-in-step">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] font-mono tracking-widest text-[#E8B4C8] mb-4 uppercase">
            <Award size={12} className="text-[#E8B4C8]" />
            <span>THE BLUEPRINT FOR EQUILIBRIUM</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-medium tracking-tight mb-5 text-white">
            Your Daily Synchronization Flow
          </h2>
          <p className="text-white/50 text-base max-w-xl mx-auto">
            Follow our evidence-grounded sequence designed to progressively tune sensory inputs and re-balance your daily metabolic baseline.
          </p>
        </div>

        <div className="relative border-l border-white/10 pl-6 ml-3 sm:pl-10 sm:ml-6 flex flex-col gap-14">
          {/* Step 1 */}
          <div className="relative scroll-fade-in-step journey-step">
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#0a0e1a] border border-white/20 flex items-center justify-center text-xs font-mono text-[#6FA8DC]">
              01
            </div>
            <h4 className="text-xl font-medium text-white mb-2">Sensory Deceleration</h4>
            <p className="text-white/40 text-sm leading-relaxed max-w-2xl">
              Start your morning with low ambient light level exposure for 15 minutes. This aligns core light receptors without visual spikes, letting cortisol taper naturally.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative scroll-fade-in-step journey-step">
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#0a0e1a] border border-white/20 flex items-center justify-center text-xs font-mono text-[#E8B4C8]">
              02
            </div>
            <h4 className="text-xl font-medium text-white mb-2">Paced Diaphragmatic Priming</h4>
            <p className="text-white/40 text-sm leading-relaxed max-w-2xl">
              Activate the vagus nerve with a simple 4:4:4 breathing sequence (inhale, sus, exhale). This lowers resting hearth rate variation in less than 3 minutes.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative scroll-fade-in-step journey-step">
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#0a0e1a] border border-white/20 flex items-center justify-center text-xs font-mono text-violet-400">
              03
            </div>
            <h4 className="text-xl font-medium text-white mb-2">Sub-Cognitive Offloading</h4>
            <p className="text-white/40 text-sm leading-relaxed max-w-2xl">
              Journal active worries into static fields before screen sleep. This converts abstract anxiety blocks into physically bound statements, boosting deep sleep latency.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* SECTION 4: CALM CATALYST BREATHING SANCTUARY */}
    <section 
      id="breathing-sanctuary" 
      className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#0e1528] to-[#0a0e1a] text-white flex flex-col items-center relative overflow-hidden border-t border-white/5"
    >
      {/* Absolute decorative gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full filter blur-[100px] opacity-15 pointer-events-none bg-indigo-500 z-0" />

      <div className="max-w-4xl w-full text-center relative z-10 scroll-fade-in-breathing">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-white/50 tracking-wider mb-6">
          <Activity size={12} className="text-emerald-400 animate-pulse" />
          <span>TACTILE BIO-INTERACTION</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent mb-4">
          Calm Catalyst Sanctuary
        </h2>
        <p className="text-white/50 text-sm sm:text-base max-w-xl mx-auto mb-12">
          Calm your overactive nervous system in real-time. Experience a simple, guided 1-minute diaphragmatic pacing cycle right here in your browser.
        </p>

        {/* Elegant Active Breathing Core */}
        <div className="flex flex-col items-center justify-center p-8 rounded-3xl border border-white/5 bg-[#0f172a]/40 backdrop-blur-xl max-w-lg mx-auto shadow-2xl">
          <div className="relative w-64 h-64 flex items-center justify-center mb-8">
            
            {/* Animated Background Ring */}
            <div 
              className={`absolute rounded-full border border-white/10 transition-all duration-[4000ms] ease-in-out ${
                breathingPhase === 'Inhale' ? 'w-56 h-56 scale-110 opacity-40 bg-white/5' :
                breathingPhase === 'Hold' ? 'w-[240px] h-[240px] scale-100 opacity-60 bg-white/10 animate-pulse' :
                breathingPhase === 'Exhale' ? 'w-40 h-40 scale-95 opacity-25 bg-white/2' :
                'w-48 h-48 opacity-30 bg-white/5'
              }`}
            />

            {/* Core Pulsating Orb */}
            <div 
              className={`rounded-full flex flex-col items-center justify-center text-center transition-all duration-[4000ms] ease-in-out shadow-2xl cursor-pointer ${
                breathingPhase === 'Inhale' ? 'w-44 h-44 bg-blue-500/20 shadow-blue-500/10 border-2 border-blue-400/40 text-blue-100' :
                breathingPhase === 'Hold' ? 'w-44 h-44 bg-indigo-500/30 shadow-indigo-500/20 border-2 border-indigo-300/60 text-indigo-50' :
                breathingPhase === 'Exhale' ? 'w-32 h-32 bg-pink-500/15 shadow-pink-500/15 border-2 border-pink-400/40 text-pink-100' :
                'w-36 h-36 bg-white/5 shadow-white/5 border border-white/10 text-white/80'
              }`}
              onClick={() => setIsBreathing(!isBreathing)}
            >
              {/* Internal state indicator */}
              <span className="text-[10px] sm:text-xs font-mono tracking-widest text-white/40 uppercase mb-1">
                {isBreathing ? 'Pacing Active' : 'Resting State'}
              </span>
              <span className="text-lg sm:text-xl font-medium tracking-tight">
                {isBreathing ? breathingPhase : 'Begin Cycle'}
              </span>
              {isBreathing && (
                <span className="text-xs font-mono text-white/50 mt-1">
                  Cycle #{breathCount + 1}
                </span>
              )}
            </div>
          </div>

          {/* Control Buttons & Progress Guides */}
          <div className="w-full flex flex-col gap-4 items-center">
            {!isBreathing ? (
              <button 
                onClick={() => {
                  setIsBreathing(true);
                  setBreathCount(0);
                }} 
                className="w-full max-w-xs bg-white text-black font-semibold text-sm py-3 px-6 rounded-full hover:bg-white/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Sparkles size={14} className="text-black" />
                <span>Engage Breathing Cycle</span>
              </button>
            ) : (
              <div className="w-full max-w-xs flex flex-col items-center gap-3">
                {/* Action Text */}
                <p className="text-xs font-mono text-white/50 text-center animate-pulse h-8">
                  {breathingPhase === 'Inhale' && 'Slowly breathe in deep... fill your lungs.'}
                  {breathingPhase === 'Hold' && 'Hold steady, feel the air suspend... keep calm.'}
                  {breathingPhase === 'Exhale' && 'Sigh the air out steadily... discharge stress.'}
                </p>
                <button 
                  onClick={() => setIsBreathing(false)}
                  className="mt-2 text-xs text-white/40 hover:text-white/80 border border-white/10 px-4 py-1.5 rounded-full transition-colors cursor-pointer hover:bg-white/5"
                >
                  Pause Sanctuary
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>

    {/* PREMIUM LARGE WORDMARK FOOTER */}
    <Footer />
  </div>
);
}
