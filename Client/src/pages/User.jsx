import { DeleteOutlined, EditOutlined, ReloadOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Input, message, Modal, Pagination, Select, Space, Table, Tag } from 'antd';
import { useEffect, useState, useReducer, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { confirmReset } from '../antfunc/confirm';
import { deleteUser, getUsers } from '../api/userApi';
import EditForm from '../components/EditForm';
import SignupForm from '../components/SignupForm';
import { reducerSearch } from '../utils/reducer';
const { Column } = Table;
const { Search } = Input
const { Option } = Select;



function User() {
    const { pagenumber } = useParams()
    const [list, setList] = useState([])
    const [reload, setReload] = useState(true)
    const [userpass, setUserPass] = useState({})
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchItem, dispatchSearchItem] = useReducer(reducerSearch, {
        trangthai: 'all',
        role: 'all',
        searchtext: ''
    });

    const debounced = useRef()

    const [page, setPage] = useState({
        currentPage: pagenumber,
        totalPage: null
    })

    const config = (name = '', page) => {
        return {
            title: 'Bạn có muốn xóa ' + name,
            content: (
                <>
                    <h3 style={{ textAlign: 'left' }}>Xác nhận xóa</h3>
                </>
            ),
            async onOk() {
                await deleteUser(name);
                setReload(!reload)

                message.success('Xóa thành công')
            }
        };
    }

    const renderArray = (arr, n) => {
        const i = n == 1 ? 1 : (n - 1) * 7
        return arr.map((user, index) => {
            // console.log(user);
            return {
                key: index,
                nid: index + i,
                tags: [<DeleteOutlined onClick={() => {
                    Modal.confirm(config(user.TaiKhoan, page))
                }} />
                    , <EditOutlined
                    onClick={() => {
                        setUserPass(user)
                        setModalEdit(!modalEdit)
                    }}
                />, <ReloadOutlined onClick={() => Modal.confirm(confirmReset(user.TaiKhoan))} />],
                ...user,
                VaiTro: user.VaiTro === 'admin' ? "Quản trị nhà trường" : "Người dùng",
            }
        })
    }

    useEffect(() => {
        let timerid;
        setLoading(true)
        console.log(searchItem);
        const { trangthai, role, searchtext } = searchItem;
        getUsers(page.currentPage, 6, trangthai, role, searchtext)
            .then(res => {
                // console.log(res);
                if (res) {
                    // if (page.currentPage > res.detail.total_page) {
                    //     setPage(prev => ({
                    //         ...prev,
                    //         currentPage: res.detail.total_page
                    //     }))
                    // }
                    // if (res.detail.total_page = 1) {
                    //     setPage(prev => ({
                    //         ...prev,
                    //         currentPage: 1
                    //     }))
                    // }
                    setPage(prev => ({
                        ...prev,
                        totalPage: +res.detail.total_page
                    }))
                    const datas = renderArray(res.resData, page.currentPage);
                    timerid = setTimeout(() => {
                        setLoading(false)
                        setList(datas)
                    }, 300)
                }
            })
        return () => {
            clearTimeout(timerid)
            clearTimeout(debounced.current)
        }
    }, [page.currentPage, reload, searchItem])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleChangeSelectState = (event) => {
        setPage(prev => ({
            ...prev,
            currentPage:1
        }))
        switch (event) {
            case 'all':
                console.log(event);
                dispatchSearchItem({ type: 'CHANGE_STATE', payload: event })
                return;
            case 'online':
                console.log(event);
                dispatchSearchItem({ type: 'CHANGE_STATE', payload: event })
                return;
            case 'offline':
                console.log(event);
                dispatchSearchItem({ type: 'CHANGE_STATE', payload: event })
                return;

            default:
                return;
        }
    }
    const handleSelectRole = (event) => {
        setPage(prev => ({
            ...prev,
            currentPage:1
        }))
        switch (event) {
            case 'all':
                console.log(event);
                dispatchSearchItem({ type: 'CHANGE_ROLE', payload: event })
                return;
            case 'admin':
                console.log(event);
                dispatchSearchItem({ type: 'CHANGE_ROLE', payload: event })
                return;
            case 'user':
                console.log(event);
                dispatchSearchItem({ type: 'CHANGE_ROLE', payload: event })
                return;

            default:
                return;
        }
    }
    const onChangePage = (pageselected) => {
        setPage(prev => ({
            ...prev,
            currentPage: pageselected
        }))
    };

    const handleChange = (event) => {
        clearTimeout(debounced.current)
        debounced.current = setTimeout(() => {
            setPage(prev => ({
                ...prev,
                currentPage:1
            }))
            console.log(event.target.value);
            dispatchSearchItem({ type: 'CHANGE_TEXT', payload: event.target.value.trim() })
        }, 500);
    }

    return (
        <div>
            <section className='body-header'>
                <h1 >QUẢN LÝ NGƯỜI DÙNG</h1>
                <Button type="primary" icon={<UserAddOutlined />} onClick={showModal}>
                    Thêm mới
                </Button>
            </section>
            {modalEdit && <EditForm reload={setReload} isVisible={modalEdit} page={page.currentPage} userpass={userpass} changeVisible={setModalEdit} />}
            <SignupForm isModalVisible={isModalVisible} Ok={handleOk} Cancel={handleCancel} />
            <div className='body-data'>
                <Space direction='horizontal' style={{ paddingBottom: '20px', flexWrap: 'wrap' }}>
                    <Search placeholder="Nhập tên/email" onChange={handleChange} style={{ width: 200 }} />
                    <Select
                        placeholder="Chọn trạng thái"
                        style={{
                            width: 150,
                        }}
                        defaultValue='all'
                        onChange={handleChangeSelectState}
                    >
                        <Option value="all">All</Option>
                        <Option value="online">Online</Option>
                        <Option value="offline">Offline</Option>
                    </Select>
                    <Select
                        placeholder="Chọn Vai trò"
                        style={{
                            width: 150,
                        }}
                        defaultValue="all"
                        onChange={handleSelectRole}
                    >
                        <Option value="all">All</Option>
                        <Option value="admin">Người quản trị</Option>
                        <Option value="user">Người dùng</Option>
                    </Select>
                </Space>
                <section
                    style={{
                        height: '315px',
                        overflow: 'auto'
                    }}
                >
                    <Table loading={loading} dataSource={list} size="middle" style={{ minWidth: '750px' }} pagination={false}>
                        <Column title='ID' dataIndex='nid' key='nid' />
                        <Column title='Họ và tên' dataIndex='Name' key='n' />
                        <Column title='Email/Tài Khoản' dataIndex='TaiKhoan' key='tk' />
                        <Column title='Vai Trò' dataIndex='VaiTro' key='vaitro' />
                        <Column title='Trạng Thái' dataIndex='TrangThai' key='trangthai' />
                        <Column title='Thao tác' dataIndex='tags'
                            render={(tags) => (
                                <>
                                    {tags.map((tag, index) => (
                                        <Tag style={{ transform: 'scale(1.1)' }} key={index}>
                                            {tag}
                                        </Tag>
                                    ))}
                                </>)
                            }
                        />
                    </Table>
                </section>
                <div className='pagination' >
                    <Pagination responsive={true} style={{ textAlign: 'center' }} current={page.currentPage} onChange={onChangePage} total={page.totalPage * 10} />
                    <span>{page.currentPage}/{page.totalPage} Page</span>
                </div>
            </div>
        </div>
    )
}

export default User;