import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  Background: {
    width: '100%',
    height: '100%',
  },
  Container: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 40,
  },
  ContainerLogo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 55,
  },
  InputContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#fff',
  },
  Input: {
    width: '85%',
    height: 50,
    margin: 10,
    fontSize: 20,
    color: '#fff',
    // backgroundColor: '#42db',
  },
  Button: {
    width: '80%',
    height: 50,
    margin: 30,
    borderRadius: 7,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF860D',
  },
  TextBtn: {
    fontSize: 25,
    color: '#fff',
  },
  Register: {
    fontSize: 20,
    color: '#fff',
  },
});
