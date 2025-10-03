import {ToastAndroid} from 'react-native';

export default function Toast (msg) {
    console.log(msg)
    ToastAndroid.showWithGravityAndOffset(
        msg, 
        ToastAndroid.SHORT, 
        ToastAndroid.BOTTOM
    )
}