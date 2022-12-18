import React from "react";
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import { Picker } from "@react-native-picker/picker";

import colors from "../assets/colors/colors";

const CustomPicker = ({modalOpened, setModalOpened, value, setValue, items}) => {
    const pickerData = (data) => {
        return (data?.length > 0) && (
            data.map((val, index) => <Picker.Item label={val} value={val} key={index}/>)
        );   
    };
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalOpened}
            >
            <View style={styles.container}>
                <View style={styles.pickerContainer}>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalOpened(!modalOpened)}
                > 
                    <Text>Close</Text>
                </TouchableOpacity>
                <Picker
                    style={{height: 50, width: '100%',}}
                    selectedValue={value}
                    onValueChange={(itemValue, itemIndex) =>
                        setValue(itemValue)
                    }>
                    {pickerData(items)}
                </Picker> 
                </View>
            </View>
        </Modal>
    )
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
    },
    pickerContainer: {
        backgroundColor: colors.ivory,
        width: '100%',
        height: '40%',
        position: 'absolute',
        bottom: 0,
    },
    closeButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },

})

export default CustomPicker;