import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Recorder from './src/screens/Recorder';
import Player from './src/screens/Player';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Recorder"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Recorder') {
              iconName = 'mic';
            } else if (route.name === 'Player') {
              iconName = 'play-circle';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#6852ba',
          tabBarInactiveTintColor: '#fff',
          tabBarStyle: { backgroundColor: '#060417' },
        })}
      >
        <Tab.Screen name="Recorder" component={Recorder} />
        <Tab.Screen name="Player" component={Player} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
