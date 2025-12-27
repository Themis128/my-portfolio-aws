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
    name: "Themistoklis Baltzakis",
    title: "Systems and Network Engineer",
    bio: "Systems and Network Engineer with over 15 years of extensive experience in IT support, cloud solutions, and Cisco infrastructure management. Dedicated Cloud and Virtualization Engineer with a proven track record in managing and optimizing Cisco infrastructure and networking systems. Expertise spans high-impact cloud management and support services, particularly with Azure Active Directory (AD) and Microsoft 365 (M365). Holds industry-recognized certifications including AWS Certified Cloud Practitioner and Cisco DevNet Associate. Adept at troubleshooting network incidents, conducting system upgrades, and delivering comprehensive end-user support, ensuring optimal network uptime and security.",
    email: "baltzakis.themis@gmail.com",
    location: "Greece",
    phone: "+30 6977777838",
    website: "https://www.baltzakisthemis.com",
    linkedin: "https://www.linkedin.com/in/baltzakisthemis",
    github: "https://github.com/Themis128",
    credly: "https://www.credly.com/users/themistoklis-baltzakis/edit#credly",
    profilePicture: "/images/20250604_231405~4-EDIT.jpg",
    skills: [
      "Cisco Systems",
      "Azure Active Directory",
      "Microsoft 365",
      "AWS Cloud Practitioner",
      "Network Security",
      "Microsoft Intune",
      "ServiceNow",
      "CyberArk PAM",
      "Windows Server",
      "TCP/IP",
      "DNS/DHCP",
      "Virtualization",
      "Cloud Migration",
      "Project Management",
      "DevNet Associate",
      "Network Troubleshooting",
      "Android App Development",
      "Data Analytics",
      "Big Data",
      "Problem Solving",
      "Data Visualization",
      "Scikit-Learn",
      "Python",
      "Pandas"
    ],
    experience: [
      {
        id: "1",
        title: "Cisco Vise Engineer",
        company: "Estarta Solutions",
        period: "Recent - Present",
        description: "Resolved over 90% of Cisco infrastructure issues in data centers, ensuring 100% SLA compliance and uninterrupted operations. Streamlined the return merchandise authorization (RMA) process by efficiently creating and tracking labor and parts RMAs, enhancing logistics communication efficiency by 30%. Proactively monitored delivery statuses and resolved logistics challenges, minimizing downtime and boosting service reliability."
      },
      {
        id: "2",
        title: "IT Consultant",
        company: "Cosmos Business Systems",
        period: "Recent - Present",
        description: "Specialized in managing and troubleshooting Azure Active Directory services, with focus on secure identity and access management. Maintained robust security protocols in Azure AD, including user provisioning, group management, and implementing access control through RBAC and conditional access policies. Delivered comprehensive support for Microsoft 365 services, resolving end-user issues related to M365 applications. Specialized in mobile device management (MDM) and mobile application management (MAM) using Microsoft Intune."
      },
      {
        id: "3",
        title: "IT Consultant",
        company: "CPI SA (outsourced @ Nielsen Hellas)",
        period: "March 2023",
        description: "Provided strategic guidance to organizations, aligning technology initiatives with business goals. Managed and maintained Active Directory environments, including user account provisioning, group management, and access control. Utilized ServiceNow to manage and track IT service requests, incidents, and inventory. Ensured robust Privileged Access Management (PAM) using CyberArk, securing credentials through Vault Management."
      },
      {
        id: "4",
        title: "Technical Engineer",
        company: "Printec Hellas",
        period: "January 2022 - September 2022",
        description: "Specialized use of Windows and Cisco Systems, servers, switches, routers, hubs, firewalls, LAN, WAN, TCP/IP, DNS, DHCP. Installed and upgraded hardware-based networks, network services, and equipment. Performed troubleshooting analysis of network, servers, workstations, and associated systems. Diagnosed and troubleshot technical issues, including account setup and network configuration."
      },
      {
        id: "5",
        title: "TechExpert",
        company: "Germanos",
        period: "February 2007 - October 2021",
        description: "Developed software fine-tuning (Android, iOS) and hardware repairs of cell phones and tablets. Offered services in repairing desktops and laptops of various brands. Asked customers targeted questions to quickly understand problems and provided prompt feedback. Maintained strong relationships with clients and achieved goals while promoting company products."
      },
      {
        id: "6",
        title: "IT Department",
        company: "Ε. Ο. Φ. | INFORM",
        period: "2000 - 2006",
        description: "Spearheaded the management of IT infrastructure to ensure seamless operations, achieving a 15% improvement in system uptime for over 500 users. Partnered with cross-functional teams to deploy innovative technology solutions, driving a 20% enhancement in organizational productivity. Delivered technical support and comprehensive training to staff, leading to a 30% reduction in support ticket resolution time."
      }
    ],
    education: [
      {
        id: "1",
        degree: "Master's Degree in Data Analytics and Technologies",
        school: "The University of Bolton",
        year: "2024 - Present"
      },
      {
        id: "2",
        degree: "Bachelor of Computer Science (BCS)",
        school: "Hellenic Open University",
        year: "2014 - 2022"
      },
      {
        id: "3",
        degree: "Cisco CCNA in Computer Systems Networking and Telecommunications",
        school: "Cisco Networking Academy",
        year: "2021 - 2022"
      },
      {
        id: "4",
        degree: "Associate Degree in DevNet",
        school: "Cisco Networking Academy",
        year: "2023 - 2024"
      },
      {
        id: "5",
        degree: "Android App Development",
        school: "skg.education",
        year: "Completed"
      },
      {
        id: "6",
        degree: "Cisco Incubator 12.0 EMEA in Customer Experience and CCNA",
        school: "Cisco Networking Academy",
        year: "2024 - 2025"
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
        name: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services",
        date: "2023",
        credentialId: "AWS-CP-2023",
        url: "https://www.credly.com/badges/aws-certified-cloud-practitioner"
      },
      {
        id: "2",
        name: "Cisco DevNet Associate",
        issuer: "Cisco",
        date: "2024",
        credentialId: "DEVNET-ASSOC-2024",
        url: "https://www.credly.com/badges/cisco-devnet-associate"
      },
      {
        id: "3",
        name: "Cisco Certified Network Associate (CCNA)",
        issuer: "Cisco",
        date: "2022",
        credentialId: "CCNA-2022",
        url: "https://www.credly.com/badges/cisco-ccna"
      },
      {
        id: "4",
        name: "Microsoft 365 Certified: Enterprise Administrator Expert",
        issuer: "Microsoft",
        date: "2023",
        credentialId: "MS-100-MS-101-2023",
        url: "https://www.credly.com/badges/microsoft-365-enterprise-administrator"
      },
      {
        id: "5",
        name: "Microsoft Certified: Azure Administrator Associate",
        issuer: "Microsoft",
        date: "2023",
        credentialId: "AZ-104-2023",
        url: "https://www.credly.com/badges/microsoft-certified-azure-administrator-associate"
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
      }
    ],
    interests: [
      "Network Engineering",
      "Cloud Computing",
      "Cisco Technologies",
      "Azure Active Directory",
      "Microsoft 365",
      "Data Analytics",
      "Android Development",
      "IT Infrastructure Management",
      "Cybersecurity",
      "Professional Development"
    ],
    achievements: [
      {
        id: "1",
        title: "Cisco Infrastructure Excellence",
        description: "Resolved over 90% of Cisco infrastructure issues in data centers, ensuring 100% SLA compliance and uninterrupted operations.",
        date: "2024",
        type: "Award"
      },
      {
        id: "2",
        title: "RMA Process Optimization",
        description: "Streamlined the return merchandise authorization (RMA) process, enhancing logistics communication efficiency by 30%.",
        date: "2024",
        type: "Award"
      },
      {
        id: "3",
        title: "IT Infrastructure Improvement",
        description: "Achieved a 15% improvement in system uptime for over 500 users through effective IT infrastructure management.",
        date: "2006",
        type: "Award"
      },
      {
        id: "4",
        title: "Organizational Productivity Enhancement",
        description: "Drove a 20% enhancement in organizational productivity through deployment of innovative technology solutions.",
        date: "2006",
        type: "Award"
      },
      {
        id: "5",
        title: "Support Ticket Resolution Excellence",
        description: "Led to a 30% reduction in support ticket resolution time through comprehensive training and technical support delivery.",
        date: "2006",
        type: "Award"
      },
      {
        id: "6",
        title: "AWS Certified Cloud Practitioner",
        description: "Earned AWS Certified Cloud Practitioner certification, demonstrating knowledge of AWS Cloud concepts, services, and terminology.",
        date: "2023",
        type: "Award"
      },
      {
        id: "7",
        title: "Cisco DevNet Associate",
        description: "Achieved Cisco DevNet Associate certification, showcasing skills in software development and design for Cisco platforms.",
        date: "2024",
        type: "Award"
      }
    ]
  };
}
