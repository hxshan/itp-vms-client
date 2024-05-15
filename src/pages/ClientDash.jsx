import React, { useEffect, useRef, useState } from 'react'
import ClientRenew from './ClientRenew';
import useAxios from "../hooks/useAxios"
import axios from '../api/axios';
import ViewVehical from './ViewVehical';
import ClientTerminate from './ClientTerminate';
import { useAuthContext } from '../hooks/useAuthContext';
import { useParams } from 'react-router-dom';





const ClientDash = () => {

  const {user} = useAuthContext()

  const params = useParams();

  //const navigate = useNavigate()

  //const contractID = params.id;

  const clientID = params.id

  const [countdown, setCountdown] = useState(null);
  const [EstimatedDays,setEstimatedDays] = useState('')
  const [countError,setError] = useState('')
  const [ContStatus,setContStatus] = useState('')
  const [openRenew,setopenRenew] = useState(false)
  const [openOptions,setopenOptions] = useState(false)


  const [contractData, setContractData] = useState({
    _id: "",
    Vehical: "",
    Vehical_Type:"loading",
    contract_SD: "loading",
    contract_ED: "loading",
    Insurance_Source: "loading",
    Insurace_provider: "loading",
    Policy_Number: "loading",
    Coverage_Type: "loading",
    Coverage_Amount: "loading",
    Deductible: "loading",
    Insurance_SD: "loading",
    Insurance_ED: "loading",
    Insurance_notes: "loading",
    Payment_Amount: "loading",
    Payment_Plan: "loading",
    Payment_Date: "loading",
    Amount_Payed: "loading",
    Status:"loading",
  });

  


  const [clientData, setclientData] = useState({
    _id: "",
    firstName: "loading",
    lastName: "loading",
    phoneNumber: "loading",
    nicNumber: "loading",
    email: "loading",
  });

  const [data, error, loading, axiosFetch] = useAxios()
  
  console.log(data)
  console.log(contractData)
  const getContract =()=>{
    axiosFetch({
     axiosInstance: axios,
     method: "GET",
     url: `/contract/getContractbyClientID/${clientID}`,
   });
 }
 const [vehicleData, vehicleError, vehicleLoading, axiosFetchVehicle] = useAxios();

 const [RequestData, ReqError, ReqLoading, axiosFetchReq] = useAxios();

 const closeRenew = () =>{
  setopenRenew(!openRenew)
  getContract();
 }

 const closeTermi = ()=>{
  setopenTerminate(!openTerminate)
  getContract()
 }

 


const [openVehical, setopenVehical] = useState(false);
const [openTerminate,setopenTerminate] = useState(false)

const fetchvehicaldat = () => {
 axiosFetchVehicle({
   axiosInstance: axios,
   method: "GET",
   url: `/contract/getvehical/${contractData.Vehical}`,
 });
};

const fetchRequest = () => {
  axiosFetchReq({
    axiosInstance: axios,
    method: "GET",
    url: `/contract/getRequestbyID/${clientData._id}`,
  });
 };


 useEffect(() => {
if (data) {
      setContractData({
        _id: data._id,
        Vehical_Type:data.Vehical_Type,
        Vehical: data.Vehical,
        contract_SD:new Date(data.contract_SD).toLocaleDateString(),
        contract_ED:new Date(data.contract_ED).toLocaleDateString(),
        Insurance_Source: data.Insurance_Source,
        Insurace_provider: data.Insurace_provider,
        Policy_Number: data.Policy_Number,
        Coverage_Type: data.Coverage_Type,
        Coverage_Amount: data.Coverage_Amount,
        Deductible: data.Deductible,
        Insurance_SD:new Date(data.Insurance_SD).toLocaleDateString(),
        Insurance_ED:new Date(data.Insurance_ED).toLocaleDateString(),
        Insurance_notes: data.Insurance_notes,
        Payment_Amount: data.Payment_Amount,
        Payment_Plan: data.Payment_Plan,
        Payment_Date:new Date(data.Payment_Date).toLocaleDateString(),
        Amount_Payed: data.Amount_Payed,
        Status:data.Status,
     });

      if(data.contract_ED && data.contract_SD){
        calculateTimeDiff(new Date(data.contract_SD),new Date(contractData.contract_ED))
        setEstimatedDays(calculateDateDiff(new Date(data.contract_SD),new Date(contractData.contract_ED)))
      }
      if(data.Status){
        setContStatus(data.Status);
        if (data.Status === "waiting for termination") {
          setopenOptions(true);
        } else {
          setopenOptions(false);
        }
      }
      

      if (data.clientID) {
       setclientData({
          _id: data.clientID._id,
          firstName: data.clientID.firstName,
          lastName: data.clientID.lastName,
          phoneNumber: data.clientID.phoneNumber,
          nicNumber: data.clientID.nicNumber,
         email: data.clientID.email,
        });
        fetchRequest()
      }
      if (data.Vehical) {
        fetchvehicaldat();
      }
    }
  }, [data]);

  useEffect(()=>{
    getContract();
  },[])

  const calculateDateDiff = (startDate,endDate)=>{

    const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
    var diffDays = Math.ceil(diffTime/(1000 * 60 * 60 * 24));

    let output = [];

    
    if (diffDays >= 365) {
        const diffYears = Math.floor(diffDays / 365);
        output.push(`${diffYears} year${diffYears !== 1 ? 's' : ''}`);
        diffDays -= diffYears * 365;
    }

    if (diffDays >= 30) {
        const diffMonths = Math.floor(diffDays / 30);
        output.push(`${diffMonths} month${diffMonths !== 1 ? 's' : ''}`);
        diffDays -= diffMonths * 30;
    }

    if (diffDays > 0) {
        output.push(`${diffDays} day${diffDays !== 1 ? 's' : ''}`);
    }
    
    return output.join(' and ');
}

const calculateTimeDiff = (startDate, endDate) => {
  const startDateTime = new Date(startDate);
  const endDateTime = new Date(endDate);
  const currentDateTime = new Date();

  startDateTime.setHours(startDateTime.getHours() - 5);
  startDateTime.setMinutes(startDateTime.getMinutes() - 30);

  if (startDateTime > currentDateTime) {
    setError("Can't start because start date is yet to come");
  } else {
    const diffMilliseconds = endDateTime - currentDateTime;

    if (diffMilliseconds >= 0) {
      setCountdown(diffMilliseconds);

      const intervalId = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 0) {
            clearInterval(intervalId);
            return 0;
          }
          return prevCountdown - 1000;
        });
      }, 1000);
    } else {
      // If the end date has already passed, set countdown to 0
      setCountdown(0);
    }
  }
}

if(!data){
 return(<div className='mt-[100px]'>No contract available</div>)
}
  return (
    <div>
     
      
     <div className='flex justify-center items-center w-full mt-[100px]'>
      <div className="bg-[#D9D9D9] h-fit rounded-lg py-4 flex flex-col justify-evenly my-4 w-fit px-10">
        <div className="flex justify-evenly">
        <div >
        <div className=" w-fit h-fit  pb-8 rounded-xl">
              <div className=" text-center border-b-2 border-black pb-2">
                <p className=" text-[25px] font-bold">Client details</p>
              </div>

              <div className="flex mt-3">
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Client name</p>
                  <p className="shadow appearance-none border rounded w-[200px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white">
                    {clientData.firstName} {clientData.lastName}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex  mt-3">
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold">Client email</p>
                    <p className="shadow appearance-none border rounded w-[200px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white">
                      {clientData.email}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1 ml-10">
                    <p className="font-semibold">Client National ID</p>
                    <p className="shadow appearance-none border rounded w-[200px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white">
                      {clientData.nicNumber}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Phone number</p>
                  <p className="shadow appearance-none border rounded w-[200px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white">
                    {clientData.phoneNumber}
                  </p>
                </div>
              </div>
            </div>

            <div className="  w-fit h-fit  pb-8 rounded-xl ">
              <div className=" text-center border-b-2 border-black pb-2 mb-3">
                <p className="text-[25px] font-bold">Rental Info</p>
              </div>

              <div className="flex flex-col gap-1 mb-3">
                <p className="font-semibold">Vehical Type</p>
                <p className="shadow appearance-none border rounded w-[200px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white">
                  {contractData.Vehical_Type}
                </p>
              </div>
              <div className="flex mb-3">
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Contract Start Date</p>
                  <p className="shadow appearance-none border rounded w-[200px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white">
                    {contractData.contract_SD}
                  </p>
                </div>
                <div className="flex flex-col gap-1 ml-10">
                  <p className="font-semibold">Contract End Date</p>
                  <p className="shadow appearance-none border rounded w-[200px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white">
                    {contractData.contract_ED}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-1 mb-3">
                <p className="font-semibold">Contract Estimated duration</p>
                <p className="shadow appearance-none border rounded w-[200px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white">
                  {EstimatedDays ? EstimatedDays : "loading"}
                </p>
              </div>
              <div className="flex flex-col gap-1 mb-3">
                <p className="font-semibold">Contract Time remaining</p>
                <p className="shadow appearance-none border rounded w-[450px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white">
                  {countdown ? (
                    <p>
                      {Math.floor(countdown / (1000 * 60 * 60 * 24)) +
                        " days " +
                        Math.floor((countdown / (1000 * 60 * 60)) % 24) +
                        " hours " +
                        Math.floor((countdown / (1000 * 60)) % 60) +
                        " minutes " +
                        Math.floor((countdown / 1000) % 60) +
                        " seconds "}
                    </p>
                  ) : (
                    countError
                  )}
                </p>
              </div>

              <div className="flex flex-col gap-1 mb-4">
                <p className="font-semibold">Contract Status</p>
                <p className=" shadow appearance-none border rounded w-[200px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white">
                  {ContStatus}
                </p>
              </div>

              <button
                className=" bg-orange-400 text-white px-5 py-2 rounded-lg w-[150px] font-bold  "
                onClick={() => {
                  setopenVehical(!openVehical);
                }}
              >
                Show vehical
              </button>
              <ViewVehical
                vehicalData={vehicleData}
                Toggle={() => {
                  setopenVehical(!openVehical);
                }}
                isOpen={openVehical}
              />
              
            </div>
        </div>

        <div className="flex flex-col ml-12">
        
        <div className="  w-fit h-fit  pb-8 rounded-xl">
              <div className=" text-center border-b-2 border-black pb-2">
                <p className="text-[25px] font-bold">Insurance Info</p>
              </div>

              <div className="flex flex-col gap-1 mt-3">
                <label className="font-semibold">Insurance source</label>
                <p className="shadow appearance-none border rounded w-[180px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white">
                  {contractData.Insurance_Source}
                </p>
              </div>

              <div className="flex  mt-3">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold">
                    Name of Insurance provider
                  </label>
                  <p className="shadow appearance-none border rounded w-[180px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white">
                    {contractData.Insurace_provider}
                  </p>
                </div>

                <div className="flex flex-col gap-1 ml-5">
                  <label className="font-semibold">Policy number</label>
                  <p className="shadow appearance-none border rounded w-[180px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white">
                    {contractData.Policy_Number}
                  </p>
                </div>
              </div>

              <div className="flex flex-col mt-3 gap-1">
                <label className="font-semibold">Coverage Type</label>
                <p className="shadow appearance-none border rounded w-[180px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white">
                  {contractData.Coverage_Type}
                </p>
              </div>

              <div className="flex  mt-3">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold">Coverage amount</label>
                  <p className="shadow appearance-none border rounded w-[180px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white">
                    {contractData.Coverage_Amount === "loading"
                      ? "loading"
                      : Number(contractData.Coverage_Amount).toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-col ml-9 gap-1">
                  <label className="font-semibold">Deductible</label>
                  <p className="shadow appearance-none border rounded w-[180px]  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white">
                    {contractData.Deductible === "loading"
                      ? "loading"
                      : Number(contractData.Deductible).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mt-3">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold">Start date</label>
                  <p className="shadow appearance-none border rounded w-[180px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white">
                    {contractData.Insurance_SD}
                  </p>
                </div>

                <div className="flex flex-col ml-5 gap-1">
                  <label className="font-semibold">End date</label>
                  <p className="shadow appearance-none border rounded w-[180px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white">
                    {contractData.Insurance_ED}
                  </p>
                </div>
              </div>

              <div className="flex flex-col mt-3 gap-1">
                <label className="font-semibold">Additianol notes</label>
                <p className="shadow appearance-none border rounded w-[400px] h-[100px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white">
                  {contractData.Insurance_notes}
                </p>
              </div>
            </div>
            <div className="  w-fit h-fit rounded-xl ">
              <div className=" text-center border-b-2 border-black pb-2">
                <p className="text-[25px] font-bold">Payment Info</p>
              </div>

              <div className="flex flex-col mt-3 gap-1">
                <label className="font-semibold">Amount</label>
                <p className="shadow appearance-none border rounded w-[180px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white">
                  {contractData.Payment_Amount === "loading"
                    ? "loading"
                    : Number(contractData.Payment_Amount).toLocaleString()}
                </p>
              </div>

              <div className="flex mt-3">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold">Payment plan</label>
                  <p className="shadow appearance-none border rounded w-[180px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white">
                    {contractData.Payment_Plan}
                  </p>
                </div>

                <div className="flex flex-col ml-10 gap-1">
                  <label className="font-semibold">Payment date</label>
                  <p className="shadow appearance-none border rounded w-[180px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white">
                    {contractData.Payment_Date}
                  </p>
                </div>
              </div>

              <div className="flex mt-3">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold">Amount payed</label>
                  <p className="shadow appearance-none border rounded w-[180px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white">
                    {contractData.Amount_Payed === "loading"
                      ? "loading"
                      : Number(contractData.Amount_Payed).toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-col gap-1 ml-10">
                  <p className="font-semibold">Amount Due</p>
                  <p className="shadow appearance-none border rounded w-[180px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white">
                    {contractData.Payment_Amount === "loading" ||
                    contractData.Amount_Payed === "loading"
                      ? "loading"
                      : Number(
                          contractData.Payment_Amount -
                            contractData.Amount_Payed
                        ).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
        </div>
        <div className="flex flex-col ml-12">
        <div className=" w-fit h-fit  pb-8 rounded-xl">
            <div className=" text-center border-b-2 border-black pb-2"> 
              <p className=" text-[25px] font-bold">Contract options</p>
            </div>

            <div className={`${ openOptions && RequestData.length == 0  ? "": "hidden" } flex  w-[300px] justify-between mt-3 ` }>
              <div className="flex flex-col gap-1">
                <label className='font-semibold'>Renew contract</label>
                <button className=" bg-blue-500 text-white px-5 py-2 rounded-lg w-[150px] font-bold " onClick={()=>{setopenRenew(!openRenew)}}>Renew</button>
              </div>

              <div className="flex flex-col gap-1 ml-4">
                <label className='font-semibold'>Terminate contract</label>
                <button className=" bg-red-500 text-white px-5 py-2 rounded-lg w-[150px] font-bold " onClick={()=>{setopenTerminate(!openTerminate)}}>Terminate</button>
              </div>
              <ClientRenew Toggle={()=>{setopenRenew(!openRenew)}} isOpen={openRenew} contractData={contractData} clientData={clientData} countdown={countdown} countError={countError} EstimatedDays={EstimatedDays} closeRenew={closeRenew}/>
              <ClientTerminate Toggle={()=>{setopenTerminate(!openTerminate)}} isOpen={openTerminate} contractData={contractData} clientData={clientData} closeTermi={closeTermi}/>
            </div>
            <div className="flex flex-col w-[300px] justify-between mt-4">
            <div className="flex flex-col gap-1">
                <label className='font-semibold'>Company Number</label>
                <p className="shadow appearance-none border rounded w-full py-2 px-3 text-blue-700 leading-tight focus:outline-none focus:shadow-outline bg-white">011 2934345</p>
              </div>

              <div className="flex flex-col gap-1 mt-3">
                <label className='font-semibold'>Company Email</label>
                <p className="shadow appearance-none border rounded w-full py-2 px-3 text-blue-700 leading-tight focus:outline-none focus:shadow-outline bg-white">Clientcontract@gmail.com</p>
              </div>
              </div>
          </div>
        </div>
      </div>
      </div>
      </div>
    </div>
  )
}

export default ClientDash