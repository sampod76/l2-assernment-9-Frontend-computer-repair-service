/* eslint-disable react/no-unescaped-entities */
import React from "react";

import Image from "next/image";
import { Button } from "antd";
import Link from "next/link";
import { useGetAllBlogQuery } from "@/redux/api/blog";
import LoadingForDataFetch from "../Utlis/LoadingForDataFetch";

const Blog = () => {
  const { data = [], isLoading } = useGetAllBlogQuery({});
  console.log("🚀 ~ file: Blog.tsx:12 ~ Blog ~ data:", data)
  if (isLoading) {
    return <LoadingForDataFetch />;
  }

  return (
    <div
      style={{
        width: "75%",
        margin: "0 auto",
        padding: "70px 0",
      }}
      className="lg:flex justify-between items-center"
    >
      <div>
        {/* <div>
          {data?.data?.map((item:any,key:string) => (
            <div key={key} className="container mx-auto mt-10">
              <h1 className="text-center text-lg">{data?.title}</h1>
              <div className="w-full rounded overflow-hidden shadow-lg">
                <section className="grid  grid-cols-1 xl:grid-cols-2">
                  <div>
                    <Image
                      width={1800}
                      height={1800}
                      src={data?.image}
                      alt="Transport Image"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Input.TextArea
                      value={data?.content}
                      rows={30}
                    ></Input.TextArea>
                  </div>
                </section>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Blog;
