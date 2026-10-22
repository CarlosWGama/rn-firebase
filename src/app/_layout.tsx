import { Slot } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayour() {
    return (
        <>
            <Slot />
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
        </>
    )
}