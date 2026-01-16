type Student = {
    name: string;
    university: string;
    major: string;
    graduationYear: string;
    skills: string[];
    about: string;
    experiences: Experience[];
    applications: {applicationDate: string, status: 'Not Viewed' | 'Viewed' | 'Interested'}[];
};

type Page = 'home' |'auth' | 'dashboard' | 'profile' | 'create-wave' | 'view-candidates';

type Startup = {
    name: string;
    industry: string;
    website?: string;
    size?: string;
    description: string;
    hiringWaves: string[];
};

type HiringWave = {
    title: string;
    company: string;
    description: string;
    skillsRequired: string[];
    preferedMajors: string[];
    preferedGraduationYears: string[];
    location?: string;
    startDate: string;
    endDate: string;
    applicants: string[];
};

type Experience = {
    title: string;
    organization: string;
    startDate: string;
    endDate?: string;
    description: string;
};