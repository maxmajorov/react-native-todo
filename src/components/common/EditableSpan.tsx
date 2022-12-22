import { ReactElement, FC, ChangeEvent, FocusEvent, MouseEvent, useState } from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
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
        <TextInput
            value={title}
            onBlur={disactivateEditMode}
            autoFocus
            style={[globalStyles.border, globalStyles.text, { paddingHorizontal: 5 }]}
            onChangeText={(text: string) => setTitle(text)}
        />
    ) : (
        <Text style={[globalStyles.text, styles.task]} onPress={() => activateEditMode()}>
            {value}
        </Text>
    );
};

const styles = StyleSheet.create({
    task: {
        marginBottom: 5,
    },
});
