import React from 'react';
import {FlatList, SafeAreaView} from "react-native";
import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";

const Index = () => {
    const {} = useSelector((state:RootState) => state.tasksSlice);
    return (
        <SafeAreaView className='h-full'>
            <FlatList ListHeaderComponent={() => (<Header/>)} data={[]}
                      renderItem={(item) => (<TaskCard task={item}/>)}/>
        </SafeAreaView>
    );
};

export default Index;