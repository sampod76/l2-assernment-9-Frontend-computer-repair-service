"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import FormTimePicker from "@/components/Forms/FormTimePicker";
import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";
import { NO_IMAGE } from "@/constants/filePatch";
import {
  useGetSingleBookingQuery,
  useUpdateBookingMutation,
} from "@/redux/api/bookingApi";
import { useGetAllCategoryQuery } from "@/redux/api/categoryApi";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import { Button, Col, Row } from "antd";

import Image from "next/image";

const BookingDetails = ({ params }: any) => {
  const { data: bookingData, isLoading } = useGetSingleBookingQuery(
    params?.id,
    {
      skip: !Boolean(params?.id),
    }
  );
  const { data: categoryData = [], isLoading: categoryLoading } =
    useGetAllCategoryQuery({});
  const [updateBooking, { isLoading: bookingLoading }] =
    useUpdateBookingMutation();
  console.log(bookingData);
  const onSubmit = async (data: any) => {
    console.log(data);
    return;
    try {
      //@ts-ignore
      const res = await addBooking({
        ...data,
      }).unwrap();
      if (res.success == false) {
        Error_model_hook(res?.message + "");
      } else {
        Success_model("Successfully update booking");
      }
    } catch (error) {
      console.log(error);
    }
  };
  //

  const defaultValues = {
    name: {
      firstName: bookingData?.name?.firstName || "",
      lastName: bookingData?.name?.lastName || "",
      middleName: bookingData?.name?.middleName || "",
    },
    dateOfBirth: bookingData?.dateOfBirth || "",
    email: bookingData?.email || "",
    designation: bookingData?.designation || "",
    contactNo: bookingData?.contactNo || "",
    emergencyContactNo: bookingData?.emergencyContactNo || "",
    permanentAddress: bookingData?.permanentAddress || "",
    presentAddress: bookingData?.presentAddress || "",
    bloodGroup: bookingData?.bloodGroup || "",
    gender: bookingData?.gender || "",
    managementDepartment: bookingData?.managementDepartment?.id || "",
  };
  if (isLoading || bookingLoading) {
    return <LoadingForDataFetch />;
  }
  return (
    <>
      <div className="container mx-auto mt-10">
        <Form submitHandler={onSubmit} defaultValues={{ bookingTickets: 1 }}>
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-bold">
              Service name : {bookingData?.title}
            </h1>
            <Image
              src={bookingData?.image || NO_IMAGE}
              width={300}
              height={300}
              className="w-16 h-16"
              alt="booking"
            />
          </div>
          <Row gutter={16}>
            <Col
              className="gutter-row"
              xs={24}
              md={12}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormInput
                label="Phone Number (For contact)"
                type="text"
                name="phoneNumber"
                placeholder="Please provide your phone number"
              />
            </Col>
            <Col
              className="gutter-row"
              xs={24}
              md={12}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormSelectField
                name="category"
                label="*Select Category"
                required={true}
                options={
                  //@ts-ignore
                  categoryData?.data?.map((e) => ({
                    value: e._id,
                    label: e.title,
                  }))
                }
              />
            </Col>
          </Row>

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
      </div>
    </>
  );
};

export default BookingDetails;
