import axios from 'axios';
import { GoogleAuthProvider, confirmPasswordReset, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import Cookies from 'js-cookie';
import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
export const AuthContext = createContext(null);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const createuser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);

    }
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }
    const updateuserProfile = (name) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
        })

    }
    const resetPassowrd = (email) => {
        return sendPasswordResetEmail(auth, email)
    }
    const setNewpassword = (oobCode, password) => {
        return confirmPasswordReset(auth, oobCode, password)
    }
    // const emailVerification = () => {
    //     return sendEmailVerification(auth.currentUser)
    // }
    const expires = new Date();
    expires.setHours(expires.getHours() + 1);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);

            //get and send token
            if (currentUser) {
                axios.post('https://coffeeshop-server-sandy.vercel.app/jwt', { email: currentUser.email })
                    .then(data => {
                        Cookies.set('access_token', data.data.token, { expires });
                    })
            }
            else {
                Cookies.remove('access_token');
            }

            setLoading(false);
        })
        return () => {
            return unsubscribe;
        }
    }, [])
    const authInfo = {
        user,
        loading,
        createuser,
        googleLogin,
        signIn,
        logOut,
        updateuserProfile,
        resetPassowrd,
        setNewpassword,
        // emailVerification
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;