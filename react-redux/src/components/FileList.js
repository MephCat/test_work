import {connect, useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchDir, fetchInitial} from "../redux/action";
import {Tree} from "antd";



const FileList = () => {
    const dispatch = useDispatch()
    const dirs = useSelector((state) => {
        return state.dirs.dirs
    })
    useEffect(() => {
        dispatch(fetchInitial())
    },[])
    function onLoadItem({id}){
        dispatch(fetchDir(id,dirs))
        return new Promise((resolve) => {
            const getContentById = async () => {
                resolve()
                return dirs
            }
            getContentById()
        })
    }
    return (
        <div>
            {
                dirs ? <Tree showIcon
                             loadData={onLoadItem}
                             treeData={dirs}/>: ''
            }
        </div>
    )
}
const mapStateToProps = state => {
    return {
        syncDir: state.dirs.dirs
    }
}
export default connect(mapStateToProps, null)(FileList)