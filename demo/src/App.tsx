import React, { useState } from 'react';
import { LeadsTable } from './components/LeadsTable';
import { Login } from './components/Login';
import { Profile } from './components/Profile';
import { Hexagon, ChevronDown } from 'lucide-react';
import type { Project, Lead } from './types';

// Mock leads data with more entries
const mockLeads: Lead[] = [
  {
    id: 'team-hemant-1',
    company: 'TechVision AI',
    decisionMaker: 'Sarah Chen',
    website: 'techvisionai.com',
    industry: 'Artificial Intelligence',
    productCategory: 'Enterprise Software',
    businessType: 'B2B SaaS',
    internName: 'Alex Johnson',
    headquarters: 'San Francisco, CA',
    employees: '50-100',
    revenue: '$5M-$10M',
    revenueSource: 'Subscriptions',
    linkedIn: 'linkedin.com/company/techvisionai',
    yearFounded: '2019',
    ownerLinkedIn: 'linkedin.com/in/sarahchen',
    ownerAge: '35',
    grade: 'green',
    created_at: '2024-03-15',
    projectId: 'team-hemant',
  },
  {
    id: 'team-hemant-2',
    company: 'CloudScale Solutions',
    decisionMaker: 'Michael Rodriguez',
    website: 'cloudscale.io',
    industry: 'Cloud Computing',
    productCategory: 'Infrastructure',
    businessType: 'B2B',
    internName: 'Emma Wilson',
    headquarters: 'Austin, TX',
    employees: '100-250',
    revenue: '$15M-$20M',
    revenueSource: 'Services & Licensing',
    linkedIn: 'linkedin.com/company/cloudscale',
    yearFounded: '2018',
    ownerLinkedIn: 'linkedin.com/in/mrodriguez',
    ownerAge: '42',
    grade: 'green',
    created_at: '2024-03-14',
    projectId: 'team-hemant',
  },
  {
    id: 'team-ajay-1',
    company: 'HealthTech Innovations',
    decisionMaker: 'Dr. Lisa Park',
    website: 'healthtechinno.com',
    industry: 'Healthcare Technology',
    productCategory: 'Medical Software',
    businessType: 'B2B2C',
    internName: 'David Kim',
    headquarters: 'Boston, MA',
    employees: '25-50',
    revenue: '$2M-$5M',
    revenueSource: 'Licensing',
    linkedIn: 'linkedin.com/company/healthtechinno',
    yearFounded: '2020',
    ownerLinkedIn: 'linkedin.com/in/drlisapark',
    ownerAge: '38',
    grade: 'yellow',
    created_at: '2024-03-13',
    projectId: 'team-ajay',
  },
  {
    id: 'team-ajay-2',
    company: 'EcoSmart Solutions',
    decisionMaker: 'James Wilson',
    website: 'ecosmartsolutions.com',
    industry: 'Clean Technology',
    productCategory: 'Sustainability Software',
    businessType: 'B2B',
    internName: 'Sophie Chen',
    headquarters: 'Portland, OR',
    employees: '10-25',
    revenue: '$1M-$2M',
    revenueSource: 'Subscriptions',
    linkedIn: 'linkedin.com/company/ecosmart',
    yearFounded: '2021',
    ownerLinkedIn: 'linkedin.com/in/jameswilson',
    ownerAge: '45',
    grade: 'yellow',
    created_at: '2024-03-12',
    projectId: 'team-ajay',
  },
  {
    id: 'team-hyon-1',
    company: 'FinTech Dynamics',
    decisionMaker: 'Robert Chang',
    website: 'fintechdynamics.com',
    industry: 'Financial Technology',
    productCategory: 'Payment Solutions',
    businessType: 'B2B2C',
    internName: 'Maria Garcia',
    headquarters: 'New York, NY',
    employees: '250-500',
    revenue: '$25M-$50M',
    revenueSource: 'Transaction Fees',
    linkedIn: 'linkedin.com/company/fintech-dynamics',
    yearFounded: '2017',
    ownerLinkedIn: 'linkedin.com/in/robertchang',
    ownerAge: '48',
    grade: 'green',
    created_at: '2024-03-11',
    projectId: 'team-hyon',
  },
  {
    id: 'team-hyon-2',
    company: 'DataSense Analytics',
    decisionMaker: 'Emily Brown',
    website: 'datasenseanalytics.com',
    industry: 'Data Analytics',
    productCategory: 'Business Intelligence',
    businessType: 'B2B',
    internName: 'Tom Anderson',
    headquarters: 'Seattle, WA',
    employees: '50-100',
    revenue: '$8M-$12M',
    revenueSource: 'Subscriptions & Consulting',
    linkedIn: 'linkedin.com/company/datasense',
    yearFounded: '2019',
    ownerLinkedIn: 'linkedin.com/in/emilybrown',
    ownerAge: '39',
    grade: 'yellow',
    created_at: '2024-03-10',
    projectId: 'team-hyon',
  },
  {
    id: 'team-hemant-3',
    company: 'SmartRetail Solutions',
    decisionMaker: 'Amanda Brown',
    website: 'smartretail.io',
    industry: 'Retail Technology',
    productCategory: 'Point of Sale Systems',
    businessType: 'B2B SaaS',
    internName: 'Tom Wilson',
    headquarters: 'Chicago, IL',
    employees: '75-150',
    revenue: '$8M-$12M',
    revenueSource: 'Subscriptions & Hardware',
    linkedIn: 'linkedin.com/company/smartretail',
    yearFounded: '2018',
    ownerLinkedIn: 'linkedin.com/in/amandabrown',
    ownerAge: '41',
    grade: 'green',
    notes: 'Interested in enterprise package. Follow up next week.',
    created_at: '2024-03-16',
    projectId: 'team-hemant',
  },
  {
    id: 'team-ajay-3',
    company: 'BioTech Innovations',
    decisionMaker: 'Dr. James Smith',
    website: 'biotechinno.com',
    industry: 'Biotechnology',
    productCategory: 'Research Software',
    businessType: 'B2B',
    internName: 'Rachel Chen',
    headquarters: 'Cambridge, MA',
    employees: '30-50',
    revenue: '$3M-$5M',
    revenueSource: 'Licensing',
    linkedIn: 'linkedin.com/company/biotech-inno',
    yearFounded: '2020',
    ownerLinkedIn: 'linkedin.com/in/drjsmith',
    ownerAge: '45',
    grade: 'yellow',
    notes: 'Expanding research department. Schedule demo.',
    created_at: '2024-03-17',
    projectId: 'team-ajay',
  },
  {
    id: 'team-hyon-3',
    company: 'CyberShield Security',
    decisionMaker: 'Mark Thompson',
    website: 'cybershield.tech',
    industry: 'Cybersecurity',
    productCategory: 'Security Software',
    businessType: 'B2B',
    internName: 'Lisa Park',
    headquarters: 'Toronto, ON',
    employees: '100-200',
    revenue: '$15M-$20M',
    revenueSource: 'Subscriptions',
    linkedIn: 'linkedin.com/company/cybershield',
    yearFounded: '2017',
    ownerLinkedIn: 'linkedin.com/in/markthompson',
    ownerAge: '39',
    grade: 'green',
    notes: 'Looking for comprehensive security solution.',
    created_at: '2024-03-18',
    projectId: 'team-hyon',
  }
];

// Mock projects data
const mockProjects: Project[] = [
  {
    id: 'team-hemant',
    name: 'Team Hemant',
    description: 'Enterprise AI and Cloud Solutions',
    created_at: '2024-03-01',
    gradingCriteria: {
      green: 'Revenue > $5M\nB2B SaaS focus\nAI/Cloud industries',
      yellow: 'Revenue $2M-$5M\nTech sector\nGrowth potential',
      red: 'Revenue < $2M\nUnclear business model\nLimited growth',
    },
  },
  {
    id: 'team-ajay',
    name: 'Team Ajay',
    description: 'Healthcare and Sustainability Tech',
    created_at: '2024-03-05',
    gradingCriteria: {
      green: 'Healthcare/Clean Tech\nRegulated industries\nStrong partnerships',
      yellow: 'Related industries\nEarly market fit\nGrowing team',
      red: 'Outside focus industries\nPre-revenue\nEarly stage',
    },
  },
  {
    id: 'team-hyon',
    name: 'Team Hyon',
    description: 'FinTech and Data Analytics',
    created_at: '2024-03-03',
    gradingCriteria: {
      green: 'FinTech leaders\nProven revenue\nStrong team',
      yellow: 'Growing FinTech\nEarly revenue\nMarket potential',
      red: 'No FinTech focus\nNo clear revenue\nMVP stage',
    },
  },
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedProject, setSelectedProject] = useState(mockProjects[0].id);

  const handleLogin = (email: string, password: string) => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <div className="relative w-12 h-12">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-blue-600 rounded-xl transform rotate-45"></div>
                  <div className="absolute inset-2 bg-gradient-to-tl from-emerald-400 to-teal-500 rounded-lg transform -rotate-45"></div>
                  <Hexagon className="absolute inset-3 text-white transform rotate-45" />
                </div>
                <div className="ml-3">
                  <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-700 text-transparent bg-clip-text">
                    SaaSQuatch
                  </span>
                  <span className="block text-xs text-gray-500 -mt-1">by Caprae Capital</span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setShowProfile(true)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-medium">
                  JD
                </div>
                <span>John Doe</span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LeadsTable 
          data={mockLeads.filter(lead => lead.projectId === selectedProject)} 
          projects={mockProjects}
          selectedProject={selectedProject}
          onProjectChange={setSelectedProject}
        />
      </main>

      {showProfile && <Profile onClose={() => setShowProfile(false)} />}
    </div>
  );
}

export default App;