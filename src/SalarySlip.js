import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    { label: 'December', value: '12' },
  ];

  // Get current year and month
  const currentYear = new Date().getFullYear().toString();
  const currentMonth = (new Date().getMonth() + 1).toString();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [userName, setUserName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(initialProfileImage || 'https://via.placeholder.com/80');

  useEffect(() => {
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

  const handleViewSalarySlip = () => {
    if (selectedYear !== 'Select' && selectedMonth !== 'Select') {
      fetchSalarySlipData(employeeId, selectedYear, selectedMonth);
    } else {
      Alert.alert('Error', 'Please select both year and month');
    }
  };

  const fetchSalarySlipData = async (employeeId, payYear, payMonth) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://192.168.1.9:4000/generateSalarySlip', {
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
        navigation.navigate('SalarySlipPdf', {
          salaryData: data.data,
        });
      } else {
        Alert.alert('No salary data available.');
      }
    } catch (error) {
      console.error('Error fetching salary slip:', error);
      Alert.alert('Error', 'Error fetching salary slip. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userName || 'Not Available'}</Text>
            <Text style={styles.userId}>Employee ID: {employeeId || 'Not Available'}</Text>
          </View>
        </View>

       {/* Body */}
{/* Body */}
<View style={styles.body}>
  <View style={styles.card}>
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
</View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    background:'silver'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
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
    marginTop: 80,
  },
  card: {
    backgroundColor: 'orange',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    color: 'black',
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: 'silver',
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 10,
  },
  pickerText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'grey',
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
    width: '60%',
    marginTop: 30,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});
export default SalarySlip;
