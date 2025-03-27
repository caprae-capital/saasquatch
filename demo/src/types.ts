export interface Lead {
  id: string;
  company: string;
  decisionMaker: string;
  website: string;
  industry: string;
  productCategory: string;
  businessType: string;
  internName: string;
  headquarters: string;
  employees: string;
  revenue: string;
  revenueSource: string;
  linkedIn: string;
  yearFounded: string;
  ownerLinkedIn: string;
  ownerAge: string;
  grade: 'red' | 'yellow' | 'green' | null;
  notes?: string;
  created_at: string;
  projectId: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  created_at: string;
  gradingCriteria?: {
    green: string;
    yellow: string;
    red: string;
  };
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
  projectId?: string;
  spreadsheetUrl?: string;
  lastSync?: string | null;
  avatar?: string;
}

export interface GoogleSheetConfig {
  spreadsheetId: string;
  sheetName: string;
  headerRow: number;
  mappings: {
    name: string;
    email: string;
    phone: string;
    company: string;
    [key: string]: string;
  };
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'member';
  name: string;
  created_at: string;
}