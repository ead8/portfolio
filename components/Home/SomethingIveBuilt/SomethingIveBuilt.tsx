import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import ArrowIcon from "../../Icons/ArrowIcon";
import Img from "../../smallComp/image/Img";
import GithubIcon from "../../Icons/GithubIconForSomethingIveBuild";
import ExternalLink from "../../Icons/ExternalLink";

export default function SomethingIveBuilt() {
  const router = useRouter();
  return (
    <div
      id="SomethingIveBuiltSection"
      className=" flex flex-col xl:space-y-28 space-y-12 bg-AAprimary w-full  
     2xl:px-72 lg:px-24 md:px-16 sm:px-16 py-32 px-4"
    >
      {/* // ? Title  */}
      <div data-aos="fade-up" className=" flex flex-row  items-center md:px-0">
        <ArrowIcon className={"flex-none h-5 md:h-6 w-5 md:w-5 translate-y-[2px] text-AAsecondary"} />
        <div className="flex-none flex-row space-x-2 items-center pr-2">
          <span className="text-AAsecondary font-sans text-sm  sm:text-xl"> 02.</span>
          <span className=" font-bold tracking-wider text-gray-200 text-lg md:text-2xl w-44 md:w-56 opacity-85">
            {" "}
            Some Things I&apos;ve Built
          </span>
        </div>
        <div className="bg-gray-400 h-[0.2px] w-full xl:w-1/3 md:w-1/2"></div>
      </div>

      <div className="flex flex-col   xl:space-y-36 space-y-8 md:space-y-28">
        {/* // ?  Project  1*/}
        <div data-aos="fade-up" className="relative md:grid md:grid-cols-12 w-full md:h-96 ">
          {/* Left image */}
          <div
            className="hidden bg-AAprimary z-10  py-4 
          absolute md:grid grid-cols-12 w-full h-full  content-center"
          >
            <div className="relative rounded w-full h-full col-span-7 ">
              {/* <Link href={"/typing"}>
                <div
                  // onClick={}
                  className="absolute w-full h-full rounded bg-AAsecondary 
           transition-opacity opacity-20 hover:opacity-0 hover:cursor-pointer duration-300"
                ></div>
              </Link> */}

              <a href="https://github.com/TsehaynehGetaneh/JointApplication" target={"_blank"} rel="noreferrer">
                <div
                  // onClick={}
                  className="absolute w-full h-full rounded bg-AAprimary 
           transition-opacity opacity-30 hover:opacity-0 hover:cursor-pointer duration-300"
                ></div>
              </a>

              <Img src={"/jointapp.PNG"} alt={"Project Screen shot"} className={`w-full rounded h-full `} />
            </div>
          </div>

          {/* right Content */}
          <div className=" md:absolute py-4  md:grid md:grid-cols-12 w-full h-full  content-center ">
            {/* background for text in mobile responsive */}
            <div className="absolute w-full h-full bg-opacity-70 z-0">
              <div className="relative w-full h-full">
                <div className="absolute w-full h-full bg-AAsecondary opacity-10 z-10"></div>
                <div className="absolute w-full h-full bg-AAprimary opacity-80 z-10"></div>
                <Img src={"/jointapp.PNG"} alt={"Project Screen shot"} className={`w-full h-full `} />
              </div>
            </div>

            <div className="px-8 pt-8 sm:pt-12 md:py-0 xl:col-span-6 xl:col-start-7 col-start-5 col-span-8 flex flex-col items-start md:items-end space-y-3">
              <div className="flex flex-col space-y-1 md:items-end z-10">
                <span className="text-AAsecondary text-base">Online Application for Universities in Ethiopia</span>
                <span className="md:text-gray-200 text-AAsecondary font-bold text-xl hover:cursor-pointer">
                  Frontend Development
                </span>
              </div>
              <div className="w-full md:bg-AAtertiary rounded-md py-6 md:p-6 z-10">
                <p className="text-gray-300 md:text-gray-400 text-left md:text-right">
                  Developed the frontend of a website to assist Ethiopian students in university applications, similar to CommonApp. Leveraged <span className="text-AAsecondary"> JavaScript frameworks including React and Node.js </span>.
                  Specialized in constructing front-end components using ReactJS and Tailwind CSS. Contributed to usability testing and bug fixes.
                </p>
              </div>
              <ul className="flex flex-wrap w-full text-gray-300 md:text-gray-400 text-sm font-Text2 md:justify-end">
                <li className="pr-4 z-10">Nextjs 13</li>
                <li className="pr-4 z-10">Node.js</li>
                <li className="pr-4 z-10">Typescript</li>
                <li className="pr-4 z-10">Tailwindcss</li>


              </ul>
              <div className="z-10 flex fle-row space-x-5">
                <GithubIcon link="https://github.com/TsehaynehGetaneh/JointApplication" />
                {/* <ExternalLink url={"dribbble"} router={router} /> */}
              </div>
            </div>

          </div>
        </div>

        {/* // ?  Project 2 */}
        <div data-aos="fade-up" className="relative md:grid md:grid-cols-12 w-full md:h-96  ">
          {/* Left image */}
          <div
            className="hidden bg-AAprimary z-10  py-4 
          absolute md:grid grid-cols-12 w-full h-full  content-center "
          >
            <div className="relative rounded w-full h-full col-start-6 col-span-7 ">
              <a href={"https://github.com/ead8/Recipe_Share"} target="_blank" rel="noreferrer">
                <div
                  className="absolute w-full h-full rounded bg-AAprimary 
           transition-opacity opacity-50 hover:opacity-0 hover:cursor-pointer duration-300"
                ></div>
              </a>
              <Img src={"/recipeshare.PNG"} alt={"Project Screen shot"} className={`max-w-full rounded h-full  `} />
            </div>
          </div>

          {/* right Content */}
          <div className=" md:absolute py-4  md:grid md:grid-cols-12 w-full h-full  content-center ">
            {/* background for text in mobile responsive */}
            <div className="absolute w-full h-full bg-opacity-70 z-0 md:order-2">
              <div className="relative w-full h-full">
                <div className="absolute w-full h-full bg-AAsecondary opacity-10 z-10"></div>
                <div className="absolute w-full h-full bg-AAprimary opacity-80 z-10"></div>
                <Img src={"/recipeshare.PNG"} alt={"Project Screen shot"} className={`max-w-full h-full`} />
              </div>
            </div>

            <div className="px-8 pt-8 sm:pt-12 md:py-0 xl:col-span-6 col-span-8 flex flex-col items-start space-y-3 md:order-1">
              <div className="flex flex-col space-y-1 z-10">
                <span className="text-AAsecondary text-base">Recipe Share Website</span>
                <a href="https://github.com/ead8/Recipe_Share" target="_blank" rel="noopener noreferrer">
                  <span className="md:text-gray-200 text-AAsecondary font-bold text-xl hover:cursor-pointer">
                    Explore Recipes
                  </span>
                </a>
              </div>
              <div className="w-full md:bg-AAtertiary rounded-md py-6 md:p-6 z-10">
                <p className="text-gray-300 md:text-gray-400 text-left">
                  I was deeply involved in the development of a recipe sharing platform. This platform was created using cutting-edge technologies such as <span className="text-AAsecondary">Nuxt 3</span>, <span className="text-AAsecondary">Vue 3</span>, <span className="text-AAsecondary">Tailwind CSS</span>, <span className="text-AAsecondary">Hasura</span>, and <span className="text-AAsecondary">Go/Gin</span>. My role encompassed designing and implementing seamless user experiences, leveraging <span className="text-AAsecondary">Vue 3</span> for dynamic interactions and <span className="text-AAsecondary">Tailwind CSS</span> for responsive styling. <span className="text-AAsecondary">Hasura</span> and <span className="text-AAsecondary">Go/Gin</span> were employed to handle backend operations efficiently.
                </p>
              </div>
              <ul className="flex flex-wrap w-full text-gray-300 md:text-gray-400 text-sm font-Text2 md:justify-start">
                <li className="pr-4 z-10">Nuxt 3</li>
                <li className="pr-4 z-10">Vue 3</li>
                <li className="pr-4 z-10">Tailwind CSS</li>
                <li className="pr-4 z-10">Hasura</li>
                <li className="pr-4 z-10">Go/Gin</li>
              </ul>
              <div className="z-10 flex fle-row space-x-5">
                <GithubIcon link="https://github.com/ead8/Recipe_Share" />
                {/* <ExternalLink url={"dribbble"} router={router} /> */}
              </div>
            </div>

          </div>
        </div>

        {/* // ?  Project  3*/}
        <div data-aos="fade-up" className="relative md:grid md:grid-cols-12 w-full md:h-96 ">
          {/* Left image */}
          <div
            className="hidden bg-AAprimary z-10  py-4 
          absolute md:grid grid-cols-12 w-full h-full  content-center"
          >
            <div className="relative rounded w-full h-full col-span-7 mr-10">
              <Link href={"https://github.com/ead8/dribble-clone"}>
                <div
                  // onClick={}
                  className="absolute w-full h-full rounded bg-AAsecondary 
           transition-opacity opacity-10 hover:opacity-0 hover:cursor-pointer duration-300"
                ></div>
              </Link>

              <Img src={"/dribble.PNG"} alt={"Project Screen shot"} className={`max-w-full rounded h-full `} />
            </div>
          </div>

          {/* right Content */}
          <div className=" md:absolute py-4  md:grid md:grid-cols-12 w-full h-full  content-center ">
            {/* background for text in mobile responsive */}
            <div className="absolute w-full h-full bg-opacity-70 z-0">
              <div className="relative w-full h-full">
                <div className="absolute w-full h-full bg-AAsecondary opacity-10 z-10"></div>
                <div className="absolute w-full h-full bg-AAprimary opacity-80 z-10"></div>
                <Img src={"/dribble.PNG"} alt={"Project Screen shot"} className={`max-w-full h-full `} />
              </div>
            </div>
            <div className="px-8 pt-8 sm:pt-12 md:py-0 xl:col-span-6 xl:col-start-7 col-start-5 col-span-8 flex flex-col items-start space-y-3 space ml-10">
              <div className="flex flex-col space-y-1 md:items-end z-10">
                <span className="text-AAsecondary text-base">Dribbble-like Website</span>
                <Link href={"https://github.com/ead8/dribble-clone"}>
                  <span className="md:text-gray-200 text-AAsecondary font-bold text-xl hover:cursor-pointer">
                    Explore Creativity
                  </span>
                </Link>
              </div>
              <div className="w-full md:bg-AAtertiary rounded-md py-6 md:p-6 z-10">
                <p className="text-gray-300 md:text-gray-400 text-left md:text-right">
                  Immerse yourself in a world of artistic inspiration with our Dribbble-like platform built using <span className="text-AAsecondary">Next.js</span>, <span className="text-AAsecondary">TypeScript</span>, <span className="text-AAsecondary">Prisma</span>, <span className="text-AAsecondary">NextAuth</span>, and <span className="text-AAsecondary">Graphbase</span>. Discover an array of stunning designs and artworks by talented creators. With enhanced user profiles, community engagement, and advanced search capabilities, this platform brings the best of creativity to your fingertips.
                </p>
              </div>
              <ul className="flex flex-wrap w-full text-gray-300 md:text-gray-400 text-sm font-Text2 md:justify-end">
                <li className="pr-4 z-10">Next.js</li>
                <li className="pr-4 z-10">TypeScript</li>
                <li className="pr-4 z-10">Prisma</li>
                <li className="pr-4 z-10">NextAuth</li>
                <li className="pr-4 z-10">Graphbase</li>
              </ul>
              <div className="z-10 flex fle-row space-x-5">
                <GithubIcon link="https://github.com/ead8/dribble-clone" />
                {/* <ExternalLink url={"dribbble"} router={router} /> */}
              </div>
            </div>

          </div>
        </div>

        {/* // ?  Project 4 */}
        <div data-aos="fade-up" className="relative md:grid md:grid-cols-12 w-full md:h-96  ">
          {/* Left image */}
          <div
            className="hidden bg-AAprimary z-10  py-4 
          absolute md:grid grid-cols-12 w-full h-full  content-center "
          >
            <div className="relative rounded w-full h-full col-start-6 col-span-7 ml-14 ">
              <Link href={"https://github.com/ead8/RestaurantWebsite"}>
                <div
                  className="absolute w-full h-full rounded bg-AAsecondary 
           transition-opacity opacity-10 hover:opacity-0 hover:cursor-pointer duration-300"
                ></div>
              </Link>
              <Img src={"/restaurant.PNG"} alt={"Project Screen shot"} className={`max-w-full rounded h-full bg-cover `} />
            </div>
          </div>

          {/* right Content */}
          <div className=" md:absolute py-4  md:grid md:grid-cols-12 w-full h-full  content-center ">
            {/* background for text in mobile responsive */}
            <div className="absolute w-full h-full bg-opacity-70 z-0 md:order-2">
              <div className="relative w-full h-full">
                <div className="absolute w-full h-full bg-AAsecondary opacity-10 z-10"></div>
                <div className="absolute w-full h-full bg-AAprimary opacity-80 z-10"></div>
                <Img src={"/restaurant.PNG"} alt={"Project Screen shot"} className={`max-w-full h-full bg-cover`} />
              </div>
            </div>

            <div className="px-8 pt-8 sm:pt-12 md:py-0 xl:col-span-6 col-span-8 flex flex-col items-start space-y-3 md:order-1">
              <div className="flex flex-col space-y-1 z-10">
                <span className="text-AAsecondary text-base">Restaurant Website</span>
                <Link href={"/restaurant"}>
                  <span className="md:text-gray-200 text-AAsecondary font-bold text-xl hover:cursor-pointer">
                    Explore Menus
                  </span>
                </Link>
              </div>
              <div className="w-full md:bg-AAtertiary rounded-md py-6 md:p-6 z-10">
                <p className="text-gray-300 md:text-gray-400 text-left">
                  Indulge in the culinary delights of our restaurant website,
                  meticulously designed using <span className="text-AAsecondary text-base"> React.js </span> and <span className="text-AAsecondary text-base">CSS </span> . Unearth a world of delectable
                  menus, savor special dishes, and embark on a journey that transcends taste.
                  As you navigate through our immersive platform, you'll discover a symphony of flavors and aromas that evoke pure joy.
                </p>
              </div>
              <ul className="flex flex-wrap w-full text-gray-300 md:text-gray-400 text-sm font-Text2 md:justify-start">
                {/* <li className="pr-4 z-10">Menus</li>
    <li className="pr-4 z-10">Special Dishes</li>
    <li className="pr-4 z-10">Culinary Delights</li> */}
                <li className="pr-4 z-10">React.js</li>
                <li className="pr-4 z-10">CSS</li>
              </ul>
              <div className="z-10 flex fle-row space-x-5">
                <GithubIcon link="https://github.com/ead8/RestaurantWebsite" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
