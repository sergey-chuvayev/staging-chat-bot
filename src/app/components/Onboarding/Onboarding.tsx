import classNames from "classnames";
import style from "./Onboarding.module.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useRef, useState } from "react";

const slides = ["/Slide_1.svg", "/Slide_2.svg", "/Slide_3.svg", "/Slide_4.svg"];

export const Onboarding = () => {
  const carousel = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <>
      <div className={style.back}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={style.backimg}
            style={{
              backgroundImage: `url(${slide})`,
              opacity: currentSlide === index ? 1 : 0,
            }}
          />
        ))}
      </div>
      <div className="w-full h-[100vh] flex flex-col justify-end">
        <div>
          <div className="flex items-center justify-center gap-[8px] mb-[52px]">
            {carousel.current &&
              Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className={classNames(
                    "rounded-[50%]",
                    {
                      "w-[12px] h-[12px] bg-[#FE8C5C]": currentSlide === index,
                    },
                    { "w-[8px] h-[8px] bg-dark": currentSlide !== index }
                  )}
                />
              ))}
          </div>
          <div className="">
            <Carousel
              onChange={(currentSlide) => {
                setCurrentSlide(currentSlide);
              }}
              className={style.carousel}
              showStatus={false}
              showThumbs={false}
              showArrows={false}
              showIndicators={false}
              ref={carousel}
            >
              <div className="text-left px-[42px] py-[32px]">
                <div
                  className={classNames(
                    style.title,
                    "text-dark mb-[10px] text-[36px]"
                  )}
                >
                  Hello,
                  <br />
                  I’m Kuido.ai
                </div>
                <div
                  className={classNames("text-secondary mb-[24px]", style.desc)}
                >
                  I’m your very own AI assistant curated by humans that helps
                  you navigate your life with Vitiligo.
                </div>
              </div>
              <div className="text-left px-[42px] py-[32px]">
                <div
                  className={classNames(
                    style.title,
                    "text-dark mb-[10px] text-[32px]"
                  )}
                >
                  We’re millions of people with Vitiligo
                </div>
                <div
                  className={classNames("text-secondary mb-[24px]", style.desc)}
                >
                  We are more than you think, and you’re not alone. I can help
                  you get to the community you’re looking for.
                </div>
              </div>
              <div className="text-left px-[42px] py-[32px]">
                <div
                  className={classNames(
                    style.title,
                    "text-dark mb-[10px] text-[32px]"
                  )}
                >
                  For caregivers and patients
                </div>
                <div
                  className={classNames("text-secondary mb-[24px]", style.desc)}
                >
                  It doesn’t matter if you’re a Vitiligo patient ir if you’re
                  helping someone with this disease: I can help you navigate
                  this journey from all stand points.
                </div>
              </div>
              <div className="text-left px-[42px] py-[32px]">
                <div
                  className={classNames(
                    style.title,
                    "text-dark mb-[10px] text-[32px]"
                  )}
                >
                  About the team
                </div>
                <div
                  className={classNames("text-secondary mb-[24px]", style.desc)}
                >
                  xxxxxxx xxxxx xxxxx xxxx
                </div>
              </div>
            </Carousel>
          </div>

          <div className="px-[22px] pb-[22px]">
            <button
              className={classNames(
                "bg-dark text-white w-full p-[12px]",
                style.button
              )}
            >
              Let’s get started
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const getSlideBg = (currentSlide: number) => {
  switch (currentSlide) {
    case 0:
      return "url(/Slide_1.svg)";
    case 1:
      return "url(/Slide_2.svg)";
    case 2:
      return "url(/Slide_3.svg)";
    case 3:
      return "url(/Slide_4.svg)";
  }
};
