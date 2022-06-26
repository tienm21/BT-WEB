import queryString from 'query-string';
import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:5055/api',
    headers: {
        'Content-Type': 'application/json'
    },
})

export async function getUsers(page = 1, limit = 5, trangthai = 'all', role, searchtext = 'all') {
    try {
        const res = await axiosClient.get('/get-users', {
            params: {
                page,
                limit,
                trangthai,
                role,
                searchtext
            }
        })
        return res.data
    } catch (error) {
        // console.log(error);
        return null
    }
}

export async function deleteUser(name = '') {
    try {
        const res = await axiosClient.delete('/deleteuser', {
            data: {
                taikhoan: name
            }
        })
        return res.data
    } catch (error) {
        console.log(error);
        return null
    }
}

export async function addUser({
    ten,
    taikhoan,
    trangthai,
    gioitinh,
    vaitro
}) {
    console.log(ten);
    try {
        const res = await axiosClient.post('/adduser',
            {
                ten: ten,
                taikhoan: taikhoan,
                trangthai: trangthai,
                gioitinh: gioitinh,
                vaitro: vaitro
            }
        )
        return res
    } catch (error) {
        console.log(error);
    }
}

export async function resetPass(taikhoan) {
    try {
        const res = await axiosClient.put('/resetpass', {
            taikhoan
        })
        return res.data
    } catch (error) {

    }
}

export async function editUser(user) {
    try {
        const res = await axiosClient.put('/edit-user', {
            user
        })

        return res.data;
    } catch (error) {

    }
}

export async function getHistoryAction(page = 1, limit = 5) {
    try {
        const res = await axiosClient.get('/history-actions', {
            params: {
                page,
                limit
            }
        })

        return res.data;
    } catch (error) {

    }
}