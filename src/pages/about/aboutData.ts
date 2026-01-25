// About page data: skills, experience, education, organizations, presentations

export const skills = [
  'Ruby',
  'Ruby on Rails',
  'Python',
  'Go',
  'TypeScript',
  'JavaScript',
  'Vue.js',
  'React',
  'CoffeeScript',
  'Crystal',
  'Amber',
  'Ember.js',
  'PHP',
  'C',
  'C++',
  'C#',
  'Processing',
  'Assembly',
  'SQL',
  'Bash',
  'HTML',
  'CSS',
  'Sass',
  'Git',
  'gRPC',
  'REST',
  'Redis',
  'PostgreSQL',
  'Docker',
  'Kubernetes',
  'Kustomize',
  'Argo CD',
  'Slurm',
  'CI/CD',
  'NVFLARE',
  'PyTorch',
  'Natural Language Processing (NLP)',
  'spaCy',
  'RASA',
  'TensorFlow',
  'Keras API',
  'Pandas',
  'NumPy',
  'scikit-learn',
  'AI-driven workflow automation',
  'Embedded systems development',
]

export type ExperienceEntry = {
  company: string
  role: string
  period: string
  location: string
  scope?: string
  bannerImage: string
  highlights: string[]
}

export const experience: ExperienceEntry[] = [
  {
    company: 'Oak Ridge National Laboratory',
    role: 'HPC Software Engineer',
    period: 'Jun 2020 - Present',
    location: 'Oak Ridge, TN (Remote)',
    scope: '',
    bannerImage: '/about/ornl.webp',
    highlights: [
      'Enabled privacy-preserving federated learning on Frontier (first U.S. exascale system; TOP500 #2). Ported NVFLARE to ROCm/MI250X with PyTorch, built HIP-compatible containers, integrated with Slurm (mTLS in enclaves), and validated multi-node training rounds previously impossible.',
      'Owned and scaled myOLCF self-service portal to ~4,000 users across 1,000+ projects with 99.9%+ uptime; shipped 12 FY2025 releases governing access, allocation, and policy across enclaves.',
      'Replaced Jbuilder with JSON:API serializer + Redis caching; took 100k-row endpoint 272s → 178–206ms (1,320× faster, –99.92%), cut ActiveRecord 19.2s → 8.8ms, and eliminated cluster sync timeouts.',
      'Built Crystal/Amber Smart Facility metrics platform ingesting 100k+ time-series records; served dashboards in ~87ms and benchmarked 10.4k req/sec per core. Used for procurement and to flag inefficient Slurm jobs.',
      'Accelerated CI/CD: builds 2m → 9s (-92%), startup 30s → <200ms (-99%), tests 90s → 6s (-93%). Standardized GitOps delivery with Kustomize + Argo CD on Kubernetes.',
      'Central policy-as-code service automating provisioning, access, and scheduler policy across SLURM/LSF enclaves. Zero post-deploy incidents in 3 years due to expanded Cypress coverage + validation.',
    ],
  },
  {
    company: 'Bank of America',
    role: 'Global Technology Summer Analyst (ML Engineer Intern)',
    period: 'Jun 2019 - Aug 2019',
    location: 'Greater Los Angeles Area',
    bannerImage: '/about/bofa.webp',
    highlights: [
      'Built NLP entity extraction service (names, phones, addresses, accounts, amounts) achieving 96% F1 score, enabling $20M+ in annual automation savings.',
    ],
  },
  {
    company: 'Oak Ridge National Laboratory',
    role: 'Software Developer Intern, National Center for Computational Sciences (NCCS)',
    period: 'May 2015 - May 2019',
    location: 'Oak Ridge, TN',
    bannerImage: '/about/ornl.webp',
    highlights: [
      'Year-round development of HPC-centric services, applications, and BI tools for 20+ HPC clusters, ensuring uptime for $250M compute systems; shipped production features across internal portals.',
      'Automated supercomputer-access communications via policy-aware email system; standardized messaging and reduced manual steps.',
      'Built WordPress/REST plugin to sync and display HPC metrics on olcf.ornl.gov; improved data freshness and reduced update toil.',
    ],
  },
]

export type EducationEntry = {
  school: string
  degree: string
  period: string
  gpa: string
  honors: string
  activities: string
  bannerImage: string
}

export const education: EducationEntry[] = [
  {
    school: 'East Tennessee State University',
    degree: 'B.S. in Computer Science',
    period: 'Aug 2017 - May 2020',
    gpa: '3.94/4.00',
    honors: "Dean's List",
    activities:
      'ACM (President, 2019-2020), Ethical Hacking (Vice President, 2018-2019)',
    bannerImage: '/about/etsu.webp',
  },
  {
    school: 'Pellissippi State Community College',
    degree: 'Associate of Science, Computer and Information Sciences',
    period: 'Aug 2015 - May 2017',
    gpa: '3.84/4',
    honors: "Dean's List",
    activities: 'Phi Theta Kappa Honor Society, Gamma Beta Phi Society',
    bannerImage: '/about/pscc.webp',
  },
]

export const organizations = [
  'ORNL Pathways to Computing Internship Program Workshop - Organizer (Jan 2022 - Present)',
  'PEARC (Advanced Research Computing Conference) - Student Program Committee Chair (Jan 2021 - Present)',
  'ACM (Association for Computing Machinery) - President (Jan 2019 - May 2020)',
  'Ethical Hacking - Vice President (Jan 2018 - Dec 2019)',
]

export type PresentationEntry = {
  title: string
  conference: string
  date: string
  location: string
  description: string
  pdfUrl: string
  category: string
  tags: string[]
  bannerImage: string | null
}

export const presentations: PresentationEntry[] = [
  {
    title:
      'Employing a Software-Driven Approach to Scalable HPC System Management',
    conference: 'CUG 2025',
    date: '2025',
    location: 'In-Person',
    description:
      'Presentation on implementing software-driven approaches for managing large-scale HPC systems, focusing on automation and scalability.',
    pdfUrl: '/presentations/cug-2025-hpc-system-management.pdf',
    category: 'HPC Management',
    tags: ['HPC', 'System Management', 'Automation', 'Scalability'],
    bannerImage: null,
  },
  {
    title: 'Employing DevOps in HPC Operational Management',
    conference: 'NLIT 2024',
    date: '2024',
    location: 'In-Person',
    description:
      'Presentation on applying DevOps principles and practices to High Performance Computing operational workflows and infrastructure management.',
    pdfUrl: '/presentations/nlit-2024-devops-hpc.pdf',
    category: 'DevOps',
    tags: ['DevOps', 'HPC', 'Operations', 'Infrastructure'],
    bannerImage: null,
  },
]
