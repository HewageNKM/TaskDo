import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store/store";
import {deleteTask, getAllTasks, updateTaskStatusById} from "@/store/tasksSlice/TaskSlice";
import {useSQLiteContext} from "expo-sqlite";
import {opacity} from "react-native-reanimated/lib/typescript/reanimated2/Colors";

const TaskCard = ({task}: { task: Task }) => {
    const [expand, setExpand] = useState(false);
    const dispatch: AppDispatch = useDispatch();
    const db = useSQLiteContext();
    const removeTask = () => {
        console.log(task.id);
        dispatch(deleteTask({id: task.id, db}));
        dispatch(getAllTasks({db}));
    }
    const completeTask = () => {
        console.log(task.id);
        dispatch(updateTaskStatusById({id: task.id, db: db, status: task.status === "Complete" ? "Incomplete" : "Complete"}));
        dispatch(getAllTasks({db}));
    }
    return (
        <View>
            <View className="flex-col flex">
                <View
                    className={`flex flex-row justify-between items-center p-4 bg-red-600 mx-2 ${expand ? "rounded-t-lg" : "mb-4 rounded-lg"} ${task.status === "Complete" && "opacity-50"} shadow-lg`}>
                    <TouchableOpacity  onPress={() => setExpand(prevState => !prevState)} className="flex flex-col">
                        <Text className="text-xl text-white font-semibold">{task.title}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={completeTask} className="flex flex-col">
                        <Text className="text-lg font-medium capitalize text-gray-100">{task.status}</Text>
                    </TouchableOpacity>
                </View>
                {expand && (
                    <View className="flex flex-col bg-gray-300 mb-5 p-4 pt-2 mx-2  rounded-b-lg shadow-lg">
                        <Text className="text-lg">{task.description}</Text>
                        <Text
                            className="text-sm font-light text-gray-500">{new Date(task.createdAt).toDateString()}</Text>
                        <Text
                            className="text-sm font-light text-gray-500">{task.reminder ? 'Reminder Set' : 'No Reminder'}</Text>
                        <TouchableOpacity onPress={() => removeTask()}
                                          className="mt-5 flex justify-center items-center">
                            <Text className="text-lg font-medium text-red-500">Delete Task</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
};

export default TaskCard;