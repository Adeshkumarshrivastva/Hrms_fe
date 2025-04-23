<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, TextInput, View, TouchableOpacity,
  SafeAreaView, Alert, Image, Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
=======
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, SafeAreaView, Alert, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d

const { height } = Dimensions.get('window');

const PhoneVerification = () => {
  const [countryCode, setCountryCode] = useState('+91');
  const [mobileNumber, setMobileNumber] = useState('');
<<<<<<< HEAD
  const [deviceId, setDeviceId] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getDeviceId();
  }, []);
  const getDeviceId = async () => {
    try {
      const uniqueId = await DeviceInfo.getUniqueId();
      setDeviceId(uniqueId);
      console.log('Unique Device ID:', uniqueId);

      const deviceModel = await DeviceInfo.getModel();
      console.log('Device Model:', deviceModel);

      const systemVersion = await DeviceInfo.getSystemVersion();
      console.log('System Version:', systemVersion);
    } catch (error) {
      console.log('Error fetching device info:', error);
    }
  };

  const handleCountryCodeChange = (code) => setCountryCode(code);
  const handleInputChange = (input) => setMobileNumber(input.replace(/[^0-9]/g, ''));

  const proceed = async () => {
    if (mobileNumber.length === 10) {
      let phoneNumberWithCountryCode = `${countryCode}${mobileNumber}`;

      try {

        const response = await fetch(
          `https://hr360.co.in/checkMobile?mobileNumber=${encodeURIComponent(mobileNumber)}`
        );
        const result = await response.json();

        if (result.exists) {
          // Send OTP to the number
          const confirmation = await auth().signInWithPhoneNumber(phoneNumberWithCountryCode);

          // Store the mobile number and deviceId in AsyncStorage
          await AsyncStorage.setItem('mobileNumber', mobileNumber);
          await AsyncStorage.setItem('deviceId', deviceId);

          // Navigate to OTP verification screen with deviceId and verificationId
          navigation.navigate('VerifyOtp', {
            phoneNumber: phoneNumberWithCountryCode,
            verificationId: confirmation.verificationId,
            deviceId: deviceId,
=======
  const navigation = useNavigation();

  const handleCountryCodeChange = (code) => {
    setCountryCode(code);
  };

  const handleInputChange = (input) => {
    const numericInput = input.replace(/[^0-9]/g, '');
    setMobileNumber(numericInput);
  };

  const proceed = async () => {
    console.log('Proceed button clicked');
    if (mobileNumber.length >= 10) {
      let phoneNumberWithCountryCode = `${countryCode}${mobileNumber}`;
      console.log('Checking mobile number:', mobileNumber);

      try {
        const response = await fetch('http://192.168.1.9:4000/checkMobile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mobileNumber }),
        });

        const result = await response.json();
        console.log('API Response:', result);

        if (result.exists) {
          const confirmation = await auth().signInWithPhoneNumber(phoneNumberWithCountryCode);
          await AsyncStorage.setItem('mobileNumber', mobileNumber);
          navigation.navigate('VerifyOtp', {
            phoneNumber: phoneNumberWithCountryCode,
            verificationId: confirmation.verificationId,
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
          });
        } else {
          Alert.alert('Error', 'Mobile number not found.');
        }
      } catch (error) {
<<<<<<< HEAD
        console.error('Error checking number:', error);
=======
        console.error('Error:', error);
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
        Alert.alert('Error', 'Failed to check mobile number.');
      }
    } else {
      Alert.alert('Invalid Number', 'Please enter a valid 10-digit mobile number.');
    }
  };

  return (
<<<<<<< HEAD
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTextMain}>Human Resource</Text>
          <Text style={styles.headerTextSub}>Management</Text>
        </View>
        <Image
          source={require('./img/bupb_logo.webp')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.mainContent}>
        <View style={styles.card}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.countryCodeInput}
              keyboardType="phone-pad"
              placeholder="+"
              maxLength={3}
              value={countryCode}
              onChangeText={handleCountryCodeChange}
            />
            <TextInput
              style={styles.mobileInput}
              keyboardType="phone-pad"
              placeholder="Enter Mobile Number"
              placeholderTextColor="gray"
              maxLength={10}
              value={mobileNumber}
              onChangeText={handleInputChange}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={proceed}>
            <Text style={styles.buttonText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'silver',
=======
    
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

        <View style={styles.mainContent}>
          {/* Card for inputs and button */}
          <View style={styles.card}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.countryCodeInput}
                keyboardType="phone-pad"
                placeholder="+"
                maxLength={3}
                value={countryCode}
                onChangeText={handleCountryCodeChange}
              />
              <TextInput
                style={styles.mobileInput}
                keyboardType="phone-pad"
                placeholder="Enter Mobile Number"
                placeholderTextColor="gray"
                maxLength={12}
                value={mobileNumber}
                onChangeText={handleInputChange}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={proceed}>
              <Text style={styles.buttonText}>Proceed</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    background:'silver'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
  },
  header: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
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
<<<<<<< HEAD
=======
    textAlign: 'center',
    marginLeft: 5,
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
  },
  headerTextSub: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
<<<<<<< HEAD
    marginTop: 5,
  },
  logo: {
    width: 80,
    height: 130,
=======
    textAlign: 'center',
    marginTop: 5,
  },
  logo: {
    width: 100,
    height: 60,
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'orange',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
<<<<<<< HEAD
    marginTop: '-60%',
=======
    marginTop:"-60%",
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 50,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  countryCodeInput: {
    width: 50,
    height: '100%',
    fontSize: 16,
    paddingHorizontal: 10,
    color: 'black',
  },
  mobileInput: {
    flex: 1,
    height: '100%',
    fontSize: 18,
    paddingHorizontal: 10,
    color: 'black',
  },
  button: {
    backgroundColor: 'grey',
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
<<<<<<< HEAD
    width: '60%',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize:15,
  },
});

=======
    width: '60%', 
    alignSelf: 'center', 
},
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
});
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
export default PhoneVerification;
