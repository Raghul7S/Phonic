import React from 'react';
import { Pressable, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Entypo';
import Text from './Text';

import styles from './styles';

export default function Container({ children, style, title, menuBar }) {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={styles.barStyle}>
        {title && <Text>{title}</Text>}
        {menuBar === true && (
          <Pressable>
            <Icon name="dots-three-vertical" size={20} color="#fff" />
          </Pressable>
        )}
      </View>
      {children}
    </SafeAreaView>
  );
}
