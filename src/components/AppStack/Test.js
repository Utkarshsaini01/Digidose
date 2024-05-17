import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Button,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Test = () => {
  const [testRunning, setTestRunning] = useState(false);
  const [message, setMessage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    getToken();
  }, []);

  const sampleData = {
    BMI: 24.8,
    Chainsmoker: 1,
    ChestPainType: 1,
    DBloodPressure: 80,
    CBloodPressure: 120,
    BloodGlucose: 100,
    LDLCholesterol: 200,
    HDLCholesterol: 200,
    ECGResult: 1,
    MaxHeartRate: 105,
    Temperature: 98.6,
    RespiratoryRate: 16,
    SpO2: 90,
    Urination: 0,
    StressLevel: 46,
  };

  const handleButtonPress = async () => {
    setTestRunning(true);

    const apiUrl = 'your_predict_api_endpoint';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(sampleData),
      });

      const data = await response.json();
      setMessage(data.message || 'No message available');
      setModalVisible(true);
      await saveHealthCheck(sampleData);
    } catch (error) {
      console.error('Error making API request:', error);
      setMessage('An error occurred while making the API request.');
      setModalVisible(true);
    } finally {
      setTestRunning(false);
    }
  };

  const saveHealthCheck = async (data) => {
    const saveUrl = 'http://192.168.15.118:5000/patient/save-health-check';
  
    try {
      const response = await fetch(saveUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        console.error('Error saving health check data:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving health check data:', error);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Pressable
        disabled={testRunning}
        onPress={handleButtonPress}
        style={styles.buttonContainer}
      >
        {({ pressed }) => (
          <LinearGradient
            colors={['#8C97EA', '#96EBE5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.gradientBorder, pressed && styles.pressed]}
          >
            <View style={styles.innerButton}>
              <Text style={styles.buttonText}>
                {testRunning ? 'Please Wait...' : 'Initiate Health Check'}
              </Text>
            </View>
          </LinearGradient>
        )}
      </Pressable>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalMessage}>Response: {message}</Text>
              <Button title="Close" onPress={closeModal} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  gradientBorder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerButton: {
    width: '95%',
    height: '95%',
    borderRadius: 95,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  pressed: {
    opacity: 0.6,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default Test;
