export interface Lead {
  id?: string;
  name: string;
  email: string;
  phone: string;
  serviceType: 'Taxation' | 'Audit' | 'Corporate Advisory' | 'Compliance';
  message?: string;
  createdAt: string;
}

export interface Article {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
}

export interface ComplianceDeadline {
  id?: string;
  title: string;
  date: string;
  category: 'GST' | 'Income Tax' | 'ROC';
  description?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  profession: string;
  content: string;
  rating: number;
  avatar?: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
}
