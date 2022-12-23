import { Provider } from 'react-redux';
import { Main } from './src/app/App';
import { store } from './src/app/store';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import { View } from 'react-native';

// SplashScreen.preventAutoHideAsync();

export default function App() {
    const [fontsLoaded] = useFonts({
        'lcd-normal': require('./src/assets/fonts/lcd-normal.ttf'),
        systematic: require('./src/assets/fonts/systematic.ttf'),
    });

    // const onLayoutRootView = useCallback(async () => {
    //     if (fontsLoaded) {
    //         await SplashScreen.hideAsync();
    //     }
    // }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <Main />
        </Provider>
    );
}
