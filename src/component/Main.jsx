import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Header/Navbar/Navbar";
import Hero from "./Header/Hero/Hero";
import Footer from "./Footer/Footer";

export default function Main() {
  const location = useLocation();
  let heroContent = "";
  let paraContent =
    "Are you ready to turn your ideas into reality? Looking for the perfect platform to raise funds and bring your projects to life? Look no further – you've just found it!";

  // Conditionally set heroContent based on the current route
  if (location.pathname === "/") {
    heroContent = "We’re here to raise funds for you...";
  } else if (location.pathname === "/about") {
    heroContent = "About Us";
  } else if (location.pathname === "/blogs") {
    heroContent = "Latest Blogs";
  } else if (location.pathname === "/faq") {
    heroContent = "FAQs";
  }

  // Conditionally render the Hero section based on the route path
  const renderHeroSection = ![
    "/join-group",
    "/get-group",
    "/all-joined-group",
  ].includes(location.pathname);

  return (
    <>
      <Navbar />
      {renderHeroSection && (
        <Hero content={heroContent} paraContent={paraContent} />
      )}
      <Outlet />
      <Footer />
    </>
  );
}
