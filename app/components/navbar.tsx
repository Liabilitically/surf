import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utilities/firebase";
import { useEffect, useState } from "react";

interface NavbarProps {
    currentPage: Page;
    changePage: (page: Page) => void;
}

export default function Navbar(props: NavbarProps) {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const inactiveLinkStyles = "flex cursor-pointer items-center max-w-fit bg-transparent px-4 py-2 hover:bg-white/10 rounded-xl font-semibold transition-all duration-100 ease-in-out";
    const activeLinkStyles = inactiveLinkStyles.replace("bg-transparent", "bg-white/20").replace("hover:bg-white/10", "").replace("cursor-pointer", "cursor-default");
    
    return (
        <nav className="sticky mb-10 top-0 z-50 bg-white/2 backdrop-blur-3xl border-b border-white/10 select-none">
            {user ? (
                <div className="container mx-auto px-4 h-18 flex items-center justify-between">
                    <span className="rounded-xl font-sans text-3xl font-bold tracking-normal text-white group-hover:text-primary/90 transition-colors">
                        surf
                    </span>
                    <div className="flex gap-4">
                        <a
                        aria-disabled={props.currentPage === 'dashboard'}
                        onClick={() => props.changePage('dashboard')}
                        className={props.currentPage === 'dashboard' ? activeLinkStyles : inactiveLinkStyles}>
                            <div className="h-5 w-5">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-view-list" viewBox="0 0 16 16">
                                    <path d="M3 4.5h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zM1 2a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 2m0 12a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 14"/>
                                </svg>
                            </div>
                        </a>
                        <a 
                        onClick={() => props.changePage('profile')}
                        className={props.currentPage === 'profile' ? activeLinkStyles : inactiveLinkStyles}>
                            <div className="h-5 w-5">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                                </svg>
                            </div>
                        </a>
                        <a 
                        onClick={async () => await signOut(auth)}
                        className={inactiveLinkStyles.concat(" border border-red-900 text-red-900").replace("hover:bg-white/10", "hover:bg-red-800/20")}>
                            Sign out
                        </a>
                    </div>
                </div>
            ) : (
                <div className="container mx-auto px-4 h-18 flex items-center justify-between">
                    <div className="flex items-center">
                        <img src="../../favicon.ico" />
                        <span className="cursor-pointer px-4 py-2 hover:bg-white/10 rounded-xl font-sans text-3xl font-bold tracking-normal text-white group-hover:text-primary/90 transition-colors" onClick={() => props.changePage('home')}>
                            surf
                        </span>
                    </div>
                    <a 
                    onClick={() => props.changePage('auth')}
                    className="flex cursor-pointer items-center max-w-fit bg-transparent px-4 py-2 hover:bg-white/10 rounded-xl font-semibold transition-all duration-100 ease-in-out">
                        Sign in
                    </a>
                </div>
            )}
        </nav>
    )
}