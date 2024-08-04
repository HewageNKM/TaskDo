import React from 'react';
import {FlatList, SafeAreaView} from "react-native";
import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import EmptyState from "@/components/EmptyState";
import {StatusBar} from "expo-status-bar";

const Index = () => {
    const {tasks,error} = useSelector((state:RootState) => state.tasksSlice);

    return (
        <SafeAreaView className='h-full'>
            <FlatList ListHeaderComponent={() => (<Header/>)} data={tasks} keyExtractor={(item) => item.id}
                      renderItem={(item) => (<TaskCard task={item}/>)}
                      ListEmptyComponent={() => (<EmptyState title="No Tasks" subTitle="Create a Task"/>)}
            />
            <StatusBar animated={true} style="dark"/>
        </SafeAreaView>
    );
};

export default Index;