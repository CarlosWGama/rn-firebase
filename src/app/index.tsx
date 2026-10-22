import { useRouter } from "expo-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Text, View } from "react-native";


export default function InicialScreen() {
    const router = useRouter();
    const auth = getAuth();
    onAuthStateChanged(auth, (usuario) => {
        router.replace(usuario ? '/home' : '/login')
    })
    //Tela de carregamento
    return (<View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
        <Text style={{fontSize: 40}}>Carregando...</Text>
    </View>);
}
