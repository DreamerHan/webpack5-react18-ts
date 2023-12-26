import React, { useState, useEffect } from "react";
import "./App.less";

import aiImage from "./assets/ai.png";

console.log("aiImage>>", aiImage);

const App = () => {
  // const [tsNum, setTsNum] = useState<number>(0);
  const [tsNum, setTsNum] = useState(0);

  useEffect(() => {
    setTsNum(10);
  }, []);

  return (
    <div className="app-page">
      我是一个越来越不简单的 React 页面
      <p className="test-less">我来测试 less 的包裹写法</p>
      <div className="test-postcss">
        <div>测试postcss-left</div>

        <div>测试postcss-right</div>
      </div>
      <img src={aiImage} />
      <div className="test-img"></div>
      <div>{tsNum}</div>
    </div>
  );
};

export default App;
