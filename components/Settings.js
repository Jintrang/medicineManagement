import React from 'react';
import {SafeAreaView, View, Text, StyleSheet, Pressable, TouchableOpacity} from 'react-native';
import {Avatar, Title} from 'react-native-paper';

import colors from '../assets/colors/colors';
import EditProfile from './EditProfile';
import CustomMessage from './CustomMessage';

const Settings = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfoSection}>
                <Pressable onPress={() => navigation.navigate(EditProfile)}>
                    <View>
                        <Avatar.Icon
                            icon="account"
                            size={80}
                        />
                    </View>
                    <View>
                        <Title>View Profile</Title>
                    </View>
                </Pressable>
            </View>
            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate(CustomMessage)}>
                <Text style={styles.optionText}>Customize Notification Message</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfoSection: {
        alignItems: 'center',
        marginVertical: 25,
    },
    option: {
        paddingVertical: 4,
        marginBottom: 1,
        backgroundColor: colors.white,
        color: colors.black,
    },
    optionText: {
        paddingLeft: 16,
        paddingBottom: 16,
        marginTop: 8,
        fontSize: 16,
    }
  });

export default Settings;