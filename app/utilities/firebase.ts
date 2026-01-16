import { initializeApp } from "firebase/app";
import { addDoc, arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }

export async function createNewUser(role: string, email: string, password: string) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const studentData: Student = {
            name: "",
            university: "",
            major: "",
            graduationYear: "",
            skills: [],
            about: "",
            experiences: [],
            applications: []
        }

        const startupData: Startup = {
            name: "",
            industry: "",
            website: "",
            size: "",
            description: "",
            hiringWaves: []
        }

        await setDoc(doc(db, role === 'startup' ? "Startups" : "Students", userCredential.user.uid), role === 'startup' ? startupData : studentData);
    } catch (e) {
        alert("createNewUser: " + e);
        return false;
    }
}

export async function signInUser(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password)
        .catch((e) => {alert("signInUser: " + e)})
}

export async function isStartup(uid: string) {
    try {return (await getDoc(doc(db, "Startups", uid))).exists()}
    catch (e) {
        alert("isStartup: " +  e);
    }
}

export async function getApplicantsAndRoleTitle(waveId: string) {
    try {
        const waveData = (await getDoc(doc(db, "HiringWaves", waveId))).data()
        const title = waveData?.title;
        const applicantIds = waveData?.applicants;
        let applicants = []
        if (applicantIds.length > 0) {
            for (const id of applicantIds) {
                applicants.push((await getDoc(doc(db, "Students", id))).data()); //TODO: Fix the relevant in view-candidates
            }
        }
        return {applicants, title, applicantIds}
    } catch (e) {
        alert("getApplicantsAndRoleTitle: " + e);
        return false;
    }
}

export async function getHiringWaves(startupId?: string) {
    try {
        let hiringWaves = [];
        let hiringWaveIds = [];
        if (startupId) {
            hiringWaveIds = (await getDoc(doc(db, "Startups", startupId))).data()?.hiringWaves
            if (hiringWaveIds) {
                for (const id of hiringWaveIds) {
                    hiringWaves.push((await getDoc(doc(db, "HiringWaves", id))).data());
                }
            }
            else return false;
        } else {
            const querySnapshot = await getDocs(collection(db, "HiringWaves"));
            querySnapshot.forEach((wave) => {
                hiringWaves.push(wave.data());
                hiringWaveIds.push(wave.id);
            });
        }
        return {hiringWaveIds, hiringWaves};
    } catch (e) {
        alert("getHiringWaves: " + e);
        return false;
    }
}

export async function createHiringWave(formData: HiringWave, startupId: string) {
    try {
        const waveRef = await addDoc(collection(db, "HiringWaves"), formData)
        await updateDoc(doc(db, "Startups", startupId), {
            hiringWaves: arrayUnion(waveRef.id)
        })
    } catch (e) {alert("createHiringWave: " + e)}
}

export async function optInToHiringWave(studentId: string, waveId: string) {
    try {
       await updateDoc(doc(db, "Students", studentId), {
            applications: arrayUnion({waveId: waveId, applicationDate: (new Date()).toLocaleDateString('en-US'), status: 'Not Viewed'})
       });
       await updateDoc(doc(db, "HiringWaves", waveId), {
            applicants: arrayUnion(studentId)
       })
    } catch (e) {alert("optInToHiringWave: " + e)};
}

export async function getStudentApplications(studentId: string) {
    try {return (await getDoc(doc(db, "Students", studentId))).data()?.applications;}
    catch (e) {
        alert("getStudentApplications: " + e);
        return false;
    }
}

export async function getProfile(role: 'student' | 'startup', uid: string) {
    try {return (await getDoc(doc(db, role === 'student' ? 'Students' : 'Startups', uid))).data()}
    catch (e) {
        alert("getProfile: " + e);
        return false;
    }
}

export async function saveProfile(profileInfo: any, uid: string, experiences?: Experience[]) {
    try {
        const tempStudentProfile = profileInfo;
        if (experiences) {
            tempStudentProfile.experiences = experiences;
        }
        await updateDoc(doc(db, experiences ? 'Students' : 'Startups', uid), profileInfo)
    } catch (e) {
        alert("saveProfile: " + e)
    }
}

export async function markCandidateStatus(studentId: string, applicationData: any, status: string) {
    try {
        console.log(applicationData);
        const docRef = doc(db, "Students", studentId);
        await updateDoc(docRef, {
            applications: arrayRemove(applicationData)
        });
        let tempApplicationData = applicationData;
        tempApplicationData.status = status;
        console.log(tempApplicationData);
        await updateDoc(docRef, {
            applications: arrayUnion(tempApplicationData)
        });
    } catch (e) {
        alert("markCandidateStatus: " + e);
    }
}