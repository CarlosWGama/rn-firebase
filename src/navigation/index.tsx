import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged, getAuth } from '@firebase/auth';
import CadastroScreen from '../screens/cadastro';
import HomeScreen from '../screens/home';
import LoginScreen from '../screens/login';

export type StackParams = {
    inicial: undefined,
    login: undefined,
    home: undefined
    cadastro: undefined
}

const Stack = createStackNavigator<StackParams>();

export function InicialScreen() {
    const navigation = useNavigation<any>();
    const auth = getAuth();
    onAuthStateChanged(auth, (usuario) => {
        navigation.reset({index: 0, routes:[{name: (usuario ? 'home' : 'login')}]})
    })

    return (<></>);
}

export function NavegacaoPrincipal() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="inicial" component={InicialScreen} options={{headerShown: false}} />
                <Stack.Screen name="login" component={LoginScreen} />
                <Stack.Screen name="home" component={HomeScreen} />
                <Stack.Screen name="cadastro" component={CadastroScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}