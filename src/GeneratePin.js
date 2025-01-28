import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Button, StyleSheet, SafeAreaView, Text, Image, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GeneratePin = ({ navigation }) => {

  const [pin, setPin] = useState(['', '', '', '']);
  const [focused, setFocused] = useState(0);
  const [pinStatus, setPinStatus] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const inputs = useRef([]);


  useEffect(() => {
    // Retrieve the mobile number from AsyncStorage
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
        const response = await fetch('http://192.168.1.9:4000/insertPin', {
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
          // navigation.navigate('Home', { pinCode });
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

      {/* Main content */}
      <View style={styles.mainContent}>
        <Text style={styles.instructions}>Please generate a 4-digit PIN:</Text>
        <View style={styles.pinInputContainer}>
          {pin.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.pinInput}
              value={digit}
              onChangeText={(text) => handlePinChange(text, index)}
              maxLength={1}
              keyboardType="number-pad"
              ref={(el) => (inputs.current[index] = el)} // Set the ref for each input
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
    width: 100,
    height: 60,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 150,
  },
  instructions: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'grey',
    textAlign: 'center',
    marginBottom: 20,
  },

  pinInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Center the input boxes within the container
    marginBottom: 150,
  },
  pinInput: {
    width: 50,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 24,
    textAlign: 'center',
    color: 'black',
    marginRight: 12, // Control the space between boxes
  },
  setPinButton: {
    backgroundColor: 'grey',
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default GeneratePin;
