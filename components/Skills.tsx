"use client";
import { PersonalData } from '../lib/personal-data';
import IconImage from './IconImage';

interface SkillsProps {
  data: PersonalData;
}

function getSkillIcon(skill: string) {
  const iconClass = "w-10 h-10 text-white";
  
  switch (skill.toLowerCase()) {
    case 'react':
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>;
    case 'next.js':
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9"></path></svg>;
    case 'typescript':
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>;
    case 'node.js':
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path></svg>;
    case 'aws':
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>;
    case 'python':
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4.354a4 4 0 014.93 5.742M12 12l-3-3m0 0l-3 3m3-3v12"></path></svg>;
    case 'docker':
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>;
    case 'kubernetes':
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"></path></svg>;
    case 'graphql':
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0h6a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm0 0h6m-6 0v-6a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2z"></path></svg>;
    case 'rest apis':
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>;
    case 'mongodb':
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"></path></svg>;
    case 'postgresql':
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"></path></svg>;
    case 'terraform':
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;
    case 'ci/cd':
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>;
    case 'microservices':
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"></path></svg>;
    case 'serverless':
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>;
    case 'cross-platform development':
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>;
    case 'mcp protocol':
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>;
    case 'wsl integration':
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>;
    case 'infrastructure as code':
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;
    case 'devops':
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>;
    default:
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>;
  }
}

export default function Skills({ data }: SkillsProps) {
  return (
    <section id="skills" className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Skills & Technologies
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Cutting-edge technologies and frameworks I use to build exceptional digital solutions
            </p>
          </div>

          <div className="badge-cloud flex flex-wrap justify-center gap-4">
            {data.skills.map((skill) => {
              const slug = skill.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              const iconPath = `/icons/${slug}.svg`;

              return (
                <div
                  key={skill}
                  className="skill-badge inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/60 border border-white/10 dark:border-gray-700 shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
                >
                  {/* try multiple icon candidate filenames with a graceful fallback */}
                  <IconImage slug={slug} alt={`${skill} icon`} className="w-6 h-6" />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{skill}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full px-8 py-4 border border-white/20 dark:border-gray-700 shadow-lg">
              <span className="text-gray-600 dark:text-gray-300 font-medium">Always learning and exploring new technologies</span>
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
