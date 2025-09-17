import { useState } from "react"
import { ArrowBigLeft, ArrowBigRight, } from "lucide-react";

export const ImageSlider = ({ images }: { images: string[] }) => {
    const [idx, setIdx] = useState(0)
    return <section aria-label="Image Slider" className="w-full h-full relative">
        <div className="w-full h-full flex overflow-">
            {images.map((src, i) =>
                <img
                    alt={`Car Image ${i + 1}`}
                    aria-hidden={i !== idx}
                    key={i}
                    src={src}
                    className={`w-full h-full object-cover block flex-shrink-0 flex-grow-0 transition-transform duration-300`}
                    style={{ transform: `translateX(${-100 * idx}%)` }}
                />
            )}
        </div>
        {/* <img src={images[idx]} className="w-full h-full object-cover block " /> */}
        <button
            aria-label="View Previous Image"
            className="h-full px-1 transition-all hover:bg-black/20 absolute left-0 top-1/2 transform -translate-y-1/2" onClick={() => setIdx((idx - 1 + images.length) % images.length)}>
            <ArrowBigLeft fill="#fff" color="#fff" />
        </button>
        <button
            aria-label="View Next Image"
            className="h-full px-1 transition-all hover:bg-black/20 focus-visible:hover:bg-black/20 absolute right-0 top-1/2 transform -translate-y-1/2" onClick={() => setIdx((idx + 1) % images.length)}>
            <ArrowBigRight fill="#fff" color="#fff" />
        </button>
        {images.length > 1 && <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
            {images.map((_, i) => <button aria-label={`View Image ${i + 1}`} key={i} onClick={() => setIdx(i)} className={`w-2 h-2 rounded-full bg-white/50 hover:bg-white hover:scale-125 focus-visible:bg-white focus-visible:scale-125 transition-all duration-200 ${i === idx ? "bg-white" : ""}`} />)}
        </div>}
    </section>
}