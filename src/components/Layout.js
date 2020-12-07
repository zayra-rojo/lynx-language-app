import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';

import { Layout, Menu } from 'antd';
import CreatePage from './CreatePage';
import DeckPage from './DeckPage';
import PracticePage from './PracticePage';
import Dashboard from './Dashboard';
import SettingsPage from './SettingsPage';
import './layout.css';
const { Header, Footer, Sider, Content } = Layout;
const { Item } = Menu;

function LayoutPage() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider>
          <Menu
            theme='dark'
            defaultSelectedKeys={['item1']}
            mode='inline'
            style={{}}
          >
            <Item key='item1' className='customclass'>
              <NavLink to='/'>
                <span>Dashboard</span>
              </NavLink>
            </Item>
            <Item key='item2' className='customclass'>
              <NavLink className='customclass' to='/create'>
                <span>Create</span>
              </NavLink>
            </Item>
            <Item key='3' className='customclass'>
              <NavLink to='/deck'>
                <span>Deck</span>
              </NavLink>
            </Item>
            <Item key='4' className='customclass'>
              <NavLink to='/practice'>
                <span>Practice</span>
              </NavLink>
            </Item>
            <Item key='5' className='customclass'>
              <NavLink to='/settings'>
                <span>Settings</span>
              </NavLink>
            </Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: '#EBF1FC' }} />
          <Content
            style={{
              padding: 24,
              background: '#EBF1FC',
              minHeight: 280,
            }}
          >
            <div style={{ padding: 24, background: '#EBF1FC', minHeight: 360 }}>
              <Switch>
                <Route exact path='/'>
                  <Dashboard />
                </Route>
                <Route path='/create'>
                  <CreatePage />
                </Route>
                <Route path='/deck'>
                  <DeckPage />
                </Route>
                <Route path='/practice'>
                  <PracticePage />
                </Route>
                <Route path='/settings'>
                  <SettingsPage />
                </Route>
              </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}
export default LayoutPage;
