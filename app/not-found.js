import Image from "next/image";

export default function FourOhFour() {
  return <>
  <div className="min-h-screen  flex flex-col justify-center items-center space-y-20">
        <img src="/logo.svg" className="w-auto h-auto"></img>        
        <div className="w-full flex flex-col items-center py-8 space-y-20 px-6 text-center">
        <h1 className="font-semibold text-indigo text-5xl"> &#60; building /&#62;</h1>
        <p className=" text-xl font-bold"> Working day and night!</p> 
          </div>
      
  </div>

  </>
}
