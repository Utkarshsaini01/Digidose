import React, { useContext, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { AuthContext } from '../../Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PatientSignup = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [bmi, setBmi] = useState('');
  const [chainSmoker, setChainSmoker] = useState('');
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleSignup = async () => {
    try {
      const response = await fetch('your_patient_signup_api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          gender,
          age: parseInt(age),
          bmi: parseFloat(bmi),
          chain_smoker: chainSmoker === 'Yes' ? 1 : 0,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        await AsyncStorage.setItem('token', data.token);
        setIsAuthenticated(true);
        console.log(AsyncStorage.getItem('token'));
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Signup as Patient </Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <View style={styles.radioGroup}>
        <Text style={styles.radioLabel}>Gender:</Text>
        <View style={styles.radioOptions}>
          <View style={styles.radiobutton}>
            <RadioButton value="Male" status={gender === 'Male' ? 'checked' : 'unchecked'} onPress={() => setGender('Male')} />
            <Text style={styles.optionLabel}>Male</Text>
          </View>
          <View style={styles.radiobutton}>
            <RadioButton value="Female" status={gender === 'Female' ? 'checked' : 'unchecked'} onPress={() => setGender('Female')} />
            <Text style={styles.optionLabel}>Female</Text>
          </View>
          <View style={styles.radiobutton}>
            <RadioButton value="Other" status={gender === 'Other' ? 'checked' : 'unchecked'} onPress={() => setGender('Other')} />
            <Text style={styles.optionLabel}>Other</Text>
          </View>
        </View>
      </View>
      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="BMI"
        value={bmi}
        onChangeText={setBmi}
        style={styles.input}
        keyboardType="numeric"
      />
      <View style={styles.radioGroup}>
        <Text style={styles.radioLabel}>Chain Smoker:</Text>
        <View style={styles.radioOptions}>
          <View style={styles.radiobutton}>
            <RadioButton value="Yes" status={chainSmoker === 'Yes' ? 'checked' : 'unchecked'} onPress={() => setChainSmoker('Yes')} />
            <Text style={styles.optionLabel}>Yes</Text>
          </View>
          <View style={styles.radiobutton}>
            <RadioButton value="No" status={chainSmoker === 'No' ? 'checked' : 'unchecked'} onPress={() => setChainSmoker('No')} />
            <Text style={styles.optionLabel}>No</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignup}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => navigation.navigate('PatientLogin')}
      >
        <Text style={styles.linkText}>Already have an account?</Text><Text style={styles.link}> Log in </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subheading: {
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    margin: 10,
    width: 300,
  },
  radioGroup: {
    marginBottom: 20,
  },
  radioLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  radioOptions: {
    flexDirection: 'row',
    justifyContent: 'start',
    width: 300,
  },
  optionLabel: {
    fontSize: 16,
    marginLeft: 5,
    paddingTop: 5,
  },
  radiobutton: {
    flexDirection: 'row',
    paddingEnd: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 10,
    width: 300,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  linkText: {
    fontSize: 16,
    color: 'black',
    textDecorationLine: 'underline'
  },
  link: {
    fontSize: 16,
    color: 'blue',
  }
});

export default PatientSignup;
