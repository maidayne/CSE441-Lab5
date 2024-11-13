import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './src/Login';
import ServiceListScreen from './src/ServiceListScreen';
import AddServiceScreen from './src/AddServiceScreen';
import ServiceDetailScreen from './src/ServiceDetailScreen';
import Transaction from './src/Transaction';
import Customer from './src/Customer';
import Setting from './src/Setting';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Define User interface
interface User {
  token?: string;
}

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={ServiceListScreen} options={{ title: 'Danh sách dịch vụ' }} />
    <Tab.Screen name="Transaction" component={Transaction} />
    <Tab.Screen name="Customer" component={Customer} />
    <Tab.Screen name="Setting" component={Setting} />
  </Tab.Navigator>
);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User>({});

  // Handler function for login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* If not logged in, show the Login screen; otherwise, show the main app */}
        {!isLoggedIn ? (
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
          >
            {(props) => <Login {...props} onLoginSuccess={handleLoginSuccess} setUser={setUser} />}
          </Stack.Screen>
        ) : (
          <>
            {/* Main Tab Navigator */}
            <Stack.Screen
              name="Main"
              component={TabNavigator}
              options={{ headerShown: false }}
            />

            {/* Other screens */}
            <Stack.Screen
              name="AddService"
              component={AddServiceScreen}
              initialParams={{ loginToken: user?.token }}
              options={{ title: 'Add Service' }}
            />
            <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} options={{ title: 'Service Detail' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
