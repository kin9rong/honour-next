"use client";
import React, {useRef, useState} from "react";
import {motion} from "framer-motion";

type Position = {
  left: number;
  width: number;
  opacity: number;
};

export type TabData = {
  key: string;
  label: string;
  icon: string;
};

type SlideTabsProps = {
  onTabChange?: (tabKey: string) => void;
};

const SlideTabs = ({onTabChange}: SlideTabsProps) => {
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const tabData: TabData[] = [
    {key: "android-qq", label: "安卓QQ", icon: "🤖"},
    {key: "android-wx", label: "安卓微信", icon: "💬"},
    {key: "ios-qq", label: "苹果QQ", icon: "🍎"},
    {key: "ios-wx", label: "苹果微信", icon: "📱"},
  ];
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

  React.useEffect(() => {
    // 初始化时触发第一个tab
    if (onTabChange) {
      onTabChange(tabData[0].key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onTabChange]);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    onTabChange?.(tabData[index].key);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-center">
        <h2 className="text-lg font-semibold text-gray-700">选择游戏区域</h2>
        <p className="text-sm text-gray-500">不同区域的战力数据独立计算</p>
      </div>
      
      <ul className="relative mx-auto flex w-fit rounded-full border-2 border-black bg-white p-1 shadow-lg">
        {tabData.map((tab, idx) => (
          <Tab
            key={tab.key}
            ref={(el) => {
              tabRefs.current[idx] = el;
            }}
            active={activeIndex === idx}
            onClick={() => handleTabClick(idx)}
            icon={tab.icon}
          >
            {tab.label}
          </Tab>
        ))}
        <Cursor position={position}/>
      </ul>

      {/* 当前选中区域提示 */}
      <div className="mt-3 text-center">
        <div className="text-sm text-gray-600">
          当前区域: <span className="font-semibold text-blue-600">{tabData[activeIndex].label}</span>
        </div>
      </div>
    </div>
  );
};

const Tab = React.forwardRef<
  HTMLLIElement,
  { children: string; active: boolean; onClick: () => void; icon: string }
>(({children, active, onClick, icon}, ref) => {
  return (
    <motion.li
      ref={ref}
      onClick={onClick}
      animate={{
        color: active ? "#fff" : "#000",
        scale: active ? 1.05 : 1,
        fontWeight: active ? 600 : 400,
      }}
      transition={{type: "spring", stiffness: 300, damping: 20}}
      className="relative z-10 flex items-center gap-1 cursor-pointer px-3 py-2 text-xs md:px-4 md:py-3 md:text-sm rounded-full transition-all"
    >
      <span className="text-sm">{icon}</span>
      <span>{children}</span>
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
      transition={{type: "spring", stiffness: 300, damping: 30}}
      className="absolute z-0 h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
    />
  );
};

export default SlideTabs;

