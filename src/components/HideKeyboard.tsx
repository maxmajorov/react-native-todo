import { ReactNode, FC, ReactElement } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

type TProps = {
    children: ReactNode;
};

export const HideKeyboard: FC<TProps> = ({ children }): ReactElement => {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {children}
        </TouchableWithoutFeedback>
    );
};
