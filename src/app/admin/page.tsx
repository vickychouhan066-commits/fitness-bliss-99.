"use client";

import { Table, Card, Row, Col, Statistic, Tag, Button, Layout, Menu } from "antd";
import { UserOutlined, FileTextOutlined, CreditCardOutlined, LineChartOutlined, LogoutOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Header, Sider, Content } = Layout;

export default function AdminDashboard() {
  const [collapsed, setCollapsed] = useState(false);

  const leads = [
    { key: '1', name: 'Rahul Sharma', phone: '+91 9876543210', goal: 'Weight Loss', date: '2026-04-30', status: 'New' },
    { key: '2', name: 'Ananya Iyer', phone: '+91 9988776655', goal: 'Muscle Gain', date: '2026-04-29', status: 'Contacted' },
    { key: '3', name: 'Vikram Singh', phone: '+91 8877665544', goal: 'General Fitness', date: '2026-04-28', status: 'Converted' },
  ];

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Fitness Goal', dataIndex: 'goal', key: 'goal' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'New' ? 'green' : status === 'Converted' ? 'gold' : 'blue'}>
          {status.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: () => <Button type="link">View Details</Button>,
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} className="bg-black">
        <div className="h-16 m-4 flex items-center justify-center">
          <span className={`text-white font-bold text-xl ${collapsed ? 'hidden' : 'block'}`}>FITNESS<span className="text-primary">BLISS</span></span>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={[
            { key: '1', icon: <LineChartOutlined />, label: 'Dashboard' },
            { key: '2', icon: <FileTextOutlined />, label: 'Leads' },
            { key: '3', icon: <UserOutlined />, label: 'Members' },
            { key: '4', icon: <CreditCardOutlined />, label: 'Payments' },
            { key: '5', icon: <LogoutOutlined />, label: 'Logout' },
          ]}
        />
      </Sider>
      <Layout>
        <Header className="bg-white p-0 px-8 flex items-center justify-between shadow-sm">
          <h2 className="text-xl font-bold">Admin Panel Overview</h2>
          <Button type="primary">Download Report</Button>
        </Header>
        <Content className="m-6">
          <Row gutter={24} className="mb-6">
            <Col span={6}>
              <Card bordered={false} className="shadow-sm">
                <Statistic title="Total Leads" value={128} prefix={<FileTextOutlined />} valueStyle={{ color: '#3f8600' }} />
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={false} className="shadow-sm">
                <Statistic title="Active Members" value={452} prefix={<UserOutlined />} />
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={false} className="shadow-sm">
                <Statistic title="Revenue (MTD)" value={845000} prefix="₹" />
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={false} className="shadow-sm">
                <Statistic title="Conversion Rate" value={15.4} suffix="%" precision={1} />
              </Card>
            </Col>
          </Row>

          <Card title="Recent Leads" bordered={false} className="shadow-sm">
            <Table dataSource={leads} columns={columns} pagination={false} />
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
}
