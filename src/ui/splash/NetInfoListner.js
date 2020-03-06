import React, { useState, useEffect } from "react"
import NetInfo from "@react-native-community/netinfo"

export default function NetInfoListner(props) {
    //const [count, setCount] = useState(0)

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        console.log("Now subscribing NetInfo")
        const UnSubscribe = NetInfo.addEventListener(info => {
            props.onNetChange(info)
        })
        return () => {
            console.log("Now Unsubscribing NetInfo")
            //UnSubscribe()
        }
    })

    return null
}
