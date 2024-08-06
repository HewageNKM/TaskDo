import React, {useEffect} from 'react';
import {FlatList, SafeAreaView} from "react-native";
import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store";
import EmptyState from "@/components/EmptyState";
import {StatusBar} from "expo-status-bar";
import {getAllTasks, initializeTables} from "@/store/tasksSlice/TaskSlice";
import {useSQLiteContext} from "expo-sqlite";
import {registerNotification} from "@/store/notificationSlice/notificationSlice";

const Index = () => {
    const {tasks, isFetchingTasks, error} = useSelector((state: RootState) => state.tasksSlice);
    const dispatch: AppDispatch = useDispatch();
    const db = useSQLiteContext();

    useEffect(() => {
        dispatch(registerNotification());
        dispatch(initializeTables({db}));
        dispatch(getAllTasks({db}));
    }, []);

    return (
        <SafeAreaView className='h-full'>
            <FlatList ListHeaderComponent={() => (<Header/>)} data={tasks} keyExtractor={(item) => item.id}
                      renderItem={(item) => (<TaskCard task={item.item}/>)}
                      ListEmptyComponent={() => (<EmptyState title="No Tasks" subTitle="Create a Task"/>
                      )}
                      refreshing={isFetchingTasks} onRefresh={() => dispatch(getAllTasks({db}))}
            />
            <StatusBar animated={true} style="dark"/>
        </SafeAreaView>
    );
};

export default Index;