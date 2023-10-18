"use client";
import Footer from "@/components/Home/Footer";
import HomeHeader from "@/components/Home/HomeHeader";
import Contents from "@/components/ui/Contents";

import SideBar from "@/components/ui/Sidebar";
import { isLoggedIn } from "@/services/auth.service";
import { Layout, Row, Space, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout >
      <Space direction="vertical">
        <HomeHeader/>
        <main className="min-h-screen">{children}</main>
        <Footer />
      </Space>
    </Layout>
  );
};

export default DashboardLayout;
