import { useState } from "react";
import { Link } from "react-router-dom";

const About = () => {
  const Section = ({ title, description }) => {
    const [isvisible, SetIsVisible] = useState(false);
    return (
      <div className="border-2 m-2 p-3">
        <h1 className="text-xl font-bold">{title}</h1>
        {isvisible ? (
          <button
            className="font-thin underline"
            onClick={() => SetIsVisible(false)}
          >
            Hide
          </button>
        ) : (
          <button
            className="font-thin underline"
            onClick={() => SetIsVisible(true)}
          >
            Show
          </button>
        )}
        {isvisible && <h3>{description}</h3>}
      </div>
    );
  };

  return (
    <div>
      <section className="About us text-gray-700 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 font-Caveat">
              About{" "}
              <span className="text-[#EB5A2A] font-semibold text-6xl">
                Woodzzz Craft
              </span>
            </h1>
            <p className="mb-8 leading-relaxed text-lg">
              At Woodzzz Craft, we believe that wood is more than a
              material—it’s a canvas for creativity, a foundation for artistry,
              and a timeless element that brings warmth to every space. From
              intricately designed home décor to functional everyday pieces, our
              creations blend tradition with innovation, celebrating the beauty
              of handcrafted woodwork.
            </p>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 z-50">
            <img
              className="object-cover object-center rounded w-489 h-511"
              alt="hero"
              src="https://ik.imagekit.io/woodzcraft/IMG_20250411_105210-removebg-preview.png?updatedAt=1744349111877"
            />
          </div>
        </div>
      </section>

      <section className="Our Teams text-gray-700 body-font border-t border-gray-200">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="text-5xl font-medium title-font mb-4 text-gray-900 font-Caveat">
              Our Team
            </h1>
          </div>
          <div className="flex flex-wrap justify-center items-center -m-2">
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full z-50">
              <a
                // href="https://woodzzzcraft.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="h-full flex items-center border-gray-200 border p-4 rounded-lg bg-white shadow-xl hover:scale-105 transition duration-300"
              >
                <img
                  alt="team"
                  className="w-16 h-16 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="https://ik.imagekit.io/woodzcraft/IMG_20250411_105210-removebg-preview.png?updatedAt=1744349111877"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Woodzzz Craft
                  </h2>
                  <p className="text-gray-500">Handicraft manufacturer</p>
                </div>
              </a>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full z-50">
              <a
                href="https://creativesartschool.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="h-full flex items-center border-gray-200 border p-4 rounded-lg bg-white shadow-xl hover:scale-105 transition duration-300"
              >
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="https://ik.imagekit.io/woodzcraft/Screenshot_2025-04-11_at_11.04.32_AM-removebg-preview.png?updatedAt=1744349745716"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Creatives school of Arts
                  </h2>
                  <p className="text-gray-500">Arts and crafts school</p>
                </div>
              </a>
            </div>
            {/* <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="https://dummyimage.com/88x88/edf2f7/a5afbd"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Oskar Blinde
                  </h2>
                  <p className="text-gray-500">Founder</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="https://dummyimage.com/90x90/edf2f7/a5afbd"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    John Doe
                  </h2>
                  <p className="text-gray-500">DevOps</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="https://dummyimage.com/94x94/edf2f7/a5afbd"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Martin Eden
                  </h2>
                  <p className="text-gray-500">Software Engineer</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="https://dummyimage.com/98x98/edf2f7/a5afbd"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Boris Kitua
                  </h2>
                  <p className="text-gray-500">UX Researcher</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="https://dummyimage.com/100x90/edf2f7/a5afbd"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Atticus Finch
                  </h2>
                  <p className="text-gray-500">QA Engineer</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="https://dummyimage.com/104x94/edf2f7/a5afbd"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Alper Kamu
                  </h2>
                  <p className="text-gray-500">System</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="https://dummyimage.com/108x98/edf2f7/a5afbd"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Rodrigo Monchi
                  </h2>
                  <p className="text-gray-500">Product Manager</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      <section className="Founder-words text-gray-700 body-font border-t border-gray-200">
        <div className="container px-5 py-24 mx-auto">
          <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="inline-block w-8 h-8 text-gray-400 mb-8"
              viewBox="0 0 975.036 975.036"
            >
              <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
            </svg>
            <p className="leading-relaxed text-lg">
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
            <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-8 mb-6"></span>
            {/* <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">
              HOLDEN CAULFIELD
            </h2>
            <p className="text-gray-500">Senior Product Designer</p> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
