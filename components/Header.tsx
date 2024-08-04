import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {EvilIcons} from "@expo/vector-icons";
import {Link} from "expo-router";

const Header = () => {
    return (
        <View className="px-4 py-2 mb-5">
            <View className="flex flex-row relative justify-center items-center">
                <TextInput placeholderTextColor="#6b7280" placeholder="Search"
                           className="font-medium border-2 border-gray-300 items-center focus:border-blue-400 w-[60vw] px-2 py-2 bg-gray-200 rounded"/>
                <TouchableOpacity className="absolute right-16">
                    <EvilIcons name="search" size={28} color="black"/>
                </TouchableOpacity>
            </View>
            <View className="flex mt-5 justify-between flex-row items-center">
                <Text className="text-4xl font-bold">Tasks</Text>
                <Link href="/addTask">
                    <View className='bg-red-500 flex-row flex justify-center items-center p-2 rounded-lg'>
                        <EvilIcons name="plus" size={24} color="white"/>
                        <Text className="text-white text-lg font-medium">Add Task</Text>
                    </View>
                </Link>
            </View>
        </View>
    );
};

export default Header;