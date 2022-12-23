import { FC, ReactElement } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/global';

type TProps = {
    deleteItem: () => void;
    style?: object;
};

export const CloseButton: FC<TProps> = ({ deleteItem, style }): ReactElement => {
    return (
        <TouchableOpacity
            style={[globalStyles.border, globalStyles.button, styles.btn, style]}
            onPress={deleteItem}
        >
            <Text style={[{ color: 'black', fontSize: 12 }]}>X</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btn: {
        position: 'absolute',
        right: 10,
        top: 8,
        width: 20,
        height: 20,
        borderRadius: 50,
        padding: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
