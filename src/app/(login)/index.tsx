import { StyleSheet, View, Text, TextInput, Button, Alert, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { router } from "expo-router";

export default function LoginScreen() {
    
    const handleLogin = async ({email, senha}:any) => {

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

        <TouchableOpacity onPress={() => router.push('/cadastro')}>
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