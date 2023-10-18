
import ClientReview from "@/components/Home/ClientReview";
import Footer from "@/components/Home/Footer";
import HomeHeader from "@/components/Home/HomeHeader";
import HomeService from "@/components/Home/HomeService";
import OverView from "@/components/Home/OverView";
import TopBanner from "@/components/Home/TopBanner";
import UpcomingService from "@/components/Home/UpcomingService";
import { redirect } from "next/navigation";
import { Tabs } from "antd";

const HomePage = () => {
  
  return (
    <>
      <HomeHeader />
      <main className=" ">
        <section className="container mx-auto ">

        <Tabs
         
          type="card"
          items={[
            {
              label: `All services`,
              key: "3",
              children: <HomeService text="All services" status="" limit={10} />,
            },
            {
              label: `Available services`,
              key: "1",
              children: <HomeService text="Available services" status="available" limit={10} />,
            },
            {
              label: `Upcoming services`,
              key: "2",
              children: <HomeService text="Upcoming services" status="upcoming" limit={10}/>,
            },
          ]}
        />
        </section>

        <TopBanner />
        <ClientReview />
        <OverView />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
