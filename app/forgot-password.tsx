import { Button, Grid, TextInput } from "@/components";
import { Link } from "expo-router";
import { useState } from "react";
import { useSession } from "./ctx";
import { novaSenha } from "@/services/Auth";
import { Text } from "react-native-paper";

export default function forgotPasswordScreen() {
    const { auth } = useSession();
    const [email, setEmail] = useState('');

    function handleNovaSenha() {
        novaSenha(auth, email);
    }

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            width: '90%',
            marginTop: 10
        },
        padding: { padding: 12 }
    }


    return (
        <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: "center", width: "100%" }}>
            <Grid style={{ ...styles.container }}>
                <Text style={{ textAlign: "center" }}>Esqueceu a senha? Digite o seu email de Login para recuperar a senha.</Text>
            </Grid>
            <Grid style={{ ...styles.container }}>
                <TextInput value={email} onChangeText={emailText => setEmail(emailText)} style={{ ...styles.padding }} label="Email" mode='outlined' />
            </Grid>
            <Grid style={{ ...styles.container, gap: 30 }}>
                <Button onPress={handleNovaSenha}>Enviar Email</Button>
                <Link style={{ textAlign: "center" }} href={"/login"}>Voltar para Login</Link>
            </Grid>
        </Grid>)
}