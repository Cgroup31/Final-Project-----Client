import React, { memo } from 'react';
import createStackNavigator from './createStackNavigator';

import CollectionScreen from 'screens/collection/Collection/CollectionScreen';

import { CollectionMainParamList } from './types';

const Stack = createStackNavigator<CollectionMainParamList>();

const CollectionMainNavigator = memo(() => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="CollectionScreen">
      <Stack.Screen name="CollectionScreen" component={CollectionScreen} />
    </Stack.Navigator>
  );
});

export default CollectionMainNavigator;
