import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import useAxios from "../hooks/useAxios"
import axios from '../api/axios';





const ClientRenew = ({Toggle,isOpen,contractData,clientData,countdown,countError,EstimatedDays,closeRenew}) => {

  const [RenewData, RenewError, RenewLoading, axiosFetchRenew] = useAxios();

  const HandleSubmit = async () => {
    await axiosFetchRenew({
      axiosInstance: axios,
      method: "POST",
      url: `/contract/createRequest`,
      requestConfig:{
        data:{
            ...renewData
        }
        }
    });
  };

  useEffect(() => {
    if (!RenewLoading) {
      if (RenewError) {
        alert(RenewError);
      } else if (RenewData.message === "client request added succesfully") {
        alert("Request sent succesfully")
        closeRenew()
      } else {
        console.log(RenewData);
      }
    }
  }, [RenewLoading]);

  const [renewData,setRenewData] = useState({
    clientID:clientData._id,
    ContractID:contractData._id,
    renew_ED : "",
    Status:"renewing"
  })

  

  useEffect(() => {
    if (contractData && clientData) {
      setRenewData({
        clientID: clientData._id,
        ContractID : contractData._id,
        renew_ED : "",
        Status:"renewing"
      });
    }
  }, [contractData, clientData]);

  const HandleInput = (e) => {
    const { name, value } = e.target;
  
    const renewDate = new Date(value);
    const contractEndDate = new Date(contractData.contract_ED);
    renewDate.setHours(0, 0, 0, 0);
    contractEndDate.setHours(0, 0, 0, 0);
  
    if (name === 'renew_ED' && renewDate <= contractEndDate) {
      setRenewData({
        ...renewData,
        [name]: ""
      });
      toast.error('Renew date should be greater than contract end date');
      return;
    }
  
    setRenewData({
      ...renewData,
      [name]: value,
    });
  };

  return (
    <div className={`${isOpen ? '': 'hidden'} flex flex-col justify-center fixed top-0 bg-dimWhite left-0 pt-[20px] items-center w-full h-screen  z-[50]`} onClick={Toggle}>
      <ToastContainer/>
        <div className='flex bg-white flex-col h-fit py-4 px-12 rounded-lg w-[1000px]' onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-center mb-4 border-b-2 ">
            <h1 className=" text-[20px] font-bold ">Renew Contract</h1>
        </div>
        <div className="flex gap-20">
            <div >
              <p>Current Contract Start Date</p>
              <p className=" text-[#000ac2] font-semibold">
                {contractData.contract_SD}
              </p>
            </div>
            <div>
              <p>Current Contract End Date</p>
              <p className=" text-[#000ac2] font-semibold">
                {contractData.contract_ED}
              </p>
            </div>
            </div>
            <div>
              <p>Contract Time remaining</p>
              <p className=" text-[#000ac2] font-semibold">
                {countdown ? <p>{Math.floor(countdown / (1000 * 60 * 60 * 24)) + ' days ' + Math.floor((countdown / (1000 * 60 * 60)) % 24) + ' hours ' + Math.floor((countdown / (1000 * 60)) % 60) + ' minutes ' + Math.floor((countdown / 1000) % 60) + ' seconds ' }</p> : countError  }
              </p>
            </div>
            <div>
              <p>Contract Estimated duration</p>
              <p className=" text-[#000ac2] font-semibold">
                {EstimatedDays ? EstimatedDays : 'loading'}
              </p>
            </div>
            <div className='py-2'>
        <p className=' text-red-600'>*Change contract end date to add more days</p>
      </div>
            <div className='flex flex-col gap-1'>
                <label>End date</label>
                <input type='date' name="renew_ED" onChange={HandleInput}  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>

            <div className="flex justify-end gap-4 mt-6">
            <button
              className=" bg-[#2962ff] text-white px-5 py-2 rounded-lg w-[150px] font-bold "
              onClick={HandleSubmit}
            >
              Renew
            </button>
            <button
              className=" bg-[#D50000] text-white px-5 py-2 rounded-lg w-[150px] font-bold "
              onClick={Toggle}
            >
              Cancel
            </button>
          </div>

            </div>
            </div>
  )
}

export default ClientRenew