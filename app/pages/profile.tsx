'use client';

import { useEffect, useState } from "react";
import Input from "../components/ui/input";
import { onAuthStateChanged } from "firebase/auth";
import { auth, getProfile, saveProfile } from "../utilities/firebase";

interface ProfileProps {
    role: 'student' | 'startup';
}

export default function Profile(props: ProfileProps) {

    const [user, setUser] = useState<any>(null);

    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [studentProfile, setStudentProfile] = useState<any>({
        name: "",
        university: "",
        major: "",
        graduationYear: "",
        skills: [],
        about: "",
    });

    const [startupProfile, setStartupProfile] = useState<any>({
        name: "",
        industry: "",
        website: "",
        size: "",
        description: ""
    })

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser && !user) {
                const getProfileData = async () => {
                    const profileData = await getProfile(props.role, currentUser.uid);
                    if (typeof profileData != "boolean") {
                        if (props.role === 'startup') {
                            setStartupProfile({name: profileData?.name, industry: profileData?.industry, website: profileData?.website, size: profileData?.size, description:profileData?.description})
                        } else {
                            setStudentProfile({name: profileData?.name, university: profileData?.university, major: profileData?.major, graduationYear: profileData?.graduationYear, skills: profileData?.skills, about: profileData?.about})
                            setExperiences(profileData?.experiences);
                        }
                    } 
                }
                getProfileData();
            }
        });

        return () => unsubscribe();
    }, []);

    //Function to handle change in experience fields
    const handleExperienceChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: 'title' | 'organization' | 'startDate' | 'endDate' | 'description') => {
        const values = [...experiences];
        values[index][field] = event.target.value;
        setExperiences(values);
    }

    //Function to add a new experience
    const handleAddExperience = () => {
        const newExperience: Experience = {
            title: "",
            organization: "",
            startDate: "",
            endDate: "",
            description: ""
        };
        setExperiences([...experiences, newExperience]);
    }

    //Function to remove an experience by index
    const handleRemoveExperience = (index: number) => {
        const values = [...experiences];
        values.splice(index, 1);
        setExperiences(values);
    }

    return (
        <div className="container max-w-2xl mx-auto px-4 pt-8">
            {props.role === 'student' ? (
                <>
                <h1 className="text-5xl font-bold mb-4">Student Profile</h1>
                    <p className="text-lg text-white/50">Keep your profile updated to stand out to startups.</p>
                    <div className="card border border-white/10 bg-white/5 mt-6 rounded-xl">
                        <form className="card-body space-y-6" onSubmit={async (e) => { 
                            e.preventDefault();
                            await saveProfile(studentProfile, user.uid, experiences);
                            alert('Profile Saved!');
                         }}>
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="Full Name" type="text" value={studentProfile.name} onChange={(e) => setStudentProfile({...studentProfile, name: e.target.value})} required={true} />
                                <Input label="Graduation Year" type="number" placeholder="e.g. 2027" value={studentProfile.graduationYear.toString()} onChange={(e) => setStudentProfile({...studentProfile, graduationYear: e.target.value})} required={true} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="University" type="text" value={studentProfile.university} onChange={(e) => setStudentProfile({...studentProfile, university: e.target.value})} required={true} />
                                <Input label="Major" type="text" placeholder="e.g. Computer Science" value={studentProfile.major} onChange={(e) => setStudentProfile({...studentProfile, major: e.target.value})} required={true} />
                            </div>
                            <Input label="Skills" placeholder="e.g. JavaScript, React, Node.js (comma separated)" value={studentProfile.skills.join(", ")} onChange={(e) => setStudentProfile({...studentProfile, skills: e.target.value.split(", ")})} required={true} />
                            <Input label="Short Pitch" type="textarea" placeholder="Tell startups why they should hire you in less than 280 characters..." value={studentProfile.about} onChangeTextArea={(e) => setStudentProfile({...studentProfile, about: e.target.value})} required={true} />
                            <div className="flex items-center justify-between mb-4 gap-2">
                                <h1 className="text-2xl font-semibold">Experience</h1>
                                <button type="button" className="text-sm max-w-fit" style={{backgroundColor: "#000", borderWidth: "1px", color: "#ccc"}} onClick={handleAddExperience}>+ Add Experience</button>
                            </div>
                            {experiences.map((experience, index) => (
                                <div className="relative card border border-white/30 bg-white/2 p-6 pt-8 space-y-6 rounded-xl" key={index}>
                                    <a className="absolute top-0 right-0 mt-4 mr-4 cursor-pointer h-8 w-8 p-2 rounded-lg hover:bg-white/10 flex items-center justify-center" onClick={() => handleRemoveExperience(index)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                        </svg>
                                    </a>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input label="Title" type="text" value={experience.title} onChange={(event) => handleExperienceChange(index, event, 'title')} required={true} />
                                        <Input label="Organization" type="text" value={experience.organization} onChange={(event) => handleExperienceChange(index, event, 'organization')} required={true} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input label="Start Date" type="date" value={experience.startDate} onChange={(event) => handleExperienceChange(index, event, 'startDate')} required={true} />
                                        <Input label="End Date" type="date" value={experience.endDate || ""} onChange={(event) => handleExperienceChange(index, event, 'endDate')} required={false} />
                                    </div>
                                    <Input label="Description" type="textarea" value={experience.description} onChangeTextArea={(event) => handleExperienceChange(index, event, 'description')} placeholder={"Breifly quantify your roles and accomplishments..."} required={true} />
                                </div>
                            ))}
                            <button type="submit">Save Profile</button>
                        </form>
                    </div>
                </>
            ) : (
                <>
                    <h1 className="text-5xl font-bold mb-4">Company Profile</h1>
                    <p className="text-lg text-white/50">This is what students see when applying.</p>
                    <div className="card border border-white/10 bg-white/5 mt-6 rounded-xl">
                        <form className="card-body space-y-6" onSubmit={async (e) => {
                            e.preventDefault();
                            await saveProfile(startupProfile, user.uid);
                            alert('Profile Saved!');
                        }}>
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="Company Name" type="text" value={startupProfile.name} onChange={(e) => setStartupProfile({...startupProfile, name: e.target.value})} required={true} />
                                <Input label="Website" type="url" placeholder="https://" value={startupProfile.website || ""} onChange={(e) => setStartupProfile({...startupProfile, website: e.target.value})} required={false} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="Industry" type="text" value={startupProfile.industry} onChange={(e) => setStartupProfile({...startupProfile, industry: e.target.value})} required={true} />
                                <Input label="Company Size" type="text" placeholder="e.g. 10-50" value={startupProfile.size || ""} onChange={(e) => setStartupProfile({...startupProfile, size: e.target.value})} required={true} />
                            </div>
                            <Input label="Company Description" type="textarea" placeholder="Describe your company culture, values, and mission." value={startupProfile.description} onChangeTextArea={(e) => setStartupProfile({...startupProfile, description: e.target.value})} required={true} />
                            <button type="submit" id="startup_cta">Save Profile</button>
                        </form>
                    </div>
                </>
            )}
        </div>
    )
}