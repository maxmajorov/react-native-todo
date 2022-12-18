import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Checkbox from 'expo-checkbox';
import { globalStyles } from './styles/global';
import { store } from './styles/store/store';
import { HideKeyboard } from './src/components/HideKeyboard';

export default function App() {
    const [value, setValue] = useState('');
    const [isChecked, setChecked] = useState<boolean>();

    const addTodoHandler = () => {
        store.addTodo(value);
        Alert.alert('New todo added');
    };

    return (
        <View style={styles.container}>
            {/*для деактивации фокуса инпута*/}
            <HideKeyboard>
                <View style={[styles.input]}>
                    <TextInput
                        value={value}
                        style={[globalStyles.border, globalStyles.text]}
                        onChangeText={(text: string) => setValue(text)}
                    />
                </View>
            </HideKeyboard>
            <TouchableOpacity
                style={[globalStyles.border, globalStyles.button]}
                onPress={addTodoHandler}
            >
                <Text style={[{ color: 'black' }]}>ADD TODO</Text>
            </TouchableOpacity>

            {/* <View style={[globalStyles.border]}>
                <Button color={'black'} title="Add TODO" onPress={() => addTodoHandler(value)} />
            </View> */}

            <View style={styles.todosList}>
                {store.getTodos().map(todo => {
                    return (
                        <View key={todo.id} style={[globalStyles.border, styles.todos]}>
                            <Text
                                key={todo.id}
                                style={[globalStyles.text, { textAlign: 'center' }]}
                            >
                                {todo.title}
                            </Text>
                            {store.getTasks(todo.id).map(task => {
                                return (
                                    <View key={task.id} style={styles.taskList}>
                                        <Text style={[globalStyles.text, styles.taskList.task]}>
                                            {task.title}
                                        </Text>
                                        <Checkbox
                                            style={styles.checkbox}
                                            value={task.isDone}
                                            onChangeValue={(value: boolean) =>
                                                store.setTaskChecked(todo.id, task.id)
                                            }
                                            color={isChecked ? '#4630EB' : undefined}
                                        />
                                    </View>
                                );
                            })}
                        </View>
                    );
                })}
            </View>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        // justifyContent: 'center',
        // fontFamily: 'lucidatypewriter',
    },
    input: {
        marginTop: 50,
        width: 250,
        padding: 15, //размер зоны дективации фокуса
        fontSize: 16,
    },

    todosList: {
        marginTop: 20,
    },
    todos: {
        width: 300,
        padding: 10,
        marginBottom: 10,
    },
    taskList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        task: {
            marginBottom: 5,
        },
    },

    checkbox: {},
});
