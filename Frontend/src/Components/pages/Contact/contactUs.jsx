import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { alertSuccess } from "../../Utils/Alert";
import { motion } from "framer-motion";
import { FaLocationDot, FaPinterest } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";
import { IoLogoWhatsapp } from "react-icons/io";
import { BiLogoGmail } from "react-icons/bi";
import { FaPhoneAlt } from "react-icons/fa";

const ContactUs = () => {
  // Contact Us Form Component
  const ContactForm = () => {
    const formRef = useRef(null);

    const handleSubmit = (e) => {
      e.preventDefault();
      //   alert("Thank you for contacting us!");
      alertSuccess(
        "Thank you for contacting us! We will get back to you soon."
      );
      formRef.current.reset();
    };

    return (
      <section className="Contact-Us w-1/2 text-gray-700 body-font ">
        <div className="container px-5  mx-auto">
          <div className="flex flex-col text-center w-full mb-10">
            <h1 className="text-5xl font-medium title-font mb-4 text-gray-900 font-Caveat">
              Contact Us
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              We'd love to hear from you! Please fill out the form below and
              we'll get in touch soon.
            </p>
          </div>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="lg:w-4/5 md:w-4/5 mx-auto"
          >
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="mobile"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Mobile No.
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    required
                    pattern="[0-9]{10}"
                    maxLength={10}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="subject"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button
                  type="submit"
                  //   onClick={handleSubmit}
                  className="flex mx-auto text-white bg-[#EB5A2A] border-0 py-2 px-8 focus:outline-none rounded-full text-lg cursor-pointer transition duration-300 transform hover:scale-105"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  };

  const LocationCardDescription = () => {
    return (
      <div className={` h-[100%] flex z-50`}>
        <div
          className={`flex flex-col lg:flex-row lg:justify-around justify-center gap-5`}
        >
          <h1 className="flex flex-col truncate justify-center items-start lg:px-5 font-semibold font-sans pt-5">
            Address <span className="font-normal">Subhashree Apartment</span>{" "}
            <span className="font-normal">Mandaliya Nagar</span>{" "}
            <span className="font-normal">Bariatu Road, Ranchi - 834009</span>
          </h1>
          <motion.section
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 1 }}
            className={` text-black w-fit lg:flex flex-col lg:justify-center rounded-lg p-10 gap-5`}
          >
            <h1 className="flex justify-center items-center text-2xl gap-10 truncate">
              Say hello{" "}
              <span>
                <a
                  href="tel:+919631237275"
                  className=" hover:scale-105 duration-300 ease-in-out"
                >
                  <FaPhoneAlt className="text-2xl " />
                </a>
              </span>
            </h1>
            <span>Or</span>
            {/* social links  */}
            <motion.section
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className={`flex justify-center items-center lg:gap-5 gap-2 `}
            >
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=woodzzzcraft@gmail.com&su=Door%20Booking&body="
                target="_blank"
                rel="noopener noreferrer"
                className=" hover:scale-105 duration-300 ease-in-out"
              >
                <BiLogoGmail className="text-2xl " />
              </a>
              <a
                href="https://maps.app.goo.gl/m1aj2HaAaNkAETwk9"
                target="_blank"
                className=" hover:scale-105 duration-300 ease-in-out"
              >
                <FaLocationDot className="text-2xl " />
              </a>
              <a
                href="https://www.instagram.com/WOODZZZCRAFT/"
                target="_blank"
                className=" hover:scale-105 duration-300 ease-in-out"
              >
                <FiInstagram className="text-2xl " />
              </a>
              <a
                href="https://www.pinterest.com/woodzzzcraft/?invite_code=0f1211e5627e431db8df17c84d03f743&sender=701787691842338706"
                target="_blank"
                className=" hover:scale-105 duration-300 ease-in-out"
              >
                <FaPinterest className="text-2xl " />
              </a>
              <a
                href="https://wa.me/919631237275"
                target="_blank"
                className=" hover:scale-105 duration-300 ease-in-out"
              >
                <IoLogoWhatsapp className="text-2xl " />
              </a>
            </motion.section>
          </motion.section>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* About Section */}
      <section className="about-us bg-gradient-to-br from-orange-50 via-white to-indigo-50 text-gray-800 body-font py-20">
        <div className="container mx-auto flex flex-col md:flex-row items-center px-5">
          <div className="md:w-1/2 flex flex-col items-start text-left mb-16 md:mb-0">
            <h1 className="title-font text-5xl md:text-6xl mb-6 font-bold text-[#EB5A2A] font-Caveat drop-shadow-lg">
              <span className=" font-extrabold">Woodzzz Craft</span>
            </h1>
            <p className="mb-8 leading-relaxed text-lg md:text-xl text-gray-700 bg-white/70 p-6 rounded-xl shadow-lg">
              At{" "}
              <span className="font-semibold text-[#EB5A2A]">
                Woodzzz Craft
              </span>
              , we believe that wood is more than a material—it's a canvas for
              creativity, a foundation for artistry, and a timeless element that
              brings warmth to every space. From intricately designed home décor
              to functional everyday pieces, our creations blend tradition with
              innovation, celebrating the beauty of handcrafted woodwork.
            </p>
            <Link
              to="/"
              className="inline-block px-8 py-3 bg-[#EB5A2A] text-white rounded-full shadow-lg hover:bg-indigo-600 transition duration-300 font-semibold text-lg z-50"
            >
              Explore Our Collection
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative group">
              <img
                className="object-cover object-center rounded-3xl shadow-2xl w-[400px] h-[420px] border-8 border-white transition-transform duration-300"
                alt="hero"
                src="https://ik.imagekit.io/woodzcraft/IMG_20250411_105210-removebg-preview.png?updatedAt=1744349111877"
              />
              <span className="absolute bottom-4 right-6 bg-[#EB5A2A] text-white px-4 py-2 rounded-full shadow-lg text-lg font-bold">
                100% Handcrafted
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="our-team bg-white text-gray-800 body-font border-t border-gray-200 py-20">
        <div className="container px-5 mx-auto">
          <div className="flex flex-col text-center w-full mb-16">
            <h1 className="text-5xl font-bold title-font mb-4 font-Caveat drop-shadow  text-[#EB5A2A] ">
              Meet Our Team
            </h1>
            <p className="mx-auto leading-relaxed text-lg md:w-2/3 text-gray-600">
              The creative minds and passionate hands behind every Woodzzz Craft
              masterpiece.
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="p-4 lg:w-1/3 md:w-1/2 w-full">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="h-full flex items-center p-6 rounded-2xl bg-gradient-to-br from-orange-100 to-white shadow-xl hover:scale-105 transition-transform duration-300"
              >
                <img
                  alt="team"
                  className="w-20 h-20 object-cover object-center flex-shrink-0 rounded-full mr-6 border-4 border-[#EB5A2A] shadow-md"
                  src="https://ik.imagekit.io/woodzcraft/IMG_20250411_105210-removebg-preview.png?updatedAt=1744349111877"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-bold text-xl">
                    Woodzzz Craft
                  </h2>
                  <p className="text-gray-500">Handicraft Manufacturer</p>
                </div>
              </a>
            </div>
            <div className="p-4 lg:w-1/3 md:w-1/2 w-full">
              <a
                href="https://creativesartschool.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="h-full flex items-center p-6 rounded-2xl bg-gradient-to-br from-indigo-100 to-white shadow-xl hover:scale-105 transition-transform duration-300"
              >
                <img
                  alt="team"
                  className="w-20 h-20 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-6  shadow-md"
                  src="https://ik.imagekit.io/woodzcraft/Screenshot_2025-04-11_at_11.04.32_AM-removebg-preview.png?updatedAt=1744349745716"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-bold text-xl">
                    Creatives School of Arts
                  </h2>
                  <p className="text-gray-500">Arts and Crafts School</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Words Section */}
      <section className="founder-words bg-gradient-to-br from-indigo-50 via-white to-orange-50 text-gray-800 body-font py-20">
        <div className="container px-5 mx-auto">
          <div className="xl:w-2/3 lg:w-3/4 w-full mx-auto text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="inline-block w-12 h-12 text-[#EB5A2A] mb-8"
              viewBox="0 0 975.036 975.036"
            >
              <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
            </svg>
            <p className="leading-relaxed text-xl italic text-gray-700 bg-white/80 p-8 rounded-2xl shadow-lg">
              In the realm of fine arts, where imagination dances with
              craftsmanship, wooden art stands as a testament to the soul of
              nature shaped by the hands of humanity. Each grain in the wood is
              a silent story of time, a memory etched by wind, sun, and rain,
              waiting to be awakened by the artist’s chisel. Wooden sculptures
              and carvings embody a dialogue between permanence and fragility,
              where the living essence of a tree is reborn in expressive form.
              True wooden artistry doesn’t merely create objects—it breathes
              spirit into substance, merging the organic with the divine in
              every intricate detail.
            </p>
            <span className="inline-block h-1 w-16 rounded bg-indigo-500 mt-8 mb-6"></span>
          </div>
        </div>
      </section>
      <section className="contact-form w-full flex items-center justify-center ">
        <ContactForm />
        {/* <span>Or</span> */}
        <LocationCardDescription />
      </section>
    </div>
  );
};

export default ContactUs;
