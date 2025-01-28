import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

const LeaveHistory = ({ route }) => {
    const initialProfileImage = route?.params?.profileImage || 'https://via.placeholder.com/80';
    const [profileImage, setProfileImage] = useState(initialProfileImage);
    const [userName, setUserName] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [ecno, setEcno] = useState('');
    const [leaveRecords, setLeaveRecords] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [fromDate, setFromadte] = useState(format(new Date(), 'dd-MM-yyyy'));
    const [toDate, setToDate] = useState(format(new Date(), 'dd-MM-yyyy'));

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
                            <Text style={styles.tableCell}>{item.ApplicationStatus}</Text>
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
        paddingVertical: 9, 
        marginBottom: 6, 
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 11,
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

export default LeaveHistory;
