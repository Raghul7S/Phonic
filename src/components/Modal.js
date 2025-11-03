import React from 'react';
import { Modal, View, Pressable, FlatList } from 'react-native';

import Text from '../components/Text';
import styles from './styles';

export default function CustomModal({
  visible,
  title,
  message = [],
  onClose,
  onConfirm,
  onSelect,
}) {
  return (
    <Modal
      animationType="slide"
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
              <Pressable
                style={styles.optionItem}
                onPressOut={() => onSelect(item.action)}
              >
                <Text style={styles.message}>{item.label}</Text>
              </Pressable>
            )}
          />

          <View style={styles.buttonRow}>
            {onClose && (
              <Pressable onPress={onClose} style={styles.button}>
                <Text style={styles.cancelText}>Close</Text>
              </Pressable>
            )}

            {onConfirm && (
              <Pressable
                onPress={onConfirm}
                style={[styles.button, styles.confirmButton]}
              >
                <Text style={styles.confirmText}>OK</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}
