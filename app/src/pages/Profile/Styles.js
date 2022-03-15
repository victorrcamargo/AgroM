import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  Container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Header: {
    width: '100%',
    height: '40%',
    backgroundColor: '#2aa62a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Content: {
    width: '100%',
    height: '60%',
    justifyContent: 'flex-start',
    padding: 30,
  },
  Name: {
    fontSize: 35,
    color: '#595959',
    lineHeight: 70,
    fontWeight: '700',
  },
  Contact: {
    fontSize: 23,
    color: '#595959',
    lineHeight: 60,
  },
  Exit: {
    marginTop: 100,
    fontSize: 25,
    color: '#ff860d',
    fontWeight: '700',
  },

  Round: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#C4C4C4',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
