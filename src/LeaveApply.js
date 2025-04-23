import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Platform, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import DocumentPicker from 'react-native-document-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { format } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import { uploadFiles } from 'react-native-fs';
import { Header } from '@react-navigation/stack';
<<<<<<< HEAD
import Config from 'react-native-config';

const apiUrl = Config.API_URL;

=======
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
const LeaveApply = ({ route, navigation }) => {
  // Safe check for profileImage in route.params, with fallback
  const initialProfileImage = route?.params?.profileImage || 'https://via.placeholder.com/80';
  const [profileImage, setProfileImage] = useState(initialProfileImage);
  const [leaveTypeID, setLeaveTypeID] = useState('');
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [days, setDays] = useState('1');
  const [permissionFrom, setStationLeavingFrom] = useState(new Date());
  const [permissionTo, setStationLeavingTo] = useState(new Date());
  const [showStationFromDatePicker, setShowStationFromDatePicker] = useState(false);
  const [showStationToDatePicker, setShowStationToDatePicker] = useState(false);
  const [isLocalStay, setIsLocalStay] = useState(false);
  const [document, setDocument] = useState(null);
  const [userName, setUserName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [inputHeight, setInputHeight] = useState('');
  const [showUpload, setShowUpload] = useState(false);
  const [leaveReason, setReason] = useState('');
  const [chargeHandover, setChargeHandover] = useState('');
<<<<<<< HEAD
  const [appliedOn, setAppliedOn] = useState('');
  const [applicationStatus, setAPPlicationStatus] = useState('');
  const [address, setAddress] = useState('');
  const [item, setItem] = useState('');
  const [sanctionData, setSanctionData] = useState([]);
=======
  const [address, setAddress] = useState('');
  const [item, setItem] = useState('');
  const [sanctionData, setSanctionData] = useState([]);


>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
  const [uploadfileFullname, setuploadfileFullName] = useState('');

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
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    const fetchLeaveTypes = async () => {
      setIsLoading(true);
      try {
        const storedEmployeeId = await AsyncStorage.getItem('ecno');
<<<<<<< HEAD
        const response = await fetch('https://hr360.co.in/bindLeave', {
=======
        const response = await fetch('http://192.168.1.9:4000/bindLeave', {
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ecno: storedEmployeeId }),
        });

        const data = await response.json();
        if (data.success) {
          const formattedLeaveTypes = data.data.map(item => ({
            label: item.CurrentBalance,
            value: item.LeaveTypeID,
          }));
          setLeaveTypes(formattedLeaveTypes);
        } else {
          Alert.alert('Error', 'Failed to fetch leave types');
        }
      } catch (error) {
        console.error('Error fetching leave types:', error);
        Alert.alert('Error', 'Failed to fetch leave types');
      } finally {
        setIsLoading(false);
      }
    };
    fetchEmployeeData();
    fetchLeaveTypes();
  }, []);

  const cardsToDisplay = ['sanction', 'recommended2'];
<<<<<<< HEAD
  const SanctionAuthority = async () => {
    try {
      const response = await fetch('https://hr360.co.in/SanctionAuthority', {
=======

  const SanctionAuthority = async () => {
    try {
      const response = await fetch('http://192.168.1.9:4000/SanctionAuthority', {
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ecno: await AsyncStorage.getItem('ecno'),
          leaveTypeID,
        }),
      });

<<<<<<< HEAD
=======

>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
      if (!response.ok) {
        Alert.alert('Error', 'Failed to fetch sanction, recommended, and forwarding details.');
        return;
      }
<<<<<<< HEAD
      const data = await response.json();
=======

      const data = await response.json();


>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
      if (data.message) {
        Alert.alert('Error', data.message);
        return;
      }
      setSanctionData(data);
      console.log('Sanction Authority Data:', data);

    } catch (error) {
<<<<<<< HEAD
=======

>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
      setErrorMessage('An error occurred while fetching SanctionData.');
      console.error('Error fetching sanction data:', error);
    }
  };

  // Handle Leave Application Submit
  const handleSubmit = async () => {
    try {
      // Validation: Check if a leave type is selected
      if (!leaveTypeID) {
        Alert.alert('Validation Error', 'Please select a leave type.');
        return;
      }

      // Validation: Check if "From Date" is greater than "To Date"
      if (fromDate > toDate) {
        Alert.alert('Validation Error', '"From Date" cannot be greater than "To Date".');
        return;
      }

      // Validation: "From Date" is required
      if (!fromDate) {
        Alert.alert('Validation Error', '"From Date" is required.');
        return;
      }

      // Validation: "To Date" is required
      if (!toDate) {
        Alert.alert('Validation Error', '"To Date" is required.');
        return;
      }

      // Validation: Leave reason is required
      if (!leaveReason) {
        Alert.alert('Validation Error', '"Leave Reason" is required.');
        return;
      }

      // Validation: Station Leaving
      if (!permissionFrom && !permissionTo && !isLocalStay) {
        Alert.alert(
          'Validation Error',
          'Please provide either "Permission From", "Permission To", or "Local Stay".'
        );
        return;
      }
<<<<<<< HEAD
=======

>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
      // Validation for Sick Leave
      if (leaveTypeID === 5 && !document) {
        Alert.alert('Validation Error', 'Please upload a supporting document for Sick Leave.');
        return;
      }
<<<<<<< HEAD
=======

>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
      // Validation for Casual Leave
      if (leaveTypeID === 1) {
        const diffTime = Math.abs(toDate - fromDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        if (diffDays > 4) {
          Alert.alert('Validation Error', 'Casual Leave cannot be more than 4 days at one time.');
          return;
        }
      }
<<<<<<< HEAD
      // Prepare leave application data
      const chargeHandoverValue = chargeHandover || '';
      const addressToSave = address || '';
      const applicationStatusToSave = applicationStatus || '';
      const leaveReasonToSave = leaveReason || '';
      const ToSaveisLocalStay = isLocalStay || ''
      const ToSaveUploadFileFullname = uploadfileFullname || '';
      const formattedAppliedOn = appliedOn || format(new Date(), 'dd-MM-yyyy');
=======

      // Prepare leave application data
      const chargeHandoverValue = chargeHandover || '';
      const addressToSave = address || '';
      const leaveReasonToSave = leaveReason || '';
      const ToSaveisLocalStay = isLocalStay || '';
      const ToSaveUploadFileFullname = uploadfileFullname || '';
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
      const formattedFromDate = fromDate ? format(fromDate, 'dd-MM-yyyy') : null;
      const formattedToDate = toDate ? format(toDate, 'dd-MM-yyyy') : null;
      const formattedPermissionFrom = permissionFrom ? format(permissionFrom, 'dd-MM-yyyy') : null;
      const formattedPermissionTo = permissionTo ? format(permissionTo, 'dd-MM-yyyy') : null;
      const data = {
        ecno: await AsyncStorage.getItem('ecno'),
        leaveTypeID,
        fromDate: formattedFromDate,
        toDate: formattedToDate,
        Days: days,
        address: addressToSave,
        leaveReason: leaveReasonToSave,
        permissionFrom: formattedPermissionFrom,
        permissionTo: formattedPermissionTo,
        isLocalStay: ToSaveisLocalStay ? 'Y' : 'N',
        chargeHandover: chargeHandoverValue,
<<<<<<< HEAD
        appliedOn: formattedAppliedOn,
        applicationStatus: applicationStatusToSave,
        uploadfileFullname: ToSaveUploadFileFullname
      };
      console.log('Formatted data being sent to backend:', data);
      const response = await axios.post('https://hr360.co.in/LeaveApply', data, {
=======
        uploadfileFullname: ToSaveUploadFileFullname

      };
      console.log('Formatted data being sent to backend:', data);
      const response = await axios.post('http://192.168.1.9:4000/LeaveTransaction', data, {
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.success) {
        Alert.alert('Leave application submitted successfully!');
<<<<<<< HEAD

=======
        // navigation.navigate('LeaveHistoryScreen'); 
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
      } else {
        Alert.alert(response.data.message || 'Leave application failed.');
      }
    } catch (error) {
      console.error('Error during API call:', error);
      if (error.response) {
        Alert.alert(error.response.data.message || 'Server error');
      } else if (error.request) {
        Alert.alert('No response from server. Please check your connection.');
      } else {
        Alert.alert(error.message || 'Unexpected error occurred.');
      }
    }
  };
<<<<<<< HEAD
=======

>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
  async function LeaveApply() {
    try {
      const formattedFromDate = fromDate ? format(fromDate, 'dd-MM-yyyy') : null;
      const formattedToDate = toDate ? format(toDate, 'dd-MM-yyyy') : null;
<<<<<<< HEAD
      const response = await axios.post('https://hr360.co.incheckForAlreadyAppliedLeave', {
=======
      const response = await axios.post('http://192.168.1.9:4000/checkForAlreadyAppliedLeave', {
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
        ecno: await AsyncStorage.getItem('ecno'),
        fromDate: formattedFromDate,
        toDate: formattedToDate,
      });
<<<<<<< HEAD
=======


>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
      if (response.data.success) {
        Alert.alert(`Leave already applied on these dates: ${JSON.stringify(response.data.data)}`);
        return false;
      } else {
        console.log('No conflicting leaves found. Proceeding with leave application.');
        return true;
      }
    } catch (error) {
      console.error('Error while calling the API:', error);

      if (error.response && error.response.data) {
        Alert.alert(error.response.data.message || 'Server error');
      } else {
        Alert.alert('Failed to check for leave applications. Please try again.');
      }
      return false;
    }
  }



  const handleLeaveTypeChange = (selectedTypeID) => {
    setLeaveTypeID(selectedTypeID);
    if (selectedTypeID == '5') {
      setShowUpload(true);
    } else {
      setShowUpload(false);
    }
  };

  const handleDocumentPick = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      setDocument(res);
      Alert.alert('Document Selected', `File: ${res.name}`);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        Alert.alert('Error', 'Unknown error occurred while picking document.');
        console.error(err);
      }
    }
  };

  const calculateDays = (startDate, endDate) => {
    const differenceInTime = startDate.getTime() - endDate.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)) + 1;
    return differenceInDays;
  };

  const handleFromDateChange = (event, selectedDate) => {
    setShowFromDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setFromDate(selectedDate);
      const calculatedDays = calculateDays(toDate, selectedDate);
      setDays(calculatedDays);
    }
  };

  const handleToDateChange = (event, selectedDate) => {
    setShowToDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setToDate(selectedDate);
      const calculatedDays = calculateDays(selectedDate, fromDate);
      setDays(calculatedDays);
    }
  };

  const handleStationFromDateChange = (event, selectedDate) => {
    setShowStationFromDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      const formattedDate = format(selectedDate, 'dd-MM-yyyy');
      setStationLeavingFrom(selectedDate);
    }
  };
<<<<<<< HEAD
=======

>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
  const handleStationToDateChange = (event, selectedDate) => {
    setShowStationToDatePicker(Platform.OS === 'ios');
    console.log(selectedDate);
    if (selectedDate) {
      setStationLeavingTo(selectedDate);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: profileImage || 'https://via.placeholder.com/80' }}
          style={styles.profileImage}
        />
<<<<<<< HEAD
        {/* Back Button moved to right using inline style */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', right: 20, top: 35 }}>
          <Image source={require('./img/BackArrow.png')} style={{ width: 50, height: 50 }} />
        </TouchableOpacity>
=======
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userName || 'Not Available'}</Text>
          <Text style={styles.userId}>
            Employee ID: {employeeId || 'Not Available'}
          </Text>
        </View>
      </View>
<<<<<<< HEAD
=======

>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
      {/* Leave Type Picker */}
      <Text style={[styles.label, { marginTop: 40 }]}>Leave Type:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={leaveTypeID}
          onValueChange={(itemValue) => {
            handleLeaveTypeChange(itemValue);
            SanctionAuthority(itemValue);
          }}
          style={styles.picker}
        >
          <Picker.Item label="Select Leave Type" value="0" />
          {leaveTypes.map((type, index) => (
            <Picker.Item key={index} label={type.label} value={type.value} />
          ))}
        </Picker>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
        {/* From Date */}
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text style={[styles.label, { color: 'black' }]}>From:</Text>
          <TouchableOpacity onPress={() => setShowFromDatePicker(true)}>
            <View style={styles.datePicker}>
              <MaterialCommunityIcons name="calendar" size={18} color="#6200EE" />
              <Text style={{ color: 'black' }}>
                {fromDate ? format(fromDate, 'dd-MM-yyyy') : 'Enter Date'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* To Date */}
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text style={[styles.label, { color: 'black' }]}>To:</Text>
          <TouchableOpacity onPress={() => setShowToDatePicker(true)}>
            <View style={styles.datePicker}>
              <MaterialCommunityIcons name="calendar" size={18} color="#6200EE" />
              <Text style={{ color: 'black' }}>
                {toDate ? format(toDate, 'dd-MM-yyyy') : 'Enter Date'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Number of Days */}
        <View style={{ flex: 1 }}>
          <Text style={[styles.label, { color: 'black' }]}>Days:</Text>
          <TextInput
            style={[styles.input, { color: 'black', height: 46, width: '70%' }]}
            value={days !== null ? String(days) : ''}
            onChangeText={(value) => {
              const numericValue = value.replace(/[^0-9]/g, '');
              const numDays = parseInt(numericValue, 10);

              if (!isNaN(numDays) && numDays > 0) {
                setDays(numDays);

                if (fromDate) {
                  const newToDate = new Date(fromDate);
                  newToDate.setDate(newToDate.getDate() + numDays - 1);
                  setToDate(newToDate);
                }
              } else {
                setDays('1');
                setToDate(fromDate);
              }
            }}
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* Reason for Leave */}
      <View style={{ padding: 2 }}>
        <Text style={[styles.label, { color: 'black' }]}>Reason for Leave:</Text>
        <TextInput
          style={[styles.input, { height: Math.max(inputHeight, 60) }]}
          value={leaveReason}
          onChangeText={setReason}
          placeholder="Enter your reason"
          multiline
          onContentSizeChange={(contentSize) => {
            if (contentSize && contentSize.contentSize) {
              setInputHeight(contentSize.contentSize.height);
            }
          }}
        />
      </View>

      {/* Contact During Leave */}
      <Text style={styles.label}>Contact During Leave:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />

      {/* Station Permission */}
      <Text style={styles.label}>Station Leaving Permission:</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
        {/* From Date */}
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text style={[styles.label, { color: 'black' }]}>From:</Text>
<<<<<<< HEAD
          <TouchableOpacity onPress={() => setShowFromDatePicker(true)}>
            <View style={styles.datePicker}>
              <MaterialCommunityIcons name="calendar" size={18} color="#6200EE" />
              <Text style={{ color: 'black' }}>
                {fromDate ? format(fromDate, 'dd-MM-yyyy') : 'Enter Date'}
=======
          <TouchableOpacity
            onPress={() => !isLocalStay && setShowStationFromDatePicker(true)}
            disabled={isLocalStay}
          >
            <View style={[
              styles.datePicker,
              { backgroundColor: isLocalStay ? '#e0e0e0' : 'white' },
            ]}>
              <MaterialCommunityIcons
                name="calendar"
                size={18}
                color={isLocalStay ? '#a9a9a9' : '#6200EE'}
              />
              <Text style={{ color: isLocalStay ? '#a9a9a9' : 'black' }}>
                {permissionFrom ? format(permissionFrom, 'dd-MM-yyyy') : 'Enter Date'}
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* To Date */}
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text style={[styles.label, { color: 'black' }]}>To:</Text>
<<<<<<< HEAD
          <TouchableOpacity onPress={() => setShowToDatePicker(true)}>
            <View style={styles.datePicker}>
              <MaterialCommunityIcons name="calendar" size={18} color="#6200EE" />
              <Text style={{ color: 'black' }}>
                {toDate ? format(toDate, 'dd-MM-yyyy') : 'Enter Date'}
=======
          <TouchableOpacity
            onPress={() => !isLocalStay && setShowStationToDatePicker(true)}
            disabled={isLocalStay}
          >
            <View style={[
              styles.datePicker,
              { backgroundColor: isLocalStay ? '#e0e0e0' : 'white' },
            ]}>
              <MaterialCommunityIcons
                name="calendar"
                size={18}
                color={isLocalStay ? '#a9a9a9' : '#6200EE'}
              />
              <Text style={{ color: isLocalStay ? '#a9a9a9' : 'black' }}>
                {permissionTo ? format(permissionTo, 'dd-MM-yyyy') : 'Enter Date'}
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
              </Text>
            </View>
          </TouchableOpacity>
        </View>

<<<<<<< HEAD

=======
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
        {/* Local Stay Checkbox */}
        <View style={{ width: '32%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginLeft: 10 }}>
          <CheckBox
            value={isLocalStay}
            onValueChange={(newValue) => setIsLocalStay(newValue)}
            tintColors={{ true: '#808080', false: '#808080' }}
          />
          <Text style={[styles.label, { marginLeft: 1 }]}>Local Stay</Text>
        </View>
      </View>

      <Text style={styles.label}>Charge Handed Over To:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter charge"
        value={chargeHandover}
        onChangeText={(text) => setChargeHandover(text)}
      />

      {/* Document Upload */}
      {showUpload && (
        <TouchableOpacity style={styles.uploadButton} onPress={handleDocumentPick}>
          <Text style={styles.buttonText}>
            {document ? `Document: ${document.name}` : 'Upload Document'}
          </Text>
        </TouchableOpacity>
      )}
<<<<<<< HEAD
      <View style={styles.cardContainer}>
        {/* Render only the specified fields */}
        {cardsToDisplay.map((field, index) => (
          sanctionData[field] !== undefined && (
            <View key={index} style={styles.row}>
              <Text style={styles.label}>{field.replace(/([A-Z])/g, ' $1').toUpperCase()}:</Text>
              <Text style={styles.value}>{sanctionData[field] || 'N/A'}</Text>
            </View>
          )
        ))}
      </View>
=======


<View style={styles.cardContainer}>
  
    {/* Render only the specified fields */}
    {cardsToDisplay.map((field, index) => (
      sanctionData[field] !== undefined && (
        <View key={index} style={styles.row}>
          <Text style={styles.label}>{field.replace(/([A-Z])/g, ' $1').toUpperCase()}:</Text>
          <Text style={styles.value}>{sanctionData[field] || 'N/A'}</Text>
        </View>
      )
    ))}
  </View>


>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Apply Leave</Text>
      </TouchableOpacity>

      {/* Date Pickers */}
      {showFromDatePicker && (
        <DateTimePicker
          value={fromDate}
          mode="date"
          display="default"
          onChange={handleFromDateChange}
        />
      )}
      {showToDatePicker && (
        <DateTimePicker
          value={toDate}
          mode="date"
          display="default"
          onChange={handleToDateChange}
        />
      )}
      {showStationFromDatePicker && (
        <DateTimePicker
          value={permissionFrom}
          mode="date"
          display="default"
          onChange={handleStationFromDateChange}
        />
      )}
      {showStationToDatePicker && (
        <DateTimePicker
          value={permissionTo}
          mode="date"
          display="default"
          onChange={handleStationToDateChange}
        />
      )}


    </ScrollView>
  );
};
const styles = StyleSheet.create({
  header: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
<<<<<<< HEAD
    width: '100%',
    height: 100,
=======
    justifyContent: 'space-between',
    width: '100%',
    height: 80,
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
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
    marginLeft: 45,
=======
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


  label: {
    fontSize: 13,
    fontWeight: 'bold',
<<<<<<< HEAD
    color: '#333',
    marginLeft: 20,
  },

  pickerContainer: {
    width: '90%',
    borderColor: 'silver',

    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 20,
    marginBottom: 8,
  },

  picker: {
    height: 50,
    width: '100%',
    icon: 'red ',
=======
   
    color: '#333',
    marginLeft: 20,
  },
  pickerContainer: {
    width: '90%',
    borderColor: 'gray',
    
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 20,
    marginBottom: 8, 
  },
 
  picker: {
    height: 50,
    width: '100%',
    icon:'black',
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
    color: 'black',
  },
  datePicker: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 3,
    padding: 8,
    marginLeft: 20,
<<<<<<< HEAD
    marginBottom: 5,
  },
  Icon: {
    position: 'absolute',
    backgroundColor: 'silver',
    color: 'black',
=======
    marginBottom: 5, 
  },
  dropdownIcon: {
    position: 'absolute',
    backgroundColor: 'gray',
    color:'black',
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
    right: 10,
    top: 5,
  },
  dateText: {
    marginLeft: 10,
    fontSize: 12,
    color: '#333',
  },
  input: {
    width: '90%',
<<<<<<< HEAD
    height: 45,
=======
    height: 45, 
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 12,
    marginLeft: 20,
<<<<<<< HEAD
    marginBottom: 6,
=======
    marginBottom: 6, 
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
    backgroundColor: '#fff',
    color: 'black',
  },
  subLabel: {
    fontSize: 14,
    color: 'black',
    marginLeft: 20,
<<<<<<< HEAD
    marginBottom: 3,
=======
    marginBottom: 3, 
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
  },
  uploadButton: {
    backgroundColor: 'gray',
    borderRadius: 3,
<<<<<<< HEAD
    paddingVertical: 12,
    alignItems: 'center',
    width: '90%',
    marginLeft: 20,
    marginBottom: 3,
=======
    paddingVertical: 12, 
    alignItems: 'center',
    width: '90%',
    marginLeft: 20,
    marginBottom: 3, 
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
  },
  submitButton: {
    backgroundColor: 'gray',
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
    width: '90%',
    marginLeft: 20,
    marginBottom: 5,
  },
  cardContainer: {
<<<<<<< HEAD
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: 14,
  },

=======
    backgroundColor: 'white',  
    borderRadius: 8,          
    shadowColor: '#000',      
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,       
    shadowRadius: 4,
    elevation: 3,                  
    margin: 14,               
  },
  
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
<<<<<<< HEAD
    marginBottom: 5,
    paddingVertical: 8,
=======
    marginBottom: 5, 
    paddingVertical: 8, 
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
  },
  tableLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
<<<<<<< HEAD
    flex: 1,
    marginRight: 10,
  },
  value: {
    color: 'blue',
    fontSize: 10,
    fontWeight: 'bold',
    flex: 2,
=======
    flex: 1, 
    marginRight: 10,
  },
  value: {
    color: 'red', 
    fontSize: 10, 
    fontWeight: 'bold',
    flex: 2, 
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
    textAlign: 'right',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default LeaveApply;




