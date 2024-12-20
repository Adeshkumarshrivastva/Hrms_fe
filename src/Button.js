import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const Button = ({ navigation, route }) => {
  const initialProfileImage = route?.params?.profileImage || 'https://via.placeholder.com/80';

  const [profileImage, setProfileImage] = useState(initialProfileImage);
  const [userName, setUserName] = useState('');
  const [employeeId, setEmployeeId] = useState('');

  // Fetch employee data on component mount
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const storedEmployeeId = await AsyncStorage.getItem('ecno');
        const storedUserName = await AsyncStorage.getItem('userName');
        const savedImageUri = await AsyncStorage.getItem('profileImage');

        if (storedEmployeeId) {
          setEmployeeId(storedEmployeeId);
        } else {
          console.log('Employee ID not found in AsyncStorage');
        }

        if (storedUserName) {
          setUserName(storedUserName);
        } else {
          console.log('UserName not found in AsyncStorage');
        }

        if (savedImageUri) {
          setProfileImage(savedImageUri);
        } else {
          setProfileImage(initialProfileImage);
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, []);

  const handleLeaveApply = () => {
    navigation.navigate('LeaveApply');
  };

  const handleLeaveHistory = () => {

    navigation.navigate('LeaveHistory');
  };

  return (
    <View style={styles.container}>
      {/* Header with Profile Image */}
      <View style={styles.header}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userName || 'Not Available'}</Text>
          <Text style={styles.userId}>Employee ID: {employeeId || 'Not Available'}</Text>
        </View>
      </View>

      {/* Container for cards to display them side by side */}
      <View style={styles.cardsContainer}>
        {/* Leave Apply Button */}
        <TouchableOpacity style={styles.card} onPress={handleLeaveApply}>
          <Icon name="building" size={30} color="#FFFFFF" />
          <Text style={styles.cardTitle}>Leave Apply</Text>
        </TouchableOpacity>

        {/* Leave History Button */}
        <TouchableOpacity style={styles.card} onPress={handleLeaveHistory}>
          <Icon name="history" size={30} color="#FFFFFF" />
          <Text style={styles.cardTitle}>Leave History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',

  },
  header: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 100,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userInfo: {
    marginLeft: 20,
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  userId: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
  },

  // Container for cards to display them side by side
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 20,
  },

  // Card button styling
  card: {
    backgroundColor: 'silver',
    padding: 20,
    borderRadius: 10,
    width: '48%',
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 10,
  },
});

export default Button;
