export interface PersonalData {
  name: string;
  title: string;
  bio: string;
  email: string;
  location: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  year: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  url?: string;
}

export function getPersonalDataServer(): PersonalData {
  return {
    name: "Themis Baltzakis",
    title: "Full-Stack Developer & Cloud Solutions Expert",
    bio: "Lead Engineer at Cloudless.gr specializing in modern web technologies and cloud-native solutions.",
    email: "themis@cloudless.gr",
    location: "Greece",
    skills: ["React", "Next.js", "TypeScript", "Node.js", "AWS", "Python"],
    experience: [
      {
        id: "1",
        title: "Lead Engineer",
        company: "Cloudless.gr",
        period: "2020 - Present",
        description: "Leading development of cloud-native applications."
      }
    ],
    education: [
      {
        id: "1",
        degree: "Bachelor of Computer Science",
        school: "University of Example",
        year: "2016"
      }
    ],
    projects: [
      {
        id: "1",
        title: "Portfolio Website",
        description: "Personal portfolio built with Next.js and AWS.",
        technologies: ["Next.js", "TypeScript", "AWS Amplify"],
        url: "https://cloudless.gr"
      }
    ]
  };
}