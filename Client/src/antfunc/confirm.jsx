import {resetPass} from '../api/userApi';
import {message} from 'antd';

export const confirmReset = (name) => {
    return {
        title: 'Bạn có khôi phục mật khẩu ' + name,
        content: (
            <>
                <h3 style={{ textAlign: 'left' }}>Xác nhận khôi phục</h3>
            </>
        ),
        async onOk() {
            const res = await resetPass(name)
            console.log(res);
            if(res.isSucess)
            message.success('Khôi phục thành thành công')
        }
    }
}

