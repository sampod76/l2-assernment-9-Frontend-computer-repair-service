"use client";
import React, { useState } from "react";

import Image from "next/image";
import { useGetMultipalServicesQuery } from "@/redux/api/serviceApi";
import LoadingForDataFetch from "../Utlis/LoadingForDataFetch";
import { Col, Row } from "antd";
import { NO_IMAGE } from "@/constants/filePatch";
import { CutText } from "@/utils/CutText";

const HomeService = () => {
  const query: Record<string, any> = {};
  const [dataQuery, setDataQuery] = useState<string>("available");
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(4);
  query["limit"] = size;
  query["page"] = page;
  query["status"] = dataQuery;
  const { data = [], isLoading } = useGetMultipalServicesQuery({ ...query });
  if (isLoading) {
    return <LoadingForDataFetch />;
  }
  console.log(data);
  return (
    <div
      style={{
        width: "75%",
        margin: "0 auto",
        padding: "60px 0",
      }}
    >
      <h1 className="my-4 text-center text-3xl border-b-2">
        All Available Service
      </h1>
      <Row gutter={[16, 16]}>
      {
        //@ts-ignore
      data?.data?.map((single) => (
        <Col key={single._id} xs={24} md={8} lg={6}>
          <div className="shadow-2xl rounded-xl flex flex-col h-[500px]">
            <div style={{ height: '50%', position: 'relative' }}>
              <Image
                src={single.image || NO_IMAGE}
                alt="image"
                // preview={false}
                width={300}
                height={300}
              
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
            <div className="h-[50%]">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{single.title}</div>
                <p className="text-gray-700 text-base overflow-hidden ">
                  {CutText(single?.description,150) }
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-lg px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {single?.status}
                </span>
                <span className="inline-block bg-gray-200 rounded-lg px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {single?.category?.title}
                </span>
                <span className="inline-block bg-gray-200 rounded-lg px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                ticket: {single?.availableTickets}
                </span>
              </div>
            </div>
          </div>
        </Col>
      ))}
    </Row>
    </div>
  );
};

export default HomeService;
