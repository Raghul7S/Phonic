import { TouchableOpacity } from 'react-native';
import Text from './Text';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';

export default function Link({ onPress, children, link = false, to }) {
  const navgation = useNavigation();

  const Navigate = () => {
    navgation.navigate(to);
  }

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={to ? Navigate : onPress}>
      {link === true ? (
        <Text style={styles.link}>{children}</Text>
      ) : (
        <Text>{children}</Text>
      )}
    </TouchableOpacity>
  );
}
