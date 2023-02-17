import React, { memo } from 'react';
import createStackNavigator from './createStackNavigator';
import { IntroStackParamList } from './types';

import OnboardingScreen from 'screens/intro/Onboarding/OnboardingScreen';
import Newsletter from 'screens/intro/Newsletter/Newsletter';
import SignUp from 'screens/auth/SignUp';
import SignIn from 'screens/auth/SignIn';



const Stack = createStackNavigator<IntroStackParamList>();

const IntroNavigator = memo(() => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SignIn">
      
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
});

export default IntroNavigator;
