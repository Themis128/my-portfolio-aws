import About from '../components/About';
import Achievements from '../components/Achievements';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';
import Experience from '../components/Experience';
import Hero from '../components/HeroEnhanced';
import Languages from '../components/Languages';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import { getPersonalDataServer } from '../lib/personal-data';
import AIProjectGenerator from '../components/AIProjectGenerator';
import AIChat from '../components/AIChat';

export default function Home() {
  const personalData = getPersonalDataServer();

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Staging environment - this comment shows in staging branch */}
      <div id="hero-anchor"></div>
      <Hero data={personalData} />
      <About data={personalData} />
      <Skills data={personalData} />
      <Experience data={personalData} />
      <Certifications data={personalData} />
      <Languages data={personalData} />
      <Achievements data={personalData} />
      <Projects data={personalData} />
      <AIProjectGenerator />
      <AIChat />
      <Contact data={personalData} />
    </div>
  );
}
