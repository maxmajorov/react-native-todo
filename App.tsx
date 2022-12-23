import { Provider } from 'react-redux';
import { Main } from './src/app/App';
import { store } from './src/app/store';
// import * as Font from 'expo-font';
// import { useState } from 'react';

export default function App() {
    // const [isReady, setIsReady] = useState(false);

    // if (!isReady) {
    //     try {
    //         let a = async function loadAppAplication() {
    //             await Font.loadAsync({
    //                 'roboto-regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
    //                 'roboto-bold': require('./src/assets/fonts/Roboto-Bold.ttf'),
    //             });
    //         };
    //         console.log(a);
    //     } finally {
    //         setIsReady(true);
    //     }
    // }

    return (
        <Provider store={store}>
            <Main />
        </Provider>
    );
}
