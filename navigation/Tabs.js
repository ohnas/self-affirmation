import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import Counter from "../screen/Counter";
import Calendar from "../screen/Calendar";
import Setting from "../screen/Setting";

const Tab = createBottomTabNavigator();

function Tabs() {
    return(
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen 
                name="Counter" 
                component={Counter}
                options={{
                    tabBarIcon: () => <Ionicons name="calculator-outline" size={24} color="black" />
                }} 
            />
            <Tab.Screen 
                name="Calendar" 
                component={Calendar}
                options={{
                    tabBarIcon: () => <Ionicons name="calendar-outline" size={24} color="black" />
                }}
            />
            <Tab.Screen 
                name="Setting" 
                component={Setting}
                options={{
                    tabBarIcon: () => <Ionicons name="settings-outline" size={24} color="black" />
                }}
            />
        </Tab.Navigator>  
    );
}

export default Tabs;