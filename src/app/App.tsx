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
import { addTaskTC, fetchTasksTC, TasksStateType, updateTaskTC } from '../store/tasks-reducer';
import { AddItemForm } from '../components/common/AddItemForm';
import { Todolist } from '../components/Todolist';

export const Main = () => {
    const [value, setValue] = useState('');

    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(
        state => state.todolists,
    );
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const dispatch = useDispatch();

    const addTodoHandler = useCallback(() => {
        const thunk = addTodolistTC(value);
        dispatch(thunk);
        Alert.alert('New todo added');
        setValue('');
    }, [dispatch, value]);

    const removeTodolist = useCallback((id: string) => {
        const thunk = removeTodolistTC(id);
        dispatch(thunk);
    }, []);

    const addTask = useCallback((title: string, todolistId: string) => {
        console.log(title, todolistId);
        const thunk = addTaskTC(title, todolistId);
        dispatch(thunk);
    }, []);

    const changeTaskStatus = useCallback((id: string, status: boolean, todolistId: string) => {
        const thunk = updateTaskTC(id, { status }, todolistId);
        dispatch(thunk);
    }, []);

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        const thunk = updateTaskTC(id, { title: newTitle }, todolistId);
        dispatch(thunk);
    }, []);

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

    useEffect(() => {
        const thunk = fetchTodolistsTC();
        dispatch(thunk);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={[globalStyles.text, styles.heading]}>TODOLIST</Text>
            {/*для деактивации фокуса инпута*/}
            <HideKeyboard>
                <View style={[globalStyles.input]}>
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

            <View style={styles.todosList}>
                {todolists.map(todo => {
                    let allTodolistTasks = tasks[todo.id];
                    return (
                        <View key={todo.id}>
                            <Todolist
                                todolist={todo}
                                tasks={allTodolistTasks}
                                // removeTask={removeTask}
                                addTask={addTask}
                                changeTaskStatus={changeTaskStatus}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                // changeTodolistTitle={changeTodolistTitle}
                            />
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
    },
    heading: {
        marginTop: 40,
        fontSize: 20,
    },

    todosList: {
        position: 'relative',
        marginTop: 20,
    },
});
