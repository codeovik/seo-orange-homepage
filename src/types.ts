export interface SEOMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export interface AuditResult {
  score: number;
  performance: number;
  seoScore: number;
  mobileFriendly: boolean;
  loadTime: string;
  detectedIssues: string[];
  keywordsRanked: number;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  avatar: string;
}
