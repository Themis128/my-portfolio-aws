"use client";
import { useEffect, useState } from 'react';
import { PersonalData } from '../lib/personal-data';
import { Button } from './button';
import CVDownload from './CVDownload';
import { NumberTicker } from './ui/number-ticker';
import { TextAnimate } from './ui/text-animate';
import { WordRotate } from './ui/word-rotate';

interface HeroProps {
  data: PersonalData;
}

export default function Hero({ data }: HeroProps) {
  const [currentRole, setCurrentRole] = useState(0);
  const roles = [
    "Full-Stack Developer",
    "Cloud Solutions Expert",
    "React Specialist",
    "AWS Architect"
  ];

  const greetingText = `Hi, I'm ${data.name.split(' ')[0]}`;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-2xl animate-pulse animation-delay-4000"></div>

        {/* Tech circuit pattern overlay */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect width="20" height="20" fill="none"/>
                <circle cx="10" cy="10" r="1" fill="currentColor" className="text-blue-600"/>
                <line x1="10" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="0.5" className="text-blue-400"/>
                <line x1="10" y1="10" x2="10" y2="0" stroke="currentColor" strokeWidth="0.5" className="text-blue-400"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)"/>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          <div className="mb-12">
            {/* Profile image placeholder with tech glow */}
            <div className="relative">
              <div className="w-40 h-40 mx-auto mb-10 rounded-full bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 flex items-center justify-center text-white text-5xl font-bold shadow-2xl shadow-blue-500/20 relative overflow-hidden">
                {/* Animated tech rings */}
                <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping"></div>
                <div className="absolute inset-2 rounded-full border border-white/30 animate-pulse"></div>
                <div className="absolute inset-4 rounded-full border border-white/40"></div>
                <span className="relative z-10">{data.name.split(' ').map(n => n[0]).join('')}</span>
              </div>

              {/* Floating tech elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full animate-bounce opacity-75">
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">JS</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full animate-bounce opacity-75 animation-delay-1000">
                <div className="w-full h-full bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">⚛</span>
                </div>
              </div>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-8 leading-tight tracking-tight">
              <TextAnimate
                animation="blurIn"
                by="word"
                className="neon-text font-mono"
                startOnView={true}
              >
                {greetingText}
              </TextAnimate>
              <span className="block mx-auto neon-underline" aria-hidden="true" />
            </h1>

            <div className="text-2xl md:text-4xl text-gray-600 dark:text-gray-300 mb-8 h-16 flex items-center justify-center">
              <WordRotate
                words={["Full-Stack Developer", "Cloud Solutions Expert", "React Specialist", "AWS Architect"]}
                duration={3000}
                className="font-medium inline-block"
              />
              <span className="animate-pulse text-blue-600 dark:text-blue-400">|</span>
            </div>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-16 leading-relaxed">
              {data.bio}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-5 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-xl"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-10 py-5 text-lg font-semibold border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 rounded-xl"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get In Touch
            </Button>
            <div className="flex justify-center">
              <CVDownload data={data} />
            </div>
          </div>

          <div className="flex justify-center space-x-6 mb-16">
            <a
              href="#"
              className="group p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 border border-white/20 dark:border-gray-700"
            >
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a
              href="#"
              className="group p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 border border-white/20 dark:border-gray-700"
            >
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="#"
              className="group p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 border border-white/20 dark:border-gray-700"
            >
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>

          {/* Stats section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div className="text-center group">
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <NumberTicker value={5} className="group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                +
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Years Experience</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <NumberTicker value={50} className="group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                +
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Projects Completed</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <NumberTicker value={20} className="group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                +
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Happy Clients</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <NumberTicker value={24} className="group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                /
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">7 Support</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 border border-white/20 dark:border-gray-700"
        >
          <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  );
}
