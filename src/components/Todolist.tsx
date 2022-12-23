import Checkbox from 'expo-checkbox';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { TaskStatuses, TaskType } from '../api/todolists-api';
import { fetchTasksTC } from '../store/tasks-reducer';
import { FilterValuesType, TodolistDomainType } from '../store/todolists-reducer';
import { globalStyles } from '../styles/global';
import { AddItemForm } from './common/AddItemForm';
import { CloseButton } from './common/CloseButton';
import { EditableSpan } from './common/EditableSpan';

type TodoListT = {
    todolist: TodolistDomainType;
    tasks: Array<TaskType>;
    addTask: (title: string, todolistId: string) => void;
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void;
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void;
    removeTask: (taskId: string, todolistId: string) => void;
    removeTodolist: (id: string) => void;
    changeTodolistTitle: (id: string, newTitle: string) => void;
};

export const Todolist: React.FC<TodoListT> = React.memo(({ ...props }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const thunk = fetchTasksTC(props.todolist.id);
        dispatch(thunk);
    }, []);

    const addTask = useCallback(
        (title: string) => {
            props.addTask(title, props.todolist.id);
        },
        [props.addTask, props.todolist.id],
    );

    const removeTask = useCallback(
        (taskId: string) => props.removeTask(taskId, props.todolist.id),
        [],
    );

    const removeTodolist = () => {
        props.removeTodolist(props.todolist.id);
    };

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todolistId: string) => {
        props.changeTaskTitle(taskId, newTitle, todolistId);
    }, []);

    const changeTaskStatus = useCallback((taskId: string, status: boolean, todolistId: string) => {
        props.changeTaskStatus(
            taskId,
            status ? TaskStatuses.Completed : TaskStatuses.New,
            todolistId,
        );
    }, []);

    const changeTodolistTitle = useCallback(
        (title: string) => {
            props.changeTodolistTitle(props.todolist.id, title);
        },
        [props.todolist.id, props.changeTodolistTitle],
    );

    let tasksForTodolist = props.tasks;

    return (
        <View style={[globalStyles.border, styles.todos]}>
            <EditableSpan
                value={props.todolist.title}
                onChange={(title: string) => changeTodolistTitle(title)}
                style={[globalStyles.text, { textAlign: 'center', fontSize: 18 }]}
            />

            <AddItemForm addItem={(title: string) => addTask(title)} />
            <CloseButton deleteItem={removeTodolist} />
            <View style={styles.taskList}>
                {!tasksForTodolist.length && (
                    <Text style={[globalStyles.text, { color: 'red', textAlign: 'center' }]}>
                        Add tasks
                    </Text>
                )}
                {tasksForTodolist.map(task => (
                    <View key={task.id} style={styles.taskItem}>
                        <View>
                            <EditableSpan
                                value={task.title}
                                onChange={(title: string) =>
                                    changeTaskTitle(task.id, title, props.todolist.id)
                                }
                            />

                            <CloseButton
                                deleteItem={() => removeTask(task.id)}
                                style={styles.delBtn}
                            />
                        </View>

                        <Checkbox
                            style={[globalStyles.border]}
                            value={task.status === TaskStatuses.Completed}
                            onValueChange={(status: boolean) =>
                                changeTaskStatus(task.id, status, props.todolist.id)
                            }
                            color={task.status ? 'black' : undefined}
                        />
                    </View>
                ))}
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    todos: {
        width: 300,
        padding: 10,
        marginBottom: 10,
    },
    taskContainer: {
        marginTop: 20,

        task: {
            marginBottom: 5,
        },
    },

    taskList: {
        marginTop: 20,
    },

    taskItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    delBtn: {
        width: 15,
        height: 15,
        right: -25,
        top: 5,
        padding: 0,
    },
});
