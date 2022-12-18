import React, { Component } from 'react';
import { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import colors from '../assets/colors/colors';
import MedInput from './MedInput';
import MedItem from './MedItem';

import AntDesign from 'react-native-vector-icons/AntDesign';

const Home = ({navigation}) => {
    const [medModalIsVisible, setMedModalIsVisible] = useState(false);
    const [medList, setMedList] = useState([]);

    function startAddMedHandler() {
        setMedModalIsVisible(true);
    }

    function endAddMedHandler() {
        setMedModalIsVisible(false);
    }

    function addMedHandler(medName, medFrequency, medDate) {
        setMedList(currentMedList => [
            ...currentMedList, 
            {medName: medName,
            frequency: medFrequency,
            date: medDate, 
            id: Math.random().toString()}
        ]);
        endAddMedHandler();
    }

    navigation.setOptions({headerRight: () => (
        <View style={styles.rightHeader}>
          <TouchableOpacity
            onPress={startAddMedHandler}
            >
            <AntDesign name="plus" color="white" size={24}/>
          </TouchableOpacity>
        </View>
    )})

    return (
        <View style={styles.container}>
            <Text style={styles.sectionText}>CURRENTLY TAKING</Text>
            <View>
                <FlatList 
                    data={medList} 
                    renderItem={itemData => {
                        return (
                            <MedItem   
                            medName={itemData.item.medName}
                            frequency={itemData.item.frequency}
                            date={itemData.item.date}
                            >
                            </MedItem>
                        )
                    }}
                    keyExtractor={(item, index) => {
                        return item.id;
                    }} 
                />
            </View>
            <MedInput 
                visible={medModalIsVisible} 
                onAddMed={addMedHandler} 
                onCancel={endAddMedHandler}>    
            </MedInput>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rightHeader: {
        paddingRight: 10
    },
    sectionText: {
        marginTop: 20,
        color: colors.darkGray,
        fontSize: 14,
        marginBottom: 6,
        marginLeft: 12,
    }
})

export default Home;