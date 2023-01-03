import { Provider } from 'react-redux';
import { Main } from './src/app/App';
import { store } from './src/app/store';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { globalStyles } from './src/styles/global';
import { HomeScreen } from './src/components/HomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TodoItem } from './src/components/TodoItem';

const Stack = createNativeStackNavigator();

export default function App() {
    const [fontsLoaded] = useFonts({
        'lcd-normal': require('./src/assets/fonts/lcd-normal.ttf'),
        systematic: require('./src/assets/fonts/systematic.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="TodoLists" component={Main} />
                        <Stack.Screen name="TodoItem" component={TodoItem} />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </Provider>
    );
}
