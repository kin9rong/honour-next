"use client";

import {useRouter, useSearchParams} from "next/navigation";
import {useCallback, useEffect, useState} from "react";

// 防抖函数
const debounce = (func: (value: string) => void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (value: string) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(value), wait);
  };
};

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

  // 同步 URL 变化到搜索框
  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
  }, [searchParams]);

  // 防抖的搜索处理函数
  const handleSearch = useCallback(
    debounce((value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }
      router.push(`?${params.toString()}`, {scroll: false});
    }, 300), // 300ms 防抖延迟
    [router, searchParams]
  );

  // 输入变化时只更新状态，不立即触发搜索
  const handleInputChange = (value: string) => {
    setSearchTerm(value);
    handleSearch(value);
  };

  return (
    <div className="mt-4 w-full max-w-md mx-auto px-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="搜索英雄..."
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchInput;