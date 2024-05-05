import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AppointmentCard = ({ appointment, onDelete, onShareData }) => {
  const { appointment_id, doctor_username, doctor_gender, doctor_specialization, doctor_location, doctor_email, status, appointment_date } = appointment;

  const renderButtons = () => {
    if (status === 'approved') {
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => onDelete(appointment_id)} style={[styles.button, styles.deleteButton]}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onShareData(appointment_id, doctor_email)} style={[styles.button, styles.shareButton]}>
            <Text style={styles.buttonText}>Share Data</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => onDelete(appointment_id)} style={styles.button}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      );
    }
  };

  // Format date to dd/mm/yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={styles.card}>
      <Text style={styles.text}>Doctor: {doctor_username}</Text>
      <Text style={styles.text}>Gender: {doctor_gender}</Text>
      <Text style={styles.text}>Specialization: {doctor_specialization}</Text>
      <Text style={styles.text}>Location: {doctor_location}</Text>
      <Text style={styles.text}>Status: {status}</Text>
      <Text style={styles.text}>Date: {formatDate(appointment_date)}</Text>
      {renderButtons()}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    paddingHorizontal: 40,
    marginBottom: 20,
    elevation: 4,
    alignSelf: 'flex-start',
    width: '90%', 
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  shareButton: {
    backgroundColor: '#28a745',
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default AppointmentCard;
