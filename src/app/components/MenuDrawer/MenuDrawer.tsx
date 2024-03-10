import classNames from "classnames";
import style from "./MenuDrawer.module.css";
import { Header } from "../Header";

const categories = [
  {
    title: "Care pathway",
    desc: "Navigate optimal healthcare steps tailored to your specific medical needs.",
    question:
      "What are the initial steps I should take after a vitiligo diagnosis? How often should I consult a dermatologist for my vitiligo? What should I expect during my first few visits to a vitiligo specialist? Can you outline a typical treatment plan for someone newly diagnosed with vitiligo? Are there any important medical tests or assessments I should know about for vitiligo management?",
  },
  {
    title: "Improve health with routines.",
    desc: "Adopt lifestyle and skincare routines beneficial for vitiligo management",
    question:
      " What daily skincare routine is recommended for vitiligo? Are there specific lifestyle changes that can help manage vitiligo? How can I protect my skin from further depigmentation? What are the best practices for bathing and skin care with vitiligo? Can stress management techniques help in controlling vitiligo symptoms?",
  },
  {
    title: "Available treatments",
    desc: "Explore treatment options including medications, light therapy, and surgical solutions.",
  },
  {
    title: "Skin Protection Strategies",
    desc: "Learn effective ways to protect and care for vitiligo-affected skin.",
  },
  {
    title: "Sun Care and Protection",
    desc: "Strategies for safe sun exposure to protect vitiligo-affected skin",
  },
  {
    title: "Nutrition and Diet",
    desc: "Discover dietary choices that may help manage vitiligo symptoms.",
  },
  {
    title: "Emotional Support and Resources",
    desc: "Access support for the emotional aspects of living with vitiligo.",
  },
  {
    title: "Community and Support Groups",
    desc: "Connect with others who have vitiligo for shared experiences and advice.",
  },
  {
    title: "Keep updated on vitiligo treatments.",
    desc: "Stay informed about the latest research and advances in vitiligo treatment.",
  },
  {
    title: "Cosmetic Solutions",
    desc: "Explore cosmetic approaches for camouflaging vitiligo patches and skin care.",
  },
  {
    title: "Exercise and Wellness",
    desc: "Incorporate fitness and wellness activities to support overall health with vitiligo",
  },
  {
    title: "Alternative and Complementary Therapies",
    desc: "Learn about alternative treatments like herbal remedies and acupuncture for vitiligo.",
  },
  {
    title: "Pediatric Vitiligo Care",
    desc: "Specialized guidance for managing vitiligo in children and adolescents.",
  },
  {
    title: "Workplace and Social Navigation",
    desc: "Tips for handling vitiligo in professional and social settings.",
  },
  {
    title: "Advocacy and Awareness",
    desc: "Get involved in vitiligo advocacy and raise awareness about the condition.",
  },
];

type Props = {
  onClose: () => void;
};

export const MenuDrawer = ({ onClose }: Props) => {
  return (
    <div className="absolute top-0 left-0 w-full h-[100vh] bg-pastel1 z-10 flex flex-col">
      <Header onClose={onClose} />
      <div className="p-[24px] overflow-auto">
        <div
          className={classNames(style.title, "text-dark mb-[10px] text-[36px]")}
        >
          Welcome to
          <br />
          Kuido 👋
        </div>
        <div className="text-[#201F21] text-[18px]">
          <p>
            I&apos;m your personal AI here to help you navigate life with
            Vitiligo. Feel free to ask me anything and I&apos;ll do my best to
            assist you.
          </p>
          <p className="mt-[10px]">
            Select a category below to start a conversation with Kuido on a
            specific topic.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-[8px] mt-[16px]">
          {categories.map((category) => (
            <Item
              key={category.title}
              title={category.title}
              desc={category.desc}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Item = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <div className="bg-white p-[24px] rounded-[8px]">
      <div
        className={classNames("text-dark text-[18px] mb-[4px]", style.title)}
      >
        {title}
      </div>
      <div className="text-secondary text-[12px]">{desc}</div>
    </div>
  );
};
