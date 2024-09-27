import { Button, Grid, TextInput, TopBar } from "@/components";
import { useEffect, useState } from "react";
import { Text } from "react-native-paper";
import { useSession } from "../ctx";
import { select, update } from "@/services/database";

export default function RegistroFraldasScreen() {
  const { session } = useSession();
  const [novaFraldas, setNovaFraldas] = useState(0);
  const [atualFraldas, setAtualFraldas] = useState(0);
  const [validacao, setValidacao] = useState(null);

  useEffect(() => {
    loadFraldas();
    //onValue(ref(database, "fraldas"), snapshot => { if (snapshot.exists()) { setAtualFraldas(snapshot.val().quantidade) } })
  })

  async function loadFraldas() {
    const fraldas = await select('fraldas', ['quantidade'], `uid = '${session}'`, false);
    setAtualFraldas(fraldas.quantidade);
  }

  function handleAdicionar() {
    if (isNaN(novaFraldas)) {
      setValidacao("Entre com um número inteiro válido.");
    } else {
      update("fraldas", { uid: session, quantidade: atualFraldas + novaFraldas, sync: 1 }, session, true)
      setAtualFraldas(atualFraldas + novaFraldas);
      setValidacao(null);
    }
  }

  return (<Grid style={{ width: "100%" }}>
    <TopBar title="Registro de Fraldas" />
    <Grid >
      <Text style={{ textAlign: "center", margin: 10 }}>Quantidade atual de fraldas: {atualFraldas}</Text>
    </Grid>
    <Grid style={{ textAlign: "center", padding: 12, border: "1px solid black" }}>
      <TextInput keyboardType={'numeric'} label="Quantidade de Fraldas a serem adicionadas" value={novaFraldas} onChangeText={quantidade => setNovaFraldas(parseInt(quantidade))} />
      <Button onPress={handleAdicionar}>Adicionar Fraldas</Button>
      {validacao ? <Text style={{ color: "red" }}>{validacao}</Text> : null}
    </Grid>
  </Grid>);
}
