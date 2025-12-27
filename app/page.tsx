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

export default function Home() {
  const personalData = getPersonalDataServer();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Hero data={personalData} />
      <About data={personalData} />
      <Skills data={personalData} />
      <Experience data={personalData} />
      <Certifications data={personalData} />
      <Languages data={personalData} />
      <Achievements data={personalData} />
      <Projects data={personalData} />
      <Contact data={personalData} />
    </div>
  );
}
