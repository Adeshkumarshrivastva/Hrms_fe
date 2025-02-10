import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import { Picker } from '@react-native-picker/picker';
import Config from 'react-native-config';

const apiUrl = Config.API_URL;

const LeaveHistory = ({ route }) => {
    const initialProfileImage = route?.params?.profileImage || 'https://via.placeholder.com/80';
    const [profileImage, setProfileImage] = useState(initialProfileImage);
    const [userName, setUserName] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [ecno, setEcno] = useState('');
    const [leaveRecords, setLeaveRecords] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [leaveTypeID, LeaveTypeID] = useState('');
    const [fromDate, setFromadte] = useState(format(new Date(), 'dd-MM-yyyy'));
    const [toDate, setToDate] = useState(format(new Date(), 'dd-MM-yyyy'));
    const [selectedYear, setSelectedYear] = useState('Select');
    const years = ['Select', '2022', '2023', '2024', '2025'];

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const storedEmployeeId = await AsyncStorage.getItem('ecno');
                const storedUserName = await AsyncStorage.getItem('userName');
                const savedImageUri = await AsyncStorage.getItem('profileImage');

                if (storedEmployeeId) {
                    setEcno(storedEmployeeId);
                    setEmployeeId(storedEmployeeId);
                }

                if (storedUserName) {
                    setUserName(storedUserName);
                }

                if (savedImageUri) {
                    setProfileImage(savedImageUri);
                } else {
                    setProfileImage(initialProfileImage);
                }
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };

        fetchEmployeeData();
    }, []);
    useEffect(() => {
        if (ecno && selectedYear !== 'Select') {

            const fetchLeaveHistory = async (year) => {
                
                try {
                    const formattedFromDate = `${year}`; 
                    const formattedToDate = `${year}`; 
                    const response = await axios.get('http://192.168.1.11:4000/LeaveHistory', {

                        params: { ecno, fromDate: formattedFromDate, toDate: formattedToDate },
                    });
                    if (response.data.success) {
                        const formattedLeaveRecords = response.data.data.map((record) => ({
                            ...record,
                            FromDate: format(new Date(record.FromDate), 'dd-MM-yyyy'),
                            ToDate: format(new Date(record.ToDate), 'dd-MM-yyyy'),
                        }));
                        setLeaveRecords(formattedLeaveRecords);
                        setErrorMessage('');
                    } else {
                        setErrorMessage(response.data.message);
                        setLeaveRecords([]);
                    }
                } catch (error) {
                    
                    setErrorMessage('An error occurred while fetching data.');
                    console.error(error);
                }
            };
            fetchLeaveHistory(selectedYear);
        }
    }, [ecno, selectedYear]);



    const mapStatus = (status) => {
        if (status === 'A') {
            return 'Applied';
        } else if (status === 'S') {
            return 'Sanction';
        } else {
            return status;
        }
    };


    const handleWithdrawClick = async () => {
       const formattedFromDate = fromDate ? format(fromDate, 'dd-MM-yyyy') : null;
            const formattedToDate = toDate ? format(toDate, 'dd-MM-yyyy') : null;

        try {
            const response = await axios.post('http://192.168.1.11:4000/LeaveWithdrawl', {
                ecno: await AsyncStorage.getItem('ecno'),
                leaveTypeID,
               fromDate: formattedFromDate,
               toDate: formattedToDate,
            }, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.status !== 200) {
                Alert.alert('Error');
                return;
            }
            const data = response.data;
            if (data.message) {
                Alert.alert('Error', data.message);
                return;
            }
        } catch (error) {
            setErrorMessage('An error occurred while fetching Data.');
        }
    };

    
    const renderTableHeader = () => (
        <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Leave Type </Text>
            <Text style={styles.headerText}>From Date</Text>
            <Text style={styles.headerText}>To Date</Text>
            <Text style={styles.headerText}>Days</Text>
            <Text style={styles.headerText}>Status</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
                <View style={styles.userInfo}>
                    <Text style={styles.userName}>{userName || 'Not Available'}</Text>
                    <Text style={styles.userId}>Employee ID: {employeeId || 'Not Available'}</Text>
                </View>
            </View>

            <Picker
                selectedValue={selectedYear}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedYear(itemValue)}
            >
                {years.map((year) => (
                    <Picker.Item key={year} label={year} value={year} />
                ))}
            </Picker>

            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}



            <FlatList
                data={leaveRecords}
                keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
                renderItem={({ item }) => (
                    <View style={styles.tableRow}>
                        <View style={styles.tableDataRow}>
                            <Text style={styles.tableCell}>{item.LeaveName}</Text>
                            <Text style={styles.tableCell}>{item.FromDate}</Text>
                            <Text style={styles.tableCell}>{item.ToDate}</Text>
                            <Text style={styles.tableCell}>{item.Days}</Text>

                            <View style={styles.statusContainer}>
                                <Text style={styles.tableCell}>{mapStatus(item.ApplicationStatus)}</Text>
                                {item.ApplicationStatus === 'A' && (
                                    <TouchableOpacity style={styles.withdrawButton} onPress={handleWithdrawClick}>
                                        <Text style={styles.buttonText}>Withdraw</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    </View>
                )}
                ListHeaderComponent={renderTableHeader}
                contentContainerStyle={styles.tableContainer}
                showsVerticalScrollIndicator={true}
            />
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
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    userId: {
        fontSize: 14,
        color: 'white',
        marginTop: 5,
    },
    error: {
        color: 'red',
        marginBottom: 10,
        marginHorizontal: 20,
    },
    tableContainer: {
        flexGrow: 1,
        paddingBottom: 9,
    },
    tableRow: {
        marginBottom: 5,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f2f2f2',
        paddingVertical: 11,
        marginBottom: 6,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#333',
        textAlign: 'center',
        flex: 1,
    },
    tableDataRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 9,
        paddingHorizontal: 8,
        backgroundColor: 'white',
        borderColor: '#ddd',
    },
    tableCell: {
        fontSize: 11,
        padding: 8,
        color: '#333',
        flex: 0.50,
        paddingHorizontal: 5,
    },
    withdrawButton: {
        backgroundColor: 'red',
        paddingVertical: 5,
        marginTop: 5,
    },
    withdrawButtonText: {
        color: 'white',
        fontSize: 5,
        textAlign: 'center',
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 20,
    },
});

export default LeaveHistory;
