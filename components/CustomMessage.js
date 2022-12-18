import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../assets/colors/colors';

class CustomMessage extends Component {
  state = {
    message: ''
  }

  constructor(props) {
    super(props);
    this.getData();
  }
  onSave = async () => {
    Alert.alert('Message saved successfully!');
    global.notificationMessage = this.state.message;
    try {
      await AsyncStorage.setItem('message', this.state.message)
    } catch (err) {
      console.log(err)
    }
  }
  getData = async () => {
    try {
      const message = await AsyncStorage.getItem('message')
      if(message !== null) {
        this.setState({message: message})
      }
    } catch (e) {
      console.log(e)
    }
  }

  render() {  
    return (    
      <View styles={styles.container}>
          <View style={styles.inputContainer}>
              <TextInput
                  multiline={true}
                  numberOfLines={4}
                  placeholder={global.notificationMessage}
                  placeholderTextColor={colors.darkGray}
                  autoCorrect={false}
                  style={styles.textInput}
                  onChangeText={newText => this.setState({message: newText})}
                  value = {this.state.fullName}
              />
          </View>
          <TouchableOpacity style={styles.commandButton} onPress={this.onSave}>
              <Text style={styles.buttonTitle}>Save</Text>
          </TouchableOpacity>
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
      alignItems: 'center',
      alignSelf: 'center',
      width: '25%',
      padding: 15,
      borderRadius: 10,
      backgroundColor: colors.lightBlue,
      marginTop: 50,
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
    textInput: {
      paddingHorizontal: 16,
      borderWidth: 1,
      width: '100%',
      padding: 10,
    }
  });

export default CustomMessage;

