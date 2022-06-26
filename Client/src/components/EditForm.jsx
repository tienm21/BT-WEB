import { Button, message, Modal, Radio, Select, Switch } from 'antd';
import { useReducer, useState } from 'react';
import { editUser } from '../api/userApi';
import { reducerEdit, reducerValidate } from '../utils/reducer';
const { Option } = Select;

let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const inittalize = {
    email: {
        isInValid: false,
        err: ''
    },
    name: {
        isInValid: false,
        err: ''
    }
}

const inittalizeEdit = {
    nameEdit: true,
    emailEdit: true,
    matkhauEdit: true,
}


function EditForm({ isVisible, changeVisible, userpass, reload}) {
    const handleCancel = () => {
        changeVisible(prev => !prev)
    }
    const [user, setUser] = useState(userpass);
    const [validate, dispatch] = useReducer(reducerValidate, inittalize)
    const [editable, dispatchEdit] = useReducer(reducerEdit, inittalizeEdit);
    const [passed, setPassed] = useState(true);
    const [savable, setSavable] = useState(true);
    const handleChange = (event) => {
        setSavable(false)
        switch (event.target.name) {
            case 'email':
                console.log(event.target.value);

                setUser(prev => ({
                    ...prev,
                    TaiKhoan: event.target.value
                }))
                console.log(user);
                if (!pattern.test(event.target.value)) {
                    dispatch({ type: 'EMAIL_ERROR', msg: 'Email không hợp lệ' })
                    setPassed(false)
                } else {
                    dispatch({ type: 'EMAIL_SUCCESS' })
                    setPassed(true)
                }
                break;
            case 'name':
                setUser(prev => ({
                    ...prev,
                    Name: event.target.value
                }))
                if (event.target.value != '') {
                    setUser(prev => ({
                        ...prev,
                        ten: event.target.value
                    }))
                    dispatch({ type: 'NAME_SUCCESS' })
                }
                break;
            case 'pass':
                setUser(prev => ({
                    ...prev,
                    MatKhau: event.target.value
                }))
                break;
            default:
                break;
        }
    }
    const handleChangeSelect = (value) => {
        setSavable(false)
        console.log(value);
        switch (value) {
            case 'admin':
                setUser(prev => ({
                    ...prev,
                    VaiTro: 'admin'
                }))
                break;
            case 'user':
                setUser(prev => ({
                    ...prev,
                    VaiTro: 'user'
                }))
                break;
            default:
                break;
        }
    }

    const onChangeRadio = (e) => {
        console.log('radio checked', e.target.value);
        setSavable(false)
        switch (e.target.value) {
            case 1:
                setUser(prev => ({
                    ...prev,
                    GioiTinh: 'Nam'
                }))
                break;
            case 2:
                setUser(prev => ({
                    ...prev,
                    GioiTinh: 'Nữ'
                }))
                break;
            default:
                break;
        }
    };

    const handleBlur = (event) => {
        switch (event.target.name) {
            case 'name':
                if (event.target.value == '') {
                    dispatch({ type: 'NAME_ERROR', msg: 'Mời nhập tên' })
                    setPassed(false)
                } else {
                    dispatch({ type: 'NAME_SUCCESS' })
                    setPassed(true)
                }
                break;
            case 'email':
                if (event.target.value == '') {
                    dispatch({ type: 'EMAIL_ERROR', msg: 'Mời nhập email!' })
                    setPassed(false)
                } else {
                    dispatch({ type: 'EMAIL_SUCCESS' })
                    setPassed(true)
                }
                break;
            default:
                break;
        }
    }

    const onChangeSwitch = (checked) => {
        setSavable(false)
        if (checked) {
            setUser(prev => ({
                ...prev,
                TrangThai: 'online'
            }))
        } else setUser(prev => ({
            ...prev,
            TrangThai: 'offline'
        }))
    };

    const handleSubmit = async (e) => {

        if (passed && user.ten !== '' && user.taikhoan !== '') {
            console.log(user)
            console.log(userpass);
            try {
                const res = await editUser(user);
                console.log(res.isSuccess);
                if (res.isSuccess) {
                    message.success('Sửa thành thành công')
                    handleCancel()
                    // navigate('/'+page)
                    reload(prev => !prev)
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            if (user.taikhoan === '') dispatch({ type: 'EMAIL_ERROR', msg: 'Mời nhập email!' })
            if (user.ten === '') dispatch({ type: 'NAME_ERROR', msg: 'Mời nhập tên!' })
        }
    }

    const handleClickEditFeils = (e) => {
        // console.log(e.target.getAttribute('name'));
        switch (e.target.getAttribute('name')) {
            case 'edit-name':
                dispatchEdit('NAME')
                return;
            case 'edit-email':
                dispatchEdit('EMAIL')
                return;
            case 'edit-pass':
                dispatchEdit('PASS')
                return;

            default:
                break;
        }
    }

    return (
        <Modal title="Basic Modal"
            footer={[
            ]}
            style={{
                top: 50,
            }}
            visible={isVisible}
            onCancel={handleCancel}
        >
            <section className='label-input'>
                <label htmlFor="">Nhập tên:</label>
                <input name='name' onBlur={handleBlur} disabled={editable.nameEdit} onChange={handleChange} value={user.Name} />
                <p name="edit-name" onClick={handleClickEditFeils}>Edit</p>
                {validate.name.isInValid && <span>{validate.name.err}</span>}
            </section>
            <section className='label-input'>
                <label htmlFor="taikhoan">Tài khoản/Email:</label>
                <input name='email' onChange={handleChange} disabled={editable.emailEdit} onBlur={handleBlur} value={user.TaiKhoan} />
                <p name="edit-email" onClick={handleClickEditFeils}>Edit</p>
                {validate.email.isInValid && <span>{validate.email.err}</span>}
            </section>
            <section className='label-input'>
                <label htmlFor="taikhoan">Tài khoản/Email:</label>
                <input name='pass' onChange={handleChange} disabled={editable.matkhauEdit} onBlur={handleBlur} value={user.MatKhau} />
                <p name="edit-pass" onClick={handleClickEditFeils}>Edit</p>
            </section>
            <section className='form-select'>
                <label htmlFor="taikhoan">Vai Trò</label>
                <Select
                    defaultValue={user.VaiTro === "user" ? "user" : "admin"}
                    style={{
                        width: '200px'
                    }}
                    onChange={handleChangeSelect}
                >
                    <Option value="admin">Quản trị nhà trường</Option>
                    <Option value="user">Người dùng</Option>
                </Select>
            </section>
            <section className='form-select'>
                <label htmlFor="taikhoan">Giới tính</label>
                <Radio.Group style={{ width: '200px' }} defaultValue={user.GioiTinh == 'Nam' ? 1 : 2} onChange={onChangeRadio}>
                    <Radio style={{ width: '70px' }} value={1}>Nam</Radio>
                    <Radio style={{ width: '70px' }} value={2}>Nữ</Radio>
                </Radio.Group>
            </section>
            <section className='form-select'>
                <label htmlFor="taikhoan">Trạng thái</label>
                <Switch checkedChildren="Bật" unCheckedChildren="Tắt" defaultChecked={user.TrangThai === 'online'} onChange={onChangeSwitch} />
            </section>

            <section className='form-btn'>
                <label htmlFor=""></label>
                <Button size='large' onClick={handleCancel}>Hủy</Button>
                <Button size='large' disabled={savable} onClick={handleSubmit} type="primary">
                   Lưu
                </Button>
            </section>
        </Modal>
    )
}

export default EditForm;