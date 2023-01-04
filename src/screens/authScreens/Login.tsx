import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../../styles/global';

export const Login = ({ navigation }: any) => {
    return (
        <View style={[globalStyles.center]}>
            <Text> Login page </Text>
            <TouchableOpacity
                style={[globalStyles.border, globalStyles.button, { marginTop: 50 }]}
                onPress={() => navigation.navigate('TodoLists')}
            >
                <Text style={[globalStyles.sysFont, { color: 'black', fontSize: 20 }]}>
                    GO TO LIST's
                </Text>
            </TouchableOpacity>
        </View>
    );
};
