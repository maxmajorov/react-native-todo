import { createStackNavigator } from '@react-navigation/stack';
import { Description } from './Description';
import { Login } from './Login';
import { Registration } from './Registration';
import { HomeProps } from '../../types/navigationTypes';

const Stack = createStackNavigator();

export const HomeScreen: React.FC<HomeProps> = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName="Describtion">
            <Stack.Screen name={'Describtion'} component={Description} />
            <Stack.Screen name={'Login'} component={Login} />
            <Stack.Screen name={'Registration'} component={Registration} />
        </Stack.Navigator>
    );
};
