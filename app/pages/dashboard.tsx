'use client';

import { useEffect, useState } from "react";
import { getHiringWaves, getStudentApplications, optInToHiringWave } from "../utilities/firebase";

interface DashboardProps {
    role: 'student' | 'startup';
    id: string;
    changePage: (page: Page) => void;
    changeWaveId: (waveId: string) => void;
}

export default function Dashboard(props: DashboardProps) {
    const [waves, setWaves] = useState<any[]>([]);
    const [waveIds, setWaveIds] = useState<any>([]);
    const [appliedWaves, setAppliedWaves] = useState<any[]>([]);
    const [appliedWaveIds, setAppliedWaveIds] = useState<any[]>([]);

    useEffect(()=> {
        const initialize = async () => {
            const hiringWaveInfo = await getHiringWaves(props.role === 'startup' ? props.id : undefined);
            if (hiringWaveInfo) {
                const {hiringWaveIds, hiringWaves} = hiringWaveInfo;
                setWaveIds(hiringWaveIds);
                if (typeof hiringWaves != "boolean") {
                    setWaves(hiringWaves);
                }
            }

            if (props.role === 'student') {
                const applications = await getStudentApplications(props.id);
                if (applications) {
                    setAppliedWaves(applications);
                    const applicationWaveIds = []
                    for (const appliedWave of applications) {
                        applicationWaveIds.push(appliedWave.waveId);
                    }
                    setAppliedWaveIds(applicationWaveIds);
                }
            }
        }
        initialize();
    }, []);

    return (
        <div className="container mx-auto px-4 py-2 space-y-8">
            {props.role === 'student' ? (
                <>
                    <h1 className="text-5xl font-bold mb-4">Student Dashboard</h1>
                    <p className="text-lg text-white/ mb-12">Browse active hiring waves and track your status.</p>
                    {waves.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {waves.map((wave, index) => (
                                <div key={index} className="card border border-white/10 bg-white/10 rounded-xl">
                                    <div className="card-body p-8">
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-4xl font-bold mb-1">{wave.title}</h2>
                                            {appliedWaveIds.includes(waveIds[index]) && <span className="bg-white/20 px-2 py-1 rounded-xl">{appliedWaves[appliedWaveIds.indexOf(waveIds[index])]?.status}</span>}
                                        </div>
                                        <div className="flex w-fit gap-4 items-center mb-8">
                                            <div className="h-4 w-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-buildings-fill" viewBox="0 0 16 16">
                                                    <path d="M15 .5a.5.5 0 0 0-.724-.447l-8 4A.5.5 0 0 0 6 4.5v3.14L.342 9.526A.5.5 0 0 0 0 10v5.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V14h1v1.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5zM2 11h1v1H2zm2 0h1v1H4zm-1 2v1H2v-1zm1 0h1v1H4zm9-10v1h-1V3zM8 5h1v1H8zm1 2v1H8V7zM8 9h1v1H8zm2 0h1v1h-1zm-1 2v1H8v-1zm1 0h1v1h-1zm3-2v1h-1V9zm-1 2h1v1h-1zm-2-4h1v1h-1zm3 0v1h-1V7zm-2-2v1h-1V5zm1 0h1v1h-1z"/>
                                                </svg>
                                            </div>
                                            <p className="text-lg">{wave.company}</p>
                                        </div>
                                        <p className="text-white/70 mb-2 tracking-wide text-sm">{wave.description}</p>
                                        <div className="flex gap-2 mb-6">
                                            {wave.skillsRequired?.map((skill: string, index: number) => (
                                                <span key={index} className="badge bg-transparent text-xs text-white/50 tracking-wide border border-white/10">{skill}</span>
                                            ))}
                                        </div>
                                        <div>
                                            <div className="flex w-fit gap-2 items-center mb-6">
                                                <div className="h-4 w-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="gray" className="bi bi-calendar" viewBox="0 0 16 16">
                                                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                                                    </svg>
                                                </div>
                                                <p className="text-white/50 text-md">Ends in {wave.endDate.replaceAll("-","/")}</p>
                                            </div>
                                            {appliedWaveIds.includes(waveIds[index]) ? (
                                                    <button disabled>Opted In!</button>
                                                ) : (
                                                    <button id={"btn "+index} onClick={async () => {
                                                        await optInToHiringWave(props.id, waveIds[index]);
                                                        const button = document.getElementById("btn " + index);
                                                        if (button) {
                                                            button.innerHTML = "Opted In!";
                                                            button.setAttribute("disabled", "true");
                                                        }
                                                    }}>Opt In</button>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                            <div className="text-center mt-40">There aren't any active Hiring Waves currently. Try re-loading the page. Otherwise, check back later.</div>
                        )
                    }
                </>
            ) : (
                <>
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h1 className="text-5xl font-bold mb-4">Startup Dashboard</h1>
                            <p className="text-lg text-white/50">Manage hiring waves and review candidates.</p>
                        </div>
                        <button className="max-w-fit" onClick={() => props.changePage('create-wave')}>Create Wave<span className="ml-2 text-xl">+</span></button>
                    </div>
                    <h2 className="text-3xl font-bold">Your Hiring Waves</h2>
                    {waves.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {waves?.map((wave, index) => (
                                <div key={index} className="card border border-white/10 bg-white/10 rounded-xl">
                                    <div className="card-body p-8">
                                        <h2 className="text-2xl font-bold mb-2">{wave.title}</h2>
                                        <p className="text-white/50 mb-8 text-md">{wave.startDate.replaceAll('-','/')} to {wave.endDate.replaceAll('-','/')}</p>
                                        <button onClick={() => {props.changeWaveId(waveIds[index]); props.changePage('view-candidates')}}>View Candidates</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        ) : (
                            <h2 className="text-center mt-40">You have no Hiring Waves currently. Click the Create Wave button to get started.</h2>
                        )
                    }
                </>
            )}
        </div>
    )
}