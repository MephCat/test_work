import React, {Suspense} from "react";
import 'antd/dist/antd.css';

import Header from './Component/Header/Header';
import {LoadingOutlined} from "@ant-design/icons";
const FileList = React.lazy(() => import('./Component/FileList'))

function App() {

    return (
        <div className="App">
            <Header/>
            <Suspense fallback={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
                <FileList/>
            </Suspense>
        </div>
    );
}

export default App;
