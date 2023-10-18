"use client";
import React, { useState } from "react";

import Image from "next/image";
import { useGetMultipalServicesQuery } from "@/redux/api/serviceApi";
import LoadingForDataFetch from "../Utlis/LoadingForDataFetch";
import { Button, Col, Row, Modal } from "antd";
import { NO_IMAGE } from "@/constants/filePatch";
import { CutText } from "@/utils/CutText";
import Form from "../Forms/Form";
import FormInput from "../Forms/FormInput";
import { IService } from "@/schemas/service";
import FormTextArea from "../Forms/FormTextArea";
import FormDatePicker from "../Forms/FormDatePicker";
import FormTimePicker from "../Forms/FormTimePicker";
import { yupResolver } from "@hookform/resolvers/yup";
import { BOOKING_STATUS, IBooking, IBookingSchema } from "@/schemas/booking";
import { useAddBookingMutation } from "@/redux/api/bookingApi";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import Link from "next/link";
import { ENUM_BOOKING_STATUS } from "@/constants/global";

const UpComingService = ({
  status,
  text,
  limit,
}: {
  status?: string;
  text?: string;
  limit?: number;
}) => {
  const query: Record<string, any> = {};
  // Modal -- satate
  const [open, setOpen] = useState(false);
  //
  const [dataQuery, setDataQuery] = useState<string>(status || "");
  const [bookMarkData, setBookMarkData] = useState<Partial<IService>>({});
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(limit || 10);
  query["limit"] = size;
  query["page"] = page;
  query["status"] = dataQuery;
  const { data = [], isLoading } = useGetMultipalServicesQuery({ ...query });
  const [addBooking, { isLoading: bookingLoading }] = useAddBookingMutation();

  //
  const onSubmit = async (data: any) => {
    try {
      //@ts-ignore
      const res = await addBooking({
        ...data,
        //@ts-ignore
        service: bookMarkData?._id,
        status: ENUM_BOOKING_STATUS.PENDING,
        totalBalance: Number(data.bookingTickets) * Number(bookMarkData?.price),
      }).unwrap();
      if (res.success == false) {
        Error_model_hook(res?.message + "");
      } else {
        setOpen(false);
        Success_model("Successfully Added booking");
      }
    } catch (error) {
      console.log(error);
    }
  };
  //

  // modal functionality
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  //

  if (isLoading) {
    return <LoadingForDataFetch />;
  }
  return (
    <div>
      <h1 className="my-4 text-center text-3xl border-b-2">
        {text || "All Upcoming Service"}
      </h1>
      <Row gutter={[16, 16]}>
        {
          //@ts-ignore
          data?.data?.map((single) => (
            <Col key={single._id} xs={24} md={12} lg={10} xl={6}>
              <div className="shadow-2xl rounded-xl flex flex-col h-[500px] 2xl:h-[450px]">
                <div style={{ height: "50%", position: "relative" }}>
                  <Image
                    src={single.image || NO_IMAGE}
                    alt="image"
                    // preview={false}
                    width={300}
                    height={300}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
                <div className="h-[50%] relative">
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{single.title}</div>
                    <p className="text-gray-700 text-base  overflow-hidden ">
                      {single?.description && CutText(single?.description, 120)}
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
                      Unit: {single?.availableTickets}
                    </span>
                  </div>
                  <div className="absolute right-0 bottom-0 p-2">
                    <Link
                     href={`/service/${single._id}`}
                    //  className=" text-white p-1 mx-1 rounded-xl"
                     style={{"padding":"0.45rem","marginLeft":"0.25rem","marginRight":"0.25rem","borderRadius":"0.20rem","color":"#ffffff","backgroundColor":"#60A5FA"}}
                    >
                      View 
                    </Link>
                    <Button
                      onClick={() => {
                        setBookMarkData(single);
                        showModal();
                      }}
                      type="primary"
                    >
                      Booking +
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          ))
        }
      </Row>
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => setSize((c) => c + 10)}
          className="text-center text-xl text-blue-500 animate-pulse"
        >
          See more ...
        </button>
      </div>
      <>
        <Modal
          title="Title"
          open={open}
          okButtonProps={{ disabled: true }}
          // onOk={handleOk}
          confirmLoading={bookingLoading}
          onCancel={handleCancel}
        >
          <Form
            submitHandler={onSubmit}
            defaultValues={{ bookingTickets: 1 }}
            resolver={yupResolver(IBookingSchema)}
          >
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-bold">
                Service name : {bookMarkData?.title}
              </h1>
              <Image
                src={bookMarkData?.image || NO_IMAGE}
                width={300}
                height={300}
                className="w-16 h-16"
                alt="booking"
              />
            </div>

            <FormInput
              label="Phone Number (For contact)"
              type="text"
              name="phoneNumber"
              placeholder="Please provide your phone number"
            />

            <div className="mt-1">
              <div className="flex justify-between items-center">
                <FormInput
                  label="Booking Sit "
                  type="number"
                  name="bookingTickets"
                  placeholder="Please provide your phone number"
                />
                <FormDatePicker name="bookingDate" label="*Date" size="large" />
                <FormTimePicker name="time" label="time" />
              </div>
            </div>
            <FormInput
              label="location/address"
              name="address"
              placeholder="Please provide your phone number"
            />
            <FormInput
              label="Google Map Link (optional)"
              name="googleMapLink"
              placeholder="Please provide googleMapLink"
            />
            <FormTextArea
              label="Note (optional)"
              name="note"
              placeholder="Please provide your phone number"
            />
            <div className="my-2 flex justify-center items-center">
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
            </div>
          </Form>
        </Modal>
      </>
    </div>
  );
};

export default UpComingService;
