import {Suspense} from "react";
import HeroPowerPage from "./HeroPowerPage";

// 加载组件
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

const Page = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HeroPowerPage />
    </Suspense>
  );
};

// 强制动态渲染
export const dynamic = "force-dynamic";

export default Page;