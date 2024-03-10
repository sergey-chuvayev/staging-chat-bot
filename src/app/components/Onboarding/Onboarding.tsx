import classNames from "classnames";
import style from "./Onboarding.module.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useRef, useState } from "react";

type Props = {
  onChatStartButtonClicked: () => void;
};

export const Onboarding = ({ onChatStartButtonClicked }: Props) => {
  const carousel = useRef<Carousel>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  const slides = isMobile
    ? ["/Slide_1.svg", "/Slide_2.svg", "/Slide_3.svg", "/Slide_4.svg"]
    : [
      "/Slide_1_desktop.svg",
      "/Slide_2_desktop.svg",
      "/Slide_3_desktop.svg",
      "/Slide_4_desktop.svg",
    ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
      </div>
      <div className="w-full h-[100vh] flex flex-col justify-end" onClick={() => {
        setCurrentSlide(currentSlide + 1);
      }}>
        <div>
          <div className="flex items-center justify-center gap-[8px] mb-[52px]">
            {carousel.current &&
              Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  onClick={(event) => {
                    event.stopPropagation();
                    setCurrentSlide(index);
                  }}
                  className={classNames(
                    "rounded-[50%]",
                    {
                      "w-[12px] h-[12px] bg-[#FE8C5C]": currentSlide === index,
                    },
                    { "w-[8px] h-[8px] bg-dark": currentSlide !== index },
                    { "cursor-pointer": !isMobile }
                  )}
                />
              ))}
          </div>
          <div className="">
            <Carousel
              onChange={(currentSlide) => {
                setCurrentSlide(currentSlide);
              }}
              selectedItem={currentSlide}
              className={style.carousel}
              showStatus={false}
              showThumbs={false}
              showArrows={false}
              showIndicators={false}
              ref={carousel}
            >
              <Slide
                title={
                  <>
                    Hello,
                    <br />
                    I’m Kuido.ai
                  </>
                }
                desc="I'm your personal AI assistant, curated by humans, designed to help you navigate life with Vitiligo."
              />
              <Slide
                title="We’re millions of people with Vitiligo"
                desc="We are more than you imagine, and you're not alone. I can assist you in connecting with the community you're seeking."
              />
              <Slide
                title="For caregivers
                and patients"
                desc="Whether you have Vitiligo or are supporting someone who does, I can help you navigate this journey from all perspectives."
              />
              <Slide
                title="People behind this project"
                desc="Behind this application is a committed team of nine professionals. They are devoted to this pro bono project, aiming to improve the lives of individuals with Vitiligo."
              />
            </Carousel>
          </div>

          <div className="flex justify-center">
            <div className="px-[22px] pb-[22px] max-w-[620px] grow">
              <button
                onClick={(event) => {
                  onChatStartButtonClicked();
                  event.stopPropagation();
                }}
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
      </div>
    </>
  );
};

const Slide = ({
  title,
  desc,
}: {
  title: React.ReactNode | string;
  desc: string;
}) => {
  return (
    <div className="flex justify-center">
      <div className="text-left px-[42px] py-[32px] max-w-[652px]">
        <div
          className={classNames(style.title, "text-dark mb-[10px] text-[36px]")}
        >
          {title}
        </div>
        <div className={classNames("text-secondary mb-[24px]", style.desc)}>
          {desc}
        </div>
      </div>
    </div>
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
