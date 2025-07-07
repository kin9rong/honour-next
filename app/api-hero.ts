export type Hero = {
  ename: number;
  cname: string;
  title: string;
  hero_type: number;
  iconUrl: string;
};

export type HeroPower = {
  ename: number;
  cname: string;
  title: string;
  hero_type: number;
  iconUrl: string;
  power?: number;
  area?: string;
};

export type PowerQueryParams = {
  area: string;
  heroId?: number;
  heroName?: string;
};

// 区域映射
export const AREA_MAP = {
  'android-qq': '安卓QQ',
  'android-wx': '安卓微信',
  'ios-qq': '苹果QQ',
  'ios-wx': '苹果微信'
} as const;

export type AreaKey = keyof typeof AREA_MAP;

export async function fetchHeroList(): Promise<Hero[]> {
  const res = await fetch('https://api.xxoo.team/hero/getHeroList.php', {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch hero list');
  const json = await res.json();
  if (json.code !== 200) throw new Error('API error');
  return json.data;
}

export async function fetchHeroPower(params: PowerQueryParams): Promise<HeroPower[]> {
  const heroes = await fetchHeroList();
  
  // 模拟战力数据（实际项目中应该调用真实的战力API）
  const heroesWithPower = heroes.map(hero => ({
    ...hero,
    power: Math.floor(Math.random() * 50000) + 10000, // 模拟战力值 10000-60000
    area: AREA_MAP[params.area as AreaKey] || params.area
  }));
  
  // 根据战力排序
  return heroesWithPower.sort((a, b) => (b.power || 0) - (a.power || 0));
}

