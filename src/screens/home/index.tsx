import { Text, View, Button, StyleSheet, TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParams } from "../../navigation";
import { Formik } from "formik";
import * as Yup from 'yup';
import { getAuth, updateEmail, updatePassword } from '@firebase/auth';
import { getFirestore, updateDoc, doc, getDoc } from '@firebase/firestore';
import { useEffect, useState } from "react";

type Usuario = {
    email: string,
    senha: string,
    nome: string,
    idade: number
}

export default function HomeScreen() {

    const navigation = useNavigation<StackNavigationProp<StackParams, "home">>();
    const auth = getAuth();
    const db = getFirestore();
    const [ usuario, setUsuario ] = useState<Usuario>({email: '', senha: '', nome: '', idade: 0});
    useEffect(() => {
        if (auth.currentUser) {
            getDoc(doc(db, 'usuarios', auth.currentUser.uid))
                .then(dados => setUsuario(dados.data()))
        }
    }, [])

    //Atualização de dados cadastrais. 
    const handleAtualizacaoCadastral = async({email, senha, nome, idade}:any) => {

        try {
            if (auth.currentUser) {
                //Atualiza o email
                if(auth.currentUser?.email != email) 
                    await updateEmail(auth.currentUser, email);
                
                //Atualiza a senha
                if (senha != '')
                    await updatePassword(auth.currentUser, senha)

                //Atualizando dados
                updateDoc(doc(db, 'usuarios', auth.currentUser.uid), {email, nome, idade})
            }

            Alert.alert('Sucesso', 'Dados atualizados');
        } catch(erro) {
            Alert.alert('Erro', 'Não foi possivel completar a operação. Motivo: ' + erro);

        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Bem vindo! Esses são seus dados</Text>

            <Formik
                initialValues={usuario}
                enableReinitialize
                onSubmit={handleAtualizacaoCadastral}
                validationSchema={Yup.object({
                    email: Yup.string().required('O campo email precisa existir').email('O campo precisa ser um email'),
                    nome: Yup.string().required('O campo nome precisa existir'),
                    idade: Yup.number().required('O campo idade precisa ser informado').positive('O valor precisa ser um número positivo'),
                    senha: Yup.string().min(6, 'O campo senha precisa ter no mínimo 6 caracteres')
                })}
            >
                {({handleChange, values, errors, touched, handleBlur, isSubmitting, handleSubmit}) => (
                    <View style={{marginTop: 20}}>
                        {/* NOME */}
                        <Text>Nome: </Text>
                        <TextInput value={values.nome} onChangeText={handleChange('nome')} onBlur={handleBlur('nome')} style={styles.input}/>
                        {touched.nome && errors.nome && <Text style={styles.erro}>{errors.nome}</Text>}
                        
                        {/* EMAIL */}
                        <Text>Email: </Text>
                        <TextInput  value={values.email} onChangeText={handleChange('email')} onBlur={handleBlur('email')} keyboardType="email-address" style={styles.input}/>
                        {touched.email && errors.email && <Text style={styles.erro}>{errors.email}</Text>}

                        {/* Idade */}
                        <Text>Idade: </Text>
                        <TextInput  value={values.idade.toString()} onChangeText={handleChange('idade')} onBlur={handleBlur('idade')} keyboardType="decimal-pad" style={styles.input}/>
                        {touched.idade && errors.idade && <Text style={styles.erro}>{errors.idade}</Text>}

                        {/* Senha */}
                        <Text>Senha: </Text>
                        <TextInput onChangeText={handleChange('senha')} onBlur={handleBlur('senha')} secureTextEntry style={styles.input}/>
                        {touched.senha && errors.senha && <Text style={styles.erro}>{errors.senha}</Text>}

                        {/* CADASTRAR */}
                        <Button title="Atualizar" onPress={() => handleSubmit()} disabled={isSubmitting} />
                        
                        <Button title="Sair" color="tomato" onPress={() => {
                            auth.signOut();
                            //navigation.reset({index: 0, routes: [{name: 'login'}]})
                        }}/>
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
    header: {
        fontSize: 20
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