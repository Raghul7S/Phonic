import React, { useEffect, useState } from 'react';
import { Pressable, View, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Entypo';
import Slider from '@react-native-community/slider';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';

import {
  handleSelectRecording,
  playRecording,
  stopPlay,
} from '../../utils/PlayerFunctions';
import Container from '../../components/Container';
import Modal from '../../components/Modal';
import Text from '../../components/Text';
import Link from '../../components/TextLink';
import styles from '../styles';

export default function Player({ route, navigation }) {
  const { recordedFile } = route.params || {};
  const [recordings, setRecordings] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [playProgress, setPlayProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecording, setSelectedRecording] = useState(null);

  useEffect(() => {
    if (recordedFile) {
      const newRecording = {
        id: Date.now().toString(),
        name: recordedFile.split('/').pop(),
        path: recordedFile,
        date: new Date().toLocaleString(),
        duration: '00:00:00',
      };
      setRecordings(prev => [newRecording, ...prev]);
    }
  }, [recordedFile]);

  const togglePlay = () => {
    playRecording(
      isPlaying,
      setIsPlaying,
      currentFile,
      setRecordTime,
      setPlayProgress,
      stopPlay,
    );
  };

  const shareAudio = async () => {
    try {
      const filePath = selectedRecording.path;
      const fileName = selectedRecording.name || 'recording.mp4';
      const destPath = `${RNFS.TemporaryDirectoryPath}/${fileName}`;

      console.log('Copying file to shareable path:', destPath);

      await RNFS.copyFile(filePath, destPath);

      const shareOptions = {
        title: 'Share audio',
        url: 'file://' + destPath,
        type: 'audio/mp4',
      };

      await Share.open(shareOptions);
      setModalVisible(false);
    } catch (error) {
      console.log('Error sharing recording:', error);
    }
  };

  const deleteAudio = () => {
    setRecordings(prev => prev.filter(rec => rec.id !== selectedRecording.id));
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.list}
      key={item.id}
      onPress={() =>
        handleSelectRecording(
          item,
          setCurrentFile,
          setIsPlaying,
          setRecordTime,
          setPlayProgress,
        )
      }
    >
      <View>
        <Text style={{ fontSize: 13 }}>{item.name}</Text>
        <Text style={{ fontSize: 12 }}>{item.date}</Text>
      </View>
      <View style={styles.details}>
        <Text style={{ fontSize: 13 }}>{item.duration}</Text>
        <Pressable
          onPress={() => {
            setSelectedRecording(item);
            setModalVisible(true);
          }}
        >
          <Icon name="dots-three-vertical" size={18} color="#fff" />
        </Pressable>
      </View>
    </Pressable>
  );

  const options = [
    {
      id: 1,
      label: 'Rename',
      action: () => console.log('Rename action triggered'),
    },
    {
      id: 2,
      label: 'Share',
      action: shareAudio,
    },
    {
      id: 3,
      label: 'Delete',
      action: deleteAudio,
    },
  ];

  return (
    <Container style={{ paddingBottom: 0 }} title={'Player'} menuBar={true}>
      {recordings.length > 0 ? (
        <>
          <View style={styles.player}>
            <View style={styles.playerControls}>
              <Pressable
                onPress={() =>
                  stopPlay(setIsPlaying, setRecordTime, setPlayProgress)
                }
              >
                <Ionicons name="play-skip-back" size={30} color="#fff" />
              </Pressable>

              <Pressable onPress={togglePlay}>
                <Ionicons
                  name={isPlaying ? 'pause' : 'play'}
                  size={35}
                  color="#fff"
                />
              </Pressable>

              <Pressable
                onPress={() =>
                  stopPlay(setIsPlaying, setRecordTime, setPlayProgress)
                }
              >
                <Ionicons name="play-skip-forward" size={30} color="#fff" />
              </Pressable>

              <View style={styles.controller}>
                <Ionicons name="volume-off" color="#fff" size={20} />
                <Slider
                  style={{ width: 120, height: 20 }}
                  minimumValue={0}
                  maximumValue={1}
                  value={0.5}
                  minimumTrackTintColor="#fff"
                  maximumTrackTintColor="#ccc"
                  thumbTintColor="#000"
                />
                <Ionicons name="volume-high" color="#fff" size={20} />
              </View>
            </View>

            <View style={styles.controller}>
              <Slider
                style={{ width: '80%', height: 30 }}
                minimumValue={0}
                maximumValue={1}
                value={playProgress}
                minimumTrackTintColor="#fff"
                maximumTrackTintColor="#ccc"
                thumbTintColor="#000"
              />
              <Text style={{ fontSize: 14 }}>{recordTime}</Text>
            </View>
          </View>

          <FlatList
            data={recordings}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </>
      ) : (
        <View style={styles.center}>
          <Text>Nothing to play</Text>
          <Link onPress={() => navigation.navigate('Recorder')} link>
            Record now
          </Link>
        </View>
      )}
      <Modal
        visible={modalVisible}
        title={selectedRecording?.name}
        message={options}
        onClose={() => setModalVisible(false)}
        onSelect={action => {
          switch (action) {
            case options[0].action:
              console.log('Rename action triggered');
              break;
            case options[1].action:
              action();
              break;
            case options[2].action:
              action();
              break;
          }
        }}
      />
    </Container>
  );
}
