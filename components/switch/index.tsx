import { useState } from 'react';
import { Switch as Swt } from 'react-native-paper';

const Switch = () => {
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    return <Swt value={isSwitchOn} onValueChange={onToggleSwitch} />;
};

export default Switch;