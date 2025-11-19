import AudioRecorderPlayer from 'react-native-nitro-sound';

import requestPermissions from './Permission';
import { Duration } from './constants';

export const startRecording = async (
  isRecording,
  setFilePath,
  setIsRecording,
  setRecordTime,
  durationRef,
) => {
  const hasPermission = await requestPermissions();
  if (!hasPermission) {
    console.log('Permission denied');
    return;
  }

  try {
    if (!isRecording) {
      const path = await AudioRecorderPlayer.startRecorder();
      setFilePath(path);
      setIsRecording(true);
      console.log('Recording started at:', path);
      Duration(setRecordTime, durationRef);
    } else {
      const stopPath = await AudioRecorderPlayer.stopRecorder();
      setIsRecording(false);
      setRecordTime('00:00:00');
      console.log('Recording stopped. Saved at:', stopPath);
    }
  } catch (err) {
    console.log('Recording error:', err);
  }
};

export const pauseRecording = async (isPaused, setIsPaused) => {
  try {
    if (!isPaused) {
      await AudioRecorderPlayer.pauseRecorder();
      setIsPaused(true);
      console.log('Recording paused');
    } else {
      await AudioRecorderPlayer.resumeRecorder();
      setIsPaused(false);
      console.log('Recording resumed');
    }
  } catch (err) {
    console.log('Pause/Resume error:', err);
  }
};

export const stopRecording = async (
  setIsRecording,
  setIsPaused,
  setRecordTime,
  setFilePath,
  navigation,
  navigateToPlayer = true,
  durationRef,
) => {
  try {
    const stopPath = await AudioRecorderPlayer.stopRecorder();
    const finalTime = durationRef.current;
    setIsRecording(false);
    setIsPaused(false);
    setRecordTime('00:00:00');
    setFilePath(stopPath);

    if (navigateToPlayer && navigation) {
      navigation.navigate('Player', {
        recordedFile: stopPath,
        duration: finalTime,
      });
    }
    console.log('Recording stopped. Saved at:', stopPath);
    return stopPath;
  } catch (err) {
    console.log('Recording error:', err);
  }
};

export const cancelRecording = async (
  setIsRecording,
  setIsPaused,
  setRecordTime,
  setFilePath,
) => {
  try {
    await AudioRecorderPlayer.stopRecorder();
    setIsRecording(false);
    setIsPaused(false);
    setRecordTime('00:00:00');
    setFilePath(null);
    console.log('Recording cancelled and deleted');
  } catch (err) {
    console.log('Cancel recording error:', err);
  }
};
