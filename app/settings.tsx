import { Grid, Radio, TopBar } from "@/components";
import { useSession } from "./ctx";
import { useEffect, useState } from "react";
import RadioGroup from "@/components/radio/radiogroup";

export default function ConfiguracoesScreen() {
    const { changeTheme, theme } = useSession();
    const [valueChecked, setValueChecked] = useState("default");

    useEffect(() => {
        changeTheme(valueChecked);
    }, [valueChecked]);

    return <Grid>
        <TopBar
            title="Configurações"
            back={true}
            menu={false} />
        <Grid>
            <RadioGroup>
                <Radio
                    valueChecked={valueChecked}
                    setValueChecked={setValueChecked}
                    radios={[
                        { value: "default", label: "Default" },
                        { value: "dark", label: "Dark" },
                    ]} />
            </RadioGroup>
        </Grid>
    </Grid>
}