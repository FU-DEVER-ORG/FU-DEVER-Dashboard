import { SideBarItems } from "@/model/entity/sidebar";
import {
  NotificationOutlined,
  UserOutlined,
  LaptopOutlined,
} from "@ant-design/icons";

export const menuItems: SideBarItems[] = [
  {
    label: "Notifications",
    icon: <NotificationOutlined />,
    items: [
      { key: "ViewNotifications", label: "View Notifications" },
      { key: "CreateNotifications", label: "Create Notifications" },
    ],
  },
  {
    label: "Members",
    icon: <UserOutlined />,
    items: [
      { key: "MemberList", label: "Member List" },
      { key: "Profile", label: "Profile" },
      { key: "Settings", label: "Settings" },
    ],
  },
  {
    label: "Blogs",
    icon: <LaptopOutlined />,
    items: [
      { key: "BlogList", label: "Blog List" },
      { key: "CreateBlog", label: "Create Blog" },
      { key: "YourBlog", label: "Your Blog" },
    ],
  },
];
