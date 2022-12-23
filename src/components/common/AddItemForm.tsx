import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../../styles/global';

type AddItemFormT = {
    addItem: (newItem: string) => void;
};

export const AddItemForm: React.FC<AddItemFormT> = React.memo(({ addItem }) => {
    const [newTitle, setNewTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const onPressAddTaskHandler = () => {
        const newTitleTrim = newTitle.trim();

        if (newTitleTrim.length) {
            addItem(newTitleTrim);
            setNewTitle('');
        } else setError('Please, input correct task');
    };

    return (
        <View style={styles.wrapper}>
            <View style={[globalStyles.input]}>
                <TextInput
                    value={newTitle}
                    style={[globalStyles.border, globalStyles.text, { paddingHorizontal: 5 }]}
                    onChangeText={(text: string) => setNewTitle(text)}
                />
            </View>

            <TouchableOpacity
                style={[globalStyles.border, globalStyles.button, styles.button]}
                onPress={onPressAddTaskHandler}
            >
                <Text>add</Text>
            </TouchableOpacity>

            <View>
                <Text style={[styles.error]}>{error}</Text>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
    },
    error: {
        color: 'red',
    },
    button: {
        position: 'absolute',
        color: 'black',
        top: 15,
        right: 0,
        padding: 2,
    },
});
