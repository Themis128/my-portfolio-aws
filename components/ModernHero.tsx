"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Globe, Linkedin, Sparkles, Zap } from "lucide-react";
import React, { useCallback, useEffect, useRef } from "react";

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

const ParticlesBackground = () => {
  const initParticles = useCallback((isDark: boolean) => {
    const oldCanvas = document.querySelector("#particles-js canvas");
    if (oldCanvas) oldCanvas.remove();

    // @ts-expect-error particles.js library types not available
    if (window.pJSDom?.length > 0) {
      // @ts-expect-error particles.js library types not available
      window.pJSDom.forEach((p) => p.pJS.fn.vendors.destroypJS());
      // @ts-expect-error particles.js library types not available
      window.pJSDom = [];
    }

    const colors = isDark
      ? {
          particles: "#00f5ff",
          lines: "#00d9ff",
          accent: "#0096c7",
        }
      : {
          particles: "#0277bd",
          lines: "#0288d1",
          accent: "#039be5",
        };

    // @ts-expect-error particles.js library types not available
    window.particlesJS("particles-js", {
      particles: {
        number: { value: 120, density: { enable: true, value_area: 800 } },
        color: { value: colors.particles },
        shape: { type: "circle", stroke: { width: 0.5, color: colors.accent } },
        opacity: {
          value: 0.7,
          random: true,
          anim: { enable: true, speed: 1, opacity_min: 0.3 },
        },
        size: {
          value: 3,
          random: true,
          anim: { enable: true, speed: 2, size_min: 1 },
        },
        line_linked: {
          enable: true,
          distance: 160,
          color: colors.lines,
          opacity: 0.4,
          width: 1.2,
        },
        move: { enable: true, speed: 2, random: true, out_mode: "bounce" },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          grab: { distance: 220, line_linked: { opacity: 0.8 } },
          push: { particles_nb: 4 },
          repulse: { distance: 180, duration: 0.4 },
        },
      },
      retina_detect: true,
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const html = document.documentElement;
      const detectDark = () =>
        html.classList.contains("dark") ||
        html.getAttribute("data-theme") === "dark";

      initParticles(detectDark());

      const observer = new MutationObserver(() =>
        initParticles(detectDark())
      );
      observer.observe(html, {
        attributes: true,
        attributeFilter: ["class", "data-theme"],
      });
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [initParticles]);

  return (
    <div
      id="particles-js"
      className="w-full h-full absolute top-0 left-0 transition-colors duration-500 bg-gradient-to-tr from-[#e3f2fd] via-[#90caf9] to-[#64b5f6] dark:from-[#000814] dark:via-[#003566] dark:to-[#0077b6]"
    />
  );
};

interface AnimationConfig {
  minDistance?: number;
  maxDistance?: number;
  duration?: number;
  easing?: string;
  shouldRandomizeInitialPosition?: boolean;
}

interface FloatingElementsProps {
  children: React.ReactNode;
  className?: string;
  elementClassName?: string;
  gridClassName?: string;
  animationConfig?: AnimationConfig;
}

const defaultAnimationConfig: AnimationConfig = {
  minDistance: 0,
  maxDistance: 50,
  duration: 3000,
  easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  shouldRandomizeInitialPosition: true,
};

const FloatingElements = ({
  children,
  className,
  elementClassName,
  gridClassName,
  animationConfig = defaultAnimationConfig,
}: FloatingElementsProps) => {
  const animationFrameIds = useRef<number[]>([]);
  const elements = useRef<HTMLElement[]>([]);
  const startTimes = useRef<number[]>([]);
  const currentPositions = useRef<{ x: number; y: number }[]>([]);
  const targetPositions = useRef<{ x: number; y: number }[]>([]);

  const config = { ...defaultAnimationConfig, ...animationConfig };

  const animateRef = useRef<((timestamp: number) => void) | null>(null);

  const generateRandomPosition = useCallback(() => {
    const distance =
      config.minDistance! +
      Math.random() * (config.maxDistance! - config.minDistance!);
    const angle = Math.random() * Math.PI * 2;
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    };
  }, [config.maxDistance, config.minDistance]);

  useEffect(() => {
    animateRef.current = (timestamp: number) => {
      elements.current.forEach((element, index) => {
        if (!startTimes.current[index]) {
          startTimes.current[index] = timestamp;
          currentPositions.current[index] = { x: 0, y: 0 };
          targetPositions.current[index] = generateRandomPosition();
        }

        const elapsed = timestamp - startTimes.current[index];
        const progress = Math.min(elapsed / config.duration!, 1);

        if (progress === 1) {
          currentPositions.current[index] = targetPositions.current[index];
          targetPositions.current[index] = generateRandomPosition();
          startTimes.current[index] = timestamp;
          return;
        }

        const current = currentPositions.current[index];
        const target = targetPositions.current[index];
        const x = current.x + (target.x - current.x) * progress;
        const y = current.y + (target.y - current.y) * progress;

        element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });

      const frameId = requestAnimationFrame(animateRef.current!);
      animationFrameIds.current.push(frameId);
    };
  }, [config.duration, generateRandomPosition]);

  useEffect(() => {
    const elementsArray = Array.from(
      document.querySelectorAll(".floating-element")
    ) as HTMLElement[];

    elements.current = elementsArray;
    currentPositions.current = elementsArray.map(() => ({ x: 0, y: 0 }));
    targetPositions.current = elementsArray.map(() => generateRandomPosition());

    if (config.shouldRandomizeInitialPosition) {
      elementsArray.forEach((element, index) => {
        const initialPosition = generateRandomPosition();
        currentPositions.current[index] = initialPosition;
        element.style.transform = `translate3d(${initialPosition.x}px, ${initialPosition.y}px, 0)`;
      });
    }

    if (animateRef.current) {
      animationFrameIds.current.push(requestAnimationFrame(animateRef.current));
    }

    return () => {
      animationFrameIds.current.forEach(cancelAnimationFrame);
      animationFrameIds.current = [];
    };
  }, [config.shouldRandomizeInitialPosition, generateRandomPosition]);

  return (
    <div
      className={cn(
        "flex w-full max-w-4xl flex-col items-center justify-center space-y-16 overflow-hidden",
        className
      )}
    >
      <div
        className={cn(
          "mx-auto grid w-full grid-cols-2 place-items-center gap-6 md:grid-cols-3 lg:grid-cols-4",
          gridClassName
        )}
      >
        {Array.isArray(children) ?
          children.map((child, index) => (
            <div
              key={index}
              className={cn(
                "floating-element transition-transform",
                elementClassName
              )}
              style={{ transitionTimingFunction: config.easing }}
            >
              {child}
            </div>
          ))
        : <div
            className={cn(
              "floating-element transition-transform",
              elementClassName
            )}
            style={{ transitionTimingFunction: config.easing }}
          >
            {children}
          </div>
        }
      </div>
    </div>
  );
};

const FlipText = ({ children }: { children: string }) => {
  return (
    <div
      className="group relative block overflow-hidden whitespace-nowrap text-5xl md:text-7xl lg:text-8xl font-black uppercase text-primary"
      style={{
        lineHeight: 0.75,
      }}
    >
      <div className="flex">
        {children.split("").map((letter, i) => (
          <span
            key={i}
            className="inline-block transition-transform duration-300 ease-in-out group-hover:-translate-y-[110%]"
            style={{
              transitionDelay: `${i * 25}ms`,
            }}
          >
            {letter}
          </span>
        ))}
      </div>
      <div className="absolute inset-0 flex">
        {children.split("").map((letter, i) => (
          <span
            key={i}
            className="inline-block translate-y-[110%] transition-transform duration-300 ease-in-out group-hover:translate-y-0"
            style={{
              transitionDelay: `${i * 25}ms`,
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

interface PersonalData {
  name: string;
  title: string;
  bio: string;
  email: string;
  location: string;
  phone?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  skills: string[];
}

interface ModernHeroProps {
  data: PersonalData;
}

const ModernHeroSection = ({ data }: ModernHeroProps) => {
  const features = [
    { icon: Sparkles, label: "Network Engineering" },
    { icon: Zap, label: "Cloud Solutions" },
    { icon: Sparkles, label: "Cisco Systems" },
    { icon: Zap, label: "Azure AD" },
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <ParticlesBackground />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20">
        <div className="mx-auto max-w-6xl w-full">
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 backdrop-blur-sm px-4 py-2 text-sm font-medium text-primary shadow-lg">
              <Sparkles className="h-4 w-4" />
              <span>Systems & Network Engineer</span>
            </div>
          </div>

          <div className="text-center mb-6">
            <FlipText>{data.name.split(' ')[0]}</FlipText>
          </div>

          <h2 className="text-center text-2xl md:text-4xl font-bold text-foreground mb-6">
            {data.title}
          </h2>

          <p className="text-center text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            {data.bio}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              size="lg"
              className="w-full sm:w-auto group relative overflow-hidden"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-primary/20 bg-background/80 backdrop-blur-sm hover:bg-primary/10"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get In Touch
            </Button>
          </div>

          <FloatingElements
            className="mt-16"
            gridClassName="gap-8"
            elementClassName="transition-all duration-300"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-background/80 backdrop-blur-sm border border-primary/20 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <div className="p-3 rounded-full bg-primary/10">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {feature.label}
                  </span>
                </div>
              );
            })}
          </FloatingElements>

          <div className="mt-20 text-center">
            <p className="text-muted-foreground mb-6">Connect with me</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              {data.github && (
                <a
                  href={data.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg bg-background/60 backdrop-blur-sm border border-border text-foreground font-semibold hover:opacity-100 transition-opacity flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              )}
              {data.linkedin && (
                <a
                  href={data.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg bg-background/60 backdrop-blur-sm border border-border text-foreground font-semibold hover:opacity-100 transition-opacity flex items-center gap-2"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              )}
              {data.website && (
                <a
                  href={data.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg bg-background/60 backdrop-blur-sm border border-border text-foreground font-semibold hover:opacity-100 transition-opacity flex items-center gap-2"
                >
                  <Globe className="h-4 w-4" />
                  Portfolio
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background pointer-events-none" />
    </section>
  );
};

export default ModernHeroSection;