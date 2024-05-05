import React, { useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../../Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const User = ({ navigation }) => {
  const { setUserType } = useContext(AuthContext);

  const handlePatientPress = async () => {
    await AsyncStorage.setItem('userType', 'patient');
    setUserType('patient');
    navigation.navigate('PatientLogin');
  };

  const handleDoctorPress = async () => {
    await AsyncStorage.setItem('userType', 'doctor');
    setUserType('doctor');
    navigation.navigate('DoctorLogin');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonContainer} onPress={handlePatientPress}>
        <View style={styles.buttonContent}>
          <Icon name="person" size={72} color="black" />
          <Text style={styles.buttonText}>Patient</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleDoctorPress}>
        <View style={styles.buttonContent}>
          <Icon name="medical-services" size={72} color="black" />
          <Text style={styles.buttonText}>Doctor</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: '#DDDDDD',
    borderRadius: 10,
    padding: 10,
    marginVertical: 40,
    width: 200, // Adjust the width as needed
    alignItems: 'center',
  },
  buttonContent: {
    alignItems: 'center',
  },
  buttonText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default User;
