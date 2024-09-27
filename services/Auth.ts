import { router } from "expo-router";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, UserCredential, getAuth } from "@firebase/auth";
import { UserInterface } from "@/interfaces/User";
import { insert, populateDatabase } from "./database";

export const login = async (email: string, password: string, setSession: any) => {
    const auth = getAuth();
    try {
        const response: UserCredential = await signInWithEmailAndPassword(auth, email, password);
        const user: any = response.user.toJSON();

        const _user: UserInterface = {
            email: user.email ? user.email : "",
            emailVerified: user.emailVerified.toString(),
            displayName: user.displayName ? user.displayName : "",
            uid: user.uid,
            username: "",
            photoURL: user.photoURL ? user.photoURL : "",
            phoneNumber: user.phoneNumber ? user.phoneNumber : "",
            createdAt: user.createdAt,
            sync: 1
        };

        await insert('user', _user, user.uid, false);
        await populateDatabase(user.uid);
        setSession(user.uid);
        alert("Login sucessfull");
        router.replace("(tabs)");
    } catch (error) {
        alert('Error during login: ' + error);
    }

}


export const register = async (email: string, senha: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, senha)
        .then((user) => {
            alert("Cadastrado");
            router.replace('/login');
        })
        .catch((err) => { alert("Erro ao cadastrar: " + err); })
}

export const novaSenha = async (email: string) => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
        .then(() => { alert("Email enviado."); })
        .catch(error => { alert("Erro ao enviar email: " + error) });
}