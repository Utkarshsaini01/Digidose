import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Start = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.titleText}>digitaldose</Text>
                <Text style={styles.tagline}>A mobile app for convenient appointment booking and streamlining your healthcare experience.</Text>
            </View>
            <View style={styles.imageContainer}>
                <Image source={require('../../../assets/Images/first.png')} style={styles.image} />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('User')}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    textContainer: {
        alignItems: 'center',
        marginTop: 15,
    },
    titleText: {
        color: "#4F4CE0",
        fontSize: 30,
        fontWeight: 'bold',
    },
    tagline: {
        padding: 20,
        marginTop: 20,
        fontSize: 16,
        color: '#4C63E0',
        textAlign: 'center',
    },
    imageContainer: {
        width: '100%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '90%',
        height: '100%',
        resizeMode: 'cover',
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#28a745',
        padding: 20,
        width: '90%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 16,
    },
});

export default Start;
