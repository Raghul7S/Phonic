import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@recordings';

export const saveRecordings = async recordings => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(recordings));
  } catch (err) {
    console.log('Error saving in local', err);
  }
};

export const loadRecording = async () => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch (err) {
    console.log('Error loading item', err);
  }
};
