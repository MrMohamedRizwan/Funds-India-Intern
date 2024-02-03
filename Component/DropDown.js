import style from '../styles/cagrInput.module.scss';
import testStyles from '../styles/track-transact.module.scss'
import Image from "../components/Image";
import { useState } from 'react';
export default function Dropdown({ heading, options,value,onChange }) {

 
   


    return (
        <div className="flex flex-col">
            <div className="w-full mb-[10px]  ">{heading}</div>


            <div className="flex-shrink-0   max-phablet-col:w-[120px] " >
                <div className={testStyles.inputBox} >
                   
                    <select
                            value={value}
                            onChange={(e)=>{
                                onChange(e.target.value)
                            
                            }}
                            className={'h-[40px] md:w-[337px] xs:w-[220px] pr-[41px] bg-[#E2EEFA] border-2 border-solid border-[#CCCCCC] rounded-[100px] font-semibold backdrop-blur-[30px] cursor-pointer ring-[0.1px] ring-[#505C6227] phablet-col:w-[100%] phone:w-[300px] small:w-[290px]'}
                            >
                                
                              <option value={"Select"}>--Select--</option>
                            {options.length>0&& options.map((amc) => (
                            <option key={amc.value} value={amc.value||amc.schemeCode}  >
                            {amc.name}
                            </option>
                            ))}
                    </select>


                </div>
            </div>
        </div >

    );
}