/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  Image,
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Styles from './Styles';
import api from '../../services/api';
import {useAuth} from '../../contexts/Auth';

const AddPub = () => {
  //==========Função para enviar os dados do formulario==========
  const [servico, setServico] = useState({});
  const [img, setImg] = useState();
  const {signIn} = useAuth();

  const handlePub = () => {
    api
      .post(`/servicos/`, servico)
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

  //Função de callback da imagem
  function imagePickerCallback(data) {
    if (data.didCancel) {
      return;
    }

    if (data.error) {
      Alert.alert(
        'Erro.',
        'Não foi possível selecionar a imagem.',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false}
      );
    }

    if (!data.uri) {
      return;
    }

    console.log(data.path);
    setImg(data);
    setServico({
      ...servico,
      imagens: data.path,
    });
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView style={Styles.Scroll}>
        <View style={Styles.Container}>
          <Pressable
            style={Styles.imgContainer}
            onPress={() => {
              ImagePicker.showImagePicker({}, imagePickerCallback);
            }}>
            <Image
              style={Styles.img}
              source={{
                uri: img ? img.uri : 'Selecione uma imagem',
              }}
            />
            <Text> Selecione uma imagem. </Text>
          </Pressable>
          <View style={Styles.Label}>
            <Ionicons name="star" style={Styles.Icon} />
            <TextInput
              style={Styles.Input}
              placeholder="Título"
              name="title"
              keyboardType="default"
              underlineColorAndroid="transparent"
              placeholderTextColor="#2AA62A"
              autoCorrect={false}
              onChangeText={(text) => setServico({...servico, nome: text})}
            />
          </View>
          <View style={Styles.Description}>
            <Ionicons name="document-text" style={Styles.Icon} />
            <TextInput
              style={Styles.InputDescription}
              placeholder="Descrição"
              name="description"
              keyboardType="default"
              underlineColorAndroid="transparent"
              placeholderTextColor="#2AA62A"
              autoCorrect={false}
              multiline
              onChangeText={(text) => setServico({...servico, descricao: text})}
            />
          </View>
          <View style={Styles.Label}>
            <FontAwesome name="dollar" style={Styles.Icon} />
            <TextInput
              style={Styles.Input}
              placeholder="Preço"
              name="price"
              keyboardType="decimal-pad"
              underlineColorAndroid="transparent"
              placeholderTextColor="#2AA62A"
              autoCorrect={false}
              onChangeText={(text) => setServico({...servico, valor: text})}
            />
          </View>
          <View style={Styles.Label}>
            <Ionicons name="location-sharp" style={Styles.Icon} />
            <TextInput
              style={Styles.Input}
              placeholder="Cidade"
              name="city"
              keyboardType="default"
              underlineColorAndroid="transparent"
              placeholderTextColor="#2AA62A"
              autoCorrect={false}
              onChangeText={(text) => setServico({...servico, cidade: text})}
            />
          </View>
          <View style={Styles.Label}>
            <FontAwesome name="phone" style={Styles.Icon} />
            <TextInput
              style={Styles.Input}
              placeholder="Contato"
              name="contact"
              keyboardType="default"
              underlineColorAndroid="transparent"
              placeholderTextColor="#2AA62A"
              autoCorrect={false}
              onChangeText={(text) => setServico({...servico, contato: text})}
            />
          </View>
          <Pressable
            style={Styles.Button}
            onPress={() => {
              handlePub();
            }}>
            <Text style={Styles.TextBtn}>Publicar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddPub;
