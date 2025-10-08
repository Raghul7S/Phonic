import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AudioRecorderPlayer from 'react-native-nitro-sound';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  cancelAnimation,
} from 'react-native-reanimated';

import Container from '../../components/Container';
import Text from '../../components/Text';
import { fonts } from '../../components/helpers/Utils';
import requestPermissions from '../../utils/Permission';
import { Duration } from '../../utils/constants';
import styles from '../styles';

export default function Recorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [filePath, setFilePath] = useState(null);

  const scale = useSharedValue(1);

  useEffect(() => {
    if (isRecording === true && isPaused === false) {
      if (isPaused === true) {
        cancelAnimation(scale);
      } else {
        scale.value = withRepeat(withTiming(1.1, { duration: 1000 }), -1, true);
      }
    } else {
      cancelAnimation(scale);
      scale.value = withTiming(1, { duration: 300 });
    }
  }, [isRecording, isPaused]);

  const animatedShadow = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: 0.5,
  }));

  const navigation = useNavigation();

  const startRecording = async () => {
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
        Duration(setRecordTime);
      } else {
        const stopPath = await AudioRecorderPlayer.stopRecorder();
        setIsRecording(false);
        setIsPaused(false);
        setRecordTime('00:00:00');
        console.log('Recording stopped. Saved at:', stopPath);
      }
    } catch (err) {
      console.log('Recording error:', err);
    }
  };

  const pauseRecording = async () => {
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

  const stopRecording = async () => {
    try {
      const stopPath = await AudioRecorderPlayer.stopRecorder();
      setIsRecording(false);
      setIsPaused(false);
      setRecordTime('00:00:00');
      setFilePath(stopPath);

      navigation.navigate('Player', { recordedFile: stopPath });
      console.log('Recording stopped. Saved at:', stopPath);
    } catch (err) {
      console.log('Recording error:', err);
    }
  };

  return (
    <Container title={'Recorder'}>
      <View style={styles.description}>
        <Text style={{ fontFamily: fonts.regular, fontSize: 50 }}>
          {recordTime}
        </Text>
        <View style={[styles.controller, { top: 20 }]}>
          <Text style={styles.guide}>Press the</Text>
          {isRecording ? (
            <Ionicons
              name="square"
              size={15}
              color="#fff"
              style={{ marginHorizontal: 5 }}
            />
          ) : (
            <Ionicons
              name="mic"
              size={15}
              color="#fff"
              style={{ marginHorizontal: 5 }}
            />
          )}
          <Text style={styles.guide}>
            to {isRecording ? 'stop' : 'start'} recording
          </Text>
        </View>
      </View>
      <View style={styles.recorder}>
        <View style={styles.shadowContainer}>
          <Animated.View style={[styles.shadow, animatedShadow]} />

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={isRecording === true ? stopRecording : startRecording}
            style={styles.recorderIcon}
            distance={40}
            startColor={'#fff'}
          >
            {isRecording ? (
              <Ionicons name="square" size={100} color="#fff" />
            ) : (
              <Ionicons name="mic" size={100} color="#fff" />
            )}
          </TouchableOpacity>

          {isRecording && (
            <TouchableOpacity
              onPress={pauseRecording}
              activeOpacity={1}
              style={styles.pauseIcon}
            >
              {isPaused ? (
                <Ionicons name="play" size={40} color="#fff" />
              ) : (
                <Ionicons name="pause" size={40} color="#fff" />
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Text style={styles.fileType}>.mp4</Text>
    </Container>
  );
}
