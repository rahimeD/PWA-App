import React, { createContext, useState } from "react";

export const DeviceContext = createContext();

export default function DeviceProvider({ children }) {
    const [deviceStatus, setDeviceStatus] = useState({
        isLightOn: false,
        isHeaterOn: false,
        isAirConditionerOn: false,
        isTVOn: false,
        isDoorLocked: true,
    });

    return (
        <DeviceContext.Provider value={{ deviceStatus, setDeviceStatus }}>
            {children}
        </DeviceContext.Provider>
    );
}
