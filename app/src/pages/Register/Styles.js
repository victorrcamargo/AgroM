import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  Background: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  ContainerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 35,
  },
  LogoText: {
    fontSize: 35,
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  Input: {
    fontSize: 18,
    width: '80%',
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'transparent',
    margin: 10,
    color: '#fff',
  },
  Button: {
    width: '80%',
    height: 50,
    margin: 30,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF860D',
  },
  TextBtn: {
    fontSize: 25,
    color: '#fff',
  },
  CadOK: {
    fontSize: 19,
    color: '#fff',
  },
});
