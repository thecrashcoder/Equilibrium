import { useRef, useEffect } from 'react';
import { Infinity as InfinityIcon, Facebook, Linkedin, Instagram, Twitter } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LinkItem {
  label: string;
  icon?: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
}

interface LinkColumn {
  heading: string;
  links: (string | LinkItem)[];
}

const linkColumns: LinkColumn[] = [
  {
    heading: 'Quick link',
    links: ['Home', 'Wellness', 'Routine', 'Our Team'],
  },
  {
    heading: 'Company',
    links: ['About', 'Method', 'Journal', 'Careers'],
  },
  {
    heading: 'Resources',
    links: ['Guides', 'Library', 'Support', 'FAQ'],
  },
  {
    heading: 'Social',
    links: [
      { label: 'Instagram', icon: Instagram },
      { label: 'Twitter', icon: Twitter },
      { label: 'LinkedIn', icon: Linkedin },
      { label: 'Facebook', icon: Facebook },
    ],
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const colsRef = useRef<(HTMLDivElement | null)[]>([]);
  const brandBlockRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  const handleIconMouseEnter = () => {
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        rotation: '+=360',
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Brand block fade + slide up on scroll into view
      if (brandBlockRef.current) {
        gsap.from(brandBlockRef.current, {
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 30,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
        });
      }

      // 2. Link columns stagger in
      const validCols = colsRef.current.filter(Boolean);
      if (validCols.length > 0) {
        gsap.from(validCols, {
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          delay: 0.15,
          ease: 'power3.out',
        });
      }

      // 3. Giant wordmark — rises from below as the footer scrolls into view, scrubbed
      if (wordmarkRef.current) {
        gsap.from(wordmarkRef.current, {
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            end: 'bottom bottom',
            scrub: 1,
          },
          y: 100,
          opacity: 0,
          ease: 'none',
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="footer-shell">
      <div className="footer-card">
        {/* TOP GRID — brand block + 4 link columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-8 mb-12">
          {/* Brand block (spans 2 cols on desktop) */}
          <div ref={brandBlockRef} className="md:col-span-2 max-w-xs text-left">
            <div 
              className="flex items-center gap-2 mb-4 group cursor-pointer" 
              onMouseEnter={handleIconMouseEnter}
            >
              <div ref={iconRef} className="inline-flex text-white">
                <InfinityIcon size={26} strokeWidth={1.5} />
              </div>
              <span className="text-white font-medium text-xl group-hover:text-[#6FA8DC] transition-colors duration-300">
                Equilibrium
              </span>
            </div>
            <p className="text-white/55 text-sm leading-relaxed">
              A wellness companion built for the rhythm of your life — build routines,
              follow your growth, and unlock tailored insights for a steadier, more
              vibrant you.
            </p>
          </div>

          {/* 4 link columns */}
          {linkColumns.map((col, i) => (
            <div
              key={col.heading}
              ref={(el) => {
                colsRef.current[i] = el;
              }}
              className="flex flex-col text-left"
            >
              <h4 className="text-white text-sm font-medium mb-5">{col.heading}</h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => {
                  const isObj = typeof link === 'object';
                  const label = isObj ? (link as LinkItem).label : (link as string);
                  const Icon = isObj ? (link as LinkItem).icon : null;
                  return (
                    <li key={label}>
                      <a
                        href="#"
                        className="text-white/55 hover:text-white text-sm transition-colors flex items-center gap-2"
                      >
                        {Icon && <Icon size={13} strokeWidth={1.8} />}
                        {label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* DIVIDER */}
        <div className="h-px w-full bg-white/10 mb-6" />

        {/* META ROW */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2 pb-2 text-left">
          <p className="text-white/45 text-xs">
            ©2026 Equilibrium. All rights reserved.
          </p>
          <p className="text-white/45 text-xs">
            Crafted with care — Designed by Uchitha Dilshan
          </p>
        </div>

        {/* GIANT WORDMARK — bleeds off the bottom edge of the card */}
        <div ref={wordmarkRef} className="giant-wordmark">
          EQUILIBRIUM
        </div>
      </div>
    </footer>
  );
}
