/* eslint-disable no-irregular-whitespace */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../contexts/Auth';
import api from '../../services/api';
import Styles from './Styles';

const Profile = () => {
  const {signOut} = useAuth();
  const [profile, setProfile] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener('focus', () => {
      api.get('/usuarios/me').then((res) => {
        setProfile(res.data.usuario);
      });
    });
  }, [navigation]);

  async function sair() {
    signOut();
  }

  return (
    <View style={Styles.Container}>
      <View style={Styles.Header}>
        <View style={Styles.Round}>
          <Ionicons name="ios-person" size={100} color="#E3D5D5"/>
        </View>
      </View>
      {profile ? (
        <View style={Styles.Content}>
          <Text style={Styles.Name}>
            <Ionicons name="person" size={32} color="#595959" />
             {profile.nome}
          </Text>
          <Text style={Styles.Contact}>
            <Ionicons name="mail" size={25} color="#595959" />
             {profile.email}
          </Text>
          <Text style={Styles.Contact}>
            <FontAwesome name="phone" size={27} color="#595959" />
             {profile.telefone}
          </Text>
          <TouchableOpacity onPress={() => sair()}>
            <Text style={Styles.Exit}>
              <SimpleLineIcons name="logout" size={25} style={Styles.Exit} />
               Sair
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default Profile;
