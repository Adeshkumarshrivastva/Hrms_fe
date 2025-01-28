import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PhoneVerification from './src/PhoneVerification';
import VerifyOtp from './src/VerifyOtp';
import GeneratePin from './src/GeneratePin';
import Home from './src/Home';
import Button from './src/Button';
import SalarySlip from './src/SalarySlip';
import SalarySlipPdf from './src/SalarySlipPdf';
import LeaveApply from './src/LeaveApply';
import LeaveHistory from './src/LeaveHistory';


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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
