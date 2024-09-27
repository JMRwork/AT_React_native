import { Button, TextInput, Grid } from "@/components";
import { Link } from "expo-router";
import { useSession } from "./ctx";
import { ScrollView } from "react-native";
import { useState } from "react";
import { Text } from "react-native-paper";

export default function LoginScreen() {
    const { signIn } = useSession();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin() {
        signIn(email, password);
    }
    const styles = {
        container: {
            display: "flex",
            width: "90%",
            justifyContent: 'center',
            marginTop: 6
        },
        padding: { padding: 12 },
    }

    return (
        <ScrollView>
            <Grid style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                <Grid style={{
                    ...styles.container,
                }}>
                    <TextInput value={email} onChangeText={emailText => setEmail(emailText)} style={{ ...styles.padding }} label="Email" mode='outlined' />
                </Grid>
                <Grid style={{
                    ...styles.container,
                }}>
                    <TextInput value={password} onChangeText={passwordText => setPassword(passwordText)} style={{ ...styles.padding }} label="Password" secureTextEntry mode='outlined' />
                </Grid>
                <Grid style={{
                    ...styles.padding,
                    ...styles.container,
                    alignItems: 'center',
                    gap: 30,
                    textAlign: 'center'
                }}>
                    <Button mode="contained" onPress={handleLogin}>Entrar</Button>
                    {/*@ts-ignore*/}
                    <Link href="/register">
                        Criar conta

                    </Link>
                    <Link href="/forgot-password">
                        Esqueci minha senha
                    </Link>
                </Grid>
            </Grid>
        </ScrollView>
    );

}