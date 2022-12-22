import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Checkbox from 'expo-checkbox';
import { globalStyles } from './src/styles/global';
import { store } from './src/store/store';
import { CloseButton } from './src/components/common/CloseButton';
import { HideKeyboard } from './src/components/HideKeyboard';
import { EditableSpan } from './src/components/common/EditableSpan';

export default function App() {
    const [value, setValue] = useState('');

    const addTodoHandler = () => {
        store.addTodo(value);
        Alert.alert('New todo added');
        setValue('');
    };

    const deleteTodoHandler = (id: string, title: string) => {
        store.deleteTodo(id);
        Alert.alert(`Todo "${title}" has been deleted`);
    };

    const changeTaskStatusHandler = (todoID: string, taskID: string, status: boolean) => {
        store.changeTaskStatus(todoID, taskID, status);
        console.log('state:', store.data);
    };

    const changeTaskTitleHandler = (todoID: string, taskID: string, title: string) => {
        store.changeTaskTitle(todoID, taskID, title);
    };

    return (
        <View style={styles.container}>
            <Text style={[globalStyles.text, { marginTop: 40, fontSize: 20 }]}>TODOLIST</Text>
            {/*для деактивации фокуса инпута*/}
            <HideKeyboard>
                <View style={[styles.input]}>
                    <TextInput
                        value={value}
                        style={[globalStyles.border, globalStyles.text, { paddingHorizontal: 5 }]}
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
                                style={[globalStyles.text, { textAlign: 'center', fontSize: 18 }]}
                            >
                                {todo.title}
                            </Text>
                            <CloseButton
                                deleteItem={() => deleteTodoHandler(todo.id, todo.title)}
                            />
                            <View style={styles.taskContainer}>
                                {store.getTasks(todo.id).map(task => {
                                    return (
                                        <View key={task.id} style={styles.taskList}>
                                            <EditableSpan
                                                value={task.title}
                                                onChange={(title: string) =>
                                                    changeTaskTitleHandler(todo.id, task.id, title)
                                                }
                                            />

                                            <Checkbox
                                                style={styles.checkbox}
                                                value={task.isDone}
                                                onValueChange={(status: boolean) =>
                                                    changeTaskStatusHandler(
                                                        todo.id,
                                                        task.id,
                                                        status,
                                                    )
                                                }
                                                color={task.isDone ? '#4630EB' : undefined}
                                            />
                                        </View>
                                    );
                                })}
                            </View>
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
        width: 250,
        padding: 15, //размер зоны дективации фокуса
        fontSize: 16,
    },

    todosList: {
        position: 'relative',
        marginTop: 20,
    },
    todos: {
        width: 300,
        padding: 10,
        marginBottom: 10,
    },
    taskContainer: {
        marginTop: 20,
        // height: 200,

        task: {
            marginBottom: 5,
        },
    },
    taskList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    checkbox: {},
});
