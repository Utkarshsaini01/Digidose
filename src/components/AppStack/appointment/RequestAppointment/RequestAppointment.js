import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import SearchBar from './SearchBar';
import DoctorListItem from './DoctorListItem';

const RequestAppointment = ({ navigation }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleSearch = async (searchQuery) => {
    // If searchQuery is empty, return without making the API call
    if (!searchQuery.trim()) {
      setDoctors([]);
      return;
    }
  
    setLoading(true);
    setError(null);
    
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        setError('Authentication token not found.');
        setLoading(false);
        return;
      }


      const response = await fetch(`http://192.168.15.118:5000/doctors/search?query=${searchQuery}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log(response);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();

      
  
      setDoctors(data.doctors);
    } catch (error) {
      setError('Error fetching doctors. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSelectDoctor = async (doctor, date) => {
    setLoading(true);
    setError(null);
    
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        setError('Authentication token not found.');
        setLoading(false);
        return;
      }

      const response = await fetch('http://192.168.15.118:5000/patient/request-appointment/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctor_email: doctor.email,
          appointment_date: date
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      console.log("appointment requested");
      
    } catch (error) {
      setError('Error fetching doctors. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      handleSearch('');
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search for Doctor by</Text>
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={doctors}
          keyExtractor={(item) => item.email}
          renderItem={({ item }) => (
            <DoctorListItem doctor={item} onSelect={handleSelectDoctor} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  loader: {
    marginTop: 20,
  },
  error: {
    fontSize: 16,
    color: 'red',
    marginTop: 20,
  },
});

export default RequestAppointment;
