import { Slot } from "expo-router";
import { StatusBar } from "react-native";


export default function RootLayour() {
    return (
        <>
            <Slot />
            <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        </>
    )
}