import AIBotWrapper from '../components/AIBotWrapper';
import About from '../components/About';
import Achievements from '../components/Achievements';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';
import Experience from '../components/Experience';
import Languages from '../components/Languages';
import ModernHero from '../components/ModernHero';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import { Suspense } from 'react';
import { getPersonalDataServer } from '../lib/personal-data';

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
      <AIBotWrapper />
      <Suspense fallback={
        <section id="contact" className="py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
            <p>Loading contact form...</p>
          </div>
        </section>
      }>
        <Contact data={personalData} />
      </Suspense>
    </div>
  );
}
