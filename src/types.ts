export type ServiceType = 
  | 'AI Website Design & Development'
  | 'AI Video & Reels Creation'
  | 'AI Voice Generation'
  | 'Custom CRM Setup'
  | 'Internship / Other Opportunity';

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  iconName: 'layout' | 'video' | 'mic' | 'workflow';
  deliverables: string[];
  techTags: string[];
  serviceTypeValue: ServiceType;
}

export type ProjectCategory = 'all' | 'web' | 'ai-media' | 'automation';

export interface ProjectItem {
  id: string;
  title: string;
  tag: string;
  category: ProjectCategory;
  summary: string;
  description: string;
  highlights: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  badge: string;
  metrics?: { label: string; value: string }[];
  techStack?: string[];
  architectureNote?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  service: ServiceType | '';
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof ContactFormData, string>>;
}
