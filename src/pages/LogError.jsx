import React from 'react'

const LogError = ({Toggle,isOpen}) => {
  return (
    <div
      className={`${
        isOpen ? "" : "hidden"
      } flex flex-col bg-dimWhite fixed top-0 left-0 pt-[20px] justify-center items-center w-full h-screen z-[50]  `}
      onClick={Toggle}
    >
      <div
        className="flex bg-white flex-col  h-fit py-4 px-12 rounded-lg w-[1000px]"
        onClick={(e) => e.stopPropagation()}
      >
        <p>No client available</p>
        <button onClick={Toggle} className=" bg-red-500 text-white px-5 py-2 rounded-lg w-[150px] font-bold ">Close</button>
        </div>
        </div>     
  )
}

export default LogError