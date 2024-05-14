import React, { useEffect, useState } from 'react'
import useAxios from "../hooks/useAxios"
import axios from '../api/axios';

const ClientTerminate = ({isOpen,Toggle,contractData,clientData,closeTermi}) => {


  const [TerData, TerError, TerLoading, axiosFetchTer] = useAxios();

  const HandleSubmit = async () => {
    await axiosFetchTer({
      axiosInstance: axios,
      method: "POST",
      url: `/contract/createRequest`,
      requestConfig:{
        data:{
            ...TerminateData
        }
        }
    });
  };

  useEffect(() => {
    if (!TerLoading) {
      if (TerError) {
        alert(TerError);
      } else if (TerData.message === "client request added succesfully") {
        alert("Request sent succesfully")
        closeTermi()
      } else {
        console.log(TerData);
      }
    }
  }, [TerLoading]);

  const [TerminateData,setTerminateData] = useState({
    clientID:clientData._id,
    ContractID:contractData._id,
    renew_ED : "",
    Status:"terminate"
  })

  

  useEffect(() => {
    if (contractData && clientData) {
      setTerminateData({
        clientID: clientData._id,
        ContractID : contractData._id,
        renew_ED : "",
        Status:"terminate"
      });
    }
  }, [contractData, clientData]);
  return (
    <div className={`${isOpen ? '': 'hidden'} flex flex-col justify-center fixed top-0 bg-dimWhite left-0 pt-[20px] items-center w-full h-screen  z-[50]`} onClick={Toggle}>
      <div className='flex bg-white flex-col h-fit py-4 px-12 rounded-lg w-[1000px]' onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-center mb-4 border-b-2 ">
          <h1 className=" text-[20px] font-bold ">Terminate Contract</h1>
      </div>

      <p className='text-[18px]'>Are u sure to terminate this contract ?</p>
      
          <div className="flex justify-end gap-4 mt-6">
          <button
            
            className=" bg-[#D50000] text-white px-5 py-2 rounded-lg w-[150px] font-bold "
            onClick={HandleSubmit}
          >
            Terminate
          </button>
          <button
            className=" bg-[#2962ff] text-white px-5 py-2 rounded-lg w-[150px] font-bold " 
            onClick={Toggle}
          >
            Cancel
          </button>
        </div>

          </div>
          </div>
  )
}

export default ClientTerminate