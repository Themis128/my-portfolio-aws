export interface PersonalData {
  name: string;
  title: string;
  bio: string;
  email: string;
  location: string;
  phone?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  credly?: string;
  profilePicture?: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  certifications?: Certification[];
  languages?: Language[];
  interests?: string[];
  achievements?: Achievement[];
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
  github?: string;
  image?: string;
  category?: string;
  featured?: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: "Native" | "Fluent" | "Intermediate" | "Beginner";
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "Award" | "Publication" | "Speaking" | "Open Source";
}

export function getPersonalDataServer(): PersonalData {
  return {
    name: "Themis Baltzakis",
    title: "Lead Engineer & Cloud Solutions Expert",
    bio: "Experienced software engineer with 8+ years in full-stack development and cloud infrastructure. Specialized in modern web technologies, cloud-native solutions, and cross-platform development. Proven track record of leading teams and delivering scalable, high-performance applications.",
    email: "tbaltzakis@cloudless.gr",
    location: "Greece",
    phone: "+30 6977777838",
    website: "https://cloudless.gr",
    linkedin: "https://linkedin.com/in/themis-baltzakis",
    github: "https://github.com/themis128",
    credly: "https://www.credly.com/users/themistoklis-baltzakis/edit#credly",
    profilePicture: "/images/profile-picture.jpg",
    skills: [
      "React", "Next.js", "TypeScript", "Node.js", "AWS", "Python", 
      "Docker", "Kubernetes", "GraphQL", "REST APIs", "MongoDB", "PostgreSQL",
      "Terraform", "CI/CD", "Microservices", "Serverless", "Cross-Platform Development",
      "MCP Protocol", "WSL Integration", "Infrastructure as Code", "DevOps"
    ],
    experience: [
      {
        id: "1",
        title: "Lead Engineer",
        company: "Cloudless.gr",
        period: "2020 - Present",
        description: "Lead Engineer responsible for architecting and implementing cloud-native solutions using AWS, Docker, and Kubernetes. Managed a team of 5 developers, established CI/CD pipelines, and implemented Infrastructure as Code practices. Spearheaded migration of legacy applications to microservices architecture, resulting in 40% improvement in system performance and scalability."
      },
      {
        id: "2",
        title: "Senior Full-Stack Developer",
        company: "TechCorp Solutions",
        period: "2018 - 2020",
        description: "Developed enterprise web applications using React, Node.js, and AWS services. Implemented microservices architecture and automated deployment pipelines using GitHub Actions. Led the development of a real-time analytics dashboard that improved client decision-making processes by 30%."
      },
      {
        id: "3",
        title: "Frontend Developer",
        company: "StartupXYZ",
        period: "2016 - 2018",
        description: "Built responsive web applications with React and Redux. Collaborated with UX/UI designers to create intuitive user interfaces. Implemented performance optimizations that reduced page load times by 50% and improved user engagement metrics."
      },
      {
        id: "4",
        title: "Software Engineering Intern",
        company: "InnovateTech",
        period: "2015 - 2016",
        description: "Assisted in developing web applications using modern JavaScript frameworks. Contributed to code reviews and implemented unit testing practices. Gained hands-on experience with Agile development methodologies and version control systems."
      }
    ],
    education: [
      {
        id: "1",
        degree: "Bachelor of Computer Science",
        school: "University of Athens",
        year: "2016"
      },
      {
        id: "2",
        degree: "AWS Certified Solutions Architect - Associate",
        school: "Amazon Web Services",
        year: "2020"
      }
    ],
    projects: [
      {
        id: "1",
        title: "Portfolio Website",
        description: "Personal portfolio built with Next.js and AWS Amplify, showcasing skills and projects with modern design principles.",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "AWS Amplify"],
        url: "https://cloudless.gr",
        github: "https://github.com/themis128/my-portfolio-aws",
        image: "/images/portfolio-screenshot.png",
        category: "Personal",
        featured: true
      },
      {
        id: "2",
        title: "E-Commerce Platform",
        description: "Full-stack e-commerce solution with React frontend, Node.js backend, and AWS infrastructure.",
        technologies: ["React", "Node.js", "Express", "MongoDB", "AWS Lambda", "S3"],
        url: "https://ecommerce-demo.cloudless.gr",
        github: "https://github.com/cloudless-gr/ecommerce-platform",
        image: "/images/ecommerce-screenshot.png",
        category: "Professional",
        featured: true
      },
      {
        id: "3",
        title: "Task Management App",
        description: "Collaborative task management application with real-time updates and team collaboration features.",
        technologies: ["React", "Socket.io", "Node.js", "PostgreSQL", "Docker"],
        url: "https://tasks.cloudless.gr",
        github: "https://github.com/cloudless-gr/task-manager",
        image: "/images/tasks-screenshot.png",
        category: "Side Project",
        featured: false
      },
      {
        id: "4",
        title: "MCP Server - Cross-Platform File Access",
        description: "Advanced Model Context Protocol server that bridges Windows and Linux file systems. Implements intelligent path resolution algorithms to seamlessly access Windows D: drive paths from Linux environments using WSL. Features include automatic path translation, cross-platform compatibility, and robust error handling for enterprise-grade file operations.",
        technologies: ["Node.js", "TypeScript", "MCP SDK", "Cross-Platform Development", "WSL Integration", "Path Resolution Algorithms", "Error Handling"],
        github: "https://github.com/themis128/my-portfolio-aws/tree/main/mcp-server",
        image: "/images/mcp-server-screenshot.png",
        category: "Infrastructure",
        featured: true
      },
      {
        id: "5",
        title: "Cloud Infrastructure Automation",
        description: "Comprehensive infrastructure automation solution using Terraform and AWS CDK. Implements Infrastructure as Code principles with automated deployment pipelines, monitoring, and scaling capabilities for cloud-native applications.",
        technologies: ["Terraform", "AWS CDK", "Docker", "Kubernetes", "GitHub Actions", "Prometheus", "Grafana"],
        github: "https://github.com/cloudless-gr/infrastructure-automation",
        image: "/images/infrastructure-screenshot.png",
        category: "Infrastructure",
        featured: false
      }
    ],
    certifications: [
      {
        id: "1",
        name: "AWS Certified Solutions Architect - Associate",
        issuer: "Amazon Web Services",
        date: "March 2020",
        credentialId: "AWS-ASA-2020-12345",
        url: "https://www.credly.com/badges/12345678-1234-1234-1234-123456789012/public_url"
      },
      {
        id: "2",
        name: "AWS Certified Developer - Associate",
        issuer: "Amazon Web Services",
        date: "June 2021",
        credentialId: "AWS-DEV-2021-67890",
        url: "https://www.credly.com/badges/23456789-2345-2345-2345-234567890123/public_url"
      },
      {
        id: "3",
        name: "Docker Certified Associate",
        issuer: "Docker",
        date: "September 2020",
        credentialId: "DOCKER-CA-2020-54321",
        url: "https://www.credly.com/badges/34567890-3456-3456-3456-345678901234/public_url"
      },
      {
        id: "4",
        name: "Microsoft Azure Fundamentals",
        issuer: "Microsoft",
        date: "January 2019",
        credentialId: "AZ-900-2019-67890",
        url: "https://www.credly.com/badges/45678901-4567-4567-4567-456789012345/public_url"
      },
      {
        id: "5",
        name: "Google Cloud Professional Cloud Architect",
        issuer: "Google Cloud",
        date: "November 2022",
        credentialId: "GCP-PCA-2022-13579",
        url: "https://www.credly.com/badges/56789012-5678-5678-5678-567890123456/public_url"
      },
      {
        id: "6",
        name: "HashiCorp Certified: Terraform Associate",
        issuer: "HashiCorp",
        date: "April 2021",
        credentialId: "HCTA-2021-98765",
        url: "https://www.credly.com/badges/67890123-6789-6789-6789-678901234567/public_url"
      },
      {
        id: "7",
        name: "Kubernetes Application Developer (CKAD)",
        issuer: "Cloud Native Computing Foundation",
        date: "August 2021",
        credentialId: "CKAD-2021-54321",
        url: "https://www.credly.com/badges/78901234-7890-7890-7890-789012345678/public_url"
      },
      {
        id: "8",
        name: "Certified Scrum Master (CSM)",
        issuer: "Scrum Alliance",
        date: "February 2020",
        credentialId: "CSM-2020-11223",
        url: "https://www.credly.com/badges/89012345-8901-8901-8901-890123456789/public_url"
      },
      {
        id: "9",
        name: "Cisco Certified Network Associate (CCNA)",
        issuer: "Cisco",
        date: "May 2018",
        credentialId: "CCNA-2018-11111",
        url: "https://www.credly.com/badges/90123456-9012-9012-9012-901234567890/public_url"
      },
      {
        id: "10",
        name: "Cisco DevNet Associate",
        issuer: "Cisco",
        date: "July 2021",
        credentialId: "DEVNET-ASSOC-2021-33333",
        url: "https://www.credly.com/badges/12345678-1234-1234-1234-123456789013/public_url"
      }
    ],
    languages: [
      {
        id: "1",
        name: "Greek",
        proficiency: "Native"
      },
      {
        id: "2",
        name: "English",
        proficiency: "Fluent"
      },
      {
        id: "3",
        name: "German",
        proficiency: "Intermediate"
      }
    ],
    interests: [
      "Cloud Computing",
      "DevOps Practices",
      "Open Source Contributions",
      "Technology Blogging",
      "Mentoring Junior Developers",
      "Photography",
      "Traveling"
    ],
    achievements: [
      {
        id: "1",
        title: "Best Developer Award 2022",
        description: "Recognized for outstanding contributions to the company's technical projects and team leadership.",
        date: "December 2022",
        type: "Award"
      },
      {
        id: "2",
        title: "Published Article: 'Modern React Patterns'",
        description: "Technical article published on Medium with 10K+ reads about modern React development patterns.",
        date: "March 2021",
        type: "Publication"
      },
      {
        id: "3",
        title: "Speaker at DevConf 2020",
        description: "Presented on 'Building Scalable Applications with AWS' at the annual developer conference.",
        date: "October 2020",
        type: "Speaking"
      },
      {
        id: "4",
        title: "Open Source Contributor - React Ecosystem",
        description: "Contributed to popular React open-source projects, including performance optimizations and bug fixes that improved library stability for thousands of developers.",
        date: "Ongoing",
        type: "Open Source"
      },
      {
        id: "5",
        title: "Cloud Migration Success Story",
        description: "Led successful migration of legacy monolithic application to cloud-native microservices architecture, reducing infrastructure costs by 35% and improving system reliability.",
        date: "June 2021",
        type: "Award"
      },
      {
        id: "6",
        title: "Technical Blog Series: 'DevOps Best Practices'",
        description: "Wrote comprehensive blog series on DevOps practices that gained industry recognition and was featured in multiple tech publications.",
        date: "2021-2022",
        type: "Publication"
      }
    ]
  };
}
