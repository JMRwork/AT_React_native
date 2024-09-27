import { Card as Cd } from 'react-native-paper';
import Button from '../button/Button';

export default function Card(props: any) {
    return (
        <Cd>
            <Cd.Title title={props.title} />
            <Cd.Content>{props.children}</Cd.Content>
            {props.haveButton &&
                <Cd.Actions>
                    <Button onPress={props.handleButton}>{props.buttonText}</Button>
                </Cd.Actions>}
        </Cd>
    );
}