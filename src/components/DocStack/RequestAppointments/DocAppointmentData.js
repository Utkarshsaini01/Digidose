import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DocAppointmentCard from './DocAppointmentCard';
import {useFocusEffect} from '@react-navigation/native';

const DoctorAppointmentData = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(fetchAppointments, 3000);
    return () => clearInterval(interval);
  }, []);

  // Refresh data when component comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchAppointments();
      // Specify cleanup function for when component loses focus (if necessary)
    }, []),
  );

  const fetchAppointments = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('your_server_endpoint/doctor/requested-appointments', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setAppointments(data.appointments);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
      setLoading(false);
    }
  };

  const handleApprove = async (appointmentId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('your_server_endpoint/doctor/change-appointment-status/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ appointment_id: appointmentId, status: 'approved' }),
      });
      if (response.ok) {
        // Update local state after successful approval
        setAppointments(prevAppointments => {
          return prevAppointments.filter(appointment => appointment.appointment_id !== appointmentId);
        });
      } else {
        console.error('Failed to approve appointment:', response.status);
      }
    } catch (error) {
      console.error('Failed to approve appointment:', error);
    }
  };

  const handleCancel = async (appointmentId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('your_server_endpoint/doctor/change-appointment-status/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ appointment_id: appointmentId, status: 'cancelled' }),
      });
      if (response.ok) {
        setAppointments(prevAppointments => {
          return prevAppointments.filter(appointment => appointment.appointment_id !== appointmentId);
        });
      } else {
        console.error('Failed to cancel appointment:', response.status);
      }
    } catch (error) {
      console.error('Failed to cancel appointment:', error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" />;
  }

  return (
    <View style={{ flex: 1 }}>
      {appointments.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.noAppointmentsText}>No appointments available</Text>
        </View>
      ) : (
        appointments.map(appointment => (
          <DocAppointmentCard
            key={appointment.appointment_id}
            appointment={appointment}
            onApprove={() => handleApprove(appointment.appointment_id)}
            onCancel={() => handleCancel(appointment.appointment_id)}
          />
        ))
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

export default DoctorAppointmentData;
