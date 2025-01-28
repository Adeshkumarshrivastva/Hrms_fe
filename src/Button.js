
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

        if (storedEmployeeId) setEmployeeId(storedEmployeeId);
        if (storedUserName) setUserName(storedUserName);
        if (savedImageUri) setProfileImage(savedImageUri);
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

  const handleLeavewithdrawal= () => {
    navigation.navigate('Leavewithdrawal');
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

      {/* Icon Buttons in One Row */}
      <View style={styles.iconContainer}>
        {/* Leave Apply Button */}
        <TouchableOpacity style={styles.iconButton} onPress={handleLeaveApply}>
          <Image source={require('./img/log-out.png')} style={styles.iconImage} />
          <Text style={styles.iconText}>Leave Apply</Text>
        </TouchableOpacity>

        {/* Leave History Button */}
        <TouchableOpacity style={styles.iconButton} onPress={handleLeaveHistory}>
          <Image source={require('./img/transaction.png')} style={styles.iconImage} />
          <Text style={styles.iconText}>Leave History</Text>
        </TouchableOpacity>

        {/* Leave withdrawal Button */}
        <TouchableOpacity style={styles.iconButton} onPress={handleLeavewithdrawal}>
          <Image source={require('./img/atm.png')} style={styles.iconImage} />
          <Text style={styles.iconText}>Leave withdrawal</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  iconButton: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '32%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  iconImage: {
    width: 50,
    height: 50,
  },
  iconText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default Button;
