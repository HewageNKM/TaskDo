import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Platform} from "react-native";
import {
    AndroidImportance,
    getExpoPushTokenAsync,
    getPermissionsAsync,
    requestPermissionsAsync,
    setNotificationChannelAsync
} from 'expo-notifications';
import Constants from "expo-constants";


interface NotificationSlice {
    expoPushToken: string | undefined;
    permission: boolean;
}

const initialState: NotificationSlice = {
    expoPushToken: undefined,
    permission: false
}

const notificationSlice = createSlice({
    name: 'notificationSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerNotification.fulfilled, (state, action) => {
            state.expoPushToken = action.payload[0];
            state.permission = action.payload[1] === 'granted';
        });
    }
});

export const registerNotification = createAsyncThunk('notificationSlice/getExpoPushToken', async (arg, thunkAPI) => {
    try {
        if (Platform.OS === 'android') {
            await setNotificationChannelAsync('default', {
                name: 'default',
                importance: AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        if (Platform.OS === 'web') return;

        const {status: existingStatus} = await getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            let status = await requestPermissionsAsync();
            finalStatus = status.status;
        }

        const projectId =
            Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
        if (!projectId) {
            console.error('Please set the projectId in app.json');
        }
        return [(await getExpoPushTokenAsync(projectId)).data, finalStatus];
    } catch (e) {
        console.error(e);
        return thunkAPI.rejectWithValue(e);
    }
});
export default notificationSlice.reducer;
export const {} = notificationSlice.actions;