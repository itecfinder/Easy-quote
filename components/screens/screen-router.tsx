"use client";

import { useScreen } from "@/context/screen-context";


import DashboardScreen from "./dashboard-screen";
import CaptureScreen from "./capture-screen";
import ScanScreen from "./scan-screen";
import EstimateScreen from "./estimate-screen";
import HistoryScreen from "./history-screen";
import InvoiceScreen from "./invoice-screen";
import PricesScreen from "./prices-screen";
import SettingsScreen from "./settings-screen";


export default function ScreenRouter(){

const {screen}=useScreen();


switch(screen){


case "capture":
return <CaptureScreen/>;


case "scan":
return <ScanScreen/>;


case "estimate":
return <EstimateScreen/>;


case "history":
return <HistoryScreen/>;


case "invoice":
return <InvoiceScreen/>;


case "prices":
return <PricesScreen/>;


case "settings":
return <SettingsScreen/>;


default:
return <DashboardScreen/>;

}

}
