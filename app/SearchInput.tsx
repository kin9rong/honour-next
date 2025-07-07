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
  const handleSearch = useCallback((value: string) => {
    const debouncedFn = debounce((val: string) => {
      const params = new URLSearchParams(searchParams);
      if (val) {
        params.set("search", val);
      } else {
        params.delete("search");
      }
      router.push(`?${params.toString()}`, {scroll: false});
    }, 300);
    debouncedFn(value);
  }, [router, searchParams]);

  // 输入变化时只更新状态，不立即触发搜索
  const handleInputChange = (value: string) => {
    setSearchTerm(value);
    handleSearch(value);
  };

  // 清空搜索
  const handleClear = () => {
    setSearchTerm("");
    handleSearch("");
  };

  return (
    <div className="mt-6 w-full max-w-md mx-auto px-4">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="搜索英雄名称或称号..."
          className="w-full px-4 py-3 pr-10 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;