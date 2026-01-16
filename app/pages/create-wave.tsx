'use client';

import { useState } from "react";
import Input from "../components/ui/input";
import { createHiringWave } from "../utilities/firebase";

interface CreateWaveFormProps {
    changePage: (page: Page) => void;
    startupId: string;
}

export default function CreateWaveForm(props: CreateWaveFormProps) {
    const [formData, setFormData] = useState<HiringWave>({
        title: "",
        company: "",
        description: "",
        skillsRequired: [],
        preferedMajors: [],
        preferedGraduationYears: [],
        location: "",
        startDate: "",
        endDate: "",
        applicants: [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createHiringWave(formData, props.startupId);
        props.changePage('dashboard');
    }

    return (
        <div className="container max-w-2xl mx-auto px-4 py-8">
            <a onClick={() => props.changePage('dashboard')} className="cursor-pointer inline-flex bg-black items-center text-md mb-6 py-2 rounded"><span className="mr-2">&larr;</span>Back to Dashboard</a>
            <h1 className="text-5xl font-bold mb-10">Create Hiring Wave</h1>
            <form className="w-full space-y-8" onSubmit={handleSubmit}>
                <Input label="Role Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="e.g. Summer 2024 Software Engineering Intern" required={true} />
                <div className="grid grid-cols-2 gap-4">
                    <Input label="Start Date" type="date" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} required={true} />
                    <Input label="End Date" type="date" value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})} required={true} />
                </div>
                <Input label="Required Skills" value={formData.skillsRequired.join(', ')} onChange={(e) => setFormData({...formData, skillsRequired: e.target.value.split(',').map(s => s.trim())})} placeholder="e.g. JavaScript, React, Node.js (comma separated)" required={true} />
                <Input label="Preferred Majors" value={formData.preferedMajors.join(', ')} onChange={(e) => setFormData({...formData, preferedMajors: e.target.value.split(',').map(s => s.trim())})} placeholder="e.g. Computer Science, Software Engineering (comma separated)" required={true} />
                <Input label="Preferred Graduation Years" value={formData.preferedGraduationYears.join(', ')} onChange={(e) => setFormData({...formData, preferedGraduationYears: e.target.value.split(',').map(s => s.trim())})} placeholder="e.g. 2024, 2025 (comma separated)" required={true} />
                <Input label="Locations" value={formData.location || ""} onChange={(e) => setFormData({...formData, location: e.target.value})} placeholder="e.g. Remote, New York, San Francisco (comma separated)" />
                <Input label="Role Description" type="textarea" value={formData.description} onChangeTextArea={(e) => setFormData({...formData, description: e.target.value})} placeholder="Breifly describe the role, responsibilities, pay, and any other relevant information." required={true} />
                <button type="submit">
                    Create Wave
                </button>
            </form>
        </div>
    )
}