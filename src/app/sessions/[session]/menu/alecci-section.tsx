import React from 'react'
import Image from "next/image";
import heroImage from "@/assets/hero.jpg";
import logo from "@/assets/logo.jpg";

function AlecciSection() {
  return (
<div className=" mb-10  rounded-b-2xl border-b-6 relative  w-full     ">
            <Image src={heroImage} alt="hero-image" className=" w-full    " />
            <div className="w-48 absolute -bottom-10   left-1/2 !-translate-x-[50%] rounded-full overflow-hidden  border-4 border-amber-100  shadow-xl "> 
            <Image
              src={logo}
              alt="logo-image"
              className="      "
            />
            </div>
          </div>  )
}

export default AlecciSection