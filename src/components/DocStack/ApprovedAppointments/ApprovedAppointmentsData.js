import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApprovedAppointmentCard from './ApprovedAppointmentCard';
import { useFocusEffect } from '@react-navigation/native';

const ApprovedAppointmentData = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(
        'http://192.168.15.118:5000/doctor/approved-appointments',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      setAppointments(data.appointments);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
      setLoading(false);
    }
  };

  const handleCancel = async appointmentId => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(
        'http://192.168.15.118:5000/doctor/change-appointment-status/',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            appointment_id: appointmentId,
            status: 'cancelled',
          }),
        },
      );
      if (response.ok) {
        setAppointments(prevAppointments => {
          return prevAppointments.filter(
            appointment => appointment.appointment_id !== appointmentId,
          );
        });
      } else {
        console.error('Failed to cancel appointment:', response.status);
      }
    } catch (error) {
      console.error('Failed to cancel appointment:', error);
    }
  };

  const handleComplete = async appointment_id => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`http://192.168.15.118:5000/doctor/appointment-completed/${appointment_id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        Alert.alert("Appointment finished!!");
      } else {
        console.error('Failed to mark appointment as completed:', response.status);
      }
    } catch (error) {
      console.error('Failed to mark appointment as completed:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchAppointments, 3000);
    return () => clearInterval(interval);
  }, []);

  // Refresh data when component comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchAppointments();
      // Specify cleanup function for when component loses focus (if necessary)
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : appointments.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.noAppointmentsText}>No approved appointments available</Text>
        </View>
      ) : (
        <View>
          {appointments.map(appointment => (
            <View key={appointment.appointment_id}>
              <ApprovedAppointmentCard
                appointment={appointment}
                onCancel={() => handleCancel(appointment.appointment_id)}
                onComplete={() => handleComplete(appointment.appointment_id)}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAppointmentsText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default ApprovedAppointmentData;
