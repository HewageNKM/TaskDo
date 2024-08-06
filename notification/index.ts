import {scheduleNotificationAsync, setNotificationHandler} from "expo-notifications";

setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export const createScheduleNotification = async ({title, body, reminder}: {
    title: string,
    body: string,
    reminder: number
}) => {
    console.log("Setting Notification :"+title);
    await scheduleNotificationAsync({
        content: {
            title: title,
            body: body,
        },
        trigger: {date:reminder},
    });
}
