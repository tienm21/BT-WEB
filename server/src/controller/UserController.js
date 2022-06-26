const pool = require('../config/db');


class UserController {
    async getUser(req, res) {
        // console.log(req.query);
        let { page, limit , trangthai, role, searchtext} = req.query;
        try {
            // let arr = rows;
            if (!page || !limit) {

                const [rows] = await pool.execute('SELECT * FROM NguoiDung');
                return res.json({
                    isSucess: true,
                    totalUser: rows.length,
                    data: rows
                })
            } else {
                trangthai = trangthai == 'all' || trangthai == undefined ? null : trangthai;
                role = role  == 'all' || role  == undefined ? null : role;
            
                searchtext = searchtext == '' || searchtext == undefined  ? null : searchtext;

                // console.log(searchtext);
                // console.log(role);
                // console.log(trangthai);
                const [rows] = await pool.execute('CALL search(?,?,?,?,?)', [page, limit, trangthai, role, searchtext]);
                const [totals] = await pool.execute('CALL CountSearch(?,?,?,?,?)',[page, limit, trangthai, role, searchtext]);
                const [totalsUser] =  totals;
                console.log(totalsUser[0]);
                return res.json({
                    isSucess: true,
                    resData:rows[0],
                    detail: totalsUser[0]
                })
            }
        } catch (error) {
            console.log(error);

            return res.json({
                isSuccess: false,
                errMsg: "Error connect database"
            })
        }
    }

    addUser = async (req, res) => {

        const { ten, taikhoan, vaitro = '', trangthai, gioitinh } = req.body;
        // console.log(req.body);

        if (ten && taikhoan && trangthai && gioitinh) {
            try {
                const [rows] = await pool.execute("CALL CheckName(?)", [taikhoan]);

                if (rows[0][0].result == 0) {
                    const [result] = await pool.execute('CALL AddUser(?, ?, ?, ?, ?)', [ten, taikhoan, trangthai, gioitinh, vaitro]);
                    await pool.execute('INSERT INTO updatehistory(action, TaiKhoan) VALUES (?, ?)', ['add', taikhoan])
                    return res.json({
                        isSuccess: true,
                    })
                } else {
                    return res.json({
                        isSuccess: false,
                        Msg: 'Tài Khoản Đã tồn tại!'
                    })
                }

            } catch (error) {
                console.log(error);

                return res.json({
                    isSuccess: false,
                    errMsg: "Error connect database"
                })
            }
        }
        else {
            return res.json({
                isSuccess: false,
                errMsg: "Missing data from body"
            })
        }
    }

    async deleteUser(req, res) {
        const { taikhoan } = req.body
        // console.log(req.body);
        try {
            const [result] = await pool.execute('DELETE FROM NguoiDung WHERE TaiKhoan=?', [taikhoan]);
            if (result.affectedRows > 0) {
                await pool.execute('INSERT INTO updatehistory(action, TaiKhoan) VALUES (?, ?)', ['delete', taikhoan])
                return res.json({
                    isSuccess: true,
                    deleted: taikhoan,
                    result
                })
            }

            return res.json({
                isSuccess: false,
                Msg: "Invalid Tai Khoan"
            })

        } catch (error) {
            console.log(error);

            return res.json({
                isSuccess: false,
                errMsg: "Error connect database"
            })
        }

    }

    async resetPass(req, res) {
        // console.log(req.body);
        const { taikhoan } = req.body
        try {
            const [result] = await pool.execute('UPDATE NguoiDung set MatKhau="123456" WHERE TaiKhoan=?', [taikhoan]);
            res.json({
                isSucess: true,
                result
            })
        } catch (error) {
            console.log(error);

            return res.json({
                isSuccess: false,
                errMsg: "Error connect database"
            })
        }
    }
    //INSERT INTO `updatehistory`(`id`, `TaiKhoan`) VALUES ('[value-1]','[value-2]')
    historyActions = async (req, res) => {
        try {
            const { page, limit } = req.query;
            if (page && limit) {
                const [rows] = await pool.execute('CALL GetAllHistoryActions(?, ?)', [page, limit]);

                const result = rows[0].map(row => {
                    return {
                        ...row,
                        date: convertDate(row.date)
                    }
                })
                // console.log(result[0].date);
                res.json({
                    isSucess: true,
                    detail: rows[1][0],
                    result,
                })
            }
        } catch (error) {
            console.log(error);

            return res.json({
                isSuccess: false,
                errMsg: "Error connect database"
            })
        }
    }

    editUser = async (req, res) => {
        try {
            const { user } = req.body;
            const { id, TaiKhoan, Name, MatKhau, VaiTro, TrangThai, GioiTinh } = user;
            // console.log(user);

            const [check] = await pool.execute("CALL CheckName(?)", [TaiKhoan]);
            console.log(check[0][0].result);
            const [rows] = await pool.execute('call updateUser(?, ?, ?, ?, ?, ?, ?)', [id, TaiKhoan, Name, MatKhau, VaiTro, TrangThai, GioiTinh]);
            await pool.execute('INSERT INTO updatehistory(action, TaiKhoan) VALUES (?, ?)', ['edit', TaiKhoan])
            res.json({
                isSuccess: true,
                result: rows
            })
        } catch (error) {
            console.log(error);

            return res.json({
                isSuccess: false,
                errMsg: "Error execute database"
            })
        }


    }

    async test(req, res) {

        try {

            const [rows] = await pool.execute("CALL gettest(?,?)", ['r', 'admin']);

            // console.log(result[0].date);
            console.log(rows);
            res.json({
                isSucess: true,
                resData: rows
            })


        } catch (error) {
            console.log(error);

            return res.json({
                isSuccess: false,
                errMsg: "Error execute database"
            })
        }

    }
}

function convertDate(date) {
    let d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1
    const day = d.getDate()

    const longtime = `${day}-${month}-${year}`
    const time = `${d.getHours()}:${d.getMinutes()}`
    return {
        longtime,
        time
    }
}

module.exports = new UserController;