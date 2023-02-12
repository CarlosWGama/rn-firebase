import { Formik } from "formik";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as Yup from 'yup';

export default function CadastroScreen() {

    //Função do cadastro de usuário
    const handleCadastro = async({email, senha, nome, idade}:any) => {

    }


    return (
        <View style={styles.container}>
            <Text style={{fontSize: 20}}>Crie sua conta</Text>
            <Formik
                initialValues={{email: '', senha: '', nome: '', idade: ''}}
                onSubmit={handleCadastro}
                validationSchema={Yup.object({
                    email: Yup.string().required('O campo email precisa existir').email('O campo precisa ser um email'),
                    nome: Yup.string().required('O campo nome precisa existir'),
                    idade: Yup.number().required('O campo idade precisa ser informado').positive('O valor precisa ser um número positivo'),
                    senha: Yup.string().required('O campo senha precisa existir').min(6, 'O campo senha precisa ter no mínimo 6 caracteres')
                })}
            >
                {({handleChange, errors, touched, handleBlur, isSubmitting, handleSubmit}) => (
                    <View style={{marginTop: 20}}>
                        {/* NOME */}
                        <Text>Nome: </Text>
                        <TextInput onChangeText={handleChange('nome')} onBlur={handleBlur('nome')} style={styles.input}/>
                        {touched.nome && errors.nome && <Text style={styles.erro}>{errors.nome}</Text>}
                        {/* EMAIL */}
                        <Text>Email: </Text>
                        <TextInput onChangeText={handleChange('email')} onBlur={handleBlur('email')} keyboardType="email-address" style={styles.input}/>
                        {touched.email && errors.email && <Text style={styles.erro}>{errors.email}</Text>}

                        {/* Idade */}
                        <Text>Idade: </Text>
                        <TextInput onChangeText={handleChange('idade')} onBlur={handleBlur('idade')} keyboardType="decimal-pad" style={styles.input}/>
                        {touched.idade && errors.idade && <Text style={styles.erro}>{errors.idade}</Text>}

                        {/* Senha */}
                        <Text>Senha: </Text>
                        <TextInput onChangeText={handleChange('senha')} onBlur={handleBlur('senha')} secureTextEntry style={styles.input}/>
                        {touched.senha && errors.senha && <Text style={styles.erro}>{errors.senha}</Text>}

                        {/* CADASTRAR */}
                        <Button title="Cadastrar" onPress={() => handleSubmit()} disabled={isSubmitting} />
                    </View>
                )}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 30
    }, 
    input: {
        backgroundColor: 'white',
        padding: 5
    },
    erro: {
        color: 'red',
        textAlign: 'right'
    }
});