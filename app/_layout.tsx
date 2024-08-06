import {Stack} from "expo-router";
import {Provider} from "react-redux";
import {store} from "@/store/store";
import {Keyboard, TouchableWithoutFeedback} from "react-native";
import {SQLiteProvider} from "expo-sqlite";


export default function RootLayout() {

    return (
        <SQLiteProvider databaseName='tasks.db'>
            <Provider store={store}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Stack>
                        <Stack.Screen name="index" options={{headerShown: false, animation: 'ios'}}/>
                        <Stack.Screen name="addTask/index"
                                      options={{headerShown: false, presentation: "modal", animation: 'ios'}}/>
                    </Stack>
                </TouchableWithoutFeedback>
            </Provider>
        </SQLiteProvider>

    );
}
