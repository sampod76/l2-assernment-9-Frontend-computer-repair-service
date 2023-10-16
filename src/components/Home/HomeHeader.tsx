"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "antd";
import { getUserInfo } from "@/services/auth.service";
import { useEffect, useState } from "react";

const HomeHeader = () => {
  const [userData, setUserData] = useState<any>({});
  useEffect(() => {
    setUserData(getUserInfo() as any);
    return () => {};
  }, []);
  
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "75%",
        padding: "20px",
        margin: "10px auto",
      }}
      className="border-2 shadow-lg rounded-xl "
    >
      <p
        style={{
          fontSize: "30px",
          color: "#ff5100",
          fontWeight: "bold",
        }}
      >
        Travel Agency
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Link href={`/general_user/booking`}>
          <Button
            style={{
              background: "blue",
              padding: "6px 30px",
              color: "white",
              fontSize: "14px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Booking
          </Button>
        </Link>
        <Link href={`/general_user/cart`}>
          <Button
            style={{
              background: "blue",
              padding: "6px 30px",
              color: "white",
              fontSize: "14px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Cart
          </Button>
        </Link>
        {userData?.role ? (
          <Link style={{
            background: "blue",
            padding: "6px 30px",
            color: "white",
            fontSize: "14px",
            borderRadius: "10px",
            cursor: "pointer",
          }} href={`/profile`}>Dashboard</Link>
        ) : (
          <>
            <Link href={`/login`}>
              <Button
                style={{
                  background: "blue",
                  padding: "6px 30px",
                  color: "white",
                  fontSize: "14px",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                Login
              </Button>
            </Link>
            <Link href={`/registration`}>
              <Button
                style={{
                  background: "blue",
                  padding: "6px 30px",
                  color: "white",
                  fontSize: "14px",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                Register
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default HomeHeader;
