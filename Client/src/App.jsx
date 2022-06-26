import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { useEffect, useState } from 'react';
import MyMenu from './components/MyMenu';
import { Route, Routes, Router, useNavigate } from 'react-router-dom';
import User from './pages/User';
import EmptyPage from './pages/EmptyPage';
import ResultPage from './pages/ResultPage';
import HistoryAction from './components/HistoryAction';
const { Header, Content, Sider } = Layout;

function App() {
  const [collap, setCollap] = useState(false);
  
  return (
    <div>
      <Layout>
        <Header className="header">
          <MenuOutlined
            style={{ transform: 'scale(1.5)', cursor: "pointer", userSelect: 'none', padding: '10px' }}
            onClick={(() => setCollap(!collap))}
          />
          <h1>Ngân hàng câu hỏi</h1>
          <div>
            <UserOutlined style={{ transform: 'scale(1.3)' }} />
            <span>Admin</span>
          </div>
        </Header>
        <Content style={{ padding: '20px' }}>
          <Layout style={{ gap: '10px' }}>
            <Sider
              className='sidebar'
              theme='light'
              collapsed={collap}
              collapsedWidth='70'
              width={270}
              style={{ height: '500px', overflow: "auto", borderRadius: '5px' }}
            >
              <MyMenu />
            </Sider>
            <Content
              style={{
                padding: "0 10px 10px 10px",
                minHeight: 280,
                borderRadius: '5px',
                height: '550px', overflow: "auto"
              }}
            >
              <Routes>
                <Route path='/:pagenumber' element={<User />} />
                <Route path='/empty' element={<EmptyPage />} />
                <Route path='/result' element={<ResultPage/>} />
    
                <Route path='/history-actions' element={<HistoryAction/>} />
              </Routes>
            </Content>
          </Layout>
        </Content>
      </Layout>
    </div>
  )
}

export default App
