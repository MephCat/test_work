import {useEffect, useState} from "react";
import axios from "axios";
import {Tree} from "antd";
import {
    FolderOpenOutlined,
    FileZipOutlined,
    FileTextOutlined,
    FileImageOutlined
} from "@ant-design/icons";

const api = 'http://164.90.161.80:3000/api/content';


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

function FileList() {
    const [fileList, setFileList] = useState(null)
    useEffect(() => {
        const getContent = async () => {
            const res = await axios.get(api)
            res.data.children.map(item => {
                return changeIcon(item)
            })
            setFileList(res.data.children)
        }
        getContent()
    }, [])

    function onLoadItem({key}) {

        return new Promise((resolve) => {
            const getContentById = async () => {
                const res = await axios.get(api, {
                    params: {
                        dirId: key
                    }
                });
                await res.data.children.map(item => {
                    return changeIcon(item)
                })
                const children = res.data.children
                setFileList((origin) => {
                    resolve()
                    return updateTreeData(origin, key, children)
                })
            }
            getContentById()
        })
    }

    return (
        <div>
            {
                fileList ? <Tree showIcon
                                 loadData={onLoadItem}
                                 treeData={fileList}/> : ''
            }
        </div>
    )
}

export default FileList