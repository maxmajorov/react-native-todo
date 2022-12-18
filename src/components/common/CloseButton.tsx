import { FC, ReactElement } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/global';

type TProps = {
    deleteItem: () => void;
};

export const CloseButton: FC<TProps> = ({ deleteItem }): ReactElement => {
    return (
        <TouchableOpacity
            style={[globalStyles.border, globalStyles.button, styles.btn]}
            onPress={deleteItem}
        >
            <Text style={[{ color: 'black', fontSize: 15 }]}>X</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btn: {
        position: 'absolute',
        right: 10,
        top: 8,
        width: 25,
        height: 25,
        borderRadius: 50,
        padding: 0,
        paddingHorizontal: 6,
    },
});
