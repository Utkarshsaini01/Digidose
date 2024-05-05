import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ApprovedAppointmentView = ({ appointment, onClose }) => {
  const [healthData, setHealthData] = useState(null);

  useEffect(() => {
    if (appointment && appointment.status === 'data shared') {
      fetchHealthData();
    }
  }, [appointment]);

  const fetchHealthData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('http://192.168.15.118:5000/doctor/view-health-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ appointment_id: appointment.appointment_id, patient_email: appointment.patient_email }),
      });
      if (response.ok) {
        const data = await response.json();
        setHealthData(data.health_data);
      }
    } catch (error) {
      console.error('Failed to fetch health data:', error);
    }
  };

  return (
    <Modal
      visible={healthData !== null}
      onRequestClose={onClose}
    >
      <View style={{ padding: 20 }}>
        {healthData && (
          <>
            <Text>BMI: {healthData.BMI}</Text>
            <Text>Chainsmoker: {healthData.Chainsmoker}</Text>
            {/* Add other health data fields here */}
          </>
        )}
        <TouchableOpacity onPress={onClose}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ApprovedAppointmentView;
