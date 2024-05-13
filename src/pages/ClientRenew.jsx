import React from 'react'

const ClientRenew = ({Toggle,isOpen,contractData,clientData,countdown,countError,EstimatedDays}) => {

    //const HandleInput = (e)=>{
      //  const {name,value} = e.target;
    
      //  if(name === "contract_SD" || name === "contract_ED"){
       //   if(name === "contract_SD" && contractData.contract_ED){
       //       const result = inRange(value,contractData.contract_ED)
       //       if(result === 'INRANGE'){
       //         setEstimatedDays(calculateDateDiff(new Date(value),new Date(contractData.contract_ED)))
       //       }else{
       //         setEstimatedDays(result)
      //        }
      //    }else if(name === "contract_ED" && contractData.contract_SD){
      //        const result = inRange(contractData.contract_SD,value)
      //        if(result === 'INRANGE'){
        //        setEstimatedDays(calculateDateDiff(new Date(contractData.contract_SD),new Date(value)))
       //       }else{
      //          setEstimatedDays(result)
        //      }
        //  }
     // }
    
    
      //  setContractData({
         //   ...contractData,
        //    [name]:value
       // })
     // }

  return (
    <div className={`${isOpen ? '': 'hidden'} flex flex-col justify-center fixed top-0 bg-dimWhite left-0 pt-[20px] items-center w-full h-screen  z-[50]`} onClick={Toggle}>

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
                <input type='date' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='contract_ED'/>
            </div>

            <div className="flex justify-end gap-4 mt-6">
            <button
              className=" bg-[#2962ff] text-white px-5 py-2 rounded-xl w-[120px] font-bold "
              
            >
              Renew
            </button>
            <button
              className=" bg-[#D50000] text-white px-5 py-2 rounded-xl w-[120px] font-bold "
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