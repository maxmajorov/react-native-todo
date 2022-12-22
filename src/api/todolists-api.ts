import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '196d543e-854d-4840-b68c-b0f81150459a',
        Cookie: '_ym_uid=1662478745727521833; _ym_d=1671742621; _ym_isad=2; ASP.NET_SessionId=uaks4r2l21ascdwl4kdo2pus; .ASPXAUTH=98C19DF991E4CB0A583F55605316776A514A428A8B5BED80644A3C2754C6EDE726D5D9A00CF24522BCA95DF2109529BE365AC6B31971033A1C750386A17AB08A02062C644E81D4967D9D46C0C89543A263310F81',
    },
});

// api
export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists');
    },
    createTodolist(title: string) {
        return instance.post<
            { title: string },
            AxiosResponse<ResponseType<{ item: TodolistType }>>
        >('todo-lists', { title });
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`);
    },
    updateTodolist(id: string, title: string) {
        return instance.put<{ title: string }, AxiosResponse<ResponseType>>(`todo-lists/${id}`, {
            title,
        });
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    createTask(todolistId: string, title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(
            `todo-lists/${todolistId}/tasks`,
            { title },
        );
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<{ item: TaskType }>>>(
            `todo-lists/${todolistId}/tasks/${taskId}`,
            model,
        );
    },
};

// types
export type TodolistType = {
    id: string;
    title: string;
    addedDate: string;
    order: number;
};
export type ResponseType<D = {}> = {
    resultCode: number;
    messages: Array<string>;
    fieldsErrors: Array<string>;
    data: D;
};

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}

export type TaskType = {
    description: string;
    title: string;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string;
    deadline: string;
    id: string;
    todoListId: string;
    order: number;
    addedDate: string;
};
export type UpdateTaskModelType = {
    title: string;
    description: string;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string;
    deadline: string;
};
type GetTasksResponse = {
    error: string | null;
    totalCount: number;
    items: TaskType[];
};
