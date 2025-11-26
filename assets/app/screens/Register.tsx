import { View, Image, StyleSheet, TextInput, TouchableOpacity, Text, Alert, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation<any>();
    const { onRegister } = useAuth();

    const register = async () => {
        setLoading(true);
        const result = await onRegister!(email, password);
        setLoading(false);
        
        if (result && result.error) {
            Alert.alert('Error', result.msg);
        } else {
            Alert.alert('Registro completado', 'Tu cuenta ha sido creada exitosamente', [
                { text: 'OK', onPress: () => navigation.navigate('Login') }
            ]);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backButtonText}>← Volver</Text>
            </TouchableOpacity>

            <Image 
                source={{ uri: 'https://itq.edu.ec/wp-content/uploads/2023/02/Recurso-6.png' }} 
                style={styles.image} 
            />
            
            <Text style={styles.title}>Crear cuenta</Text>
            
            <View style={styles.form}>
                <TextInput 
                    style={styles.input} 
                    placeholder="Correo"
                    placeholderTextColor="#888"
                    onChangeText={(text: string) => setEmail(text)} 
                    value={email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                
                <TextInput 
                    style={styles.input} 
                    placeholder="Contraseña"
                    placeholderTextColor="#888"
                    secureTextEntry={true}
                    onChangeText={(text: string) => setPassword(text)} 
                    value={password}
                />
                
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={register}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>CREAR UNA CUENTA</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1a1a1a',
        padding: 20,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        padding: 10,
    },
    backButtonText: {
        color: '#2196F3',
        fontSize: 16,
        fontWeight: '600',
    },
    image: {
        width: 250,
        height: 120,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 30,
    },
    form: {
        width: '100%',
        maxWidth: 400,
        gap: 15,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 8,
        padding: 15,
        backgroundColor: '#2a2a2a',
        color: '#fff',
        fontSize: 16,
    },
    button: {
        height: 50,
        backgroundColor: '#2196F3',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        elevation: 3,
        shadowColor: '#2196F3',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
});

export default Register;