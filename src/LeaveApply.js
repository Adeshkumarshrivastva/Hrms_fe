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
  const [address, setAddress] = useState('');

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
        const response = await fetch('http://192.168.1.8:4000/bindLeave', {
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

  // Handle Leave Application Submit
  const handleSubmit = async () => {
    try {
      // Validation: Check if a leave type is selected
      if (!leaveTypeID) {
        Alert.alert('Validation Error', 'Please select a leave type.');
        return;
      }

      // Validation: Check if "From Date" is greater than "To Date"
      // if (fromDate > toDate) {
      //   Alert.alert('Validation Error', '"From Date" cannot be greater than "To Date".');
      //   return;
      // }

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

      // Validation for Sick Leave
      if (leaveTypeID === 5 && !document) {
        Alert.alert('Validation Error', 'Please upload a supporting document for Sick Leave.');
        return;
      }

      // Validation for Casual Leave
      if (leaveTypeID === 1) {
        const diffTime = Math.abs(toDate - fromDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        if (diffDays > 4) {
          Alert.alert('Validation Error', 'Casual Leave cannot be more than 4 days at one time.');
          return;
        }
      }

      // Prepare leave application data
      const chargeHandoverValue = chargeHandover || '';
      const addressToSave = address || '';
      const leaveReasonToSave = leaveReason || '';
      const ToSaveisLocalStay = isLocalStay || '';
      const ToSaveUploadFileFullname =  uploadfileFullname || '';
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
        uploadfileFullname:ToSaveUploadFileFullname

      };
      console.log('Formatted data being sent to backend:', data);
      const response = await axios.post('http://192.168.1.8:4000/LeaveTransaction', data, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.success) {
        Alert.alert('Leave application submitted successfully!');
        // navigation.navigate('LeaveHistoryScreen'); 
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


  async function LeaveApply() {
    try {
      const formattedFromDate = fromDate ? format(fromDate, 'dd-MM-yyyy') : null;
      const formattedToDate = toDate ? format(toDate, 'dd-MM-yyyy') : null;
      const response = await axios.post('http://192.168.1.8:4000/checkForAlreadyAppliedLeave', {
        ecno: await AsyncStorage.getItem('ecno'),
        fromDate: formattedFromDate,
        toDate: formattedToDate,
      });


      if (response.data.success) {
        Alert.alert(`Leave already applied on these dates: ${JSON.stringify(response.data.data)}`);
        return false; // Stop further processing
      } else {
        console.log('No conflicting leaves found. Proceeding with leave application.');
        return true; // Proceed with leave application
      }
    } catch (error) {
      console.error('Error while calling the API:', error);

      if (error.response && error.response.data) {
        Alert.alert(error.response.data.message || 'Server error');
      } else {
        Alert.alert('Failed to check for leave applications. Please try again.');
      }
      return false; // Stop further processing
    }
  }

  // const isLeaveValid = LeaveApply();
  // if (!isLeaveValid) {
  //   console.log('No Further Leave Apply for this day.');
  //   return; // Stop further processing
  // }

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
        {/* Use profileImage here */}
        <Image source={{ uri: profileImage || 'https://via.placeholder.com/80' }} style={styles.profileImage} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userName || 'Not Available'}</Text>
          <Text style={styles.userId}>Employee ID: {employeeId || 'Not Available'}</Text>
        </View>
      </View>

      {/* Leave Type Picker */}
      <Text style={[styles.label, { marginTop: 40 }]}>Leave Type:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={leaveTypeID}
          onValueChange={(itemValue) => handleLeaveTypeChange(itemValue)}
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
              // Allow only numeric input
              const numericValue = value.replace(/[^0-9]/g, '');
              const numDays = parseInt(numericValue, 10);

              // Update days and adjust toDate if valid

              if (!isNaN(numDays) && numDays > 0) {
                setDays(numDays);

                // Calculate new toDate based on fromDate
                if (fromDate) {
                  const newToDate = new Date(fromDate);
                  newToDate.setDate(newToDate.getDate() + numDays - 1); // Subtract 1 to include the start date
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

      <View style={{ padding: 2 }}>
        {/* Reason for Leave */}
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
          <TouchableOpacity
            onPress={() => !isLocalStay && setShowStationFromDatePicker(true)}  // Disable if isLocalStay is true
            disabled={isLocalStay}  // Disable TouchableOpacity if isLocalStay is true
          >
            <View style={[
              styles.datePicker,
              { backgroundColor: isLocalStay ? '#e0e0e0' : 'white' }  // Change background color to indicate disabled
            ]}>
              <MaterialCommunityIcons
                name="calendar"
                size={18}
                color={isLocalStay ? '#a9a9a9' : '#6200EE'}  // Change icon color to indicate disabled state
              />
              <Text style={{ color: isLocalStay ? '#a9a9a9' : 'black' }}>
                {permissionFrom ? format(permissionFrom, 'dd-MM-yyyy') : 'Enter Date'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* To Date (Station Permission To Date) */}
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text style={[styles.label, { color: 'black' }]}>To:</Text>
          <TouchableOpacity
            onPress={() => !isLocalStay && setShowStationToDatePicker(true)}  // Disable if isLocalStay is true
            disabled={isLocalStay}  // Disable TouchableOpacity if isLocalStay is true
          >
            <View style={[styles.datePicker, { backgroundColor: isLocalStay ? '#e0e0e0' : 'white' }]}>
              <MaterialCommunityIcons
                name="calendar"
                size={18}
                color={isLocalStay ? '#a9a9a9' : '#6200EE'}
              />
              <Text style={{ color: isLocalStay ? '#a9a9a9' : 'black' }}>
                {permissionTo ? format(permissionTo, 'dd-MM-yyyy') : 'Enter Date'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

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

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
    marginLeft: 20,
  },
  pickerContainer: {
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    marginLeft: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    color: 'black',

  },
  datePicker: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    marginLeft: 20,
  },
  dropdownIcon: {
    position: 'absolute',
    backgroundColor: 'gray',
    right: 10,
    top: 10,
  },
  dateText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  input: {
    width: '90%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    color: 'black',
    marginLeft: 20,
  },
  subLabel: {
    fontSize: 14,
    color: 'black',
    marginLeft: 20,
  },
  uploadButton: {
    backgroundColor: 'gray',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 15,
    width: '90%',
    marginLeft: 20,
  },
  submitButton: {
    backgroundColor: 'gray',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    width: '90%',
    marginBottom: 10,
    marginLeft: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LeaveApply;

//select* from leavetransaction where ecno='10122' order by id desc?
//delete LeaveTransaction where ECNO='10122' and ID>=289044