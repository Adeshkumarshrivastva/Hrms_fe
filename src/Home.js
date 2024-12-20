import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';

const Home = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/80'); // Default placeholder image

  useEffect(() => {
    // Check if there is a saved profile image in AsyncStorage when the component mounts
    const fetchProfileImage = async () => {
      try {
        const savedImageUri = await AsyncStorage.getItem('profileImage');
        if (savedImageUri) {
          setProfileImage(savedImageUri);
        }
      } catch (error) {
        console.error('Error fetching profile image from AsyncStorage:', error);
      }
    };

    fetchProfileImage(); // Call the function to fetch profile image
  }, []);

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo', includeBase64: false }, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error:', response.errorMessage);
      } else {
        const source = { uri: response.assets[0].uri };
        setProfileImage(source.uri); // Set the selected image as the profile image

        // Save the image URI to AsyncStorage for persistence
        try {
          await AsyncStorage.setItem('profileImage', source.uri);
        } catch (error) {
          console.error('Error saving profile image to AsyncStorage:', error);
        }
      }
    });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const mobileNumber = await AsyncStorage.getItem('mobileNumber');
        if (mobileNumber) {
          const response = await fetch('http://192.168.1.8:4000/getUserDetails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mobileNumber }),
          });

          const result = await response.json();
          if (result.success) {
            // Set state variables
            setUserName(result.name);
            setEmployeeId(result.employeeId);

            // Conditionally store values in AsyncStorage
            if (result.employeeId) {
              await AsyncStorage.setItem('ecno', result.employeeId);
            }


            if (result.name) {
              await AsyncStorage.setItem('userName', result.name);
            }

          } else {
            Alert.alert('Error', 'Failed to fetch user details.');
          }
        }

      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'An error occurred while fetching user details.');
      }
    };
    fetchUserData();

  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleImagePick}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userId}>Employee ID: {employeeId}</Text>
        </View>
      </View>

      {/* Body with cards in two columns */}
      <View style={styles.body}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.card}>
            <Icon name="user" size={30} color="#FFFFFF" />
            <Text style={styles.cardTitle}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Icon name="building" size={30} color="#FFFFFF" />
            <Text style={styles.cardTitle}>Organisation</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Button')}  // Navigate to LeaveApply.js
          >
            <Icon name="paper-plane" size={30} color="#FFFFFF" />
            <Text style={styles.cardTitle}>Leave</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('SalarySlip', { employeeId })}
          >
            <Icon name="file-text" size={30} color="#FFFFFF" />
            <Text style={styles.cardTitle}>Salary Slips</Text>
            <Text style={styles.cardSubtitle}>View</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: 'orange',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
    color: '#FFFFFF',
  },
  userId: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 5,
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 40,
    backgroundColor: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'silver',
    padding: 20,
    borderRadius: 10,
    width: '48%',
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',  // Horizontally center content
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
  cardSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 5,
  },
});

export default Home;
