/* eslint-disable react/no-unescaped-entities */
import React from "react";

import Image from "next/image";
import { Button } from "antd";
import Link from "next/link";

const TopBanner = () => {
  return (
    <div
      style={{
        width: "75%",
        margin: "0 auto",
        padding: "70px 0",
      }}
      className="lg:flex justify-between items-center"
    >
      <div className="lg:mb-0 mb-6">
        <h1
          style={{
            color: "#13287E",
            fontSize: "60px",
          }}
          className="tracking-widest"
        >
          Spring <br />
          Cleaning <br /> Don't Panic
        </h1>
        <p className="w-[90%] my-6">
          We understand people are different and so are their cleaning
          requirements
        </p>

        <div className="flex items-center gap-4">
          <Link  href={`/service`}>
            <Button
              style={{
                background: "#fd4f1a",
                padding: "8px 30px",
                color: "white",
                fontSize: "14px",
                borderRadius: "20px",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Our Service
            </Button>
          </Link>
          <Button
            style={{
              background: "#fd4f1a",
              padding: "8px 30px",
              color: "white",
              fontSize: "14px",
              borderRadius: "20px",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Upcoming Events
          </Button>
        </div>
      </div>

      <Image
        className="w-[100%] lg:w-[800px]"
        src={"https://images.unsplash.com/photo-1572675339312-3e8b094a544d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJ1c3xlbnwwfHwwfHx8Mg%3D%3D&auto=format&fit=crop&w=300&q=300"}
        alt="clean svg"
        width={800}
        height={400}
      ></Image>
    </div>
  );
};

export default TopBanner;
