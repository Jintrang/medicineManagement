import React, {Component} from 'react';
import {Avatar} from 'react-native-paper';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomPicker from './CustomPicker';
import colors from '../assets/colors/colors';
import {gender} from '../assets/data/Data';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class EditProfile extends Component {
  state = {
    fullName: '',
    genderModal: false,
    selectedGender: '',
    weight: '',
    height: '',
  }

  constructor(props) {
    super(props);
    this.getData();
  }
  
  setGenderModal = (genderModal) => {this.setState({genderModal: genderModal})}
  setSelectedGender = (selectedGender) => {this.setState({selectedGender: selectedGender})}
  
  onSave = async () => {
    try {
      Alert.alert('Saved Successfully!')
      await AsyncStorage.setItem('userData', JSON.stringify({fullName:
      this.state.fullName, selectedGender: this.state.selectedGender, 
      weight: this.state.weight, height: this.state.height}))
    } catch (err) {
      console.log(err)
    }
  }
  getData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData')
      const userProfile = JSON.parse(userData)
      if(userProfile !== null) {
        this.setState({...userProfile})
      }
    } catch (e) {
      console.log(e)
    }
  }

  render() {  
    return (    
      <View styles={styles.container}>
      <View style={{margin: 20}}>
          <View style={{alignItems: 'center'}}>
                  <Avatar.Icon
                      icon="account"
                      size={80}
                  />
          </View>
          <View style={styles.inputContainer}>
              <Icon name="rename-box" size={20} />
              <TextInput
                  placeholder='Full name'
                  placeholderTextColor={colors.darkGray}
                  autoCorrect={false}
                  style={styles.textInput}
                  onChangeText={newText => this.setState({fullName: newText})}
                  value = {this.state.fullName}
              />
          </View>
          <View style={styles.inputContainer}>
              <FontAwesome name="user-o" size={20} />
              <TouchableOpacity
                onPress={() => this.setGenderModal(!this.state.genderModal)}
              >
                <Text 
                  placeholderTextColor={colors.gray} 
                  style={styles.textInput}
                  >{this.state.selectedGender}</Text>
              </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
              <Icon name="weight" size={20} />
              <TextInput
                  placeholder='Weight (kg)'
                  placeholderTextColor={colors.darkGray}
                  keyboardType='numbers-and-punctuation'
                  autoCorrect={false}
                  style={styles.textInput}
                  onChangeText={newText => this.setState({weight: newText})}
                  value = {this.state.weight}
              />
          </View>
          <View style={styles.inputContainer}>
              <Icon name="human-male-height" size={20} />
              <TextInput
                  placeholder='Height (cm)'
                  placeholderTextColor={colors.darkGray}
                  keyboardType='numbers-and-punctuation'
                  autoCorrect={false}
                  style={styles.textInput}
                  onChangeText={newText => this.setState({height: newText})}
                  value = {this.state.height}
              />
          </View>
          <TouchableOpacity style={styles.commandButton} onPress={this.onSave}>
              <Text style={styles.buttonTitle}>Save</Text>
          </TouchableOpacity>
      </View>
      <CustomPicker
        setModalOpened={this.setGenderModal}
        modalOpened={this.state.genderModal} 
        value={this.state.selectedGender}
        setValue={this.setSelectedGender}
        items={gender} 
        />
  </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    commandButton: {
      padding: 15,
      borderRadius: 10,
      backgroundColor: colors.lightBlue,
      alignItems: 'center',
      marginTop: 10,
    },
    buttonTitle: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'white',
    },
    inputContainer: {
      width: '100%',
      flexDirection: 'row',
      marginTop: 10,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5,
    },
    touchableOpacity: {
      alignSelf: 'stretch',
      paddingHorizontal: 20,
    },
    textInput: {
      paddingHorizontal: 16,
    }
  });

export default EditProfile;

