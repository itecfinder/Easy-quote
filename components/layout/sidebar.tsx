"use client";

import { useScreen } from "@/context/screen-context";


export function Sidebar(){

const {go} = useScreen();


return (

<nav className="space-y-2">


<button onClick={()=>go("dashboard")}>
Dashboard
</button>


<button onClick={()=>go("capture")}>
Capture
</button>


<button onClick={()=>go("scan")}>
Scan
</button>


<button onClick={()=>go("estimate")}>
Estimate
</button>


<button onClick={()=>go("history")}>
History
</button>


<button onClick={()=>go("invoice")}>
Invoices
</button>


<button onClick={()=>go("prices")}>
Prices
</button>


<button onClick={()=>go("settings")}>
Settings
</button>


</nav>

);

}
