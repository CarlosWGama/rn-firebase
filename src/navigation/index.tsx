import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CadastroScreen from '../screens/cadastro';

import HomeScreen from '../screens/home';
import LoginScreen from '../screens/login';

export type StackParams = {
    login: undefined,
    home: undefined
    cadastro: undefined
}

const Stack = createStackNavigator<StackParams>();

export function NavegacaoPrincipal() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="login" component={LoginScreen} />
                <Stack.Screen name="home" component={HomeScreen} />
                <Stack.Screen name="cadastro" component={CadastroScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}