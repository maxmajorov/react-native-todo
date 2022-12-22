import { StatusBar } from 'expo-status-bar';
import { useState, useRef, useEffect, useCallback } from 'react';
import { AppState, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Checkbox from 'expo-checkbox';
import { store } from '../store/store';
import { globalStyles } from '../styles/global';
import { HideKeyboard } from '../components/HideKeyboard';
import { CloseButton } from '../components/common/CloseButton';
import { EditableSpan } from '../components/common/EditableSpan';
import {
    addTodolistTC,
    fetchTodolistsTC,
    removeTodolistTC,
    TodolistDomainType,
} from '../store/todolists-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './store';
import { TasksStateType } from '../store/tasks-reducer';

export const Main = () => {
    const [value, setValue] = useState('');
    const [state, setState] = useState(store.data);
    console.log(value);

    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(
        state => state.todolists,
    );
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const dispatch = useDispatch();

    // const addTodoHandler = () => {
    //     store.addTodo(value);
    //     Alert.alert('New todo added');
    //     setValue('');
    // };

    const addTodoHandler = useCallback(() => {
        const thunk = addTodolistTC(value);
        dispatch(thunk);
        Alert.alert('New todo added');
        setValue('');
    }, [dispatch, value]);

    const removeTodolist = useCallback((id: string, title: string) => {
        const thunk = removeTodolistTC(id);
        dispatch(thunk);
        Alert.alert(`Todo "${title}" has been deleted`);
    }, []);

    const changeTaskStatusHandler = (todoID: string, taskID: string, status: boolean) => {
        store.changeTaskStatus(todoID, taskID, status);
        console.log('state:', store.data);
    };

    const changeTaskTitleHandler = (todoID: string, taskID: string, title: string) => {
        store.changeTaskTitle(todoID, taskID, title);
    };

    // свернуто или развернуть приложение
    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                console.log('App has come to the foreground!');
            }

            appState.current = nextAppState;
            setAppStateVisible(appState.current);
            console.log('AppState', appState.current);
        });

        return () => {
            subscription.remove();
        };
    }, []);

    //временное решение
    useEffect(() => {
        setState(store.data);
    }, [store]);

    useEffect(() => {
        const thunk = fetchTodolistsTC();
        dispatch(thunk);
    }, []);

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
                {todolists.map(todo => {
                    return (
                        <View key={todo.id} style={[globalStyles.border, styles.todos]}>
                            <Text
                                key={todo.id}
                                style={[globalStyles.text, { textAlign: 'center', fontSize: 18 }]}
                            >
                                {todo.title}
                            </Text>
                            <CloseButton deleteItem={() => removeTodolist(todo.id, todo.title)} />
                            <View style={styles.taskContainer}>
                                {tasks[todo.id].map(task => {
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
                                                value={false} //change
                                                onValueChange={(status: boolean) =>
                                                    changeTaskStatusHandler(
                                                        todo.id,
                                                        task.id,
                                                        status,
                                                    )
                                                }
                                                color={task.status ? '#4630EB' : undefined}
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
};

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
