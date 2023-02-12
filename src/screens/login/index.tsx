import { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParams } from "../../navigation";
import { Formik } from "formik";
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
export default function LoginScreen() {
    
    const navigation = useNavigation<StackNavigationProp<StackParams, "login">>();
    const auth = getAuth();

    const handleLogin = async ({email, senha}:any) => {
        
        await signInWithEmailAndPassword(auth, email, senha)
            .then(usuario => navigation.reset({index: 0, routes: [{name: 'home'}]}))
            .catch(erro => Alert.alert('Erro', 'Login ou senha incorreta!')); 
    
    }

    return (<View style={styles.container}>
        <Formik
            initialValues={{email:'', senha:''}}
            onSubmit={handleLogin}
        >
            {({handleChange, handleSubmit, isSubmitting}) => (
                <>
                    <Text style={styles.header}>Login</Text>
                    <TextInput onChangeText={handleChange('email')} style={[styles.input, styles.borderBottom]} placeholder="EMAIL:"/>
                    <TextInput onChangeText={handleChange('senha')}  style={styles.input} secureTextEntry placeholder="SENHA:"/>
                    <Button title="Logar" onPress={() => handleSubmit()} disabled={isSubmitting}/>
                </>
            )}

        </Formik>

        <TouchableOpacity onPress={() => navigation.push('cadastro')}>
            <Text style={styles.cadastro}>Não possui conta? Clique-aqui para criar uma</Text>
        </TouchableOpacity>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: 20
    },
    header: {
        fontSize: 20,
        textAlign: 'center'
    },
    input: {
        backgroundColor: 'white',
        padding: 5
    },
    borderBottom: {
        borderBottomColor: 'black',
        borderBottomWidth: 2
    },
    cadastro: {
        marginTop: 10,
        fontSize: 15,
        textAlign: 'center'
    }
});