"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Grid, Layout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

import { menuItems } from "@/helpers/data/sidebar";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { SubMenuItem } from "@/model/entity/sidebar";

import Button from "@/components/core/common/DemoButton";


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const route = useRouter();
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const demoItem1 = [1, 2, 3].map((key) => ({
    key: key.toString(),
    label: `nav ${key}`,
  }));

  const createSubMenuItems = (items: SubMenuItem[], parentName: string) => {
    return items.map(({ key, label }) => ({
      key,
      label,
      onClick: () => {
        route.push(
          `/${parentName.toLowerCase()}/${label
            .replace(/\s+/g, "-")
            .toLowerCase()}`
        );
      },
    }));
  };

  const sideBarSubmenus:SubMenuItem[] = menuItems.map(({ label, icon, items }) => ({
    key: label,
    label,
    icon,
    children: createSubMenuItems(items, label),
  }));

  const [collapse, setCollapse] = useState(false);

  return (
    <Layout style={{ height: "100vh" }}>
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
            items={sideBarSubmenus}
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
