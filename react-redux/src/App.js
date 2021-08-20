import React, {Suspense} from "react";
import Header from "./components/Header/Header";
import FileList from "./components/FileList";
import {LoadingOutlined} from "@ant-design/icons";

import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
      <Header/>
        <Suspense fallback={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
            <FileList />
        </Suspense>
    </div>
  );
}

export default App;
