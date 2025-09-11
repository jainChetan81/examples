import { useState } from "react"
import { ArrowBigLeft, ArrowBigRight, } from "lucide-react";

export const ImageSlider = ({ images }: { images: string[] }) => {
    const [idx, setIdx] = useState(0)
    return <div className="w-full h-full relative">
        <img src={images[idx]} className="w-full h-full object-cover block " />
        <button
            className="h-full px-1 transition-all hover:bg-black/20 absolute left-0 top-1/2 transform -translate-y-1/2" onClick={() => setIdx((idx - 1 + images.length) % images.length)}>
            <ArrowBigLeft fill="#fff" color="#fff" />
        </button>
        <button
            className="h-full px-1 transition-all hover:bg-black/20 absolute right-0 top-1/2 transform -translate-y-1/2" onClick={() => setIdx((idx + 1) % images.length)}>
            <ArrowBigRight fill="#fff" color="#fff" />
        </button>
    </div>
}