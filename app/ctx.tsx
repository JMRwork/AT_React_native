import { useContext, createContext, type PropsWithChildren } from 'react';
import { setStorageItemAsync, useStorageState } from './useStorageState';
import { router } from "expo-router";
import { FirebaseApp, initializeApp } from "firebase/app";
import { login, register } from "@/services/Auth";
import { createTables, dropTable } from "@/services/database";
import { Auth, getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAwHW5I-Zk3pN-N5cHgtqLfHHIdIcRMAY0",
    authDomain: "at-react-native-e3b88.firebaseapp.com",
    databaseURL: "https://at-react-native-e3b88-default-rtdb.firebaseio.com",
    projectId: "at-react-native-e3b88",
    storageBucket: "at-react-native-e3b88.appspot.com",
    messagingSenderId: "1032162024571",
    appId: "1:1032162024571:web:06571a81023430f2fe16de"
};

const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);


const AuthContext = createContext<{
    signIn: (email: string, password: string) => void;
    signOut: () => void;
    signUp: (email: string, password: string) => void;
    firebaseApp?: FirebaseApp | null;
    auth?: Auth | null;
    session?: string | null;
    isLoading: boolean;
    changeTheme: (theme: string) => void;
    theme?: string | null;
    isLoadingTheme: boolean;
}>({
    signIn: () => null,
    signOut: () => null,
    signUp: () => null,
    firebaseApp: firebaseApp,
    auth: auth,
    session: null,
    isLoading: false,
    changeTheme: async (theme: string) => null,
    theme: null,
    isLoadingTheme: false,
    // @ts-ignore
});

// This hook can be used to access the user info.
export function useSession() {
    const value = useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }

    return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');
    const [[isLoadingTheme, theme], setTheme] = useStorageState('theme');

    return (
        <AuthContext.Provider
            value={{
                signIn: (email: string, password: string) => {
                    login(email, password, setSession);
                },
                signOut: async () => {
                    setSession(null);
                    await dropTable("user");
                    await dropTable("fraldas");
                    await createTables();
                    return router.replace("/login");
                },
                signUp: (email: string, password: string) => {
                    // Perform sign-in logic here
                    register(email, password)
                },
                changeTheme: async (theme: string) => {
                    await setStorageItemAsync('theme', theme);
                },
                firebaseApp: firebaseApp,
                session,
                isLoading,
                theme,
                isLoadingTheme,
            }}>
            {children}
        </AuthContext.Provider>
    );
}
