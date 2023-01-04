import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003',
        alignItems: 'center',
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    border: {
        borderColor: 'green',
        borderWidth: 1,
    },
    text: {
        color: 'green',
        fontFamily: 'systematic',
        fontSize: 14,
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
    sysFont: {
        fontFamily: 'systematic',
    },
});
