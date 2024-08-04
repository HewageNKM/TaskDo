import React from 'react';
import {Text, View} from "react-native";
import {EvilIcons} from "@expo/vector-icons";
import {Link} from "expo-router";

const EmptyState = ({title, subTitle}: { title: string, subTitle: string }) => {
    return (
        <View>
            <View className="flex h-full flex-col justify-center items-center">
                <Link href="/addTask">
                    <EvilIcons name={'exclamation'} size={70} color={'#6b7280'} className='text-center'/>
                </Link>
                <Text className="text-2xl font-semibold text-center">{title}</Text>
                <Text className="text-lg font-medium text-gray-500 text-center">{subTitle}</Text>
            </View>
        </View>
    );
};

export default EmptyState;