import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from "react-native";

const TaskCard = ({task}:{task:Task}) => {
    const [expand, setExpand] = useState(false);

    return (
        <View>
            <View className="flex-col flex">
                <View className={`flex flex-row justify-between items-center p-4 bg-red-600 mx-2 ${expand ? "rounded-t-lg":"mb-4 rounded-lg"} shadow-lg`}>
                    <TouchableOpacity onPress={()=> setExpand(prevState => !prevState)} className="flex flex-col">
                        <Text className="text-xl text-white font-semibold">{task.title}</Text>
                    </TouchableOpacity>
                    <View className="flex flex-col">
                        <Text className="text-lg font-medium capitalize text-gray-100">{task.status}</Text>
                    </View>
                </View>
                {expand && (
                    <View className="flex flex-col bg-gray-300 mb-5 p-4 pt-2 mx-2  rounded-b-lg shadow-lg">
                        <Text className="text-lg">{task.description}</Text>
                        <Text className="text-sm font-light text-gray-500">{new Date(task.createdAt).toDateString()}</Text>
                        <Text className="text-sm font-light text-gray-500">{task.reminder ? 'Reminder Set' : 'No Reminder'}</Text>
                    </View>
                )}
            </View>
        </View>
    );
};

export default TaskCard;