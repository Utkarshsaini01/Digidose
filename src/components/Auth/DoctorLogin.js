import React, { useContext, useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DoctorLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setIsAuthenticated} = useContext(AuthContext);
  const handleLogin = async () => {
    try {
      const response = await fetch('your_doctor_login_api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
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
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login as Doctor</Text> 
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => navigation.navigate('DoctorSignup')}>
        <Text style={styles.linkText}>Don't have an account?</Text><Text style={styles.link}> Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    width: '100%',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
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

export default DoctorLogin;
