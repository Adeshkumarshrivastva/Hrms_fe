<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
=======
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d

import PhoneVerification from './src/PhoneVerification';
import VerifyOtp from './src/VerifyOtp';
import GeneratePin from './src/GeneratePin';
import Home from './src/Home';
import Button from './src/Button';
import SalarySlip from './src/SalarySlip';
import SalarySlipPdf from './src/SalarySlipPdf';
import LeaveApply from './src/LeaveApply';
import LeaveHistory from './src/LeaveHistory';
<<<<<<< HEAD
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
=======


// Create a stack navigator
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PhoneVerification">
        
        {/* All your screens */}
        <Stack.Screen
          name="PhoneVerification"
          component={PhoneVerification}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="VerifyOtp"
          component={VerifyOtp}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="GeneratePin"
          component={GeneratePin}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        
        {/* Main Button Component for Leave Apply and Leave History */}
        <Stack.Screen
          name="Button"
          component={Button}
          options={{ headerShown: false }}
        />
        
        {/* Salary Slip and PDF screens */}
        <Stack.Screen
          name="SalarySlip"
          component={SalarySlip}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="SalarySlipPdf"
          component={SalarySlipPdf}
          options={{ headerShown: false }}
        />
        
        {/* Leave screens */}
        <Stack.Screen
          name="LeaveApply"
          component={LeaveApply}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
  name="LeaveHistory"
  component={LeaveHistory}
  options={{ headerShown: false }}
/>
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
