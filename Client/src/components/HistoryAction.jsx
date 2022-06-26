
import React, { useState } from 'react';
import { useEffect } from 'react';
import { getHistoryAction } from '../api/userApi';
import { Table, Tag, Pagination } from 'antd';

const { Column } = Table;

const HistoryAction = () => {
    const [list, setList] = useState([])
    const [page, setPage] = useState({
        currentPage: 1,
        total: 0
    });
    const [loading, setLoading] = useState(false)
    const handleChangePage = (num) => {
        setPage({
            ...page,
            currentPage: num
        })
    }
    useEffect(() => {
        const getApi = async () => {
            setLoading(true)
            const res = await getHistoryAction(page.currentPage, 7);
            //    console.log(res);
            setList(res.result.map((row, index) => {
                let color;
                switch (row.action) {
                    case 'add':
                        color = 'green'
                        break;
                    case 'delete':
                        color = 'volcano'
                        break;
                    case 'edit':
                        color = 'geekblue'
                        break;
                    default:
                        break;
                }
                return {
                    key: index,
                    ...row,
                    action: <Tag color={color}>{row.action}</Tag>,
                    hour: row.date.time,
                    day: row.date.longtime
                }
            }))
            setPage({
                ...page,
                total: res.detail.totalPage
            })
            // console.log(res);
            setTimeout(() => {
                setLoading(false)
            }, 350);
        }
        getApi()
    }, [page.currentPage])

    return (
        <div style={{ backgroundColor: 'white', width: '100%', padding: '10px', height: '500px', overflow: 'auto' }}>
            <section style={{ overflow: 'auto', height: '434px' }}>
                <Table dataSource={list} style={{ minWidth: '700px' }} loading={loading} pagination={false}>
                    <Column title='Actions' dataIndex='action' key='nid' />
                    <Column title='Tài khoản' dataIndex='TaiKhoan' key='n' />
                    <Column title='Giờ' dataIndex='hour' key='tk' />
                    <Column title='Ngày' dataIndex='day' key='vaitro' />
                </Table>
            </section>
            <div>
                <Pagination responsive={true} style={{ textAlign: 'center', paddingTop:'11px' }} current={page.currentPage} onChange={handleChangePage} size="midle" total={page.total * 10} />
            </div>
        </div>
    );
};

export default HistoryAction;