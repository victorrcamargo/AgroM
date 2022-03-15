/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable global-require */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Animated,
  Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Ionicons from 'react-native-vector-icons/Ionicons';

import api from '../../services/api';
import {login} from '../../services/auth';
import {useAuth} from '../../contexts/Auth';

import Styles from './Styles';

const Login = ({navigation}) => {
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');

  const {signIn} = useAuth();

  const [offset] = useState(new Animated.ValueXY({x: 0, y: 80}));
  const [opacity] = useState(new Animated.Value(0));
  const [logo] = useState(new Animated.ValueXY({x: 200, y: 110}));

  // =============== FUNÇÃO DE LOGIN DO USUARIO ===============
  const handleLogin = () => {
    api
      .post(`/usuarios/login`, {email, senha})
      .then((response) => {
        const {data} = response;
        if (data.token) {
          login(data.token);
          signIn(data.token);
        }
      })
      .catch((response) => {
        console.log(response);
      });
  };

  // =============== ANIMAÇÃO DA TELA DE LOGIN AQUI ===============
  useEffect(() => {
    keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow
    );
    keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide
    );

    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 1,
        bounciness: 8,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  function keyboardDidShow() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 95,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(logo.y, {
        toValue: 55,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  }

  function keyboardDidHide() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 200,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(logo.y, {
        toValue: 110,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  }

  return (
    <LinearGradient colors={['#4BD94B', '#2AA62A']}>
      <KeyboardAvoidingView style={Styles.Background}>
        <View style={Styles.ContainerLogo}>
          <Animated.Image
            style={{
              width: logo.x,
              height: logo.y,
            }}
            source={require('../../assets/logo.png')}
          />
        </View>
        <Animated.View
          style={[
            Styles.Container,
            {
              transform: [{translateY: offset.y}],
              opacity,
            },
          ]}>
          <View style={Styles.InputContainer}>
            <Ionicons name="ios-person-outline" size={27} color="#fff" />
            <TextInput
              style={Styles.Input}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid="transparent"
              placeholderTextColor="#fff"
              autoCorrect={false}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={Styles.InputContainer}>
            <Ionicons name="ios-lock-open-outline" size={25} color="#fff" />
            <TextInput
              style={Styles.Input}
              secureTextEntry
              placeholder="Senha"
              keyboardType="default"
              placeholderTextColor="#fff"
              autoCorrect={false}
              value={senha}
              onChangeText={(text) => setSenha(text)}
            />
          </View>
          <TouchableOpacity style={Styles.Button} onPress={() => handleLogin()}>
            <Text style={Styles.TextBtn}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={Styles.Register}>Criar conta gratuita</Text>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default Login;
