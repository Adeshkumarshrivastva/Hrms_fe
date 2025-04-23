import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
<<<<<<< HEAD
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import Config from 'react-native-config';

const apiUrl = Config.API_URL;
=======
 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d

const Home = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
<<<<<<< HEAD
  const [profileImage, setProfileImage] = useState();
=======
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/80'); 
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const savedImageUri = await AsyncStorage.getItem('profileImage');
        if (savedImageUri) {
          setProfileImage(savedImageUri);
<<<<<<< HEAD
        } else {
          // Set default image if no profile image is stored
          setProfileImage(null); // We'll handle fallback in <Image />
=======
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
        }
      } catch (error) {
        console.error('Error fetching profile image from AsyncStorage:', error);
      }
    };
<<<<<<< HEAD
=======

>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
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
<<<<<<< HEAD
=======

>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
        try {
          await AsyncStorage.setItem('profileImage', source.uri);
        } catch (error) {
          console.error('Error saving profile image to AsyncStorage:', error);
        }
      }
    });
  };

<<<<<<< HEAD
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
=======
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const mobileNumber = await AsyncStorage.getItem('mobileNumber');
        if (mobileNumber) {
<<<<<<< HEAD
          const response = await fetch('https://hr360.co.in/getUserDetails', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mobileNumber }),
          });
=======
          const response = await fetch('http://192.168.1.9:4000/getUserDetails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mobileNumber }),
          });

>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
          const result = await response.json();
          if (result.success) {
            setUserName(result.name);
            setEmployeeId(result.employeeId);
<<<<<<< HEAD
            if (result.employeeId) await AsyncStorage.setItem('ecno', result.employeeId);
            if (result.name) await AsyncStorage.setItem('userName', result.name);
=======

            if (result.employeeId) {
              await AsyncStorage.setItem('ecno', result.employeeId);
            }

            if (result.name) {
              await AsyncStorage.setItem('userName', result.name);
            }
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
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
<<<<<<< HEAD
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
=======
   
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

        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeText}>Welcome to HRMS App</Text>
        </View>

        {/* Body with cards in two columns */}
       {/* Body with cards in two columns */}
<View style={styles.body}>
  <View style={styles.row}>
    
    {/* Profile Card */}
    <TouchableOpacity style={styles.card}>
      <Image
        source={require('./img/circle.png')}
        style={styles.iconImage}
      />
      <Text style={styles.cardTitle}>Profile</Text>
    </TouchableOpacity>
    
    {/* Organisation Card */}
    <TouchableOpacity style={styles.card}>
      <Image
          source={require('./img/flowchart.png')}
        style={styles.iconImage}
      />
      <Text style={styles.cardTitle}>Organisation</Text>
    </TouchableOpacity>
  </View>

  <View style={styles.row}>
    
    {/* Leave Card */}
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Button')}
    >
      <Image
        source={require('./img/fire-exit.png')}
        style={styles.iconImage}
      />
      <Text style={styles.cardTitle}>Leave</Text>
    </TouchableOpacity>
    
    {/* Salary Slips Card */}
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('SalarySlip', { employeeId })}
    >
      <Image
   source={require('./img/salary.png')}
        style={styles.iconImage}
      />
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
    alignItems: 'center',
    justifyContent: 'center',
    background:'silver'
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
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
    borderRadius: 40,
<<<<<<< HEAD
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
=======
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
  welcomeCard: {
    backgroundColor: 'orange',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    marginTop: 20,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    width: '40%',
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
    height: 120,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
<<<<<<< HEAD
    marginTop: '10%',
=======
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
    justifyContent: 'center',
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
    resizeMode: 'contain',
=======
    width: 50,
    height: 50,
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
<<<<<<< HEAD
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#999',
    marginTop: 4,
=======
    fontWeight: 'bold',
    color: '#333',
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
  },
});

export default Home;
