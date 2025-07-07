"use client";
import {useState} from "react";
import SlideTabs from "./SlideTabs";
import SearchInput from "./SearchInput";
import HeroPowerList from "./HeroPowerList";
import {useSearchParams} from "next/navigation";

const HeroPowerPage = () => {
  const [selectedArea, setSelectedArea] = useState("android-qq");
  const [key, setKey] = useState(0); // 用于强制重新渲染
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || undefined;

  const handleTabChange = (tabKey: string) => {
    setSelectedArea(tabKey);
    setKey(prev => prev + 1); // 强制重新渲染
  };

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          王者荣耀英雄战力排行
        </h1>
        <p className="text-gray-600">选择区域查看英雄战力排行榜</p>
      </div>
      
      <SlideTabs onTabChange={handleTabChange} />
      <SearchInput />
      
      {/* 使用key强制重新渲染 */}
      <HeroPowerList 
        key={`${selectedArea}-${key}`}
        searchQuery={searchQuery}
        area={selectedArea}
      />
    </div>
  );
};

export default HeroPowerPage;