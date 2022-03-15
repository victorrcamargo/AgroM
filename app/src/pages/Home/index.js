/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import api from '../../services/api';
// eslint-disable-next-line import/no-unresolved


import Styles from './Styles';
import Card from '../../components/Card';

const Home = () => {
  const [cards, setCards] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener('focus', () => {
      api
        .get('/servicos?page=0')
        .then((res) => {
          setCards(res.data.servicos);
        });
    });
  }, [navigation]);

  return (
    <ScrollView>
      <View style={Styles.Background}>
        <View style={Styles.Header}>
          <Text style={Styles.Text}>Início</Text>
          {/* <Text>Pesquisar</Text> */}
        </View>
        <View style={Styles.Container}>
          {cards.map((card) => (
            <Card key={card.IDServico} info={card} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
