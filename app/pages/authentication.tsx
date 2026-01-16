'use client';

import Input from "../components/ui/input";
import { useState } from "react";
import { createNewUser, signInUser } from "../utilities/firebase";

export default function Authentication({changePage}:{changePage: (page: Page) => void}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<string>('student');

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        await signInUser(email, password);
        changePage('dashboard');
    }

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        await createNewUser(role, email, password);
        changePage('dashboard');
    }

    return (
        <div className="flex flex-col justify-center items-center mx-auto transition-all duration-600 ease-in-out px-10">
            <h1 className="text-5xl font-bold mb-4">surf</h1>
            <p className="text-lg text-white/50 mb-8">Sign in to your account or create a new one.</p>
            <div className="tabs grid grid-cols-2 w-full max-w-md">
                <input type="radio" name="tab_option" className="tab checked:bg-white rounded-l-xl checked:text-black bg-white/5 text-white/80 mb-8" aria-label="Login" defaultChecked />
                <div className="tab-content bg-white/5 rounded-xl border-white/10 h-fit p-4 col-span-2">
                    <form className="card-body space-y-6" onSubmit={handleSignIn}>
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-2">Welcome back</h3>
                            <p className="text-white/50">Enter your credentials to login.</p>
                        </div>
                        <Input label="Email" type="email" required={true} value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Input label="Password" type="password" required={true} value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit">Login</button>
                    </form>
                </div>

                <input type="radio" name="tab_option" className="tab checked:bg-white rounded-r-xl checked:text-black bg-white/5 text-white/80 mb-8" aria-label="Register" />
                <div className="tab-content bg-white/5 rounded-xl border-white/10 h-fit p-4 col-span-2">
                    <form className="card-body space-y-6" onSubmit={handleSignUp}>
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-2">Create an account</h3>
                            <p className="text-white/50">Join the platform to start hiring or get hired.</p>
                        </div>
                        <h4 className="text-md font-normal mb-2">Role *</h4>
                        <div className="tabs grid grid-cols-2">
                            <input type="radio" value={'student'} name="role_option" className="tab checked:bg-white rounded-l-xl checked:text-black bg-white/5 text-white/80" aria-label="Student" checked={role === 'student'} onChange={(e) => setRole(e.target.value)} />
                            <input type="radio" value={'startup'} name="role_option" className="tab checked:bg-white rounded-r-xl checked:text-black bg-white/5 text-white/80" aria-label="Employer" checked={role === 'startup'} onChange={(e) => setRole(e.target.value)} />
                        </div>
                        <Input label="Email" type="email" required={true} value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Input label="Password" type="password" required={true} value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit">Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}