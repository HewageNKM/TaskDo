import React from 'react';
import {FlatList, SafeAreaView} from "react-native";
import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";

const Index = () => {
    return (
        <SafeAreaView className='h-full'>
            <FlatList ListHeaderComponent={() => (<Header/>)} data={[]}
                      renderItem={(item) => (<TaskCard task={item}/>)}/>
        </SafeAreaView>
    );
};

export default Index;