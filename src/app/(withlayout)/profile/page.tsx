"use client";
import React from "react";
import { Card, Avatar, Typography, Row, Col, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useGetProfileQuery } from "@/redux/api/authApi";
import { NO_IMAGE } from "@/constants/filePatch";
import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";
import Image from "next/image";

const { Meta } = Card;
const { Title, Text } = Typography;

const ProfileTemplate = () => {
  const { data = {}, isLoading } = useGetProfileQuery("");
  console.log(data);
  const userData = data?.generalUser || data?.admin || data?.superAdmin;
  if (isLoading) {
    return <LoadingForDataFetch />;
  }
  return (
    <div style={{ padding: 20 }}>
      <Title level={2}>Profile</Title>
      <Space align="center" direction="horizontal">

      <Row gutter={16}>
        <Col span={8}>
          <Image
            width={800}
            height={800}
            src={userData?.profileImage || NO_IMAGE}
            alt="Profile"
            style={{ width: "300px", borderRadius: "100%" }}
          />
        </Col>
        <Col span={16}>
          <Title level={3}>Name: {userData?.name}</Title>
          <Text strong>Email:</Text> <Text>{userData?.email}</Text>
          <br />
          <Text strong>Phone:</Text> <Text>{userData?.phoneNumber}</Text>
          <br />
          {userData?.address && (
            <>
              <Text strong>Address:</Text> <Text>{userData?.address}</Text>
              <br />
            </>
          )}
          {userData?.gender && (
            <>
              <Text strong>Gender:</Text> <Text>{userData?.gender}</Text>
              <br />
            </>
          )}
          {userData?.dateOfBirth && (
            <>
              <Text strong>Date of Birth:</Text>{" "}
              <Text>{userData?.dateOfBirth}</Text>
              <br />
            </>
          )}
        </Col>
      </Row>
      </Space>
    </div>
  );
};

export default ProfileTemplate;
