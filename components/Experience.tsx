"use client";
import { PersonalData } from '../lib/personal-data';

interface ExperienceProps {
  data: PersonalData;
}

export default function Experience({ data }: ExperienceProps) {
  return (
    <section id="experience" className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Professional Experience
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Journey through my career and the impactful projects I&apos;ve contributed to
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-400"></div>
            
            <div className="space-y-12">
              {data.experience.map((exp, index) => (
                <div
                  key={exp.id}
                  className={`relative ${index % 2 === 0 ? 'md:ml-24' : 'md:mr-24 md:ml-auto'}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-10 top-2 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg shadow-blue-500/30"></div>
                  
                  <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-white/20 dark:border-gray-700">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {exp.title}
                        </h3>
                        <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-2">
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-gray-600 dark:text-gray-300 font-medium bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full inline-flex items-center">
                        <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {exp.period}
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4 text-lg">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full px-8 py-4 border border-white/20 dark:border-gray-700 shadow-lg">
              <span className="text-gray-600 dark:text-gray-300 font-medium">Continuously expanding my expertise and skills</span>
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
