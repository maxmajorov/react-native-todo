import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
    Home: NavigatorScreenParams<RootAuthParamsList>;
    TodoLists: { todoId: string } | undefined;
    TodoItem: undefined;
};

export type RootAuthParamsList = {
    Describtion: undefined;
    Login: undefined;
    Registration: { id: number; name: string };
};

export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type TodoListsProps = NativeStackScreenProps<RootStackParamList, 'TodoLists'>;
export type TodoItemProps = NativeStackScreenProps<RootStackParamList, 'TodoItem'>;
