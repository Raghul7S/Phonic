import React from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  Pressable,
  FlatList,
} from 'react-native';

import Text from '../components/Text';
import styles from './styles';

export default function CustomModal({
  visible,
  title,
  message = [],
  onClose,
  onConfirm,
}) {
    console.log("Modal message:", message);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View onPress={onClose} style={styles.overlay}>
        <View style={styles.modalContainer}>
          {title && <Text style={styles.title}>{title}</Text>}
          <FlatList
            data={message}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => onSelect(item.action)}
              >
                <Text style={styles.message}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />

          <View style={styles.buttonRow}>
            {onClose && (
              <TouchableOpacity onPress={onClose} style={styles.button}>
                <Text style={styles.cancelText}>Close</Text>
              </TouchableOpacity>
            )}

            {onConfirm && (
              <TouchableOpacity
                onPress={onConfirm}
                style={[styles.button, styles.confirmButton]}
              >
                <Text style={styles.confirmText}>OK</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}
