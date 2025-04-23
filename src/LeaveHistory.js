import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import { Picker } from '@react-native-picker/picker';

const LeaveHistory = ({ navigation, route }) => {
=======
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

const LeaveHistory = ({ route }) => {
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
    const initialProfileImage = route?.params?.profileImage || 'https://via.placeholder.com/80';
    const [profileImage, setProfileImage] = useState(initialProfileImage);
    const [userName, setUserName] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [ecno, setEcno] = useState('');
    const [leaveRecords, setLeaveRecords] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
<<<<<<< HEAD
    const [leaveTypeID, setLeaveTypeID] = useState('');
    const [fromDate, setFromDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [toDate, setToDate] = useState(format(new Date(), 'yyyy-MM-dd'));
=======
    const [fromDate, setFromadte] = useState(format(new Date(), 'dd-MM-yyyy'));
    const [toDate, setToDate] = useState(format(new Date(), 'dd-MM-yyyy'));
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d

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
<<<<<<< HEAD
        if (ecno) {
            const fetchLeaveHistory = async () => {
                try {
                    const response = await axios.get('https://hr360.co.in/LeaveHistory', {
                        params: { ecno, fromDate, toDate },
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
            fetchLeaveHistory();
        }
    }, [ecno, fromDate, toDate]);

    const mapStatus = (status) => {
        if (status === 'A') {
            return 'Applied';
        } else if (status === 'S') {
            return 'Sanctioned';
        } else {
            return status;
        }
    };

    const handleWithdrawClick = async () => {
        try {
            const response = await axios.post('https://hr360.co.in/LeaveWidthdrawl', {
                ecno: await AsyncStorage.getItem('ecno'),
                leaveTypeID,
                fromDate,
                toDate,
            }, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.status !== 200) {
                Alert.alert('Error', 'Failed to process the withdrawal');
                return;
            }

            const data = response.data;
            if (data.message) {
                Alert.alert('Error', data.message);
            }
        } catch (error) {
            setErrorMessage('An error occurred while withdrawing the leave.');
        }
    };

    const renderTableHeader = () => (
        <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Leave Type</Text>
=======
        if (!ecno) {
            return;
        }
        const fetchLeaveHistory = async () => {
            try {
                const response = await axios.get('http://192.168.1.9:4000/LeaveApply', {
                    params: { ecno, fromDate, toDate }
                });

                if (response.data.success) {
                    const formattedLeaveRecords = response.data.data.map(record => ({
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
                setErrorMessage('An error occurred while fetching leave data.');
                console.error(error);
            }
        };

        fetchLeaveHistory();
    }, [ecno, fromDate, toDate]);

    const renderTableHeader = () => (
        <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Leave Type </Text>
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
            <Text style={styles.headerText}>From Date</Text>
            <Text style={styles.headerText}>To Date</Text>
            <Text style={styles.headerText}>Days</Text>
            <Text style={styles.headerText}>Status</Text>
        </View>
    );

    return (
<<<<<<< HEAD
=======
         
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
                <View style={styles.userInfo}>
                    <Text style={styles.userName}>{userName || 'Not Available'}</Text>
                    <Text style={styles.userId}>Employee ID: {employeeId || 'Not Available'}</Text>
                </View>
            </View>

<<<<<<< HEAD
            {/* Back Button moved to right using inline style */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', right: 20, top: 35 }}>
                <Image source={require('./img/BackArrow.png')} style={{ width: 50, height: 50 }} />
            </TouchableOpacity>

=======
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

            <FlatList
                data={leaveRecords}
<<<<<<< HEAD
                keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
=======
                keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
                renderItem={({ item }) => (
                    <View style={styles.tableRow}>
                        <View style={styles.tableDataRow}>
                            <Text style={styles.tableCell}>{item.LeaveName}</Text>
                            <Text style={styles.tableCell}>{item.FromDate}</Text>
                            <Text style={styles.tableCell}>{item.ToDate}</Text>
                            <Text style={styles.tableCell}>{item.Days}</Text>
<<<<<<< HEAD

                            <View style={styles.statusContainer}>
                                <Text style={styles.tableCell}>{mapStatus(item.ApplicationStatus)}</Text>
                                {item.ApplicationStatus === 'A' && (
                                    <TouchableOpacity style={styles.withdrawButton} onPress={handleWithdrawClick}>
                                        <Text style={styles.buttonText}>Withdraw</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
=======
                            <Text style={styles.tableCell}>{item.ApplicationStatus}</Text>
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
                        </View>
                    </View>
                )}
                ListHeaderComponent={renderTableHeader}
                contentContainerStyle={styles.tableContainer}
<<<<<<< HEAD
                showsVerticalScrollIndicator={true}
            />
        </View>
    );
};
=======
                showsVerticalScrollIndicator={true} 
            />
        </View>
        
    );
};

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
        flex: 1,
    },
    userName: {
        fontSize: 20,
=======
        borderRadius: 40,
    },
    userInfo: {
        marginLeft: 20,
        flex: 1,
    },
    userName: {
        fontSize: 18, 
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
        fontWeight: 'bold',
        color: 'white',
    },
    userId: {
<<<<<<< HEAD
        fontSize: 16,
=======
        fontSize: 14, 
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
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
<<<<<<< HEAD
        marginBottom: 5,
=======
        marginBottom: 5, 
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f2f2f2',
<<<<<<< HEAD
        paddingVertical: 11,
        marginBottom: 6,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 12,
=======
        paddingVertical: 9, 
        marginBottom: 6, 
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 11,
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
        color: '#333',
        textAlign: 'center',
        flex: 1,
    },
    tableDataRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
<<<<<<< HEAD
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
        backgroundColor: 'gray',
        paddingVertical: 5,
        marginTop: 4,
    },
    withdrawButtonText: {
        color: 'Red',
        fontSize: 3,
        textAlign: 'center',
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 20,
    },
});
=======
        paddingVertical: 9, 
        paddingHorizontal: 8, 
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    tableCell: {
        fontSize: 12, 
        color: '#333',
        textAlign: 'center',
        flex: 2, 
        paddingHorizontal: 5, 
    },
    
});

>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
export default LeaveHistory;
