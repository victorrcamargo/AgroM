/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react';
import {Text, View, SafeAreaView, Pressable, Image} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import Icons from 'react-native-vector-icons/FontAwesome';

import Styles from './Styles';

const Publication = () => {
  const route = useRoute();
  const {card} = route.params;
  const navigation = useNavigation();

  const imagePath = card.imagens[0].path;
  return (
    <SafeAreaView style={Styles.Container}>
      <Pressable onPress={() => navigation.goBack()} style={Styles.Icone}>
        <Icon name="chevron-thin-left" size={30} color="#000" />
      </Pressable>
      <Image
          style={Styles.Header}
          source={{uri: `file://${imagePath}`}}
        />
      <Text style={Styles.Title}> {card.nome} </Text>
      <View style={Styles.Content}>
        <Text style={Styles.Desc}>{card.descricao}</Text>
        <Text style={Styles.SubTitles}>
          <Icons name="location-arrow" size={25} color="#313131" />  Localização
        </Text>
        <Text style={Styles.Data}> {card.cidade} </Text>
        <Text style={Styles.SubTitles}>
          <Icons name="dollar" size={25} color="#313131" />   Preço
        </Text>
        <Text style={Styles.Data}> {card.valor} </Text>
        <Text style={Styles.SubTitles}>
          <Icons name="phone" size={25} color="#313131" />  Contato
        </Text>
        <Text style={Styles.Data}> {card.contato} </Text>
      </View>
    </SafeAreaView>
  );
};

export default Publication;
