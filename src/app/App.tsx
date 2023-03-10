import { StatusBar } from 'expo-status-bar';
import { useState, useRef, useEffect, useCallback } from 'react';
import { AppState, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../styles/global';
import { HideKeyboard } from '../components/HideKeyboard';
import {
    addTodolistTC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    removeTodolistTC,
    TodolistDomainType,
} from '../store/todolists-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './store';
import {
    addTaskTC,
    fetchTasksTC,
    removeTaskTC,
    TasksStateType,
    updateTaskTC,
} from '../store/tasks-reducer';
import { Todolist } from '../components/Todolist';
import { TaskStatuses } from '../api/todolists-api';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Main: React.FC<any> = ({ navigation }) => {
    const [value, setValue] = useState('');
    const insets = useSafeAreaInsets();

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

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        const thunk = changeTodolistTitleTC(id, title);
        dispatch(thunk);
    }, []);

    const addTask = useCallback((title: string, todolistId: string) => {
        console.log(title, todolistId);
        const thunk = addTaskTC(title, todolistId);
        dispatch(thunk);
    }, []);

    const removeTask = useCallback((id: string, todolistId: string) => {
        const thunk = removeTaskTC(id, todolistId);
        dispatch(thunk);
    }, []);

    const changeTaskStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        const thunk = updateTaskTC(id, { status }, todolistId);
        dispatch(thunk);
    }, []);

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        const thunk = updateTaskTC(id, { title: newTitle }, todolistId);
        dispatch(thunk);
    }, []);

    // ???????????????? ?????? ???????????????????? ????????????????????
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
        <View
            style={[
                styles.container,
                {
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom,
                    paddingLeft: insets.left,
                    paddingRight: insets.right,
                },
            ]}
        >
            <Text style={[globalStyles.text, { marginTop: 20, fontSize: 20 }]}>
                Hello, friend!..
            </Text>
            {/*?????? ?????????????????????? ???????????? ????????????*/}
            <HideKeyboard>
                <View style={[globalStyles.input, { marginTop: 20 }]}>
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
                <Text style={[globalStyles.sysFont, { color: 'black' }]}>ADD TODO</Text>
            </TouchableOpacity>

            <View style={styles.todosList}>
                {todolists.map(td => (
                    <View key={td.id}>
                        <TouchableOpacity onPress={() => navigation.navigate('TodoItem')}>
                            <View style={[styles.todoItem]}>
                                <Text style={[globalStyles.text, { fontSize: 20 }]}>
                                    {td.title}
                                </Text>
                                <Text style={[globalStyles.text, { fontSize: 20 }]}>
                                    {tasks[td.id].length}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
                {todolists.map(todo => {
                    let allTodolistTasks = tasks[todo.id];
                    return (
                        <View key={todo.id}>
                            <Todolist
                                todolist={todo}
                                tasks={allTodolistTasks}
                                removeTask={removeTask}
                                addTask={addTask}
                                changeTaskStatus={changeTaskStatus}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
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
        backgroundColor: '#003',
        alignItems: 'center',
    },

    todosList: {
        marginTop: 50,
    },

    todoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
});
