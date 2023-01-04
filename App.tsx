import { Provider } from 'react-redux';
import { Main } from './src/app/App';
import { store } from './src/app/store';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TodoItem } from './src/components/TodoItem';
import { RootStackParamList } from './src/types/navigationTypes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/screens/authScreens/RootHomeScreen';

const RootStack = createNativeStackNavigator<RootStackParamList>();

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
                    <RootStack.Navigator initialRouteName="Home">
                        <RootStack.Screen name="Home" component={HomeScreen} />
                        <RootStack.Screen name="TodoLists" component={Main} />
                        <RootStack.Screen name="TodoItem" component={TodoItem} />
                    </RootStack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </Provider>
    );
}
