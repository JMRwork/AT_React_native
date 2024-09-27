import { Button, Grid, TopBar } from "@/components";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { Text } from "react-native-paper";
import { useSession } from "../ctx";
import { select, update } from "@/services/database";

export default function HomeScreen() {
  const { session } = useSession()
  const [atualFraldas, setAtualFraldas] = useState(0);


  useEffect(() => {
    loadFraldas();
    //onValue(ref(database, "fraldas"), snapshot => { if (snapshot.exists()) { setAtualFraldas(snapshot.val().quantidade) } 
  });

  async function loadFraldas() {
    const fraldas = await select('fraldas', ['quantidade'], `uid = '${session}'`, false);
    setAtualFraldas(fraldas.quantidade);
  }

  function handleRemover() {
    if (atualFraldas > 0) {
      update("fraldas", { uid: session, quantidade: atualFraldas - 1, sync: 1 }, session, true);
      setAtualFraldas(atualFraldas - 1);
    }

  }

  return (
    <Grid>
      <TopBar title="Gerenciador de Fraldas" />
      <Grid style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
        <Text>Bem-vindo ao gerenciador de fraldas.</Text>
        <Text>Você possui atualmente {atualFraldas} fraldas</Text>
        <Button onPress={handleRemover}>Fralda utilizada</Button>
      </Grid>
      {atualFraldas <= 10 ? atualFraldas === 0 ? <Text style={{ textAlign: "center", marginTop: 10, color: "red", fontSize: 24 }}>As fraldas acabaram</Text> : <Text style={{ textAlign: "center", marginTop: "10px", color: "orange", fontSize: 24 }}>As fraldas estão acabando</Text> : null}
    </Grid>
  );
}

