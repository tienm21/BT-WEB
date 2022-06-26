import { Empty } from 'antd';
function EmptyPage() {
   
    return (
        <div style={{
            paddingTop: '100px',
            height:'490px',
            backgroundColor:'white'
        }}
        >
            <Empty
                image={Empty.PRESENTED_IMAGE_DEFAULT}
                description={
                    <h1
                        style={{ color: '#b8bebc' }}>
                        Trang trống
                    </h1>
                }
            />
        </div>
    )
}

export default EmptyPage;