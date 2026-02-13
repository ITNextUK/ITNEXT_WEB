
export interface NavItem {
  label: string;
  path: string;
}

export interface FocusArea {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
}

export interface InsightPost {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  author: string;
}
