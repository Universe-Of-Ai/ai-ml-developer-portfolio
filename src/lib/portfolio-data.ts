import {
  Brain,
  Briefcase,
  FileText,
  Layers,
  Award,
  Code2,
  Database,
  Server,
  BarChart3,
  Cpu,
  Globe,
  MessageSquare,
  Eye,
} from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

/* ─── Projects ─── */
export const projectCategories = [
  'All',
  'NLP',
  'CV',
  'MLOps',
  'Generative',
  'DL',
  'Data Science',
] as const;
export type ProjectCategory = (typeof projectCategories)[number];

export interface Project {
  title: string;
  description: string;
  category: ProjectCategory[];
  tags: string[];
  gradient: string;
  icon: LucideIcon;
  iconColor: string;
}

export const projects: Project[] = [
  {
    title: 'Smart Chat Assistant',
    description:
      'GPT-based conversational AI with RAG pipeline for context-aware responses, multi-turn dialogue management, and seamless API integration.',
    category: ['NLP', 'MLOps'],
    tags: ['GPT-4', 'LangChain', 'RAG', 'FastAPI', 'Redis'],
    gradient: 'from-accent-cyan/20 to-accent-blue/20',
    icon: MessageSquare,
    iconColor: 'text-accent-cyan',
  },
  {
    title: 'Image Classification System',
    description:
      'CNN model for medical image analysis achieving 98.5% accuracy. Designed for early disease detection with real-time inference.',
    category: ['CV', 'DL'],
    tags: ['PyTorch', 'CNN', 'OpenCV', 'Docker', 'Gradio'],
    gradient: 'from-accent-violet/20 to-purple-500/20',
    icon: Eye,
    iconColor: 'text-accent-violet',
  },
  {
    title: 'Sentiment Analyzer',
    description:
      'NLP model for real-time social media sentiment detection with multi-language support and emotion classification.',
    category: ['NLP', 'DL'],
    tags: ['BERT', 'Transformers', 'spaCy', 'Streamlit', 'HuggingFace'],
    gradient: 'from-emerald-500/20 to-green-500/20',
    icon: Brain,
    iconColor: 'text-emerald-400',
  },
  {
    title: 'Autonomous Navigation',
    description:
      'Computer vision system for drone navigation using YOLO object detection, depth estimation, and real-time path planning.',
    category: ['CV', 'MLOps'],
    tags: ['YOLO', 'OpenCV', 'ROS', 'TensorRT', 'CUDA'],
    gradient: 'from-pink-500/20 to-rose-500/20',
    icon: Globe,
    iconColor: 'text-pink-400',
  },
  {
    title: 'Recommendation Engine',
    description:
      'Collaborative filtering ML system with hybrid approach combining content-based and user-behavior for personalized recommendations.',
    category: ['Data Science'],
    tags: ['Scikit-learn', 'Pandas', 'FastAPI', 'PostgreSQL', 'Redis'],
    gradient: 'from-amber-500/20 to-orange-500/20',
    icon: BarChart3,
    iconColor: 'text-amber-400',
  },
  {
    title: 'AI Voice Synthesizer',
    description:
      'Text-to-speech system with emotion detection, voice cloning, and natural prosody generation using diffusion models.',
    category: ['Generative', 'DL'],
    tags: ['PyTorch', 'Diffusion', 'Librosa', 'FastAPI', 'WebRTC'],
    gradient: 'from-red-500/20 to-orange-500/20',
    icon: Cpu,
    iconColor: 'text-red-400',
  },
];

/* ─── Skills ─── */
export interface SkillItem {
  name: string;
  level: number;
}

export interface SkillGroup {
  title: string;
  icon: LucideIcon;
  color: string;
  skills: SkillItem[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'ML Frameworks',
    icon: Brain,
    color: 'from-accent-cyan to-accent-blue',
    skills: [
      { name: 'TensorFlow', level: 90 },
      { name: 'PyTorch', level: 92 },
      { name: 'Scikit-learn', level: 88 },
      { name: 'Keras', level: 85 },
      { name: 'Hugging Face', level: 87 },
    ],
  },
  {
    title: 'Languages',
    icon: Code2,
    color: 'from-accent-violet to-purple-500',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'JavaScript / TypeScript', level: 78 },
      { name: 'SQL', level: 82 },
      { name: 'C++', level: 70 },
      { name: 'R', level: 68 },
    ],
  },
  {
    title: 'Tools & Platforms',
    icon: Server,
    color: 'from-emerald-400 to-green-500',
    skills: [
      { name: 'Docker', level: 85 },
      { name: 'AWS / GCP', level: 80 },
      { name: 'Git / GitHub', level: 92 },
      { name: 'MLflow', level: 78 },
      { name: 'FastAPI / Flask', level: 88 },
    ],
  },
  {
    title: 'Domains',
    icon: Globe,
    color: 'from-pink-400 to-rose-500',
    skills: [
      { name: 'NLP', level: 90 },
      { name: 'Computer Vision', level: 88 },
      { name: 'Reinforcement Learning', level: 72 },
      { name: 'Time Series', level: 80 },
      { name: 'Generative AI', level: 85 },
    ],
  },
  {
    title: 'Data & Visualization',
    icon: Database,
    color: 'from-amber-400 to-orange-500',
    skills: [
      { name: 'Pandas / NumPy', level: 92 },
      { name: 'Matplotlib / Seaborn', level: 88 },
      { name: 'Spark', level: 75 },
      { name: 'Airflow', level: 72 },
      { name: 'Jupyter', level: 95 },
    ],
  },
];

/* ─── Experience ─── */
export interface ExperienceItem {
  date: string;
  role: string;
  company: string;
  description: string[];
  color: string;
}

export const experiences: ExperienceItem[] = [
  {
    date: '2023 — Present',
    role: 'ML Engineer',
    company: 'TechAI Solutions',
    description: [
      'Architected and deployed production ML pipelines serving 100K+ daily predictions',
      'Fine-tuned transformer models for domain-specific NLP tasks, improving accuracy by 23%',
      'Led a team of 4 ML engineers in building a real-time recommendation engine',
      'Implemented MLOps practices with CI/CD pipelines, model versioning, and monitoring',
    ],
    color: 'accent-cyan',
  },
  {
    date: '2022 — 2023',
    role: 'AI Research Intern',
    company: 'DeepMind Research Lab',
    description: [
      'Conducted research on novel attention mechanisms for document understanding',
      'Published 2 papers on efficient transformer architectures in top-tier conferences',
      'Developed benchmarking frameworks for evaluating large language models',
      'Collaborated with cross-functional teams to integrate research into products',
    ],
    color: 'accent-blue',
  },
  {
    date: '2021 — 2022',
    role: 'Freelance AI Developer',
    company: 'Self-Employed',
    description: [
      'Delivered 10+ client projects spanning NLP, computer vision, and recommendation systems',
      'Built custom ML solutions for startups in healthcare, fintech, and e-commerce domains',
      'Developed automated data annotation tools reducing labeling time by 60%',
      'Maintained a 100% client satisfaction rate with consistent on-time delivery',
    ],
    color: 'accent-violet',
  },
  {
    date: '2020 — 2021',
    role: 'Data Science Intern',
    company: 'DataVista Analytics',
    description: [
      'Analyzed large-scale datasets using Python, Pandas, and SQL to drive business insights',
      'Built predictive models for customer churn with 89% recall using ensemble methods',
      'Created interactive dashboards and data visualizations for stakeholder reporting',
      'Automated ETL workflows processing 500K+ records daily',
    ],
    color: 'emerald-500',
  },
];

/* ─── Publications ─── */
export interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: string;
  type: string;
  link?: string;
}

export const publications: Publication[] = [
  {
    title: 'Efficient Multi-Head Attention for Low-Resource Document Understanding',
    authors: 'Z. Islam, A. Rahman, K. Chen',
    venue: 'NeurIPS',
    year: '2023',
    type: 'Conference',
    link: 'https://arxiv.org/abs/2310.00001',
  },
  {
    title: 'Retrieval-Augmented Generation for Domain-Specific Question Answering',
    authors: 'Z. Islam, S. Patel, M. Johnson',
    venue: 'ACL',
    year: '2023',
    type: 'Conference',
    link: 'https://arxiv.org/abs/2305.00002',
  },
  {
    title: 'Federated Learning for Privacy-Preserving Medical Image Classification',
    authors: 'Z. Islam, L. Wang, R. Kumar',
    venue: 'IEEE TMI',
    year: '2022',
    type: 'Journal',
    link: 'https://doi.org/10.1109/TMI.2022.00003',
  },
  {
    title: 'Self-Supervised Representation Learning for Drone Navigation',
    authors: 'Z. Islam, H. Tanaka, D. Lee',
    venue: 'CVPR',
    year: '2022',
    type: 'Conference',
    link: 'https://arxiv.org/abs/2206.00004',
  },
  {
    title: 'Scalable Sentiment Analysis Using Pre-trained Language Models',
    authors: 'Z. Islam, N. Ahmed, P. Garcia',
    venue: 'EMNLP',
    year: '2021',
    type: 'Conference',
    link: 'https://arxiv.org/abs/2109.00005',
  },
];

/* ─── Stats ─── */
export const stats = [
  {
    icon: Briefcase,
    value: '3+',
    label: 'Years Experience',
    color: 'from-accent-cyan to-accent-blue',
  },
  {
    icon: Layers,
    value: '15+',
    label: 'Projects Completed',
    color: 'from-accent-blue to-accent-violet',
  },
  {
    icon: FileText,
    value: '5+',
    label: 'Research Papers',
    color: 'from-accent-violet to-purple-500',
  },
  {
    icon: Award,
    value: '10+',
    label: 'ML Models Deployed',
    color: 'from-emerald-400 to-green-500',
  },
];

/* ─── Tech Stack Badges ─── */
export const techStack = [
  'Python',
  'TensorFlow',
  'PyTorch',
  'Scikit-learn',
  'Hugging Face',
  'BERT',
  'GPT',
  'YOLO',
  'OpenCV',
  'Docker',
  'AWS',
  'FastAPI',
  'Pandas',
  'NumPy',
  'LangChain',
  'Git',
  'Linux',
  'MLflow',
];

/* ─── Terminal Phrases ─── */
export const terminalPhrases = [
  'Building Intelligent Systems',
  'Deep Learning Engineer',
  'NLP & Computer Vision',
  'Transforming Data into Insights',
];
