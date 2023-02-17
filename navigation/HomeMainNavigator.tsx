import React, { memo } from 'react';
import createStackNavigator from './createStackNavigator';

import HomeScreen from 'screens/home/HomeScreen';

import { HomeMainParamList } from './types';

const Stack = createStackNavigator<HomeMainParamList>();

const HomeMainNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, title: '1000' }}
      initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
});

export default HomeMainNavigator;
