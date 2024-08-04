import React from 'react';
import {View, Text, SafeAreaView, TextInput} from "react-native";

const Index = () => {
    return (
        <SafeAreaView className="h-full">
            <View className="py-3 px-4">
                <Text className="font-bold text-3xl">Add Task</Text>
                <View className="mt-3">
                    <Text className="font-medium text-lg">Title</Text>
                    <TextInput placeholder="Title" className="w-full font-medium p-2 h-8 bg-gray-200 rounded-lg"/>
                </View>
                <View className="mt-3">
                    <Text className="font-medium text-lg">Description</Text>
                    <TextInput multiline placeholder="Description" className="w-full p-2 h-[40vh] font-medium bg-gray-200 rounded-lg"/>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Index;