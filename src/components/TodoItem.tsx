import { Button, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/global';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const TodoItem: React.FC<any> = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    return (
        <View
            style={[
                globalStyles.container,

                {
                    justifyContent: 'center',
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom,
                    paddingLeft: insets.left,
                    paddingRight: insets.right,
                },
            ]}
        >
            <Text style={[globalStyles.text, styles.heading, { fontSize: 50 }]}>TODOLIST</Text>
            <View>
                <Text style={[globalStyles.text, { marginTop: 50 }]}>Description</Text>
                <Text style={[globalStyles.text, { marginTop: 10 }]}>
                    ToDo List App is a kind of app that generally used to maintain our day-to-day
                    tasks or list everything that we have to do. It is helpful in planning our daily
                    schedules. We can add more tasks at any time and delete a task that is
                    completed.
                </Text>
                <Text style={[globalStyles.text, { marginTop: 20 }]}>Features:</Text>
                <Text style={[globalStyles.text, { marginTop: 10 }]}>
                    In this version of the ToDo list, the user will be getting four options:
                </Text>

                <Text style={[globalStyles.text]}>
                    Create (add) a new task or adding a new ToDo in the ToDo List App.
                </Text>

                <Text style={[globalStyles.text]}>
                    See all the tasks or View all the ToDos that were added to the app.
                </Text>

                <Text style={[globalStyles.text]}>
                    Delete any ToDo from the list of ToDos. Exit from the app.
                </Text>
            </View>
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

const styles = StyleSheet.create({
    heading: {
        marginTop: 40,
        fontSize: 20,
    },
});
