import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const PinVerification = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [pin, setPin] = useState(['', '', '', '']);
  const inputs = useRef([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMobileNumber = async () => {
      try {
        const storedNumber = await AsyncStorage.getItem('mobileNumber');
        if (storedNumber) {
          setMobileNumber(storedNumber);
        } else {
          Alert.alert('Error', 'No mobile number found. Please log in again.');
          navigation.navigate('Loading');
        }
      } catch (error) {
        console.error('Error reading mobile number:', error);
        Alert.alert('Error', 'Failed to retrieve mobile number.');
      }
    };

    fetchMobileNumber();
  }, []);

  const handlePinChange = (text, index) => {
    const newPin = [...pin];
    newPin[index] = text;
    setPin(newPin);

    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }

    if (!text && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const verifyPin = async () => {
    const fullPin = pin.join('');

    if (!mobileNumber || fullPin.length !== 4) {
      Alert.alert('Error', 'PIN must be 4 digits.');
      return;
    }

    try {
      const response = await fetch(
        `https://hr360.co.in/PinVerify?mobileNumber=${mobileNumber}&pin=${fullPin}`
      );
      const result = await response.json();

      if (result.success) {
        Alert.alert('Success', 'PIN verified successfully!');

        // Save verification flag
        await AsyncStorage.setItem('isVerified', 'true');

        // Reset navigation so user can't go back
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } else {
        Alert.alert('Error', result.error || 'Invalid PIN.');
        setPin(['', '', '', '']);
        inputs.current[0].focus();
      }
    } catch (error) {
      console.error('Error verifying PIN:', error);
      Alert.alert('Error', 'An error occurred while verifying the PIN.');
    }
  };

  return (
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
          <Text style={styles.enterOtpText}>Please Enter Your Verification PIN:</Text>
          <View style={styles.otpContainer}>
            {pin.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.otpInput}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(value) => handlePinChange(value, index)}
                ref={(ref) => (inputs.current[index] = ref)}
              />
            ))}
          </View>

          <TouchableOpacity style={styles.verifyButton} onPress={verifyPin}>
            <Text style={styles.buttonText}>Verify PIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'silver' },
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
  headerTextMain: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  headerTextSub: { fontSize: 20, fontWeight: 'bold', color: 'white' },
  logo: { width: 100, height: 60 },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 50,
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'orange',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    marginTop: '30%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  enterOtpText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  otpInput: {
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
  verifyButton: {
    backgroundColor: 'grey',
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 7,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
});
export default PinVerification;
