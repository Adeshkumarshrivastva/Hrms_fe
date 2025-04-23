import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios";

<<<<<<< HEAD
import Config from 'react-native-config';

const apiUrl = Config.API_URL;
=======
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
const EmployeeList = () => {
  const [employees, setEmployees] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

<<<<<<< HEAD
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("https://hr360.co.in/EmployeeList"); 
=======
  // Function to fetch data from the API
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://192.168.1.9:4000/"); // Replace with your local IP address and API URL
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
      setEmployees(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching employees:", error.message);
      console.error("Error details:", error.response ? error.response.data : error);
      setError("Failed to fetch employees.");
      setLoading(false);
    }
  };
<<<<<<< HEAD
  useEffect(() => {
    fetchEmployees();
  }, []);
=======

  // useEffect to call the fetch function when the component is mounted
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Render a loading message or an error message
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  // Render the employee data
  return (
    <View style={styles.container}>
      <FlatList
        data={employees}
<<<<<<< HEAD
        keyExtractor={(item, index) => index.toString()} 
=======
        keyExtractor={(item, index) => index.toString()} // Unique key for each item
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>Employee Name: {item.EmpFName}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    background:'silver'
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  name: {
    fontSize: 18,
  },
});

export default EmployeeList;

<<<<<<< HEAD
=======
//select* from leavetransaction where ecno='10122' order by id desc
>>>>>>> 1f9d3064a01441185a862325b95bdb298a93cf4d
