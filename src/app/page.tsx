import ClientReview from "@/components/Home/ClientReview";
import Footer from "@/components/Home/Footer";
import HomeHeader from "@/components/Home/HomeHeader";
import HomeService from "@/components/Home/HomeService";
import OverView from "@/components/Home/OverView";
import TopBanner from "@/components/Home/TopBanner";
import UpcomingService from "@/components/Home/UpcomingService";
import { redirect } from "next/navigation";

const HomePage = () => {
  return <>
  <HomeHeader/>
  <main>
    <HomeService/>
    <UpcomingService/>
    <TopBanner/>
    <ClientReview/>
    <OverView/>
    
  </main>
  <Footer />
  </>
};

export default HomePage;
