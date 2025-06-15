import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // output: 'export', // 启用静态导出
  distDir: 'dist',  // 将输出目录改为 dist
  trailingSlash: true, // 为静态导出添加尾部斜杠
  images: {
    unoptimized: true, // 静态导出需要禁用图片优化
  },
};

export default nextConfig;
