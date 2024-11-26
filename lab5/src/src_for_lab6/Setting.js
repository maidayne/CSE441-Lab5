import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const Setting = ({ route, navigation }) => {
    const { setUser, setIsLoggedIn } = route.params;
    const handleLogout = () => {
        setUser({}); // Xóa dữ liệu user
        setIsLoggedIn(false); // Đặt trạng thái đăng nhập về false
        Alert.alert("You have been logged out.");
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    topBar: {
        height: 60,
        backgroundColor: '#f33',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    logoutButton: {
        marginTop: 40,
        marginHorizontal: 20,
        padding: 15,
        backgroundColor: '#f33',
        borderRadius: 8,
        alignItems: 'center',
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Setting;
