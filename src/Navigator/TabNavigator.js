import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NewTask from '../Views/NewTask';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLOR} from '../Constants/Colors';
import Categories from '../Views/Categories';
import Settings from '../Views/Settings';
import {TaskNavigator} from './TaskNavigator';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  const AddTaskButton = ({children, onPress}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          top: -10,
          justifyContent: 'center',
          alignitems: 'center',
          ...styles.shadow,
        }}>
        <View
          style={{
            width: 100,
            height: 70,
            borderRadius: 35,
            backgroundColor: COLOR.SECONDARY_B,
          }}>
          {children}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
      }}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          borderRadius: 15,
          elevation: 0,
          backgroundColor: COLOR.SECONDARY,
          height: 60,
          ...styles.shadow,
        },
      })}>
      <Tab.Screen
        name="TaskNavigator"
        component={TaskNavigator}
        options={{
          tabBarIcon: ({focused}) => {
            let iconName;
            iconName = focused ? 'list-circle' : 'list-circle-outline';
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Ionicons name={iconName} size={46} color={COLOR.MAIN} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="New Task"
        component={NewTask}
        options={{
          tabBarIcon: ({focused}) => {
            let iconName;
            iconName = focused ? 'add-circle' : 'add-circle-outline';
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Ionicons name={iconName} size={46} color={COLOR.MAIN} />
              </View>
            );
          },
          tabBarButton: props => <AddTaskButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({focused}) => {
            let iconName;
            iconName = focused ? 'settings' : 'settings-outline';
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Ionicons name={iconName} size={46} color={COLOR.MAIN} />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default TabNavigator;
