"use client";
import { PersonalData } from '../lib/personal-data';

interface LanguagesProps {
  data: PersonalData;
}

export default function Languages({ data }: LanguagesProps) {
  if (!data.languages || data.languages.length === 0) {
    return null;
  }

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case "Native": return "bg-green-500";
      case "Fluent": return "bg-blue-500";
      case "Intermediate": return "bg-yellow-500";
      case "Beginner": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  const getProficiencyWidth = (proficiency: string) => {
    switch (proficiency) {
      case "Native": return "w-full";
      case "Fluent": return "w-4/5";
      case "Intermediate": return "w-3/5";
      case "Beginner": return "w-2/5";
      default: return "w-1/2";
    }
  };

  return (
    <section id="languages" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Languages
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Multilingual communication skills and proficiency levels
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {data.languages.map((language) => (
            <div
              key={language.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {language.name}
                </h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getProficiencyColor(language.proficiency)}`}>
                  {language.proficiency}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div className={`h-3 rounded-full ${getProficiencyColor(language.proficiency)} ${getProficiencyWidth(language.proficiency)}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
