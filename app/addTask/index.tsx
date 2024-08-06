import React, {useState} from 'react';
import {Alert, SafeAreaView, ScrollView, Switch, Text, TextInput, TouchableOpacity, View} from "react-native";
import RNDateTimePicker, {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import {StatusBar} from "expo-status-bar";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store";
import {useSQLiteContext} from "expo-sqlite";
import {createScheduleNotification} from "@/notification";
import {addTask, getAllTasks} from "@/store/tasksSlice/TaskSlice";

const Index = () => {
    const [enableReminder, setEnableReminder] = useState(false);
    const [date, setDate] = useState(new Date());
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [reminder, setReminder] = useState(0);
    const dispatch: AppDispatch = useDispatch();
    const db = useSQLiteContext();
    const permission = useSelector((state:RootState) => state.notificationSlice.permission);

    const createTask = async () => {
        if (title.trim() === '' || description.trim() === '' || (reminder === 0 && enableReminder)) {
            Alert.alert('Error', 'Please fill all fields');
            return
        }
        const task = {
            id: 0,
            title,
            description,
            reminder,
            createdAt: new Date().getTime(),
            status: 'Incomplete'
        };
        console.log(task);

        dispatch(addTask({task: task, db: db}));
        dispatch(getAllTasks({db}));
        await createScheduleNotification({title: "Task Reminder", body: title, reminder: reminder});

        setTitle('');
        setDescription('');
        setReminder(0);
        setDate(new Date());
        setEnableReminder(false);

    };
    return (
        <SafeAreaView className="h-full">
            <ScrollView className="py-3 px-4">
                <Text className="font-bold text-4xl">Add Task</Text>
                <View className="mt-3">
                    <Text className="font-medium text-lg">Title</Text>
                    <TextInput value={title} onChangeText={(text) => setTitle(text)} placeholderTextColor="#6b7280"
                               placeholder="Title"
                               className="w-full border-2 border-gray-300 focus:border-blue-400 font-medium py-4 px-4 text-lg h-fit bg-gray-200 rounded-lg"/>
                </View>
                <View className="mt-3">
                    <Text className="font-medium text-lg">Description</Text>
                    <TextInput value={description} onChangeText={(text) => setDescription(text)}
                               placeholderTextColor="#6b7280" multiline placeholder="Description"
                               className="w-full border-2 border-gray-300 items-center focus:border-blue-400 p-2 h-[40vh] font-medium text-lg bg-gray-200 rounded-lg"/>
                </View>
                <View className="mt-3">
                    <View className="flex flex-row justify-between">
                        <Text className="font-medium text-lg">Reminder</Text>
                        <Switch value={enableReminder}
                                onValueChange={() => {
                                    if (!permission) {
                                        Alert.alert('Error', 'Please enable notification permission in settings');
                                        return;
                                    }
                                    setEnableReminder(prevState => !prevState)
                                }}/>
                    </View>
                    {
                        enableReminder && (
                            <View className="flex mt-2 flex-row justify-center items-center">
                                <RNDateTimePicker onChange={(event: DateTimePickerEvent, date: Date) => {
                                    const {type, nativeEvent: {timestamp, utcOffset}} = event;
                                    setReminder(timestamp);
                                    setDate(date);
                                }} themeVariant="light" minimumDate={new Date()} accentColor="red"
                                                  textColor="#000000" display="default" mode="datetime" value={date}/>
                            </View>
                        )
                    }

                </View>
                <TouchableOpacity onPress={() => createTask()} activeOpacity={.6} className="mt-5">
                    <View className="bg-red-500 flex-row flex justify-center items-center p-2 rounded-lg mt-3">
                        <Text className="text-white text-xl font-medium">Add Task</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
            <StatusBar animated={true} style="light"/>
        </SafeAreaView>
    );
};

export default Index;