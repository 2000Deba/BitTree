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
      <section className="bg-[#254f1a] min-h-[100vh] grid grid-cols-2 py-[16vw]">
        <div className="flex justify-center flex-col ml-[10vw] gap-3">
          <p className="text-yellow-300 font-bold text-7xl">Everything you</p>
          <p className="text-yellow-300 font-bold text-7xl">are. In one,</p>
          <p className="text-yellow-300 font-bold text-7xl">simple link in bio.</p>
          <p className="text-yellow-300 text-xl my-4">Join 70M+ people using BitTree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
          <div className="input flex gap-2">
            <input value={text} onChange={(e) => setText(e.target.value)} className="bg-white px-2 py-2 focus:outline-green-800 rounded-md" type="text" placeholder="Enter your Handle" />
            <button onClick={() => { createTree() }} className="bg-pink-300 rounded-full px-4 py-4 font-semibold cursor-pointer">Claim your BitTree</button>
          </div>
        </div>
        <div className="flex justify-center items-center flex-col mr-[10vw]">
          <img src="/home.png" alt="homepage image" />
        </div>
      </section>
      <section className="bg-[#e9c0e9] min-h-[100vh] grid grid-cols-2 py-[11vw]">
        <div className="flex justify-center items-center flex-col ml-[10vw]">
          <img src="/home-2.png" alt="homepage image" />
        </div>
        <div className="flex justify-center flex-col mr-[10vw] gap-3">
          <p className="text-[#502274] font-extrabold text-5xl">Create and customize</p>
          <p className="text-[#502274] font-extrabold text-5xl">your BitTree in</p>
          <p className="text-[#502274] font-extrabold text-5xl">minutes</p>
          <p className="text-[#1e2330] text-xl font-semibold my-4">Connect your TikTok, Instagram, Twitter, website, store, videos, music, podcast, events and more. It all comes together in a link in bio landing page designed to convert.</p>
          <div className="flex">
            <button onClick={() => { createTree() }} className="bg-[#502274] text-white rounded-full px-10 py-4 w-64  font-semibold cursor-pointer">Get started for free</button>
          </div>
        </div>
      </section>
      <section className="bg-[#780016] min-h-[100vh] grid grid-cols-2 py-[11vw]">
        <div className="flex justify-center flex-col ml-[10vw] gap-3">
          <p className="text-[#e9c0e9] font-extrabold text-5xl">Share your BitTree</p>
          <p className="text-[#e9c0e9] font-extrabold text-5xl">from your Instagram,</p>
          <p className="text-[#e9c0e9] font-extrabold text-5xl">TikTok, Twitter and</p>
          <p className="text-[#e9c0e9] font-extrabold text-5xl">other bios</p>
          <p className="text-white text-xl my-4">Add your unique BitTree URL to all the platforms and places you find your audience. Then use your QR code to drive your offline traffic online.</p>
          <div className="flex">
            <button onClick={() => { createTree() }} className="bg-[#e9c0e9] rounded-full px-10 py-4 w-64 font-semibold cursor-pointer">Get started for free</button>
          </div>
        </div>
        <div className="flex justify-center items-center flex-col mr-[10vw]">
          <img src="/home-3.png" alt="homepage image" />
        </div>
      </section>
      <section className="bg-[#e8efd6] min-h-[100vh] gap-20 grid grid-cols-2 py-[11vw]">
        <div className="flex justify-center items-center flex-col ml-[10vw]">
          <img src="/home-4.avif" alt="homepage image" />
        </div>
        <div className="flex justify-center flex-col mr-[10vw] gap-3">
          <p className="text-[#1e2330] font-extrabold text-5xl">Analyze your</p>
          <p className="text-[#1e2330] font-extrabold text-5xl">audience and keep</p>
          <p className="text-[#1e2330] font-extrabold text-5xl">your followers</p>
          <p className="text-[#1e2330] font-extrabold text-5xl">engaged</p>
          <p className="text-[#1e2330] text-xl font-semibold my-4">Track your engagement over time, monitor revenue and learn what&apos;s converting your audience. Make informed updates on the fly to keep them coming back.</p>
          <div className="flex">
            <button onClick={() => { createTree() }} className="bg-[#e9c0e9] rounded-full px-10 py-4 w-64  font-semibold cursor-pointer">Get started for free</button>
          </div>
        </div>
      </section>
      <section className="bg-[#f3f3f1] min-h-[100vh] grid grid-rows-2 pt-[4vw] pb-[11vw]">
        <div className="flex flex-col justify-center items-center mx-[10vw]">
          <p className="text-[#1e2330] font-extrabold text-[4vw]">The only link in bio trusted by 70M+</p>
          <p className="text-[#2665d6] font-extrabold text-[4vw]">wellness sellers and celebrities</p>
        </div>
        <div className="flex flex-row justify-center items-center mx-[10vw] gap-4">
          <img className="rounded-3xl h-64 w-52" src="/selena-gomez.jpeg" alt="homepage image" />
          <img className="rounded-3xl h-64 w-52" src="/becky-g.webp" alt="homepage image" />
          <img className="rounded-3xl h-64 w-52" src="/inna.jpg" alt="homepage image" />
          <img className="rounded-3xl h-64 w-52" src="/nayer-regalado.png" alt="homepage image" />
          <img className="rounded-3xl h-64 w-52" src="/jay-sean.jpg" alt="homepage image" />
          <img className="rounded-3xl h-64 w-52" src="/pitbull.jpg" alt="homepage image" />
        </div>
      </section>
      <section className="bg-[#f3f3f1] min-h-[100vh] gap-4 grid grid-cols-2 px-[5vw]">
        <div className="justify-center items-center grid grid-rows-2 gap-4">
          <div className="flex flex-col gap-20 bg-[#e9c0e9] py-8 rounded-3xl">
            <img className="px-10 py-6" src="/home-7.avif" alt="homepage image" />
            <p className="text-[#1e2330] font-bold text-3xl px-4">Share your content in limitless ways on your BitTree.</p>
          </div>
          <div className="flex flex-col gap-20 bg-[#d2e823] py-8 rounded-3xl">
            <img className="px-20" src="/home-6.avif" alt="homepage image" />
            <p className="text-[#1e2330] font-bold text-3xl px-4">Sell products and collect payments. It&apos;s monetization made simple.</p>
          </div>
        </div>
        <div className="bg-[#061492] flex flex-col justify-center items-center gap-12 rounded-3xl">
          <img className="px-12" src="/home-5.avif" alt="homepage image" />
          <p className="text-white font-bold text-2xl px-4">Grow, own and engage your audience by unifying them in one place.</p>
        </div>
      </section>
      <section className="bg-[#f3f3f1] min-h-[60vh] grid grid-rows-2 py-[11vw] gap-10">
        <div className=" flex flex-col justify-center items-center mx-[10vw]">
          <p className="text-[#1e2330] text-6xl font-extrabold max-w-3xl">The fast, friendly and</p>
          <p className="text-[#1e2330] text-6xl font-extrabold max-w-3xl">powerful link in bio tool.</p>
        </div>
        <div className="flex justify-center items-center">
          <button onClick={() => { createTree() }} className="bg-[#e9c0e9] rounded-full px-10 py-5 w-64 font-semibold cursor-pointer">Explore all plans</button>
        </div>
      </section>
      <section className="bg-[#f3f3f1] min-h-[100vh] flex flex-col items-center justify-center space-y-28">
        <div className=" flex flex-col justify-center items-center mx-[10vw] gap-10">
          <p className="text-[#1e2330] text-6xl font-extrabold max-w-3xl">As featured in...</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-3xl px-8 md:px-16 py-6 flex items-center justify-center">
              <img src="/tc.svg" alt="tc" />
            </div>

            <div className="bg-white rounded-3xl px-8 md:px-16 py-6 flex items-center justify-center">
              <img src="/insider.svg" alt="insider" />
            </div>

            <div className="bg-white rounded-3xl px-8 md:px-16 py-6 flex items-center justify-center">
              <img src="/mashable.svg" alt="mashable" />
            </div>

            <div className="col-span-1 md:col-span-3 flex justify-center gap-4">
              <div className="bg-white rounded-3xl px-8 md:px-16 py-6 flex items-center justify-center">
                <img src="/fortune.svg" alt="fortune" />
              </div>

              <div className="bg-white rounded-3xl px-8 md:px-16 py-6 flex items-center justify-center">
                <img src="/forbes.svg" alt="forbes" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-14">
          <img className="h-96" src="/home-8.webp" alt="homepage image" />
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <p className="text-[#1e2330] text-6xl font-extrabold mx-[10vw]">“BitTree simplifies the process for</p>
              <p className="text-[#1e2330] text-6xl font-extrabold mx-[10vw]">creators to share multiple parts of</p>
              <p className="text-[#1e2330] text-6xl font-extrabold mx-[10vw]">themselves in one inclusive link.”</p>
              <div className="flex flex-col justify-center items-center my-12">
                <p className="text-[#676b5f] text-xl font-semibold">Riley Lemon,</p>
                <p className="text-[#676b5f] text-xl font-semibold">Youtuber, Content Creator</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#780016] min-h-[100vh] flex flex-col pb-[9vw]">
        <div className="justify-center items-center flex flex-col mt-28 mb-14">
          <p className="text-[#e9c0e9] font-extrabold text-6xl">Got questions?</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          {faqData.map((faq, index) => {
            // Calculate dynamic height for smooth expand/collapse
            const contentHeight = contentRefs.current[index]?.scrollHeight || 0;

            return (
              <div key={index} className="flex flex-col justify-center items-center mb-4 w-full">
                {/* Dropdown Button */}
                <button onClick={() => toggleDropdown(index)} className={`bg-[#51000f] border border-[#51000f] text-[#e9c0e9] text-2xl w-[70%] p-12 font-bold flex items-center justify-between transition-all duration-300 ${openIndex === index ? "rounded-t-3xl border border-[#51000f]" : "rounded-3xl border border-[#51000f]"}`}>
                  {faq.title}
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-[#e9c0e9]" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-[#e9c0e9]" />
                  )}
                </button>

                {/* Dropdown Content */}
                <div ref={(el) => (contentRefs.current[index] = el)} style={{ maxHeight: openIndex === index ? `${contentHeight}px` : "0px", }} className={`bg-[#51000f] text-[#e9c0e9] text-lg font-semibold w-[70%] overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? "rounded-b-3xl shadow-md border border-t-0 border-[#51000f]" : "border-transparent"}`}>
                  <div className="bg-[#51000f]">
                    <p className="pb-8 px-12 whitespace-pre-line">{faq.content}</p>
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
