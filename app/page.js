"use client"
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Home() {

  const router = useRouter()
  const [text, setText] = useState("")
  const createTree = () => {
    router.push(`/generate?handle=${text}`)
  }
  // Which dropdown is open
  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef([]);
  // Function to toggle dropdown
  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Dropdown Data
  const faqData = [
    {
      title: "Why do I need a link in bio tool?",
      content: `Right now, every time you've got something new to share, you have to go to every single one of your channels to change the link in each of your bios. It's time-consuming and complicated - making it so much harder to keep everything up to date.
        
        A link in bio tool means you never have to compromise, or remove one link from your bio so you can add another. You can keep everything you want to share online in one link. When you've got a change, you only ever have to make it once.`,
    },
    {
      title: "Is BitTree the original link in bio tool?",
      content: `The short answer? Yes!
      
      Back in 2016, we created BitTree as an easy way to link out to all socials and unify digital ecosystems, pioneering the link-in-bio category. BitTree remains the leading, biggest and most popular link-in-bio solution - but that's just the beginning.  You can use your BitTree URL or QR code anywhere your audience is, including on your business cards, in your email signature, on paper-based posters and brochures, and even on your resumé. If you don't have a website, that's fine. If you have a BitTree, you don't need one!`,
    },
    {
      title: "Can you get paid and sell things from a BitTree?",
      content: `Yes, you can! We offer plenty of ways to sell products and monetize your audience. You can collect tips, request payments for services, collect revenue from affiliate links, and sell your products right in your BitTree.
      
      A lot of BitTree creators see incredible results with online sales on BitTree, because it removes the extra steps involved in a purchase. With Paypal or Square right in your BitTree, your customers won't even need to leave your social media to go to another site and pay!
      
      “We love how BitTree has helped us manage our business by having all social media and ways to pay in one location. The QR code has made it easy for customers to access it all!” - Tiffany`,
    },
    {
      title: "Is BitTree safe to use on all of my social media profiles?",
      content: `BitTree is trusted by all social platforms, and is even used on many of Facebook, Instagram and TikTok's own social media accounts! Because BitTree is the original and most popular link-in-bio tool, the linktr.ee URL is a trusted, identifiable and familiar link that audiences feel comfy and safe clicking on.`,
    },
    {
      title: "What makes BitTree better than the other link in bio options?",
      content: `We have our own opinions here, of course, but the stories of the people who use BitTree matter more. Let's hear what they have to say:
      
      “Four months into creating, someone messaged me like: You need a BitTree. I can't remember what I was using at the time, but it was one of those ones that were supposed to be easy. Once I got BitTree set up, I was like, oh my god - why did I spend $100 on a website? I don't need all of that! Now, I can see the monetization of my following becoming a full-time thing.” - David Coleman
      
      It's so much easier to set up and have all of your links in one place in a well designed format.” - Catie T
      
      ”Websites are cool (I have one) but BitTrees just make it so much easier.” - Tan Nguyen
      
      “I love their analytics. Other link-in-bio companies don't provide extensive data on what's going on.” - Riley Lemon
      
      BitTree invented the bio link tool in 2016, and it continues to be the world's most popular bio link to this day - with 50M+ people using it as their trusted place to share, sell and grow online. Join them on BitTree today and see for yourself!`,
    },
    {
      title: "How can I drive more traffic to and through my BitTree?",
      content: `Sharing your BitTree on every social platform you have makes it easy for your most important content to be seen and engaged with by all of your followers. You can even use QR codes to generate online traffic in offline places, and drive people to your links.
      
      Once visitors arrive on your BitTree, easy-to-understand analytics help you quickly and easily discover where they're coming from, and what they're clicking on. You can immediately see what's working and what's not and improve your BitTree on the fly with different link placement, prioritized links, subheadings, animation and more to make sure your traffic is landing exactly where you want it!`,
    },
    {
      title: "How many links should I have on my BitTree?",
      content: `This depends on two things. If your priority is click-throughs and conversion, we recommend having 3-7 links on your BitTree at once (based on our most successful creators). Including too many options for your visitors slows down their course of action.
      
      That said: for certain creators whose priority is display, education and showcasing (e.g. a record label with a library of new releases to promote, or a management company looking to showcase their full roster of clients), including more than seven links fulfils their purpose perfectly.
      
      You can use features on BitTree to add subheadings, sections, animation and other prioritisation methods to your links - so no matter how many things you've got to share, you can drive your visitors to what's most important, first.`,
    },
    {
      title: "Do I need a website to use BitTree?",
      content: `No, you don't! BitTree can act as your very own mini-website to share, sell and grow without any of the time and effort it takes to build and maintain a regular website. You can create a design that fully reflects your personality and brand in seconds, with no knowledge, skills or experience needed. If you already have a website, that's great: you can add it to your BitTree.
      
      “I hardly touch my website any more. I just send people to my BitTree! It's a good-looking, fresh interface… so much more dynamic. I can take a few minutes, update my links and put my phone away rather than spending 45 struggling on WordPress.” - @ashleyhopeperez`,
    },
    {
      title: "Where can I download the app?",
      content: `Find it in the App Store, and in the Google Play store!`,
    },
  ];

  return (
    <main>
      <section className="bg-[#254f1a] grid grid-cols-1 md:grid-cols-2 sm:py-[16vw] pt-[45vw] pb-[16vw] px-6 md:px-[8vw] gap-10">
        {/* Left side text */}
        <div className="flex flex-col justify-center gap-4 text-center md:text-left">
          <div className="text-start">
            <p className="text-yellow-300 font-bold text-4xl sm:text-5xl lg:text-7xl">Everything you</p>
            <p className="text-yellow-300 font-bold text-4xl sm:text-5xl lg:text-7xl">are. In one,</p>
            <p className="text-yellow-300 font-bold text-4xl sm:text-5xl lg:text-7xl">simple link in bio.</p>
          </div>

          <p className="text-white font-semibold text-base sm:text-lg lg:text-xl my-4 text-start">
            Join 70M+ people using BitTree for their link in bio. One link to help you share
            everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube
            and other social media profiles.
          </p>

          {/* Input + Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 w-full max-w-[550px] mx-auto md:mx-0">
            <input value={text} onChange={(e) => setText(e.target.value)} className="bg-white w-full sm:flex-1 px-4 py-3 rounded-md focus:outline-green-800 text-base sm:text-lg" type="text" placeholder="Enter your Handle" />
            <button onClick={() => createTree()} className="bg-pink-400 rounded-lg px-5 py-3 sm:py-3 font-semibold cursor-pointer hover:bg-pink-500 transition w-full sm:w-auto sm:flex-none text-base sm:text-lg shadow-md">Claim your BitTree</button>
          </div>
        </div>

        {/* Right side image */}
        <div className="flex justify-center items-center">
          <img src="/home.png" alt="homepage image" className="max-w-full h-auto" />
        </div>
      </section>

      <section className="bg-[#e9c0e9] grid grid-cols-1 md:grid-cols-2 py-[11vw] px-6 md:px-[8vw] gap-8">
        {/* Left side image */}
        <div className="flex justify-center items-center">
          <img src="/home-2.png" alt="homepage image" className="max-w-full h-auto" />
        </div>

        {/* Right side text */}
        <div className="flex justify-center flex-col gap-4 px-4 md:px-0 text-center md:text-left">
          <div className="text-start">
            <p className="text-[#502274] font-extrabold text-4xl sm:text-5xl lg:text-5xl">Create and customize</p>
            <p className="text-[#502274] font-extrabold text-4xl sm:text-5xl lg:text-5xl">your BitTree in</p>
            <p className="text-[#502274] font-extrabold text-4xl sm:text-5xl lg:text-5xl">minutes</p>
          </div>

          <p className="text-[#1e2330] text-base sm:text-lg lg:text-xl font-semibold my-4 text-start">
            Connect your TikTok, Instagram, Twitter, website, store, videos, music, podcast, events and more. It all comes together in a link in bio landing page designed to convert.
          </p>

          <div className="flex justify-center md:justify-start">
            <button onClick={() => createTree()} className="bg-[#502274] text-white rounded-lg px-8 sm:px-10 py-3 sm:py-4 font-semibold cursor-pointer text-base sm:text-lg w-full sm:w-auto shadow-md hover:bg-[#3e1f63] transition">Get started for free</button>
          </div>
        </div>
      </section>

      <section className="bg-[#780016] grid grid-cols-1 md:grid-cols-2 py-[11vw] px-6 md:px-[8vw] gap-8">
        {/* Left side text */}
        <div className="flex justify-center flex-col gap-4 text-center md:text-left order-2 md:order-1">
          <div className="text-start">
            <p className="text-[#e9c0e9] font-extrabold text-4xl sm:text-5xl lg:text-5xl">Share your BitTree</p>
            <p className="text-[#e9c0e9] font-extrabold text-4xl sm:text-5xl lg:text-5xl">from your Instagram,</p>
            <p className="text-[#e9c0e9] font-extrabold text-4xl sm:text-5xl lg:text-5xl">TikTok, Twitter and</p>
            <p className="text-[#e9c0e9] font-extrabold text-4xl sm:text-5xl lg:text-5xl">other bios</p>
          </div>

          <p className="text-white text-base sm:text-lg lg:text-xl my-4 text-start">
            Add your unique BitTree URL to all the platforms and places you find your audience. Then use your QR code to drive your offline traffic online.
          </p>

          <div className="flex justify-center md:justify-start">
            <button onClick={() => createTree()} className="bg-[#e9c0e9] text-[#780016] rounded-lg px-8 sm:px-10 py-3 sm:py-4 font-semibold cursor-pointer text-base sm:text-lg w-full sm:w-auto shadow-md hover:bg-[#d7aee0] transition">Get started for free</button>
          </div>
        </div>

        {/* Right side image */}
        <div className="flex justify-center items-center order-1 md:order-2">
          <img src="/home-3.png" alt="homepage image" className="max-w-full h-auto" />
        </div>
      </section>

      <section className="bg-[#e8efd6] grid grid-cols-1 md:grid-cols-2 py-[11vw] px-6 md:px-[8vw] gap-8">
        {/* Left side image */}
        <div className="flex justify-center items-center order-1 md:order-1">
          <img src="/home-4.avif" alt="homepage image" className="max-w-full h-auto" />
        </div>

        {/* Right side text */}
        <div className="flex justify-center flex-col gap-4 text-center md:text-left order-2 md:order-2">
          <div className="text-start">
            <p className="text-[#1e2330] font-extrabold text-4xl sm:text-5xl lg:text-5xl">Analyze your</p>
            <p className="text-[#1e2330] font-extrabold text-4xl sm:text-5xl lg:text-5xl">audience and keep</p>
            <p className="text-[#1e2330] font-extrabold text-4xl sm:text-5xl lg:text-5xl">your followers</p>
            <p className="text-[#1e2330] font-extrabold text-4xl sm:text-5xl lg:text-5xl">engaged</p>
          </div>

          <p className="text-[#1e2330] text-base sm:text-lg lg:text-xl font-semibold my-4 text-start">
            Track your engagement over time, monitor revenue and learn what&apos;s converting your audience. Make informed updates on the fly to keep them coming back.
          </p>

          <div className="flex justify-center md:justify-start">
            <button onClick={() => createTree()} className="bg-[#e9c0e9] text-[#1e2330] rounded-lg px-8 sm:px-10 py-3 sm:py-4 font-semibold cursor-pointer text-base sm:text-lg w-full sm:w-auto shadow-md hover:bg-[#d7e3cf] transition">Get started for free</button>
          </div>
        </div>
      </section>

      <section className="bg-[#f3f3f1] py-[4vw] md:pb-[8vw] px-0">
        {/* Text */}
        <div className="flex flex-col justify-center items-center mb-10 text-center px-6 md:px-[8vw] max-w-7xl mx-auto">
          <p className="text-[#1e2330] font-extrabold text-[6vw] sm:text-[5vw] md:text-[4vw] lg:text-[3vw] leading-tight">
            The only link in bio trusted by 70M+
          </p>
          <p className="text-[#2665d6] font-extrabold text-[6vw] sm:text-[5vw] md:text-[4vw] lg:text-[3vw] leading-tight">
            wellness sellers and celebrities
          </p>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden relative">
          <div className="flex animate-scroll gap-4">
            {[
              "/selena-gomez.jpeg",
              "/becky-g.webp",
              "/inna.jpg",
              "/nayer-regalado.png",
              "/jay-sean.jpg",
              "/pitbull.jpg",
              "/melissa-new.jpg",
            ].concat([
              "/selena-gomez.jpeg",
              "/becky-g.webp",
              "/inna.jpg",
              "/nayer-regalado.png",
              "/jay-sean.jpg",
              "/pitbull.jpg",
              "/melissa-new.jpg",
            ]).map((src, index) => (
              <img key={index} className="rounded-3xl h-80 w-72 flex-shrink-0" src={src} alt="homepage image" />
            ))}
          </div>
        </div>

        <style jsx>
          {`
            @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
            }
            .animate-scroll {
            display: flex;
            width: max-content;
            animation: scroll 40s linear infinite;
            }
         `}
        </style>
      </section>

      <section className="bg-[#f3f3f1] grid grid-cols-1 md:grid-cols-2 gap-4 px-[8vw] py-10">
        {/* Left side */}
        <div className="grid grid-rows-2 gap-4">
          <div className="flex flex-col gap-8 bg-[#e9c0e9] py-8 rounded-3xl">
            <img className="px-6 md:px-10 py-6" src="/home-7.avif" alt="homepage image" />
            <p className="text-[#1e2330] font-bold text-xl sm:text-2xl md:text-3xl px-4">
              Share your content in limitless ways on your BitTree.
            </p>
          </div>
          <div className="flex flex-col gap-8 bg-[#d2e823] py-8 rounded-3xl">
            <img className="px-10 md:px-20" src="/home-6.avif" alt="homepage image" />
            <p className="text-[#1e2330] font-bold text-xl sm:text-2xl md:text-3xl px-4">
              Sell products and collect payments. It&apos;s monetization made simple.
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="bg-[#061492] flex flex-col justify-center items-center gap-8 rounded-3xl py-10">
          <img className="px-8 md:px-12" src="/home-5.avif" alt="homepage image" />
          <p className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl px-4">
            Grow, own and engage your audience by unifying them in one place.
          </p>
        </div>
      </section>

      <section className="bg-[#f3f3f1] flex flex-col py-[11vw] gap-8 px-6 md:px-[8vw]">
        {/* Text Section */}
        <div className="flex flex-col justify-center items-center text-center">
          <p className="text-[#1e2330] font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-4xl leading-snug">
            The fast, friendly and powerful link in bio tool.
          </p>
        </div>

        {/* Button Section */}
        <div className="flex justify-center items-center">
          <button onClick={() => createTree()} className="bg-[#e9c0e9] text-[#1e2330] rounded-lg px-8 sm:px-10 py-3 sm:py-4 font-semibold cursor-pointer text-base sm:text-lg w-full sm:w-auto shadow-md hover:bg-[#d7aee0] transition">Explore all plans</button>
        </div>
      </section>

      <section className="bg-[#f3f3f1] flex flex-col items-center justify-center space-y-20 px-6 md:px-[8vw] pt-[5vw] pb-[11vw]">
        {/* Featured logos */}
        <div className="flex flex-col justify-center items-center gap-10 w-full">
          <p className="text-[#1e2330] font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center">
            As featured in...
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
            <div className="bg-white rounded-3xl px-8 md:px-16 py-6 flex items-center justify-center">
              <img src="/tc.svg" alt="tc" className="max-h-12 sm:max-h-14 md:max-h-16" />
            </div>

            <div className="bg-white rounded-3xl px-8 md:px-16 py-6 flex items-center justify-center">
              <img src="/insider.svg" alt="insider" className="max-h-12 sm:max-h-14 md:max-h-16" />
            </div>

            <div className="bg-white rounded-3xl px-8 md:px-16 py-6 flex items-center justify-center">
              <img src="/mashable.svg" alt="mashable" className="max-h-12 sm:max-h-14 md:max-h-16" />
            </div>

            {/* Bottom row full width */}
            <div className="col-span-1 md:col-span-3 flex flex-wrap justify-center gap-4">
              <div className="bg-white rounded-3xl px-8 md:px-16 py-6 flex items-center justify-center">
                <img src="/fortune.svg" alt="fortune" className="max-h-12 sm:max-h-14 md:max-h-16" />
              </div>

              <div className="bg-white rounded-3xl px-8 md:px-16 py-6 flex items-center justify-center">
                <img src="/forbes.svg" alt="forbes" className="max-h-12 sm:max-h-14 md:max-h-16" />
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="flex flex-col items-center justify-center gap-10 text-center">
          <img className="h-56 sm:h-72 md:h-96 object-contain" src="/home-8.webp" alt="homepage image" />

          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-[#1e2330] font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-5xl leading-snug">
              “BitTree simplifies the process for creators to share multiple parts of themselves in one inclusive link.”
            </p>
            <div className="flex flex-col justify-center items-center my-6">
              <p className="text-[#676b5f] text-base sm:text-lg md:text-xl font-semibold">Riley Lemon,</p>
              <p className="text-[#676b5f] text-base sm:text-lg md:text-xl font-semibold">
                Youtuber, Content Creator
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#780016] flex flex-col pb-[12vw] md:pb-[9vw]">
        <div className="flex flex-col justify-center items-center mt-20 md:mt-28 mb-10 md:mb-14 px-4 md:px-0">
          <p className="text-[#e9c0e9] font-extrabold text-4xl md:text-6xl text-center">Got questions?</p>
        </div>

        <div className="flex flex-col justify-center items-center w-full">
          {faqData.map((faq, index) => {
            const contentHeight = contentRefs.current[index]?.scrollHeight || 0;

            return (
              <div key={index} className="flex flex-col justify-center items-center mb-4 w-full">
                {/* Dropdown Button */}
                <button onClick={() => toggleDropdown(index)} className={`bg-[#51000f] border border-[#51000f] text-[#e9c0e9] text-lg md:text-2xl w-[90%] md:w-[70%] p-6 md:p-12 font-bold flex items-center justify-between transition-all duration-300 ${openIndex === index ? "rounded-t-3xl" : "rounded-3xl"}`}>
                  {faq.title}
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 md:h-6 md:w-6 text-[#e9c0e9]" />
                  ) : (
                    <ChevronDown className="h-5 w-5 md:h-6 md:w-6 text-[#e9c0e9]" />
                  )}
                </button>

                {/* Dropdown Content */}
                <div ref={(el) => (contentRefs.current[index] = el)} style={{ maxHeight: openIndex === index ? `${contentHeight}px` : "0px" }} className={`bg-[#51000f] text-[#e9c0e9] text-sm md:text-lg font-semibold w-[90%] md:w-[70%] overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? "rounded-b-3xl shadow-md border border-t-0 border-[#51000f]" : "border-transparent"}`}>
                  <div className="px-6 md:px-12 pb-6 md:pb-8">
                    <p className="whitespace-pre-line">{faq.content}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </main>
  );
}
