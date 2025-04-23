import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import Config from 'react-native-config';

const apiUrl = Config.API_URL;

const Home = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [profileImage, setProfileImage] = useState();

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const savedImageUri = await AsyncStorage.getItem('profileImage');
        if (savedImageUri) {
          setProfileImage(savedImageUri);
        } else {
          // Set default image if no profile image is stored
          setProfileImage(null); // We'll handle fallback in <Image />
        }
      } catch (error) {
        console.error('Error fetching profile image from AsyncStorage:', error);
      }
    };
    fetchProfileImage();
  }, []);

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo', includeBase64: false }, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error:', response.errorMessage);
      } else {
        const source = { uri: response.assets[0].uri };
        setProfileImage(source.uri);
        try {
          await AsyncStorage.setItem('profileImage', source.uri);
        } catch (error) {
          console.error('Error saving profile image to AsyncStorage:', error);
        }
      }
    });
  };

  const handleSignOut = async () => {
    try {
      await AsyncStorage.clear();

      Alert.alert('Success', 'Sign out successfully in 5 seconds...', [
        {
          text: 'OK',
          onPress: () => {
            setTimeout(() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'PhoneVerification' }],
              });
            }, 5000);
          },
        },
      ]);
    } catch (error) {
      console.error('Error during sign out:', error);
      Alert.alert('Error', 'Something went wrong during sign out.');
    }
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const mobileNumber = await AsyncStorage.getItem('mobileNumber');
        if (mobileNumber) {
          const response = await fetch('https://hr360.co.in/getUserDetails', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mobileNumber }),
          });
          const result = await response.json();
          if (result.success) {
            setUserName(result.name);
            setEmployeeId(result.employeeId);
            if (result.employeeId) await AsyncStorage.setItem('ecno', result.employeeId);
            if (result.name) await AsyncStorage.setItem('userName', result.name);
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
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : { uri: 'https://cdn-icons-png.flaticon.com/512/847/847969.png' }
            }
            style={styles.profileImage}
          />
        </TouchableOpacity>

        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userId}>Employee ID: {employeeId}</Text>
        </View>
        <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
      {/* Cards */}
      <View style={styles.body}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.card}>
            <Image source={require('./img/profile.png')} style={styles.iconImage} />
            <Text style={styles.cardTitle}>Profile</Text>
          </TouchableOpacity>
          {/* Organisation */}
          <TouchableOpacity style={styles.card}>
            <Image source={require('./img/link.png')} style={styles.iconImage} />
            <Text style={styles.cardTitle}>Organisation</Text>
          </TouchableOpacity>
        </View>
        {/* Leave */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Button')}>
            <Image source={require('./img/exit.png')} style={styles.iconImage} />
            <Text style={styles.cardTitle}>Leave</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('SalarySlip', { employeeId })}
          >
            <Image source={require('./img/income.png')} style={styles.iconImage} />
            <Text style={styles.cardTitle}>Salary Slip</Text>
          </TouchableOpacity>
        </View>
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
    width: '100%',
    height: 100,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#ddd',
    resizeMode: 'contain',
  },
  userInfo: {
    flex: 1,
    marginLeft: 45,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  userId: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
  signOutButton: {
    position: 'absolute',
    right: 10,
    top: 40,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
  },
  signOutText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FF4500',
  },
  body: {
    padding: 20,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    width: '42%',
    height: 120,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: '10%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  iconImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#999',
    marginTop: 4,
  },
});

export default Home;
