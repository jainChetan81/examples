import { ImageSlider } from "../components/ImageSlider"
import { Layout } from "../components";

export const images = [
    "https://imgd.aeplcdn.com/370x208/n/cw/ec/194921/victoris-exterior-right-front-three-quarter-28.jpeg",
    "https://imgd.aeplcdn.com/370x208/n/cw/ec/194921/victoris-exterior-right-front-three-quarter-27.jpeg",
    "https://imgd.aeplcdn.com/370x208/n/cw/ec/209777/victoris-exterior-right-front-three-quarter.jpeg",
    "https://imgd.aeplcdn.com/370x208/n/cw/ec/209739/victoris-interior-dashboard.jpeg",
    "https://imgd.aeplcdn.com/370x208/n/cw/ec/156405/xuv-3xo-exterior-right-front-three-quarter-35.png"
]

const carImages = [
    "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
    "https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg",
    "https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg",
    "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg",
    "https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg"
]

export default function Slider() {
    return (
        <Layout title="Slider">
            <div className="max-w-[1200px] w-full aspect-[5/3] m-y-0 m-x-auto ">
                <ImageSlider images={carImages} />
            </div>
        </Layout>
    )
}