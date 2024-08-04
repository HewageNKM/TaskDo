import React from 'react';
import {View,Text} from "react-native";

const TaskCard = ({task}:{task:Task}) => {
    return (
        <View>
            <View className="flex mb-4 flex-row justify-between items-center p-4 bg-red-600 mx-2 rounded-lg shadow-lg">
                <View className="flex flex-col">
                    <Text className="text-xl text-white font-semibold">{task.title}</Text>
                </View>
                <View className="flex flex-col">
                    <Text className="text-lg font-medium capitalize text-gray-100">{task.status}</Text>
                </View>
            </View>
        </View>
    );
};

export default TaskCard;