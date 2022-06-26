import { Button, Result } from 'antd';
import {useNavigate} from 'react-router-dom';

function ResultPage() {
    const navigate = useNavigate()
    return (
        <Result
        style={{
            backgroundColor:'white',
            height:'500px'
        }}
        status="success"
        title="Tạo mới người dùng thành công"
        extra={[
          <Button type="primary" key="console"
            onClick={() => navigate('/1',)}
          >
            Quay lại
          </Button>,
        ]}
      />
    )
}

export default ResultPage;