import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';

const Home = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/80'); 

  useEffect(() => {
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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const mobileNumber = await AsyncStorage.getItem('mobileNumber');
        if (mobileNumber) {
          const response = await fetch('http://192.168.1.9:4000/getUserDetails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mobileNumber }),
          });

          const result = await response.json();
          if (result.success) {
            setUserName(result.name);
            setEmployeeId(result.employeeId);

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
    height: 120,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  iconImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Home;
