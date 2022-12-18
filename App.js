import { StyleSheet} from 'react-native';
import { useEffect } from 'react';

import EditProfile from './components/EditProfile';
import Home from './components/Home';
import Settings from './components/Settings';
import colors from './assets/colors/colors';
import Entypo from 'react-native-vector-icons/Entypo';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomMessage from './components/CustomMessage';

Entypo.loadFont();

const Stack = createNativeStackNavigator();
const Tab =  createBottomTabNavigator();
global.notificationMessage = 'Time to take your medication!';

function TabNavigator() {
  return (
    <Tab.Navigator
      styles={styles.tabBar}
      screenOptions={{
        headerTitleStyle: {
          color: colors.white,
        },
        headerStyle: { backgroundColor: colors.lightBlue },
        tabBarActiveTintColor: colors.lightBlue,
        tabBarInactiveTintColor: colors.gray,
      }}>
      <Tab.Screen
        name='Home'
        component={Home}
        options={({navigation, props}) => ({
          tabBarIcon: ({color}) => (
            <Entypo name='home' size={32} color={color} />
          ),
        })} />
      <Tab.Screen
        name="Settings" 
        component={Settings}
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name='cog' size={32} color={color} />
          ),
        }} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator} 
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{
              title: 'Edit Profile'
            }}
          />
          <Stack.Screen
            name="CustomMessage"
            component={CustomMessage}
            options={{
              title: 'Custom notification message'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      
    );
  }

const styles = StyleSheet.create ({
  tabBar: {
    backgroundColor: colors.darkBlue,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    color: colors.white,
  },
});