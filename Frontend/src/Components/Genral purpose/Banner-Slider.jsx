import Button from "./Buttons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";
import Banner1 from "../../assets/bannerImages/Banner1.jpg";
import Banner2 from "../../assets/bannerImages/Banner2.jpg";
import Banner3 from "../../assets/bannerImages/Banner3.jpg";
import Banner4 from "../../assets/bannerImages/Banner4.jpg";
import Banner5 from "../../assets/bannerImages/Banner5.jpg";

const BannerImgs = [Banner1, Banner2, Banner3, Banner4, Banner5];

export function BannerSlider() {
  return (
    <section className="relative">
      <Carousel className="w-full">
        <CarouselContent>
          {BannerImgs.map((img, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10" />
                <img
                  src={img}
                  alt="Hero"
                  className="object-cover md:h-full"
                  priority
                />
                <div className="absolute top-1/2 left-6 sm:left-12 -translate-y-1/2 z-20">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
                    WOODZZ
                    <br />
                    CRAFT
                  </h1>
                  <p className="text-white text-lg sm:text-xl mb-6 max-w-md">
                    Handcrafted wooden art pieces for your home
                  </p>
                  <Button className="bg-[#3C7A5D] hover:bg-[#2A5641] text-white">
                    Shop Now
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
