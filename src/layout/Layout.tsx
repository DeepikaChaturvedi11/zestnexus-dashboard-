import React from "react";
import { Layout, Menu, Avatar, Dropdown, Button, Space } from "antd";
import {
  DashboardOutlined,
  ProjectOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAtom, useSetAtom } from "jotai";
import { currentUserAtom, isAuthenticatedAtom } from "../store";
import type { MenuProps } from "antd";
import ThemeToggle from "../components/theme/ThemeToggle";
import { useTheme } from "../context/ThemeContext";

const { Header, Sider, Content } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUser] = useAtom(currentUserAtom);
  const setCurrentUser = useSetAtom(currentUserAtom);
  const setIsAuthenticated = useSetAtom(isAuthenticatedAtom);
  const [collapsed, setCollapsed] = React.useState(window.innerWidth < 768);
  const { theme } = useTheme();

 React.useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  };

  handleResize(); 

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

  const menuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
      key: "/kanban",
      icon: <ProjectOutlined />,
      label: <Link to="/kanban">Kanban Board</Link>,
    },
  ];

  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
          collapsedWidth="0"  
        className="shadow-lg bg-white dark:bg-gray-800"
        theme={theme === "dark" ? "dark" : "light"}
      >
        <div className="p-4 text-center border-b border-gray-200 dark:border-gray-700">
          {" "}
        <Link to="/dashboard">
  <h1
    className={`text-blue-600 font-extrabold transition-all leading-tight cursor-pointer ${
      collapsed ? "text-lg" : "text-2xl"
    }`}
  >
    {collapsed ? "ZN" : "ZestNexus"}
  </h1>
</Link>

          {!collapsed && (
            <p className="text-sm text-gray-500 mt-1 tracking-wide">
              Project Manager
            </p>
          )}
        </div>

        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          className="border-none mt-4"
          theme={theme === "dark" ? "dark" : "light"}
        />
      </Sider>

      <Layout>
        <Header className="bg-white dark:bg-gray-800 shadow-sm px-4 flex items-center justify-between">
          {" "}
          {/* Dark header */}{" "}
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="text-lg"
          />
         
          <Space>
            <ThemeToggle />
            <span className="text-gray-600 dark:text-gray-300">
              Welcome back, {currentUser?.name}
            </span>
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              trigger={["click"]}
            >
              <Avatar
                icon={<UserOutlined />}
                className="cursor-pointer bg-blue-500"
              />
            </Dropdown>
          </Space>
        </Header>

        <Content className="bg-gray-50 dark:bg-gray-700">
          {" "}
          {/* Dark content */}
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
