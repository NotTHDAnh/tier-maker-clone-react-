import { useState } from "react";
import Uploader from "../Uploader/Uploader.jsx"

export default function ImagesContainer() {
    const [pinned, setPinned] = useState(false);


    return <div className={`text-start ms-[95.1562px] p-10  ${pinned ? "sticky bottom-0" : "relative"
        }`}>
        <h3 onClick={() => setPinned(prev => !prev)} id="pin" className="text-[20px] font-bold overflow-y-auto z-10 text-start cursor-pointer">📌 {!pinned ? "Pin Images":"Unpin Images"}</h3>
        <Uploader />
    </div>
}
