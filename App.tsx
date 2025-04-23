import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import PhoneVerification from './src/PhoneVerification';
import VerifyOtp from './src/VerifyOtp';
import GeneratePin from './src/GeneratePin';
import Home from './src/Home';
import Button from './src/Button';
import SalarySlip from './src/SalarySlip';
import SalarySlipPdf from './src/SalarySlipPdf';
import LeaveApply from './src/LeaveApply';
import LeaveHistory from './src/LeaveHistory';
import Loading from './src/Loading';
import PinVerification from './src/PinVerification';

const Stack = createStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkInitialRoute = async () => {
      try {
        // Check if user is verified from AsyncStorage
        const isVerified = await AsyncStorage.getItem('isVerified');
        if (isVerified === 'true') {
          setInitialRoute('PinVerification');
        } else {
          setInitialRoute('Loading');
        }
      } catch (error) {
        console.error('Error checking verification status:', error);
        setInitialRoute('PhoneVerification');
      }
    };

    checkInitialRoute();
  }, []);

  if (!initialRoute) return null; // Optionally show splash or loading screen here

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="PhoneVerification" component={PhoneVerification} options={{ headerShown: false }} />
        <Stack.Screen name="VerifyOtp" component={VerifyOtp} options={{ headerShown: false }} />
        <Stack.Screen name="GeneratePin" component={GeneratePin} options={{ headerShown: false }} />
        <Stack.Screen name="PinVerification" component={PinVerification} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Button" component={Button} options={{ headerShown: false }} />
        <Stack.Screen name="SalarySlip" component={SalarySlip} options={{ headerShown: false }} />
        <Stack.Screen name="SalarySlipPdf" component={SalarySlipPdf} options={{ headerShown: false }} />
        <Stack.Screen name="LeaveApply" component={LeaveApply} options={{ headerShown: false }} />
        <Stack.Screen name="LeaveHistory" component={LeaveHistory} options={{ headerShown: false }} />
        <Stack.Screen name="Loading" component={Loading} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
