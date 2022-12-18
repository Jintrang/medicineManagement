import { View, StyleSheet, Text } from "react-native";
import Fontisto from 'react-native-vector-icons/Fontisto'

import colors from "../assets/colors/colors";

function MedItem(props) {
    return (
        <View style={styles.medItem}>
            <Fontisto name='pills' size={32}/>
            <View style={styles.medInfo}>
                <Text style={styles.medText}>{props.medName}</Text>
                {props.frequency == 'As Needed' && 
                <Text style={styles.subMedText}>Take as needed</Text>}
                {props.frequency == 'Everyday' && 
                <Text style={styles.subMedText}>Next reminder: {props.date}</Text>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    medItem: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 20,
        backgroundColor: colors.white,
        height: 80,
        marginBottom: 1,
    },
    medInfo: {
        paddingLeft: 20,
    },
    medText: {
        color: colors.black,
    },
    subMedText: {
        paddingTop: 4,
        color: colors.darkGray,
    }
});

export default MedItem;