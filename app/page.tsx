'use client';

import CreateWavePage from "./pages/create-wave";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./pages/home";
import ViewCandidates from "./pages/view-candidates";
import Profile from "./pages/profile";
import Dashboard from "./pages/dashboard";
import Authentication from "./pages/authentication";
import { useEffect, useState } from "react";
import { auth, isStartup } from "./utilities/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "./loading";

export default function MainPage() {

  const [page, setPage] =  useState<Page>('dashboard');
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<'startup' | 'student' | null>(null);
  const [waveId, setWaveId] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setRole(await isStartup(currentUser.uid) ? 'startup' : 'student');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-black">
      <Navbar currentPage={page} changePage={setPage} />
      <main className="flex-1">
        {
          !user && page === 'auth' ? <Authentication changePage={setPage} />
          : !user ? <Home changePage={setPage} /> 
          : page === 'home' ? <Home changePage={setPage} /> 
          : page === 'auth' ? <Authentication changePage={setPage} /> 
          : !role ? <Loading /> : page === 'profile' ? <Profile role={role} /> 
          : page === 'create-wave' ? <CreateWavePage changePage={setPage} startupId={user.uid} /> 
          : page === 'view-candidates' ? <ViewCandidates changePage={setPage} waveId={waveId} /> 
          : <Dashboard id={user.uid} role={role} changeWaveId={setWaveId} changePage={setPage} />
        }
      </main>
      <Footer />
    </div>
  );
}
