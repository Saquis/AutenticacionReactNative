import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { API_URL } from "../context/AuthContext";
import axios from 'axios';

const Home = () => {

    //Variables de usuarios para setear estados
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const result = await axios.get(`${API_URL}/users`);
                setUsers(result.data);
            } catch (e: any) {
                alert(e.message);
            }
        };
        loadUser();
    }, []);

    return (
        <ScrollView style={styles.scroll}>
            {users.map((user) => (
                <Text key={user._id} style={styles.text}>
                    {user._id}
                </Text>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scroll: {
        width: '100%',
        height: '100%',
    },
    text: {
        alignItems: 'center',
        textAlign: 'center',
        padding: 10,
        fontSize: 20
    },
    buton: {
        width: '50%',
        padding: 25,
        backgroundColor: '#F52727',
        color: 'ffffff'
    }
});

export default Home;