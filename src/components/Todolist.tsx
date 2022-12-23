import Checkbox from 'expo-checkbox';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
    removeTask?: (taskId: string, todolistId: string) => void;
    removeTodolist: (id: string) => void;
    changeTodolistTitle?: (id: string, newTitle: string) => void;
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

    // const changeTodolistTitle = useCallback(
    //     (title: string) => {
    //         props.changeTodolistTitle(props.todolist.id, title);
    //     },
    //     [props.todolist.id, props.changeTodolistTitle],
    // );

    let tasksForTodolist = props.tasks;

    return (
        <View style={[globalStyles.border, styles.todos]}>
            <Text style={[globalStyles.text, { textAlign: 'center', fontSize: 18 }]}>
                {props.todolist.title}
            </Text>
            <AddItemForm addItem={(title: string) => addTask(title)} />
            <CloseButton deleteItem={removeTodolist} />
            <View>
                tasks
                {tasksForTodolist.map(task => (
                    <View key={task.id} style={styles.taskList}>
                        <EditableSpan
                            value={task.title}
                            onChange={(title: string) =>
                                changeTaskTitle(task.id, title, props.todolist.id)
                            }
                        />
                        <Checkbox
                            style={styles.checkbox}
                            value={task.status === TaskStatuses.Completed}
                            onValueChange={(status: boolean) =>
                                changeTaskStatus(task.id, status, props.todolist.id)
                            }
                            color={task.status ? '#4630EB' : undefined}
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
