export type Hero = {
  ename: number;
  cname: string;
  title: string;
  hero_type: number;
  iconUrl: string;
};

export async function fetchHeroList(): Promise<Hero[]> {
  const res = await fetch('https://api.xxoo.team/hero/getHeroList.php', {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch hero list');
  const json = await res.json();
  if (json.code !== 200) throw new Error('API error');
  return json.data;
}

