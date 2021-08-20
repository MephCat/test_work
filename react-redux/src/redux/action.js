import axios from "axios";
import {apiUrl} from "../config/conf";
import {INITIAL_DIR} from "./types";
import {FileImageOutlined,
    FileTextOutlined,
    FileZipOutlined,
    FolderOpenOutlined} from "@ant-design/icons";


function changeIcon(item) {
    item.key = item.id
    const typeItem = item.title.split('.')[item.title.split('.').length - 1]
    if (item.children) {
    } else {
        item.isLeaf = true
    }
    switch (typeItem) {
        case 'zip':
            item.icon = <FileZipOutlined/>
            break
        case 'epub':
            item.icon = <FileTextOutlined/>
            break
        case 'jpg':
            item.icon = <FileImageOutlined/>
            break
        default:
            item.icon = <FolderOpenOutlined/>
            break
    }
}
function updateTreeData(list, key, children) {
    return list.map(item => {
        if (item.key === key) {
            return {...item, children}
        }
        if (item.children) {
            return {...item, children: updateTreeData(item.children, key, children)}
        }
        return item
    })
}
export function fetchInitial() {
    return async dispatch => {
        const res = await axios.get(apiUrl)
        const iniDir = res.data.children
        iniDir.map( item => changeIcon(item))
        dispatch({type: INITIAL_DIR, payload: iniDir})
    }
}

export function fetchDir(id, store){
    return async dispatch =>{
        const res = await axios.get(apiUrl, {
            params: {
                dirId: id
            }
        })
        const moreDir = res.data.children
        moreDir.map( item => changeIcon(item))
        const newDirs = updateTreeData(store, id, moreDir)
        dispatch({type: INITIAL_DIR, payload: newDirs})

    }
}