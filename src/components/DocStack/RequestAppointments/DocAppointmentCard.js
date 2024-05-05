import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DocAppointmentCard = ({ appointment, onApprove, onCancel }) => {
  const { patient_username, patient_gender, patient_age, appointment_date } = appointment;

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
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onApprove} style={[styles.button, styles.approveButton]}>
          <Text style={styles.buttonText}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onCancel} style={[styles.button, styles.cancelButton]}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginVertical: 20,
    marginHorizontal: 20, 
    width: '90%',
    alignItems: 'center', 
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center', 
    color: 'black'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    width: '100%', 
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  approveButton: {
    backgroundColor: '#28a745',
    marginRight: 5, 
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    marginLeft: 5, 
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default DocAppointmentCard;
