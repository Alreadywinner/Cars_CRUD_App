import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useAppSelector} from '@Redux/redux';
import {AddEditCar, Register, Login, Dashboard} from 'screens/screens';
import {RootStackParamList} from '../types';
import LogoutButton from '@Components/LogoutButton/LogoutButton';

const Stack = createStackNavigator<RootStackParamList>();

export default function Navigation() {
  const {isAuthenticated} = useAppSelector(state => state.auth);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={{
                headerRight: () => <LogoutButton />,
              }}
            />
            <Stack.Screen
              name="AddEditCar"
              component={AddEditCar}
              options={props =>
                props?.route?.params?.index
                  ? {title: 'Edit car'}
                  : {title: 'Add a car'}
              }
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
