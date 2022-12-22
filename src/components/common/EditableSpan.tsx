import { ReactElement, FC, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../../styles/global';

type EditableSpanT = {
    value: string;
    onChange: (changedTask: string) => void;
};

export const EditableSpan: FC<EditableSpanT> = ({ value, onChange }): ReactElement => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(value);
    };

    const disactivateEditMode = () => {
        setEditMode(false);
        onChange(title);
    };

    return editMode ? (
        <View style={styles.wrapper}>
            <TextInput
                value={title}
                // onBlur={disactivateEditMode}
                autoFocus
                style={[globalStyles.border, globalStyles.text, { paddingHorizontal: 5 }]}
                onChangeText={(text: string) => setTitle(text)}
            />
            <TouchableOpacity
                style={[globalStyles.border, globalStyles.button, styles.button]}
                onPress={disactivateEditMode}
            >
                <Text>save</Text>
            </TouchableOpacity>
        </View>
    ) : (
        <Text style={[globalStyles.text, styles.task]} onPress={() => activateEditMode()}>
            {value}
        </Text>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
    },
    task: {
        marginBottom: 5,
    },

    button: {
        position: 'absolute',
        color: 'black',
        top: 0,
        right: -60,
        padding: 2,
    },
});
