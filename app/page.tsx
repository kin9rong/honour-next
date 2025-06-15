import Image from "next/image";
import {fetchHeroList, Hero} from "./api-hero";
import SlideTabs from "./SlideTabs";
import SearchInput from "./SearchInput";

// 服务端 HeroList 组件
const HeroList = async ({searchQuery}: { searchQuery?: string }) => {
  let heroes: Hero[] = [];
  try {
    heroes = await fetchHeroList();
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
    console.error("获取英雄列表失败:", e);
    return <div className="text-red-500">获取英雄列表失败</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      {heroes.length > 0 ? (
        heroes.map((hero) => (
          <div
            key={hero.ename}
            className="flex flex-col items-center p-4 border rounded-lg bg-white shadow"
          >
            <Image
              src={hero.iconUrl}
              alt={hero.cname}
              width={80}
              height={80}
              className="object-cover rounded-full mb-2"
            />
            <div className="font-bold text-base text-[#333]">{hero.cname}</div>
            <div className="text-xs text-[#666]">{hero.title}</div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500">
          没有找到匹配的英雄
        </div>
      )}
    </div>
  );
};

// 服务端 SlideTabsExample 组件
const SlideTabsExample = async ({
                                  searchParams,
                                }: {
  searchParams: Promise<{ search?: string }>;
}) => {
  // 等待 searchParams 解析
  const resolvedSearchParams = await searchParams;

  return (
    <div className="py-8">
      <SlideTabs/>
      {/* 客户端搜索输入 */}
      <SearchInput/>
      {/* 服务端英雄列表 */}
      <HeroList searchQuery={resolvedSearchParams?.search}/>
    </div>
  );
};

// 强制动态渲染
export const dynamic = "force-dynamic";

// 确保默认导出
export default SlideTabsExample;