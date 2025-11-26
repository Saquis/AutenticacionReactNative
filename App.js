import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { AuthProvider, useAuth } from './assets/app/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './assets/app/screens/Home';
import Login from './assets/app/screens/Login';
import Register from './assets/app/screens/Register';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <Layout />
    </AuthProvider>
  );
}

export const Layout = () => {
  const { authState, onLogout } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1a1a1a',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {authState?.authenticated ? (
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Inicio',
              headerRight: () => (
                <TouchableOpacity 
                  onPress={onLogout} 
                  style={styles.logoutButton}
                >
                  <Text style={styles.logoutText}>Cerrar Sesión</Text>
                </TouchableOpacity>
              ),
            }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ 
                title: 'Crear cuenta',
                headerStyle: {
                  backgroundColor: '#1a1a1a',
                },
                headerTintColor: '#2196F3',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
    marginRight: 10,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});