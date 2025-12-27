"use client";
import { PersonalData } from '../lib/personal-data';
import { 
  Code, 
  Globe, 
  Database, 
  Server, 
  Container, 
  Cloud, 
  Smartphone, 
  Zap, 
  Settings, 
  Shield, 
  Network, 
  Layers, 
  Rocket 
} from 'lucide-react';

interface SkillsProps {
  data: PersonalData;
}

function getSkillIcon(skill: string) {
  const iconProps = { className: "w-10 h-10 text-white", strokeWidth: 2 };
  
  switch (skill.toLowerCase()) {
    case 'react':
      return <Code {...iconProps} />;
    case 'next.js':
      return <Globe {...iconProps} />;
    case 'typescript':
      return <Code {...iconProps} />;
    case 'node.js':
      return <Server {...iconProps} />;
    case 'aws':
      return <Cloud {...iconProps} />;
    case 'python':
      return <Code {...iconProps} />;
    case 'docker':
      return <Container {...iconProps} />;
    case 'kubernetes':
      return <Layers {...iconProps} />;
    case 'graphql':
      return <Network {...iconProps} />;
    case 'rest apis':
      return <Zap {...iconProps} />;
    case 'mongodb':
      return <Database {...iconProps} />;
    case 'postgresql':
      return <Database {...iconProps} />;
    case 'terraform':
      return <Settings {...iconProps} />;
    case 'ci/cd':
      return <Rocket {...iconProps} />;
    case 'microservices':
      return <Layers {...iconProps} />;
    case 'serverless':
      return <Cloud {...iconProps} />;
    case 'cross-platform development':
      return <Smartphone {...iconProps} />;
    case 'mcp protocol':
      return <Network {...iconProps} />;
    case 'wsl integration':
      return <Container {...iconProps} />;
    case 'infrastructure as code':
      return <Settings {...iconProps} />;
    case 'devops':
      return <Shield {...iconProps} />;
    default:
      return <Code {...iconProps} />;
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {data.skills.map((skill, index) => (
              <div
                key={index}
                className="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-white/20 dark:border-gray-700"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow duration-300">
                  {getSkillIcon(skill)}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {skill}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Advanced
                </p>
              </div>
            ))}
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
