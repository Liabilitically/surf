'use client';

import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { getApplicantsAndRoleTitle, markCandidateStatus } from "../utilities/firebase";

interface ViewCandidatesProps {
    waveId: string;
    changePage: (page: Page) => void;
}

export default function ViewCandidates(props: ViewCandidatesProps) {
    const [popupStates, setPopupStates] = useState<boolean[]>([]);
    const [candidates, setCandidates] = useState<any[]>([]);
    const [candidateIds, setCandidateIds] = useState<any[]>([]);
    const [title, setTitle] = useState<string>("");

    useEffect(() => {
        const getAllCandidates = async () => {
            const neededWaveData = await getApplicantsAndRoleTitle(props.waveId);
            if (neededWaveData) {
                const tempStudents = neededWaveData?.applicants
                setCandidates(tempStudents);
                setCandidateIds(neededWaveData?.applicantIds);
                setPopupStates(Array(tempStudents.length || 0).fill(false));
                setTitle(neededWaveData?.title);
            } else {
                props.changePage('dashboard');
            }
        }
        getAllCandidates();
    }, [])

    const togglePopup = (index: number) => {
        const newPopupStates = [...popupStates];
        newPopupStates[index] = !newPopupStates[index];
        setPopupStates(newPopupStates);
    };

    const getCurrentApplicationData = (applications: any[]) => {
        for (const application of applications) {
            if (application.waveId == props.waveId) {
                return application;
            }
        }
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-2 space-y-8">
            <a onClick={() => props.changePage('dashboard')} className="cursor-pointer inline-flex bg-black items-center text-md mb-6 py-2 rounded"><span className="mr-2">&larr;</span>Back to Dashboard</a>
            <h1 className="text-5xl font-bold mb-4">{title || "[No Title]"}</h1>
            <p className="text-lg text-white/50">Reviewing {candidates.length || 0} candidates</p>
            <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Candidate</th>
                            <th>University (Major & Grad Year)</th>
                            <th>Skills</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates.length > 0 ? candidates.map((candidate, index) => (
                            <tr key={index}>
                                <td>
                                    <div className="flex flex-col">
                                        <h2 className="font-medium">{candidate.name}</h2>
                                        <p className="text-white/50 text-sm">Applied on {getCurrentApplicationData(candidate.applications)?.applicationDate}</p>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex flex-col">
                                        <h2 className="font-medium">{candidate.university}</h2>
                                        <p className="text-white/50 text-sm">{candidate.major} &bull; {candidate.graduationYear}</p>
                                    </div>
                                </td>
                                <td>{candidate.skills.join(', ')}</td>
                                <td>{getCurrentApplicationData(candidate.applications)?.status}</td>
                                <td>
                                    <a 
                                    className="max-w-fit bg-transparent px-4 py-2 hover:bg-white/10 rounded-xl font-semibold cursor-pointer transition-all duration-100 ease-in-out"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        togglePopup(index);
                                        getCurrentApplicationData(candidate.applications)?.status === 'Not Viewed' && markCandidateStatus(candidateIds[index], getCurrentApplicationData(candidate.applications), 'Viewed');
                                    }}
                                    >
                                        View Profile
                                    </a>
                                    {popupStates[index] && (
                                        <div className="fixed flex inset-0 bg-[rgba(0,0,0,0.7)] items-center justify-center">
                                            <div className="card bg-black border border-white/30 rounded-xl p-6 w-2xl space-y-8">
                                                <h2 className="text-5xl font-bold mb-2">{candidate.name}</h2>
                                                <p>{candidate.university} &bull; {candidate.major} &bull; Class of {candidate.graduationYear}</p>
                                                <h3 className="text-2xl font-semibold mb-2">About</h3>
                                                <p>{candidate.about}</p>
                                                <h3 className="text-2xl font-semibold mb-4">Skills</h3>
                                                <div>{candidate.skills.map((skill: string, skillIndex: number) => <span key={skillIndex} className="bg-white/20 px-3 py-1 rounded-md mr-2">{skill}</span>)}</div>
                                                {candidate.experiences.length > 0 && <h3 className="text-2xl font-semibold mb-4">Experience</h3>}
                                                <div>{candidate.experiences?.map((experience: Experience, experienceIndex: number) => (
                                                    <div className="mb-4" key={experienceIndex}>
                                                        <h4 className="font-semibold">{experience.title}</h4>
                                                        <p className="text-white/60">{experience.organization} &bull; {experience.startDate} - {experience.endDate}</p>
                                                        <p className="text-white/35">{experience.description}</p>
                                                    </div>
                                                ))}</div>
                                                {getCurrentApplicationData(candidate.applications).status === 'Interested' ? (
                                                        <a aria-disabled className="cursor-not-allowed bg-transparent text-center w-full text-md mb-6 py-2">Marked Interested!</a>
                                                    ) : (
                                                        <a id={'interested ' + index} onClick={(e) => {
                                                            e.preventDefault();
                                                            markCandidateStatus(candidateIds[index], getCurrentApplicationData(candidate.applications), 'Interested');
                                                            const a = document.getElementById("interested " + index);
                                                            if (a) {
                                                                a.innerHTML = "Marked Interested!";
                                                                a.setAttribute("aria-disabled", "true");
                                                                a.setAttribute("class_name", "cursor-not-allowed bg-transparent text-center w-full text-md mb-6 py-2");
                                                            }
                                                        }} className="cursor-pointer bg-black text-center w-full text-md mb-6 py-2 rounded-xl border border-white">Mark Interested</a>
                                                    )
                                                }
                                                <button onClick={() => togglePopup(index)}>Close</button>
                                            </div>
                                        </div>)
                                    }
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={6} className="text-center py-20">No candidates yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}