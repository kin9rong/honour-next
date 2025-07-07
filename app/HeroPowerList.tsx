import Image from "next/image";
import {fetchHeroPower, HeroPower} from "./api-hero";

type HeroPowerListProps = {
  searchQuery?: string;
  area?: string;
};

const HeroPowerList = async ({
  searchQuery,
  area = "android-qq",
}: HeroPowerListProps) => {
  let heroes: HeroPower[] = [];
  try {
    heroes = await fetchHeroPower({area});
    // 根据搜索查询过滤英雄
    if (searchQuery) {
      const normalizedQuery = searchQuery.toLowerCase().trim();
      heroes = heroes.filter(
        (hero) =>
          hero.cname.toLowerCase().includes(normalizedQuery) ||
          hero.title.toLowerCase().includes(normalizedQuery)
      );
    }
  } catch (e) {
    console.error("获取英雄战力失败:", e);
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <svg className="w-16 h-16 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.19 2.5 1.732 2.5z" />
        </svg>
        <div className="text-red-500 font-semibold">获取英雄战力失败</div>
        <div className="text-gray-500 text-sm mt-2">请检查网络连接或稍后重试</div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="mb-6 text-center">
        <div className="text-sm text-gray-600">
          显示 <span className="font-semibold text-blue-600">{heroes.length}</span> 个英雄的战力排行
        </div>
        {searchQuery && (
          <div className="text-xs text-gray-500 mt-1">
            搜索结果: &ldquo;{searchQuery}&rdquo;
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {heroes.length > 0 ? (
          heroes.map((hero, index) => (
            <div
              key={hero.ename}
              className="flex items-center p-4 border rounded-lg bg-white shadow hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <div className="flex-shrink-0 mr-4">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  #{index + 1}
                </div>
                <div className="relative">
                  <Image
                    src={hero.iconUrl}
                    alt={hero.cname}
                    width={60}
                    height={60}
                    className="object-cover rounded-full ring-2 ring-blue-100"
                  />
                  {/* 排名徽章 */}
                  {index < 3 && (
                    <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-gray-400' : 
                      'bg-orange-500'
                    }`}>
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-lg text-[#333] mb-1 truncate">
                  {hero.cname}
                </div>
                <div className="text-sm text-[#666] mb-2 truncate">{hero.title}</div>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold text-red-600">
                    {hero.power?.toLocaleString()} 
                    <span className="text-xs text-gray-500 ml-1">战力</span>
                  </div>
                  <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {hero.area}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <div className="text-gray-500 font-semibold">
              {searchQuery ? `没有找到匹配&ldquo;${searchQuery}&rdquo;的英雄` : "没有找到英雄数据"}
            </div>
            <div className="text-gray-400 text-sm mt-2">
              {searchQuery ? "请尝试其他关键词" : "请稍后重试"}
            </div>
          </div>
        )}
      </div>

      {/* 战力说明 */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <div className="text-sm text-blue-800">
          <div className="font-semibold mb-2">💡 战力说明</div>
          <ul className="space-y-1 text-xs">
            <li>• 战力数据每日更新，反映英雄在该区域的实力排行</li>
            <li>• 不同区域的战力数据可能存在差异</li>
            <li>• 前三名将获得特殊排名徽章标识</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeroPowerList;