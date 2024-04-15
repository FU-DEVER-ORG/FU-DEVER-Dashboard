"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/core/common/DemoButton";
import { Grid, Layout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

import {
  LaptopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const route = useRouter();
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const demoItem1 = [1, 2, 3].map((key) => ({
    key,
    label: `nav ${key}`,
  }));

  const menuItems: { NavBarItems: NavBarItems } = {
    NavBarItems: {
      Notifications: {
        label: "Notifications",
        icon: <NotificationOutlined />,
        items: {
          ViewNotifications: "View Notifications",
          CreateNotifications: "Create Notifications",
        },
      },
      Members: {
        label: "Members",
        icon: <UserOutlined />,
        items: {
          MemberList: "Member List",
          Profile: "Profile",
          Settings: "Settings",
        },
      },
      Blogs: {
        label: "Blogs",
        icon: <LaptopOutlined />,
        items: {
          BlogList: "Blog List",
          CreateBlog: "Create Blog",
          YourBlog: "Your Blog",
        },
      },
    },
  };

  const createSubMenuItems = (
    items: {
      [key: string]: string;
    },
    parentName: string
  ): SubMenuItem[] => {
    const router = useRouter();
    return Object.keys(items).map((key) => ({
      key,
      label: items[key],
      onClick: () => {
        router.push(`/${parentName.toLowerCase()}/${key.toLowerCase()}`);
      },
    }));
  };

  const navBarSubmenus: MenuItem[] = Object.keys(menuItems.NavBarItems).map(
    (key) => ({
      key,
      label: `${key}`,
      icon: menuItems.NavBarItems[key].icon,
      children: createSubMenuItems(menuItems.NavBarItems[key].items, key),
    })
  );

  const sideBarItems: MenuItem[] = [...navBarSubmenus];

  const [collapse, setCollapse] = useState<boolean>(false);
  //implement dashboard here
  //todo customize in need
  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0px 10px",
          position: "sticky",
          top: 0,
          zIndex: 1,
        }}
      >
        <Button
          type="text"
          icon={
            collapse ? (
              <MenuUnfoldOutlined
                style={{
                  fontSize: "24px",
                  color: "white",
                }}
              />
            ) : (
              <MenuFoldOutlined
                style={{
                  fontSize: "24px",
                  color: "white",
                }}
              />
            )
          }
          onClick={() => setCollapse(!collapse)}
          style={{
            width: 64,
            height: 64,
          }}
        >
          {""}
        </Button>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={demoItem1}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Layout>
        <Sider
          trigger={null}
          width={200}
          style={{
            background: "#fff",
          }}
          breakpoint="sm"
          collapsed={collapse}
          collapsedWidth={screens?.sm == true ? 80 : 0}
          onCollapse={() => setCollapse(!collapse)}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["Notifications"]}
            items={sideBarItems}
          />
        </Sider>
        <Layout
          style={{
            padding: "16px 16px",
          }}
        >
          <Content
            style={{
              padding: 16,
              margin: 0,
              minHeight: 280,
              background: "#fff",
              borderRadius: "12px",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
