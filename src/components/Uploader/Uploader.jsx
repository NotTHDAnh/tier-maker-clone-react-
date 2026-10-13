import { useState } from "react";
import ImageWrapper from "../ImageWrapper/ImageWrapper";
import { ImgsContext } from "../../App.jsx";
import { SortableContext } from "@dnd-kit/sortable";
import { createContext, useContext, useEffect } from "react";
import { useDroppable } from "@dnd-kit/react";

export default function Uploader({ pinned }) {
    const { unSortedImages, handleUpload } = useContext(ImgsContext);
    const { ref } = useDroppable({ id: "uploader" });

    const handleUploadFile = (e) => {
        const files = e.target.files;
        const newImgs = Array.from(files).map((file) => ({
            id: crypto.randomUUID(),
            url: URL.createObjectURL(file),
            name: file.name
        }));


        handleUpload(newImgs);
    };

    return (
        <div className={"flex flex-col gap-5"}>
            <h3 className={pinned ? "hidden" : "text-[20px] text-start font-semibold pt-5"}>Add additional images to your tier list. </h3>
            <div ref={ref} className="w-full min-h-10 flex flex-wrap gap-2" id="img-container">
                {unSortedImages && unSortedImages.length > 0 &&
                    <SortableContext items={unSortedImages.map(i => i.id)}>
                        {unSortedImages.map(img => (
                            <ImageWrapper key={img.id} image={img} />
                        ))}
                    </SortableContext>
                }
            </div>
            <input onChange={handleUploadFile} className={pinned ? "hidden" : "file:border file:bg-[#e5e5e5] file:text-black file:rounded file:p-1"} type="file" id="uploader" accept="image/png,image/pjp,image/jpeg,image/jpg,image/pjpeg,image/jfif,image/gif,image/webp" multiple={true} />
        </div>
    )
}
