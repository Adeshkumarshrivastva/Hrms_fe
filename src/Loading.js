import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const Loading = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation(); 
  const opacity = new Animated.Value(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); 
      navigation.replace('PhoneVerification'); 
    }, 3000); 

    // Fade-in animation
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    return () => clearTimeout(timer);
  }, [navigation]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.card}>
          <Animated.View style={[styles.activityIndicatorWrapper, { opacity }]}>
            <ActivityIndicator size="large" color="black" />
          </Animated.View>
          <Text style={styles.loadingText}>BUPB HRMS</Text>
          <Text style={styles.subText}>Your one-stop solution for Employee Management</Text>
        </View>
      </View>
    );
  }
  return null;
};
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', 
    padding: 20,
  },
  card: {
    backgroundColor: 'orange',
    padding: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%', 
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  activityIndicatorWrapper: {
    backgroundColor: 'orange',
    padding: 20,
    borderRadius: 50,
    marginBottom: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    textTransform: 'uppercase',
  },
  subText: {
    fontSize: 15,
    color: 'black',
    marginTop: 10,
    fontStyle: 'italic',
  },
});
export default Loading;
