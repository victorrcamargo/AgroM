import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  Container: {
    width: 150,
    height: 175,
    marginBottom: 30,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  Info: {
    height: 55,
    paddingLeft: 10,
    justifyContent: 'space-evenly',
  },
  InfoText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
  },
  InfoTextSecondary: {
    fontSize: 14,
    color: '#2aa62a',
  },
  TextGreen: {
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
