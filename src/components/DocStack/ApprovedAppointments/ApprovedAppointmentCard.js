import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ApprovedAppointmentCard = ({ appointment, onCancel, onComplete }) => {
  const { patient_username, patient_gender, patient_age, appointment_date, status } = appointment;
  const [healthData, setHealthData] = useState(null);

  const handleView = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('your_server_endpoint/doctor/view-health-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          appointment_id: appointment.appointment_id,
          patient_email: appointment.patient_email,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setHealthData(data.health_data);
      } else {
        console.error('Failed to fetch health data:', response.status);
      }
    } catch (error) {
      console.error('Failed to fetch health data:', error);
    }
  };

  const handleCloseModal = () => {
    setHealthData(null);
  };

  // Function to format date in dd/mm/yyyy format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
  };

  return (
    <View style={styles.card}>
      <Text style={styles.text}>Patient: {patient_username}</Text>
      <Text style={styles.text}>Gender: {patient_gender}</Text>
      <Text style={styles.text}>Age: {patient_age}</Text>
      <Text style={styles.text}>Date: {formatDate(appointment_date)}</Text>
      <TouchableOpacity onPress={onCancel} style={[styles.button, styles.cancelButton]}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
      {status === 'data shared' && (
        <>
          <TouchableOpacity onPress={handleView} style={[styles.button, styles.viewButton]}>
            <Text style={styles.buttonText}>View</Text>
          </TouchableOpacity>
          <Modal
            visible={healthData !== null}
            onRequestClose={handleCloseModal}
            animationType="slide" // Add animation type here
            transparent={true}
          >
            <View style={styles.modalContainer}>
              {healthData && (
                <>
                  <Text style={styles.modalText}>BMI: {healthData.BMI}</Text>
                  <Text style={styles.modalText}>Chainsmoker: {healthData.Chainsmoker}</Text>
                  <Text style={styles.modalText}>ChestPainType: {healthData.ChestPainType}</Text>
                  <Text style={styles.modalText}>DBloodPressure: {healthData.DBloodPressure}</Text>
                  <Text style={styles.modalText}>CBloodPressure: {healthData.CBloodPressure}</Text>
                  <Text style={styles.modalText}>BloodGlucose: {healthData.BloodGlucose}</Text>
                  <Text style={styles.modalText}>LDLCholesterol: {healthData.LDLCholesterol}</Text>
                  <Text style={styles.modalText}>HDLCholesterol: {healthData.HDLCholesterol}</Text>
                  <Text style={styles.modalText}>ECGResult: {healthData.ECGResult}</Text>
                  <Text style={styles.modalText}>MaxHeartRate: {healthData.MaxHeartRate}</Text>
                  <Text style={styles.modalText}>Temperature: {healthData.Temperature}</Text>
                  <Text style={styles.modalText}>RespiratoryRate: {healthData.RespiratoryRate}</Text>
                  <Text style={styles.modalText}>SpO2: {healthData.SpO2}</Text>
                  <Text style={styles.modalText}>Urination: {healthData.Urination}</Text>
                  <Text style={styles.modalText}>StressLevel: {healthData.StressLevel}</Text>
                </>
              )}
              <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </>
      )}
      <TouchableOpacity onPress={onComplete} style={[styles.button, styles.completeButton]}>
        <Text style={styles.buttonText}>Complete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    marginBottom: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
  },
  viewButton: {
    backgroundColor: '#007bff',
  },
  completeButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    margin: 40,
    borderRadius: 10,
    elevation: 5 // Add elevation for shadow effect (Android)
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default ApprovedAppointmentCard;
