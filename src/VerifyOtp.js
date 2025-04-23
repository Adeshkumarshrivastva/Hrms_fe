import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, SafeAreaView, Alert, Image, } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const VerifyOtp = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [showResend, setShowResend] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { phoneNumber, verificationId } = route.params;

  const inputRefs = useRef([]);
  useEffect(() => {
    if (isTimerRunning && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setIsTimerRunning(false);
      setShowResend(true);
    }
  }, [isTimerRunning, timer]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    if (value) {
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      newOtp[index] = '';
      setOtp(newOtp);
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const verifyOtp = async () => {
    const otpCode = otp.join('');
    try {
      const credential = auth.PhoneAuthProvider.credential(verificationId, otpCode);
      await auth().signInWithCredential(credential);
      Alert.alert('Success', 'Phone number verified successfully!');
      navigation.navigate('GeneratePin');
    } catch (error) {
      console.error('Verification error:', error);
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };
  const resendOtp = () => {
    Alert.alert('OTP Resent', 'A new OTP has been sent to your mobile number.');
    setTimer(60);
    setIsTimerRunning(true);
    setShowResend(false);
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
          <Text style={styles.enterOtpText}>Enter Your 6 digit Number:</Text>
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.otpInput}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                ref={(ref) => (inputRefs.current[index] = ref)}
              />
            ))}
          </View>
          {!showResend ? (
            <TouchableOpacity style={styles.verifyButton} onPress={verifyOtp}>
              <Text style={styles.buttonText}>Verify OTP</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.resendButton} onPress={resendOtp}>
              <Text style={styles.buttonText}>Resend OTP</Text>
            </TouchableOpacity>
          )}
        </View>
        {isTimerRunning && (
          <Text style={styles.timerText}>{`00:${timer < 10 ? `0${timer}` : timer}`}</Text>
        )}
        {showResend && (
          <Text style={styles.expiryMessage}>OTP has expired.</Text>
        )}
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
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 50,
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'orange',
    borderRadius: 10,
    padding: 13,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginTop: 80,
    width: '100%',
    alignItems: 'center',
  },
  enterOtpText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
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
  resendButton: {
    backgroundColor: 'grey',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  verifyButton: {
    backgroundColor: 'grey',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize:15,
  },
  timerText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 150,
  },
  expiryMessage: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 150,
  },
});
export default VerifyOtp;
