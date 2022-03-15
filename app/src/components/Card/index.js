/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from 'react';
import {Text, Image, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';

import tractor from '../../assets/tractor.png';

import Styles from './Styles';

const Card = (props) => {
  const navigation = useNavigation();
  const {nome, cidade, imagens} = props.info;

  const imagePath = imagens.length ? `file://${imagens[0].path}` : tractor;

  return (
    <View>
      <View style={Styles.Container}>
        <TouchableOpacity
          // eslint-disable-next-line no-shadow
          onPress={() =>
            navigation.navigate('Publication', {
            card: props.info
        })}>
          <View>
            <Image source={{uri: imagePath}} style={{width: 150, height: 120}} />
          </View>
          <View style={Styles.Info}>
            <Text style={Styles.InfoText}>{nome}</Text>
            <View style={Styles.TextGreen}>
              <Text style={Styles.InfoTextSecondary}>{cidade}</Text>
              <Icon name="chevron-with-circle-right" size ={18} color="#2aa62a" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Card;
