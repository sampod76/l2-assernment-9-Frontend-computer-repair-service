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
   
    // {
    //   label: "Manage academic",
    //   key: "manage-academic",
    //   icon: <TableOutlined />,
    //   children: [
    //     {
    //       label: <Link href={`/${role}/academic/faculty`}>Faculties</Link>,
    //       key: `/${role}/academic/faculty`,
    //     },
    //     {
    //       label: <Link href={`/${role}/academic/department`}>Departments</Link>,
    //       key: `/${role}/academic/department`,
    //     },
    //     {
    //       label: <Link href={`/${role}/academic/semester`}>Semesters</Link>,
    //       key: `/${role}/academic/semester`,
    //     },
    //   ],
    // },
    
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    {
      label: <Link href={`/${role}/admin`}>Manage Admin</Link>,
      icon: <TableOutlined />,
      key: `/${role}/admin`,
    },
   
       {
      label: "Manage service",
      key: "manage-service",
      icon: <TableOutlined />,
      children: [
        {
          label: <Link href={`/${role}/service`}>Service List</Link>,
          key: `/${role}/service`,
        },
        
      ],
    },
    
  ];



  const generalUserSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/${role}/courses`}>Courses</Link>,
      icon: <TableOutlined />,
      key: `/${role}/courses`,
    },
    
  ];

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;

  else if (role === USER_ROLE.GENERAL_USER) return generalUserSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
