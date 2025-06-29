import React, { createContext, useState } from "react";

export const DeviceContext = createContext();

export default function DeviceProvider({ children }) {
    const [deviceStatus, setDeviceStatus] = useState({
        isLightOn: true,
        lightConsumption: 18, // z. B. 18 Watt

        isHeaterOn: true,
        heaterTemperature: 21, // °C

        isAirConditionerOn: true,
        airConditionerCoolingLevel: 65, // % Kühlleistung

        isTVOn: false,
        tvVolume: 0, // wenn aus = 0 %

        isDoorLocked: false,
    });

    return (
        <DeviceContext.Provider value={{ deviceStatus, setDeviceStatus }}>
            {children}
        </DeviceContext.Provider>
    );
}
