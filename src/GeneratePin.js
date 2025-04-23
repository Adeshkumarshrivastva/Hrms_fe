import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Button, StyleSheet, SafeAreaView, Text, Image, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

const apiUrl = Config.API_URL;

const GeneratePin = ({ navigation }) => {

  const [pin, setPin] = useState(['', '', '', '']);
  const [focused, setFocused] = useState(0);
  const [pinStatus, setPinStatus] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const inputs = useRef([]);

  useEffect(() => {
    const fetchMobileNumber = async () => {
      try {
        const storedMobileNumber = await AsyncStorage.getItem('mobileNumber');
        if (storedMobileNumber) {
          setMobileNumber(storedMobileNumber);
        }
      } catch (error) {
        console.error("Error retrieving mobile number:", error);
      }
    };
    fetchMobileNumber();
  }, []);

  const handlePinChange = (text, index) => {
    const newPin = [...pin];
    newPin[index] = text;
    setPin(newPin);

    if (text && index < pin.length - 1) {
      inputs.current[index + 1].focus();
    } else if (!text && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleSetPin = async () => {
    const pinCode = pin.join('');
    if (pinCode.length === 4) {
      setPinStatus(true);

      // Make the API request to insert mobile number and PIN
      try {
        const response = await fetch('https://hr360.co.in/insertPin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mobileNumber, pin: pinCode }),
        });
        const textResponse = await response.text();
        console.log("Raw response:", textResponse);
        const result = JSON.parse(textResponse);
        if (result.success) {
          Alert.alert('Success', 'PIN has been successfully set.');
          navigation.navigate('PinVerification');
        } else {
          Alert.alert('Error', 'Failed to set PIN. Please try again.');
        }
      } catch (error) {
        console.error("Error inserting PIN:", error);
        Alert.alert('Error', 'An error occurred. Please try again.');
      }
    } else {
      Alert.alert('Invalid PIN', 'PIN must be 4 digits.');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTextMain}>Human Resource</Text>
          <Text style={styles.headerTextSub}>Management</Text>
        </View>
        {/* Logo on the right */}
        <Image
          source={require('./img/bupb_logo.webp')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Main content wrapped in a "card" */}
      <View style={styles.card}>
        <Text style={styles.instructions}>Please Generate a 4-digit PIN:</Text>
        <View style={styles.pinInputContainer}>
          {pin.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.pinInput}
              value={digit}
              onChangeText={(text) => handlePinChange(text, index)}
              maxLength={1}
              keyboardType="number-pad"
              ref={(el) => (inputs.current[index] = el)}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.setPinButton} onPress={handleSetPin}>
          <Text style={styles.buttonText}>Set PIN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'silver',
  },
  header: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 100,
  },
  headerTextContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerTextMain: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerTextSub: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  logo: {
    width: 80,
    height: 130,
  },
  card: {
    backgroundColor: 'orange',
    borderRadius: 10,
    padding: 13,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginLeft: '8%',
    marginTop: 80,
    width: '85%',
    alignItems: 'center',
  },

  instructions: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 15,
  },

  pinInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },

  pinInput: {
    width: 40,
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
  setPinButton: {
    backgroundColor: 'grey',
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },

  buttonText: {
    color: 'white',
    fontSize: 15,
  },
});
export default GeneratePin;
