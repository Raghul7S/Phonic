import { use, useState } from 'react';
import { Pressable, ScrollView, View, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Entypo';
import Slider from '@react-native-community/slider';

import Container from '../../components/Container';
import Text from '../../components/Text';
import styles from '../styles';

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = () => {
    return (
      <Pressable style={styles.list}>
        <View>
          <Text style={{ fontSize: 16 }}>
            {'fileName'}.{'filetype'}
          </Text>
          <Text style={{ fontSize: 16 }}>{'date'}</Text>
        </View>
        <View style={styles.details}>
          <View>
            <Text style={{ fontSize: 16 }}>{'recordTime'}</Text>
            <Text style={{ fontSize: 16 }}>{'fileSize'}</Text>
          </View>
          <Pressable onPress={() => setModalVisible(true)}>
            <Icon name="dots-three-vertical" size={20} color="#fff" />
          </Pressable>
        </View>
      </Pressable>
    );
  };

  return (
    <Container style={{ paddingBottom: 0 }} title={'Player'} menuBar={true}>
      <View style={styles.player}>
        <View style={styles.playerControls}>
          <Pressable>
            <Ionicons name="play-skip-back" size={30} color="#fff" />
          </Pressable>
          <Pressable onPress={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? (
              <Ionicons name="play" size={30} color="#fff" />
            ) : (
              <Ionicons name="pause" size={30} color="#fff" />
            )}
          </Pressable>
          <Pressable>
            <Ionicons name="play-skip-forward" size={30} color="#fff" />
          </Pressable>
          <View style={styles.controller}>
            <Ionicons name="volume-off" color="#fff" size={20} />
            <Slider
              style={{ width: 120, height: 20 }}
              minimumValue={0}
              maximumValue={1}
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
            minimumTrackTintColor="#fff"
            maximumTrackTintColor="#ccc"
            thumbTintColor="#000"
          />
          <Text style={{ fontSize: 14 }}>{recordTime}</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderItem()}
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={{ fontSize: 16, marginBottom: 10 }}>Options</Text>
            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={{ color: 'red', fontSize: 14 }}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </Container>
  );
}
