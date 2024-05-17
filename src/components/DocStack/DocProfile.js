import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal, TextInput, Button, SafeAreaView, TouchableWithoutFeedback } from "react-native";
import { AuthContext } from "../../Context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DocProfile = () => {
  const { setIsAuthenticated, setUserType } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');

        const response = await fetch('your_server_endpoint/doctor/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        const data = await response.json();
        setName(data.username);
        setGender(data.gender);
        setSpecialization(data.specialization);
        setLocation(data.location);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userType');
      setIsAuthenticated(false);
      setUserType('');
    } catch (error) {
      console.error('Error removing token:', error);
    }
  }

  const handleSave = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
        
      const response = await fetch('your_server_endpoint/doctor/edit-info', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({
          gender,
          specialization,
          location
        }),
      });
    
      if (response.ok) {
        const data = await response.json();
        setMessage(data.message || 'No message available');
        setModalVisible(true);
      } else {
        setMessage('An error occurred while making the API request.');
        setModalVisible(true);
      }
    } catch (error) {
      setMessage('An error occurred while making the API request.');
      setModalVisible(true);
    } finally {
      setIsEditing(false); 
    }
  };
  

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* User Name */}
        <View style={styles.headerContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>Hello, {name}!</Text>
          </View>
        </View>

        {/* Profile details */}
        <View style={styles.infoContainer}>
          {/* Gender */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>Gender:</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={gender}
                onChangeText={setGender}
              />
            ) : (
              <Text style={styles.text}>{gender}</Text>
            )}
          </View>

          {/* Specialization */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>Specialization:</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={specialization}
                onChangeText={setSpecialization}
              />
            ) : (
              <Text style={styles.text}>{specialization}</Text>
            )}
          </View>

          {/* Location */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>Location:</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={location}
                onChangeText={setLocation}
              />
            ) : (
              <Text style={styles.text}>{location}</Text>
            )}
          </View>

          {/* Edit Button */}
          <View style={styles.infoRow}>
            <Button
              title={isEditing ? "Save" : "Edit"}
              onPress={isEditing ? handleSave : toggleEditMode}
              color="#3498db"
            />
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutButtonContainer}>
          <Button
            title="Logout"
            onPress={handleLogout}
            color="#e74c3c"
          />
        </View>

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  headerContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    margin: 20,
    padding: 10,
    backgroundColor: "#91C0E5",
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    // backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    color: 'black',
  },
  infoContainer: {
    width: "100%",
    margin: 50,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    backgroundColor: "#e0e0e0",
    padding: 5,
    borderRadius: 5,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 5,
    fontSize: 16,
  },
  logoutButtonContainer: {
    width: "100%",
    padding: 10,
    margin: 30,
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

export default DocProfile;

