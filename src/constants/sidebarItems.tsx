import type { MenuProps } from "antd";
import {
  ProfileOutlined,
  TableOutlined,
  AppstoreOutlined,
  ScheduleOutlined,
  ThunderboltOutlined,
  CreditCardOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "./role";
export const sidebarItems = (role: string) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/${role}/overview`}>Overview</Link>,
      icon: <TableOutlined />,
      key: `/${role}/overview`,
    },
    {
      label: "Profile",
      key: "profile",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/${role}`}>Account Profile</Link>,
          key: `/${role}/profile`,
        },
       
      ],
    },
  ];

  const commonAdminSidebarItems: MenuProps["items"] = [
   
    {
      label: <Link href={`/${role}/manage-user`}>Manage User</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-user`,
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    {
      label: "Manage service",
      key: "manage-service",
      icon: <TableOutlined />,
      children: [
        {
          label: <Link href={`/${role}/service`}>Service List</Link>,
          key: `/${role}/service`,
        },
        {
          label: <Link href={`/${role}/service/create`}>Create Service </Link>,
          key: `/${role}/service/create`,
        },
        
      ],
    },
    {
      label: "Manage category",
      key: "manage-category",
      icon: <TableOutlined />,
      children: [
        {
          label: <Link href={`/${role}/category/create`}>Create Category</Link>,
          key: `/${role}/category/create`,
        },
        {
          label: <Link href={`/${role}/category`}>Category List</Link>,
          key: `/${role}/category`,
        },
        
      ],
    },
    {
      label: "Manage booking",
      key: "manage-booking",
      icon: <TableOutlined />,
      children: [
        {
          label: <Link href={`/${role}/booking`}>Booking List</Link>,
          key: `/${role}/booking`,
        },
        
      ],
    },
    {
      label: "Manage Content",
      key: "manage-content",
      icon: <TableOutlined />,
      children: [
        {
          label: <Link href={`/${role}/blog`}>Blog List</Link>,
          key: `/${role}/blog`,
        },
        {
          label: <Link href={`/${role}/faq`}>Faq List</Link>,
          key: `/${role}/faq`,
        },
        
      ],
    },
  
   
   
    
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...adminSidebarItems,
    {
      label: <Link href={`/${role}/admin`}>Manage Admin</Link>,
      icon: <TableOutlined />,
      key: `/${role}/admin`,
    },
      
    
  ];

  const generalUserSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/${role}/Service`}>Service History</Link>,
      icon: <TableOutlined />,
      key: `/${role}/Service`,
    },   
    {
      label: <Link href={`/${role}/review`}>Review History</Link>,
      icon: <TableOutlined />,
      key: `/${role}/review`,
    },   
    {
      label: <Link href={`/${role}/feedback`}>Feedback History</Link>,
      icon: <TableOutlined />,
      key: `/${role}/feedback`,
    },   
    {
      label: <Link href={`/${role}/support`}>Support and Help</Link>,
      icon: <TableOutlined />,
      key: `/${role}/support`,
    },   
  ];

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else if (role === USER_ROLE.GENERAL_USER) return generalUserSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
