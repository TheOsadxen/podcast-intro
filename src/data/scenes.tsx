import { ReactNode } from "react";

export interface SceneData {
  id: string;
  background: string;
  content: () => {
    title: ReactNode;
    subtitle: ReactNode;
  };
  components?: string[];
}

export const scenes: SceneData[] = [
  {
    id: "scene1",
    background: "/waves-vector.svg",
    content: () => ({
      title: (
        <h2
          className="text-lg md:text-5xl font-bold rtl text-black align-bottom "
          style={{ fontFamily: `"source-arabic-sans", sans-serif` }}
        >
          أهلاً بك في <span className="text-light-orange">مُكالمة،</span>
        </h2>
      ),

      subtitle: (
        <div className="absolute top-[80px] right-0 w-[100%] text-center font-[600] rtl">
          <p className="mb-1 ">منصتك لاكتشاف أفكار مبتكرة</p>
          <p>تلهم التغيير الإيجابي.</p>
        </div>
      ),
    }),
    components: ["intro-text", "start-button", "saudi-guy"],
  },
];
