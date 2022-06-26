import { Button, Modal, Radio, Select, Switch } from "antd";
import { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../api/userApi';
import { reducerValidate } from '../utils/reducer';
const { Option } = Select;

// regex email
let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

// khai bao validate
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

// khai bao người dùng
const inittalizeUser = {
    ten: '',
    taikhoan: '',
    trangthai: 'online',
    vaitro: 'user',
    gioitinh: 'Nam'
}

//reducer validate


function SignupForm({
    isModalVisible,
    Ok = () => {

    },
    Cancel = () => { }
}) {
    const navigate = useNavigate()
    const [validate, dispatch] = useReducer(reducerValidate, inittalize)
    const [user, setUser] = useState(inittalizeUser);
    const [passed, setPassed] = useState(false);

    // bắt sự kiện input
    const handleChange = (event) => {
        switch (event.target.name) {
            case 'email':
                console.log(pattern.test(event.target.value));
                if (!pattern.test(event.target.value)) {
                    dispatch({type:'EMAIL_ERROR', msg: 'Email không hợp lệ' })
                    setPassed(false)
                } else {
                    dispatch({type:'EMAIL_SUCCESS' })
                    setUser(prev => ({
                        ...prev,
                        taikhoan: event.target.value
                    }))
                    setPassed(true)
                }
                break;
            case 'name':
                if (event.target.value != '') {
                    setUser(prev => ({
                        ...prev,
                        ten: event.target.value
                    }))
                    dispatch({type:'NAME_SUCCESS'})
                }
                break;
            default:
                break;
        }
    }
    const handleChangeSelect = (value) => {
        console.log(`selected ${value}`);
        switch (value) {
            case 'admin':
                setUser(prev => ({
                    ...prev,
                    vaitro: 'admin'
                }))
                break;
            case 'user':
                setUser(prev => ({
                    ...prev,
                    vaitro: 'user'
                }))
                break;
            default:
                break;
        }
    }

    const onChangeRadio = (e) => {
        console.log('radio checked', e.target.value);
        switch (e.target.value) {
            case 1:
                setUser(prev => ({
                    ...prev,
                    gioitinh: 'Nam'
                }))
                break;
            case 2:
                setUser(prev => ({
                    ...prev,
                    gioitinh: 'Nữ'
                }))
                break;
            default:
                break;
        }
    };

    // Bắt sự kiện blur khỏi input
    const handleBlur = (event) => {
        switch (event.target.name) {
            case 'name':
                if (event.target.value == '') {
                    dispatch({type:'NAME_ERROR', msg:'Mời nhập tên'})
                    setPassed(false)
                    console.log(validate);
                } else {
                    dispatch({type:'NAME_SUCCESS'})
                    setPassed(true)
                }
                break;
            case 'email':
                if (event.target.value == '') {
                    dispatch({type:'EMAIL_ERROR', msg: 'Mời nhập email!'})
                    setPassed(false)
                    console.log(validate);
                } else {
                    dispatch({type:'EMAIL_SUCCESS'})
                    setPassed(true)
                }
                break;
            default:
                break;
        }
    }

    const onChangeSwitch = (checked) => {
        console.log(`switch to ${checked}`);
        if (checked) {
            setUser(prev => ({
                ...prev,
                trangthai: 'online'
            }))
        } else setUser(prev => ({
            ...prev,
            trangthai: 'offline'
        }))
    };

    // Sử lí gửi dữ liệu
    const handleSubmit = async (e) => {

        if (passed && user.ten !== '' && user.taikhoan !== '') {
            console.log(user)
            try {
                const res = await addUser(user);
                console.log(res.data);
                if (res.data.isSuccess) {
                    navigate('/result')
                }
                else {
                    dispatch({type:'EMAIL_ERROR', msg:'Email đã tồn tại'})
                }
            } catch (error) {

            }
        } else {
            console.log(validate);
            console.log(user);
            if(user.taikhoan === '') dispatch({type:'EMAIL_ERROR', msg: 'Mời nhập email!'})
            if(user.ten === '')  dispatch({type:'NAME_ERROR', msg: 'Mời nhập tên!'})
        }
    }


    return (
        <Modal
            title="Thêm mới người dùng"
            visible={isModalVisible}
            onCancel={Cancel}
            style={{
                top: 50,
            }}
            footer={[
            ]}

        >
            <section className='label-input'>
                <label htmlFor="">Nhập tên:</label>
                <input name='name' onBlur={handleBlur} onChange={handleChange} />
                {validate.name.isInValid && <span>{validate.name.err}</span>}
            </section>
            <section className='label-input'>
                <label htmlFor="taikhoan">Tài khoản/Email:</label>
                <input name='email' onChange={handleChange} onBlur={handleBlur} />
                {validate.email.isInValid && <span>{validate.email.err}</span>}
            </section>
            <section className='form-select'>
                <label htmlFor="taikhoan">Vai Trò</label>
                <Select
                    defaultValue="user"
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
                <Radio.Group style={{ width: '200px' }} defaultValue={1} onChange={onChangeRadio}>
                    <Radio style={{ width: '70px' }} value={1}>Nam</Radio>
                    <Radio style={{ width: '70px' }} value={2}>Nữ</Radio>
                </Radio.Group>
            </section>
            <section className='form-select'>
                <label htmlFor="taikhoan">Trạng thái</label>
                <Switch checkedChildren="Bật" unCheckedChildren="Tắt" defaultChecked onChange={onChangeSwitch} />
            </section>

            <section className='form-btn'>
                <label htmlFor=""></label>
                <Button size='large' onClick={Cancel}>Hủy</Button>
                <Button size='large' onClick={handleSubmit} type="primary">Lưu</Button>
            </section>
        </Modal>
    )
}

export default SignupForm;