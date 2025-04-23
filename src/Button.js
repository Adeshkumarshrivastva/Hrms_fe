<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

const apiUrl = Config.API_URL;
const Button = ({ navigation, route }) => {
  const initialProfileImage = route?.params?.profileImage || 'https://via.placeholder.com/80';
=======

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Button = ({ navigation, route }) => {
  const initialProfileImage = route?.params?.profileImage || 'https://via.placeholder.com/80';

>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
  const [profileImage, setProfileImage] = useState(initialProfileImage);
  const [userName, setUserName] = useState('');
  const [employeeId, setEmployeeId] = useState('');

<<<<<<< HEAD
=======
  // Fetch employee data on component mount
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const storedEmployeeId = await AsyncStorage.getItem('ecno');
        const storedUserName = await AsyncStorage.getItem('userName');
        const savedImageUri = await AsyncStorage.getItem('profileImage');
<<<<<<< HEAD
=======

>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
        if (storedEmployeeId) setEmployeeId(storedEmployeeId);
        if (storedUserName) setUserName(storedUserName);
        if (savedImageUri) setProfileImage(savedImageUri);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };
<<<<<<< HEAD
    fetchEmployeeData();
  }, []);

  const handleBackButtonPress = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      {/* Header with Back Button, Profile Image, and User Info */}
      <View style={styles.header}>
        {/* Profile Image */}
        <Image source={{ uri: profileImage }} style={styles.profileImage} />

        {/* User Info */}
=======

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
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userName || 'Not Available'}</Text>
          <Text style={styles.userId}>Employee ID: {employeeId || 'Not Available'}</Text>
        </View>
<<<<<<< HEAD
        {/* Back Button with inline style */}
        <TouchableOpacity onPress={handleBackButtonPress} style={{ marginLeft: 'auto' }}>
          <Image source={require('./img/BackArrow.png')} style={{ width: 50, height: 50 }} />
        </TouchableOpacity>
      </View>
      {/* Icon Buttons in One Row */}
      <View style={styles.iconContainer}>
        {/* Leave Apply Button */}
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('LeaveApply')}>
          <Image source={require('./img/apply.png')} style={styles.iconImage} />
          <Text style={styles.iconText}>Leave Apply</Text>
        </TouchableOpacity>
        {/* Leave History Button */}
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('LeaveHistory')}>
          <Image source={require('./img/scroll.png')} style={styles.iconImage} />
          <Text style={styles.iconText}>Leave History</Text>
        </TouchableOpacity>
=======
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
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
      </View>
    </View>
  );
};
<<<<<<< HEAD
=======

>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
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
<<<<<<< HEAD
=======
    justifyContent: 'space-between',
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
    width: '100%',
    height: 100,
  },
  profileImage: {
    width: 80,
    height: 80,
<<<<<<< HEAD
    borderRadius: 40, 
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#ddd',
    resizeMode: 'contain', 
  },
  userInfo: {
    marginLeft: 45,
=======
    borderRadius: 40,
  },
  userInfo: {
    marginLeft: 20,
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
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
<<<<<<< HEAD
    marginTop: '20%',
=======
    marginTop: 30,
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
  },
  iconButton: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
<<<<<<< HEAD
    width: '42%',
=======
    width: '32%',
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  iconImage: {
<<<<<<< HEAD
    width: 60,
    height: 60,
=======
    width: 50,
    height: 50,
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
  },
  iconText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
});
<<<<<<< HEAD
=======

>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
export default Button;
