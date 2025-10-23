import { StyleSheet } from 'react-native';
import { fonts } from '../components/helpers/Utils';

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
    position: 'absolute',
    borderRadius: 110,
    width: 220,
    height: 220,
    backgroundColor: 'rgba(104, 82, 186, 0.4)',
  },
  recorderIcon: {
    zIndex: 100,
    padding: 40,
    backgroundColor: '#6852ba',
    borderRadius: 100,
    position: 'relative',
  },
  pauseIcon: {
    position: 'absolute',
    left: 140,
    top: '90%',
    padding: 10,
    backgroundColor: '#6852ba',
    borderRadius: 100,
    textAlign: 'center',
  },
  description: {
    top: 100,
    alignItems: 'center',
  },
  guide: {
    fontFamily: fonts.regular,
    fontSize: 12,
  },
  timer: {
    fontSize: 25,
    color: '#FFF',
    textAlign: 'center',
  },
  DeleteIcon: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 60,
    backgroundColor: '#6852ba',
    borderRadius: 50,
    padding: 10,
  },

  //Player
  player: {
    gap: 10,
    paddingVertical: 30,
    paddingHorizontal: 10,
    marginBottom: 2,
    backgroundColor: '#6852ba',
    borderStartEndRadius: 15,
    borderEndEndRadius: 15,
  },
  playerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  controller: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  list: {
    height: 64,
    padding: 8,
    backgroundColor: '#6852ba',
    marginTop: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  details: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
});

export default styles;
