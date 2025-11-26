import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation<any>();
    const { onLogin } = useAuth();

    const login = async () => {
        setLoading(true);
        const result = await onLogin!(email, password);
        setLoading(false);
        
        if (result && result.error) {
            alert(result.msg);
        }
    };

    return (
        <View style={styles.container}>
            <Image 
        source={require('../../../assets/imgITQ.png')} 
        style={styles.image} 
    />
            
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
                    onPress={login}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>INGRESAR</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.buttonSecondary} 
                    onPress={() => navigation.navigate('Register')}
                    disabled={loading}
                >
                    <Text style={styles.buttonSecondaryText}>REGISTRAR</Text>
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
    image: {
        width: 250,
        height: 120,
        resizeMode: 'contain',
        marginBottom: 40,
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
    buttonSecondary: {
        height: 50,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#2196F3',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
    },
    buttonSecondaryText: {
        color: '#2196F3',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
});

export default Login;