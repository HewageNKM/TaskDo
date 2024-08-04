import React from 'react';
import {View} from "react-native";

const TaskCard = ({task}:{task:Task}) => {
    return (
        <View>
            <View className="flex flex-row justify-between items-center p-4 border-b-2 border-gray-300">
                <View className="flex flex-col">
                    <Text className="text-xl font-semibold">{task.title}</Text>
                    <Text className="text-lg font-medium text-gray-500">{task.description}</Text>
                </View>
                <View className="flex flex-col">
                    <Text className="text-lg font-medium text-gray-500">{task.status}</Text>
                    <Text className="text-lg font-medium text-gray-500">{task.reminder}</Text>
                </View>
            </View>
        </View>
    );
};

export default TaskCard;