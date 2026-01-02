import ModernHero from '../components/ModernHero';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Certifications from '../components/Certifications';
import Languages from '../components/Languages';
import Achievements from '../components/Achievements';
import Projects from '../components/Projects';
import { lazy, Suspense } from 'react';
import { getPersonalDataServer } from '../lib/personal-data';

// Lazy load heavy components for better performance
const AIBotWrapper = lazy(() => import('../components/AIBotWrapper'));
const ContactSection = lazy(() => import('../components/ContactSection'));

export default function Home() {
  const personalData = getPersonalDataServer();

  return (
    <div className="bg-white dark:bg-gray-900">
      <div id="hero-anchor"></div>
      <ModernHero data={personalData} />
      <About data={personalData} />
      <Skills data={personalData} />
      <Experience data={personalData} />
      <Certifications data={personalData} />
      <Languages data={personalData} />
      <Achievements data={personalData} />
      <Projects data={personalData} />
      <Suspense fallback={<div className="py-24 text-center">Loading AI features...</div>}>
        <AIBotWrapper />
      </Suspense>
      <Suspense fallback={<div className="py-24 text-center">Loading contact form...</div>}>
        <ContactSection data={personalData} />
      </Suspense>
    </div>
  );
}
