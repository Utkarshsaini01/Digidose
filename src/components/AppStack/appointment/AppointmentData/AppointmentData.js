import React from 'react';
import { Alert, View } from 'react-native';
import AppointmentCard from './AppointmentCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppointmentData = (props) => {
  const appointments = props.appointments; 

  const handleDelete = async (appointmentId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`your_server_endpoint/patient/delete-appointment/${appointmentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        Alert.alert("Deleted Successfully !!");
      } else {
        console.error('Failed to delete appointment:', response.status);
      }
    } catch (error) {
      console.error('Failed to delete appointment:', error);
    }
  };

  const handleShareData = async (appointmentId, doctor_email) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('your_server_endpoint/patient/share-health-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          doctor_email: doctor_email,
          appointment_id: appointmentId,
        }),
      });
      if (response.ok) {
        Alert.alert("Data Shared");
      } else {
        console.error('Failed to share appointment data:', response.status);
      }
    } catch (error) {
      console.error('Failed to share appointment data:', error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 10, margin: 10}}>
      {appointments.map(appointment => (
        <AppointmentCard 
          key={appointment.appointment_id} 
          appointment={appointment} 
          onDelete={handleDelete} 
          onShareData={handleShareData} 
        />
      ))}
    </View>
  );
};

export default AppointmentData;
