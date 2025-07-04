import React, { useState } from 'react'
import Info from '../../components/infos/Info';
import Btn from '../../components/buttons/Btn';
import PendingApp from '../../sections/loans/PendingApp';
import ExportBtn from '../../components/buttons/ExportBtn';
import Search from '../../components/Search';
import LoanTable from '../../sections/loans/LaonTable';
import { useAllLoansQuery, useLoanMetricsQuery } from '../../utils/api';
import AppWidgets from '../../components/AppWidgets';
// import dayjs from 'dayjs';




const list = [
  {
    label: 'All'
  },
  // {
  //   label: 'Today'
  // },
  {
    label: 'Last 7 days'
  },
  {
    label: 'Last 30 Days'
  },
]


const tableList = [
  {
    label: 'All'
  },
  {
    label: 'Active'
  },
  {
    label: 'Overdue'
  },
  {
    label: 'Completed'
  },
]

const Loans = () => {

  const [activeItem, setActiveItem] = useState('Today');
  const [activeTableItem, setActiveTableItem] = useState('All');


  const getQueryParams = (label: string) => {
    const now = new Date();
    const endDate = now.toISOString();
    let startDate;
  
    switch (label) {
      case 'Last 7 days':
        startDate = new Date(now.setDate(now.getDate() - 7)).toISOString();
        return { duration: 'custom', startDate, endDate };
      case 'Last 30 Days':
        startDate = new Date(now.setDate(now.getDate() - 30)).toISOString();
        return { duration: 'custom', startDate, endDate };
      case 'All':
      case 'All Time':
      default:
        return { duration: 'allTime' };
    }
  };
  


  const { data } = useLoanMetricsQuery(getQueryParams(activeItem))

  const { data: loanData } = useAllLoansQuery({status: ''});



  return (
    <div className='h-full flex flex-col w-full px-2 md:px-8 gap-8 lg:gap-[50px]'>
      <div className="flex flex-col lg:flex-row w-full gap-5">
          <div className="flex-[2] flex gap-4 flex-col w-full justify-between">
            <div className="flex w-full justify-between my-2">
                <Info text='Overview'/>

                <div className="hidden md:flex items-center gap-4">
                {list.map((i) => (
                    <Btn 
                      onClick={() => setActiveItem(i.label)}
                      activeItem={activeItem} 
                      label={i.label} 
                      key={i.label}/>
                  ))
                  }
                </div>
            </div>
            <div className="flex flex-col justify-center md:justify-between md:flex-row flex-wrap gap-5">


              <AppWidgets className='w-full md:w-[48%]' title='Revenue Generated' icon='/loan/wallet.png' icon2='/arrow-right.svg' num={data?.data?.revenueGenerated.toLocaleString()} bgColor='#27AE60' text2='0'/>

              <AppWidgets className='w-full md:w-[48%]' title='Active Loans' icon='/loan/save-add.png' icon2='/arrow-right.svg' num={data?.data?.activeLoans.toLocaleString()} bgColor='#27AE60' text2='0'/>

              <AppWidgets className='w-full md:w-[48%]' title='Repaid Loans' icon='/loan/archive-tick.png' icon2='/arrow-right.svg' num={data?.data?.repaidLoans.toLocaleString()} bgColor='#27AE60' text2='0'/>

              <AppWidgets className='w-full md:w-[48%]' title='Disbursed Loans' icon='/loan/information.png' icon2='/arrow-right.svg' num={data?.data?.disbursedLoans.toLocaleString()} bgColor='#27AE60' text2='0'/>

              <AppWidgets className='w-full md:w-[48%]' title='Total Loan Disbursed' icon='/loan/wallet.png' icon2='/arrow-right.svg' num={data?.data?.totalAmountDisbursed.toLocaleString()} bgColor='#27AE60' text2='0'/> 

              <AppWidgets className='w-full md:w-[48%]' title='Defaulted Loans' icon='/loan/information.png' icon2='/arrow-right.svg' num={data?.data?.defaultedLoans.toLocaleString()} bgColor='#27AE60' text2='0'/>

            </div>
          </div>
          

          <div className="flex-1 flex w-full md:w-[300px]">
            <PendingApp/>
          </div>
      </div>

      <div className="w-full flex flex-col my-2 gap-6 rounded-3xl border-[1px] p-4">
          <div className="flex items-center justify-between">
              <Info text='Loans'/>
              <ExportBtn text='Export'/>
          </div>

          <div className="flex items-center justify-between">
               <Search onClick={() => {}} placeholder='Search for loans, users, or reports...'/>
              <div className="hidden md:flex items-center gap-4">
                {tableList.map((i) => (
                    <Btn onClick={() => setActiveTableItem(i.label)} activeItem={activeTableItem} label={i.label} key={i.label}/>
                  ))
                  }
              </div>
          </div>

          <div className="w-full">
              <LoanTable loanData={loanData?.data ?? []} key={loanData?.data?._id}/>
          </div>
      </div>
    </div>
  )
}

export default Loans;
