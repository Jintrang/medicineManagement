import React, {useState} from 'react';
import {
    SafeAreaView,
    View,
    Button,
    TextInput,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Text,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';

import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomPicker from './CustomPicker';
import colors from '../assets/colors/colors';
import { frequency } from '../assets/data/Data';

function MedInput(props) {
  const [frequencyModal, setFrequencyModal] = useState(false);
  const [medFrequency, setMedFrequency] = useState('As Needed');
  const [medName, setMedName] = useState('');
  const [medShape, setMedShape] = useState('');
  const [medColor, setMedColor] = useState('');
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate
    setDate(currentDate);
  };

  function addMedHandler() {
    const nextReminder = date.getHours().toString() + ':' + date.getMinutes().toString();
    props.onAddMed(medName, medFrequency, nextReminder);

    if(medFrequency !== 'As Needed') {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });
      Notifications.scheduleNotificationAsync({
        content: {
          title: 'PharmaCare',
          body: global.notificationMessage,
        },
        trigger: {
          date,
          repeats: true
        }
      });
    }

    setMedName('');
    setMedShape('');
    setMedColor('');
    setDate(new Date());
  }
 
  return (
    <Modal visible={props.visible} animationType='slide'>
      <SafeAreaView styles={styles.container}>
        <View style={styles.inputContainer}>
            <Fontisto name="prescription" size={20} color={colors.lightBlue}/>
            <TextInput
                placeholder='Medication Name'
                placeholderTextColor={colors.gray}
                autoCorrect={false}
                style={styles.textInput}
                onChangeText={newText => setMedName(newText)}
                value = {medName}
            />
        </View>
        <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="shape" size={15} color={colors.lightBlue}/>
            <TextInput
                placeholder='Medication Shape'
                placeholderTextColor={colors.gray}
                autoCorrect={false}
                style={styles.textInput}
                onChangeText={newText => setMedShape(newText)}
                value = {medShape}
            />
        </View>
        <View style={styles.inputContainer}>
            <Ionicons name="color-palette-outline" size={15} color={colors.lightBlue}/>
            <TextInput
                placeholder='Medication Color'
                placeholderTextColor={colors.gray}
                autoCorrect={false}
                style={styles.textInput}
                onChangeText={newText => setMedColor(newText)}
                value = {medColor}
            />
        </View>
        <View style={styles.sectionDivider}>
          <Text style={styles.sectionDividerText}>SCHEDULE</Text>
        </View>
        <TouchableOpacity style={styles.inputContainer}
          onPress={() => setFrequencyModal(!frequencyModal)}
        >
          <Text>FREQUENCY</Text>
          <Text 
            placeholderTextColor={colors.gray} 
            style={styles.pickerInput}
            >{medFrequency}</Text>
        </TouchableOpacity>
        {medFrequency == 'As Needed' &&
          <Text style={styles.choiceText}>No reminders. To add reminders, change the 'As Needed' to other options.</Text>}
        {medFrequency == 'Everyday' &&
          <View>
            <Text style={styles.choiceText}>SET TIME</Text>
            <DateTimePicker
              style={{marginRight: 175}}
              testID='dateTimePicker'
              value={date}
              mode={'time'}
              is24Hour={true}
              onChange={onChange}
            />
          </View>
          }
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title='Save' onPress={addMedHandler}></Button>
          </View>
          <View style={styles.button}>
            <Button title='Cancel' onPress={props.onCancel}></Button>
          </View>
        </View>
      </SafeAreaView>
      <CustomPicker
        setModalOpened={setFrequencyModal}
        modalOpened={frequencyModal} 
        value={medFrequency}
        setValue={setMedFrequency}
        items={frequency} 
      />
    </Modal>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputContainer: {
      alignItems: 'center',
      width: '100%',
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: '#f2f2f2',
      paddingVertical: 8,
      paddingLeft: 12,
    },
    textInput: {
      fontSize: 16,
      paddingLeft: 16,
      marginTop: 4,
      width: '100%',
    },
    buttonContainer: {
      justifyContent: 'center',
      marginTop: 16,
      flexDirection: 'row',
    },
    button: {
      width: '30%',
      marginHorizontal: 8,
    },
    sectionDivider: {
      marginTop: 20,
    },
    sectionDividerText: {
      color: colors.darkGray,
      fontSize: 16,
      marginBottom: 6,
      marginLeft: 12,
    },
    pickerInput: {
      fontSize: 16,
      paddingLeft: 225,
      color: colors.darkGray,
    },
    choiceText: {
      color: colors.darkGray,
      fontSize: 12,
      marginBottom: 6,
      marginLeft: 12,
      marginTop: 6,
    }
  });

export default MedInput;

