import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';

const SalarySlip = ({ route, navigation }) => {
  const { profileImage: initialProfileImage } = route.params || {};
 

  // Year and Month options
  const years = ['Select', '2022', '2023', '2024'];
  const months = [
    { label: 'Select', value: 'Select' },
    { label: 'January', value: '1' },
    { label: 'February', value: '2' },
    { label: 'March', value: '3' },
    { label: 'April', value: '4' },
    { label: 'May', value: '5' },
    { label: 'June', value: '6' },
    { label: 'July', value: '7' },
    { label: 'August', value: '8' },
    { label: 'September', value: '9' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' }
  ];

  // Get current year and month
  const currentYear = new Date().getFullYear().toString();
  const currentMonth = (new Date().getMonth() + 1).toString();

  // States for selected year, month, employee data, and loading
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [userName, setUserName] = useState('');  // Assuming you handle userName separately
  const [employeeId, setEmployeeId] = useState('');  // Assuming you handle employeeId separately
  const [isLoading, setIsLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(initialProfileImage || 'https://via.placeholder.com/80');

  useEffect(() => {
    // If needed, fetch employee data from AsyncStorage (you mentioned it's handled elsewhere)
    const fetchEmployeeData = async () => {
      try {
        const storedEmployeeId = await AsyncStorage.getItem('ecno');
        const storedUserName = await AsyncStorage.getItem('userName');
        const savedImageUri = await AsyncStorage.getItem('profileImage'); 

        if (storedEmployeeId) {
          setEmployeeId(storedEmployeeId);
        } 
        if (storedUserName) {
          setUserName(storedUserName);
        }
        if (savedImageUri) {
          setProfileImage(savedImageUri); 
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);
  // const handleImagePick = () => {
  //   launchImageLibrary({ mediaType: 'photo', includeBase64: false }, async (response) => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.errorCode) {
  //       console.error('ImagePicker Error:', response.errorMessage);
  //     } else {
  //       const source = { uri: response.assets[0].uri };
  //       setProfileImage(source.uri); // Set the selected image as the profile image

  //       // Save the image URI to AsyncStorage for persistence
  //       try {
  //         await AsyncStorage.setItem('profileImage', source.uri);
  //       } catch (error) {
  //         console.error('Error saving profile image to AsyncStorage:', error);
  //       }
  //     }
  //   });
  // };


  // Handle "View Salary Slip" button press
  const handleViewSalarySlip = () => {
    if (selectedYear !== 'Select' && selectedMonth !== 'Select') {
      console.log('Fetching Salary Slip for:', employeeId, selectedYear, selectedMonth);
      fetchSalarySlipData(employeeId, selectedYear, selectedMonth);
    } else {
      Alert.alert('Error', 'Please select both year and month');
    }
  };

  // Fetch salary slip data from backend API
  const fetchSalarySlipData = async (employeeId, payYear, payMonth) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://192.168.1.8:4000/generateSalarySlip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ecno: employeeId,
          payYear: payYear,
          payMonth: payMonth,
        }),
      });

      const data = await response.json();

      if (data.success && Array.isArray(data.data)) {
        console.log('Salary Data:', data.data); 
        navigation.navigate('SalarySlipPdf', {
          salaryData: data.data,
        });
      } else {
        alert('No salary data available.');
        console.log('Response success:', data.success);
        console.log('Salary data:', data.data);
      }
    } catch (error) {
      console.error('Error fetching salary slip:', error);
      alert('Error fetching salary slip. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading indicator while data is being fetched
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#C75B00" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Use profileImage here */}
        <Image source={{ uri: profileImage || 'https://via.placeholder.com/80' }} style={styles.profileImage} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userName || 'Not Available'}</Text>
          <Text style={styles.userId}>Employee ID: {employeeId || 'Not Available'}</Text>
        </View>
      </View>
    
      {/* Body */}
      <View style={styles.body}>
        <Text style={styles.label}>Select Year</Text>
        <Picker
          selectedValue={selectedYear}
          onValueChange={(itemValue) => setSelectedYear(itemValue)}
          style={styles.picker}
        >
          {years.map((year) => (
            <Picker.Item key={year} label={year} value={year} />
          ))}
        </Picker>

        <Text style={styles.label}>Select Month</Text>
        <Picker
          selectedValue={selectedMonth}
          onValueChange={(itemValue) => setSelectedMonth(itemValue)}
          style={styles.picker}
        >
          {months.map((month) => (
            <Picker.Item key={month.value} label={month.label} value={month.value} />
          ))}
        </Picker>

        <TouchableOpacity style={styles.button} onPress={handleViewSalarySlip}>
          <Text style={styles.buttonText}>View Salary Slip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  },
  userInfo: {
    marginLeft: 20,
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  userId: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  body: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    color: '#333',
  },
  button: {
    backgroundColor: 'grey',
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
    borderRadius: 5,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: 'silver',
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SalarySlip;