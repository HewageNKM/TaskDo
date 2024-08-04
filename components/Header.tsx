import React from 'react';
import {Text, TextInput, View} from "react-native";
import {EvilIcons} from "@expo/vector-icons";
import {Link} from "expo-router";

const Header = () => {
    return (
        <View className="px-4 py-2">
            <View className="flex flex-row justify-center items-center">
                <TextInput placeholder="Search"
                           className="h-8 font-medium pl-3 pr-3 pt-1 pb-1 w-full bg-gray-200 rounded"/>
            </View>
            <View className="flex mt-3 justify-between flex-row items-center">
                <Text className="text-3xl font-bold">Tasks</Text>
                <Link href="/addTask">
                    <View className='bg-red-500 flex-row flex justify-center items-center p-2 rounded-lg'>
                        <EvilIcons name="plus" size={24} color="white"/>
                        <Text className="text-white font-medium">Add Task</Text>
                    </View>
                </Link>
            </View>
        </View>
    );
};

export default Header;