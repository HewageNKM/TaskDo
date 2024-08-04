import React from 'react';
import {View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView} from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const Index = () => {
    return (
        <SafeAreaView className="h-full">
            <ScrollView className="py-3 px-4">
                <Text className="font-bold text-4xl">Add Task</Text>
                <View className="mt-3">
                    <Text className="font-medium text-lg">Title</Text>
                    <TextInput placeholderTextColor="#6b7280" placeholder="Title" className="w-full border-2 border-gray-300 focus:border-blue-400 font-medium py-4 px-4 text-lg h-fit bg-gray-200 rounded-lg"/>
                </View>
                <View className="mt-3">
                    <Text className="font-medium text-lg">Description</Text>
                    <TextInput placeholderTextColor="#6b7280" multiline placeholder="Description" className="w-full border-2 border-gray-300 items-center focus:border-blue-400 p-2 h-[40vh] font-medium text-lg bg-gray-200 rounded-lg"/>
                </View>
                <View className="mt-3">
                    <Text className="font-medium text-lg">Reminder</Text>
                    <View className="flex mt-2 flex-row justify-center items-center">
                        <RNDateTimePicker themeVariant="light" minimumDate={new Date()} accentColor="red" textColor="#000000" display="default" mode="datetime" value={new Date()}/>
                    </View>
                </View>
                <TouchableOpacity activeOpacity={.6} className="mt-5">
                    <View className="bg-red-500 flex-row flex justify-center items-center p-2 rounded-lg mt-3">
                        <Text className="text-white text-xl font-medium">Add Task</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Index;