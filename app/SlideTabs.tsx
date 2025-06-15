"use client";
import React, {useRef, useState} from "react";
import {motion} from "framer-motion";

type Position = {
  left: number;
  width: number;
  opacity: number;
};

const SlideTabs = () => {
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const tabLabels = ["安卓QQ", "安卓微信", "苹果QQ", "苹果微信"];
  const tabRefs = useRef<(HTMLLIElement | null)[]>([]);

  React.useEffect(() => {
    const ref = tabRefs.current[activeIndex];
    if (ref) {
      const {width} = ref.getBoundingClientRect();
      setPosition({
        left: ref.offsetLeft,
        width,
        opacity: 1,
      });
    }
  }, [activeIndex]);

  return (
    <ul className="relative mx-auto flex w-fit rounded-full border-2 border-black bg-white p-1">
      {tabLabels.map((label, idx) => (
        <Tab
          key={label}
          ref={(el) => {
            tabRefs.current[idx] = el;
          }}
          active={activeIndex === idx}
          onClick={() => setActiveIndex(idx)}
        >
          {label}
        </Tab>
      ))}
      <Cursor position={position}/>
    </ul>
  );
};

const Tab = React.forwardRef<
  HTMLLIElement,
  { children: string; active: boolean; onClick: () => void }
>(({children, active, onClick}, ref) => {
  return (
    <motion.li
      ref={ref}
      onClick={onClick}
      animate={{
        color: active ? "#fff" : "#000",
        scale: active ? 1.1 : 1,
        fontWeight: active ? 700 : 400,
      }}
      transition={{type: "spring", stiffness: 300, damping: 20}}
      className={`relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase md:px-5 md:py-3 md:text-base`}
    >
      {children}
    </motion.li>
  );
});
Tab.displayName = "Tab";

const Cursor = ({position}: { position: Position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-black md:h-12"
    />
  );
};

export default SlideTabs;

