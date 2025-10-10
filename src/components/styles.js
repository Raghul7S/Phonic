import {StyleSheet} from 'react-native';

import { fonts } from './helpers/Utils';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#060417',
        padding: 18
    },
    barStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: '#6852ba'
    },
    text: {
        fontSize: 24,
        color: '#fff',
        fontFamily: fonts.medium
    },
    link: {
        fontSize: 14,
        borderBottomWidth: 1,
        borderColor: '#6852ba',
        color: '#6852ba',
        letterSpacing: 5,
        marginTop: 10
    }
});

export default styles;