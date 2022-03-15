import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import api from '../../services/api';
import {useAuth} from '../../contexts/Auth';

import Styles from './Styles';

const Register = ({navigation}) => {
  const [usuario, setUsuario] = useState({});
  const {signIn} = useAuth();

  const handleRegister = () => {
    // console.log(usuario);
    api
      .post(`/usuarios/`, usuario)
      .then((response) => {
        const {data} = response;
        console.log(data);
        if (data.token) {
          signIn(data.token);
        }
      })
      .catch((response) => {
        console.log(response);
      });
  };

  return (
    <LinearGradient colors={['#4BD94B', '#2AA62A']}>
      <KeyboardAvoidingView style={Styles.Background}>
        <View style={Styles.ContainerLogo}>
          <Image
            source={require('../../assets/logo.png')}
            style={{width: 100, height: 55}}
          />
          <Text style={Styles.LogoText}> - Novo usuário</Text>
        </View>
        <View style={Styles.Container}>
          <TextInput
            style={Styles.Input}
            placeholder="Email"
            name="email"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            placeholderTextColor="#fff"
            autoCorrect={false}
            onChangeText={(text) => setUsuario({...usuario, email: text})}
          />
          <TextInput
            style={Styles.Input}
            placeholder="Nome"
            keyboardType="default"
            underlineColorAndroid="transparent"
            placeholderTextColor="#fff"
            autoCorrect={false}
            onChangeText={(text) => setUsuario({...usuario, nome: text})}
          />
          <TextInput
            style={Styles.Input}
            placeholder="Senha"
            keyboardType="default"
            secureTextEntry
            underlineColorAndroid="transparent"
            placeholderTextColor="#fff"
            autoCorrect={false}
            onChangeText={(text) => setUsuario({...usuario, senha: text})}
          />
          <TextInput
            style={Styles.Input}
            placeholder="Repetir senha"
            keyboardType="default"
            secureTextEntry
            underlineColorAndroid="transparent"
            placeholderTextColor="#fff"
            autoCorrect={false}
            onChangeText={(text) =>
              setUsuario({...usuario, confirmarSenha: text})
            }
          />
          <TextInput
            style={Styles.Input}
            placeholder="Telefone"
            keyboardType="phone-pad"
            underlineColorAndroid="transparent"
            placeholderTextColor="#fff"
            autoCorrect={false}
            onChangeText={(text) => setUsuario({...usuario, telefone: text})}
          />
          <TouchableOpacity
            style={Styles.Button}
            onPress={() => {
              handleRegister();
            }}>
            <Text style={Styles.TextBtn}>Cadastrar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={Styles.CadOK}>Já possuo cadastro!</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default Register;
