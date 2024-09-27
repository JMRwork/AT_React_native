import { Grid, Button, TextInput } from "@/components";
import { useSession } from "./ctx";
import { Link } from "expo-router";
import { ScrollView } from "react-native";
import { useState } from "react";

export default function RegisterScreen() {
    const { signUp } = useSession();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleRegistrar() {
        signUp(email, password);
    }

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            width: '90%',
            marginTop: 6
        },
        padding: { padding: 12 }
    }

    return (
        <ScrollView>
            <Grid style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%" }}>
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
                    gap: 30,
                    alignItems: 'center',
                    textAlign: 'center'
                }}>
                    <Button mode="contained" onPress={handleRegistrar}>Registrar</Button>
                    {/*@ts-ignore*/}
                    <Link href="login">
                        Login
                    </Link>
                </Grid>
            </Grid>
        </ScrollView>
    );
}