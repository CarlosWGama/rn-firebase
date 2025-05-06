import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayour() {
    return (
        <>
            <Slot />
            <StatusBar style="auto" backgroundColor="transparent" translucent={true} />
        </>
    )
}