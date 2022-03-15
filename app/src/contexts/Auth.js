import React, {createContext, useEffect, useState, useContext} from 'react';
import {AsyncStorage} from 'react-native';

const AuthContext = createContext({signed: false});

// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {
  const [token, setToken] = useState('');

  useEffect(() => {
    async function loadStorageData() {
      const storageToken = await AsyncStorage.getItem('TOKEN');
      if (storageToken) {
        setToken(storageToken);
      }
    }
    loadStorageData();
  });

  async function signIn(token) {
    await AsyncStorage.setItem('TOKEN', token);
    setToken(token);
  }

  async function signOut() {
    await AsyncStorage.clear();
    setToken(false);
  }

  async function getToken() {
    console.log('TOKEN', token)
    return token;
  }

  return (
    <AuthContext.Provider value={{signed: !!token, signIn, signOut, getToken}}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
export {AuthProvider, useAuth};
