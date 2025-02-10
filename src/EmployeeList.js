import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios";

import Config from 'react-native-config';

const apiUrl = Config.API_URL;
const EmployeeList = () => {
  const [employees, setEmployees] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://192.168.1.11:4000/EmployeeList"); 
      setEmployees(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching employees:", error.message);
      console.error("Error details:", error.response ? error.response.data : error);
      setError("Failed to fetch employees.");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);
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
        keyExtractor={(item, index) => index.toString()} 
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

