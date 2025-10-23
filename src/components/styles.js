import { StyleSheet } from 'react-native';

import { fonts } from './helpers/Utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#060417',
    padding: 18,
  },
  barStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#6852ba',
  },
  text: {
    fontSize: 24,
    color: '#fff',
    fontFamily: fonts.medium,
  },
  link: {
    fontSize: 14,
    borderBottomWidth: 1,
    borderColor: '#6852ba',
    color: '#6852ba',
    letterSpacing: 5,
    marginTop: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 10,
  },
  title: {
    color: '#6852ba',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  message: {
    fontSize: 15,
    color: '#555',
    lineHeight: 32,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    marginLeft: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  cancelText: {
    color: 'red',
    fontSize: 15
  },
  confirmButton: {
    backgroundColor: '#6852ba',
  },
  confirmText: {
    color: '#fff',
    fontWeight: '500',
  },
});

export default styles;
