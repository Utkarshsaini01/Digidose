import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import DatePicker from 'react-native-date-picker';

const DoctorListItem = ({ doctor, onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleRequestAppointment = () => {
    setModalVisible(true);
  };

  const handleSetDate = () => {
    setModalVisible(false);
    const formattedDate = selectedDate.toISOString();
    onSelect(doctor, formattedDate);
  };

  return (
    <View>
      <TouchableOpacity style={styles.card} onPress={() => onSelect(doctor)}>
        <View style={styles.cardContent}>
          <Text style={styles.name}>{doctor.username}</Text>
          <Text style={styles.detail}>Gender: {doctor.gender}</Text>
          <Text style={styles.detail}>Specialization: {doctor.specialization}</Text>
          <Text style={styles.detail}>Location: {doctor.location}</Text>
          <TouchableOpacity style={styles.button} onPress={handleRequestAppointment}>
            <Text style={styles.buttonText}>Request Appointment</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Select Appointment Date</Text>
          <DatePicker
            date={selectedDate}
            mode="date"
            onDateChange={date => setSelectedDate(date)}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSetDate}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 14,
    padding: 10,
    elevation: 5,
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  detail: {
    fontSize: 14,
    marginBottom: 3,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 5,
  },
  modalText: {
    margin: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  buttonContainer: {
    marginHorizontal: 40,
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-center', // Change to 'space-between' to evenly distribute the buttons
    marginTop: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    marginHorizontal: 5, // Add margin between buttons
    minWidth: 120, // Set a minimum width for the buttons
  },
});

export default DoctorListItem;
