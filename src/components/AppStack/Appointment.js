import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native'; // Import useFocusEffect
import RequestAppointment from './appointment/RequestAppointment/RequestAppointment';
import AppointmentData from './appointment/AppointmentData/AppointmentData';

const Appointment = ({navigation}) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(
        'your_server_endpoint/patient/appointments',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();

      if (data.appointments){
        setAppointments(data.appointments);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
      setLoading(false);
    }
  };

  // Run fetchAppointments on initial render and every focus
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

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : appointments.length > 0 ? (
        <AppointmentData appointments={appointments} />
      ) : (
        <RequestAppointment />
      )}
    </View>
  );
};

export default Appointment;
