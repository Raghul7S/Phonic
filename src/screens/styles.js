import { StyleSheet } from 'react-native';
import { fonts } from '../components/helpers/Utils';

const styles = StyleSheet.create({
  recorder: {
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
  fileType: {
    textAlign: 'center',
    bottom: 100,
    color: '#ccc',
    fontSize: 14,
  },

  //Player
  player: {
    gap: 10,
    paddingVertical: 30,
    paddingHorizontal: 10,
    backgroundColor: '#6852ba',
    borderStartEndRadius: 15,
    borderEndEndRadius: 15,
  },
  playerControls: {
    flexDirection: 'row',
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
  modalOverlay: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    width: 250,
    height: 100,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

export default styles;
