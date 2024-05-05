import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Data = ({ navigation }) => {
  const [healthCheckData, setHealthCheckData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchHealthCheckData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch("http://192.168.15.118:5000/patient/health-check", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });
      const data = await response.json();
      setHealthCheckData(data.health_check_data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching health check data:", error);
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchHealthCheckData();
    }, [])
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {healthCheckData ? (
            <View style={styles.healthCheckContainer}>
              <Text style={styles.heading}>Health Check Data</Text>
              <View style={styles.dataContainer}>
                {Object.entries(healthCheckData).map(([key, value]) => (
                  <View key={key} style={styles.dataItem}>
                    <Text style={styles.label}>{key}:</Text>
                    <Text style={styles.value}>{value}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>No health check data available.</Text>
              <Button title="Take Test" onPress={() => navigation.navigate('Test')} />
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  healthCheckContainer: {
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  dataContainer: {
    width: "80%",
  },
  dataItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
  },
  value: {},
  noDataContainer: {
    alignItems: "center",
  },
  noDataText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
});

export default Data;
