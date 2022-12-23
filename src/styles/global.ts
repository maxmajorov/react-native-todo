import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    border: {
        borderColor: 'green',
        borderWidth: 1,
    },
    text: {
        color: 'green',
        fontFamily: '',
    },
    button: {
        backgroundColor: 'green',
        padding: 6,
    },
    input: {
        width: 250,
        padding: 15, //размер зоны дективации фокуса
        fontSize: 16,
    },
});
