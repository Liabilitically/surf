interface PageProps {
    changePage: (page: Page) => void;
}

export default function Home(props: PageProps) {
    return (
        <div className="px-10 md:px-30">
            <div className="flex flex-col max-w-4xl mx-auto items-center justify-center min-h-[80vh] bg-black font-sans">
                <h1 className="text-7xl md:text-8xl text-center font-extrabold mb-10">Hiring on Steroids</h1>
                <h3 className="text-md md:text-2xl max-w-xl text-center font-normal mb-20">The place where top-tier startups meet top-tier interns through recruiting waves.</h3>
                <div className="grid grid-cols-2 gap-6">
                    <a onClick={() => props.changePage('auth')} className="btn w-fit bg-black border border-white text-white px-8 py-6 rounded-full font-bold tracking-wide">I'm a Student</a>
                    <a onClick={() => props.changePage('auth')} className="btn w-fit bg-white text-black px-8 py-6 rounded-full font-bold tracking-wide">I'm a Startup</a>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-10 pb-50 gap-8 font-sans">
                <div className="bg-[rgb(20,20,20)] rounded-2xl py-15 px-12 border border-white/10">
                    <div className="p-3 w-12 h-12 min-w-fit mb-8 bg-white rounded-2xl flex items-center justify-center text-[rgb(20,20,20)]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
                        </svg>
                    </div>
                    <h2 className="text-2xl text-white font-bold mb-4">Curated Waves</h2>
                    <h3 className="text-md text-[rgb(150,150,150)] tracking-wide">Recruitment happens in focused 4-week cycles. No endless scrolling, just focused hiring.</h3>
                </div>
                <div className="bg-[rgb(20,20,20)] rounded-2xl py-15 px-12 border border-white/10">
                    <div className="p-3 w-12 h-12 min-w-fit mb-8 bg-white rounded-2xl flex items-center justify-center text-[rgb(20,20,20)]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-patch-check" viewBox="0 0 16 16">
                            <path d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                            <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z"/>
                        </svg>
                    </div>
                    <h2 className="text-2xl text-white font-bold mb-4">Top 1% Talent</h2>
                    <h3 className="text-md text-[rgb(150,150,150)] tracking-wide">We verify university credentials and curate profiles to ensure high signal-to-noise ratio.</h3>
                </div>
                <div className="bg-[rgb(20,20,20)] rounded-2xl py-15 px-12 border border-white/10">
                    <div className="p-3 w-12 h-12 min-w-fit mb-8 bg-white rounded-2xl flex items-center justify-center text-[rgb(20,20,20)]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-view-stacked" viewBox="0 0 16 16">
                            <path d="M3 0h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm0 8h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z"/>
                        </svg>
                    </div>
                    <h2 className="text-2xl text-white font-bold mb-4">Standardized Process</h2>
                    <h3 className="text-md text-[rgb(150,150,150)] tracking-wide">One common application profile. Opt-in to startups with a single click.</h3>
                </div>
            </div>
        </div>
    )
}