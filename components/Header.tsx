import React, {useState} from 'react';
import {Text ,TextInput, TouchableOpacity, View} from "react-native";
import {EvilIcons} from "@expo/vector-icons";
import {Link} from "expo-router";
import {Picker} from "@react-native-picker/picker";

const Header = () => {
    const [selectedValue, setSelectedValue] = useState("cp");
    return (
        <View className="px-4 py-2 mb-8">
            <View className="flex flex-row relative justify-center items-center">
                <TextInput placeholderTextColor="#6b7280" placeholder="Search"
                           className="font-medium border-2 border-gray-300 items-center focus:border-blue-400 w-[60vw] px-2 py-2 bg-gray-200 rounded"/>
                <TouchableOpacity className="absolute right-16">
                    <EvilIcons name="search" size={28} color="black"/>
                </TouchableOpacity>
            </View>
            <View className="flex mt-8 justify-between flex-row items-center">
                <Text className="text-4xl font-bold">Tasks</Text>
                <Link href="/addTask">
                    <View className='bg-red-500 flex-row flex justify-center items-center p-2 rounded-lg'>
                        <EvilIcons name="plus" size={24} color="white"/>
                        <Text className="text-white text-lg font-medium">Add Task</Text>
                    </View>
                </Link>
            </View>
            <View className="flex relative mt-5 flex-row justify-start">
                <Text className="text-lg font-medium">Filter:</Text>
                <View className="w-[50vw] left-6 -top-[11.2vh] absolute scale-75">
                    <Picker
                        selectedValue={selectedValue}
                        onValueChange={(itemValue, itemIndex)=>{
                            setSelectedValue(itemValue)
                        }}>
                        <Picker.Item label="Complete" value="cp" />
                        <Picker.Item label="Incomplete" value="in" />
                    </Picker>
                </View>
            </View>
        </View>
    );
};

export default Header;