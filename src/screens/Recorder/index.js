import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
import styles from '../styles';
import {
  startRecording,
  pauseRecording,
  stopRecording,
  cancelRecording,
} from '../../utils/RecorderFunctions';

export default function Recorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [filePath, setFilePath] = useState(null);

  const scale = useSharedValue(1);
  const navigation = useNavigation();

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

  const handleStartRecording = () => {
    startRecording(isRecording, setFilePath, setIsRecording, setRecordTime);
  };

  const handlePauseRecording = () => {
    pauseRecording(isPaused, setIsPaused);
  };

  const handleStopRecording = () => {
    stopRecording(
      setIsRecording,
      setIsPaused,
      setRecordTime,
      setFilePath,
      navigation,
    );
  };

  const handleCancelRecording = () => {
    cancelRecording(setIsRecording, setIsPaused, setRecordTime, setFilePath);
  };

  return (
    <Container title={'Recorder'}>
      <View style={styles.description}>
        <Text style={{ fontFamily: fonts.regular, fontSize: 50 }}>
          {recordTime}
        </Text>
        <View style={[styles.controller, { top: 20 }]}>
          <Text style={styles.guide}>Press</Text>
          <Ionicons
              name={isRecording === true ? 'square' : 'mic'}
              size={15}
              color="#fff"
              style={{ marginHorizontal: 5 }}
            />
          <Text style={styles.guide}>
            to {isRecording === true ? 'finish' : 'start'} recording
          </Text>
        </View>
      </View>
      <View style={styles.center}>
        <View style={styles.shadowContainer}>
          <Animated.View style={[styles.shadow, animatedShadow]} />

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={
              isRecording === true ? handleStopRecording : handleStartRecording
            }
            style={styles.recorderIcon}
            distance={40}
            startColor={'#fff'}
          >
            <Ionicons
              name={isRecording === true ? 'square' : 'mic'}
              size={100}
              color="#fff"
            />
          </TouchableOpacity>

          {isRecording === true && (
            <TouchableOpacity
              onPress={handlePauseRecording}
              activeOpacity={1}
              style={styles.pauseIcon}
            >
              <Ionicons
                name={isPaused ? 'play' : 'pause'}
                size={45}
                color="#fff"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {isRecording === true && (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.DeleteIcon}
          onPress={handleCancelRecording}
        >
          <Ionicons name="trash-outline" size={30} color="#fff" />
        </TouchableOpacity>
      )}
    </Container>
  );
}
