import { PageSEO } from "@/components/SEO";
import Image from "@/components/Image";
import styles from "@/styles/home-page-index.module.scss";
import Model from "../components/model.js";
import { useEffect, useState } from "react";
import HomePageTestimonial from "./homePageTestimonial.js";
import Link from "../components/Link.js";
import { CDN_PATH } from "../common/constants.js";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import teststtyles from "../styles/track-transact.module.scss";


import DropDown from "../components/DropDown.js";
import { set } from "lodash";






const Track_Transact = () => {

  const [nav,setNav ] = useState(0);
  const [changePercent,setChangePercent ] = useState("0%");
  const [change,setChange]=useState(0);

  const dodata={"content": [
    {
      name: "Aditya Birla SL CRISIL IBX 60:40 SDL + AAA PSU - Apr 2027 Index Fund-Reg(G)",
      schemeCode: "46227",
    }
  ]}
  const [amcArray, setamcArray] = useState({});
const [schemeArray,setSchemeArray]=useState({});


const getAMCDetails = () => {
  fetch(`https://api.fundsindia.com/core/products/mf/form`, {
    headers: {
      "Content-Type": "application/json",
      "x-api-version": "1.0.0",
    },
      method: "get",
    })
      .then((res) => res.json())
      .then((res) => {
        // Use setamcArray to update the state
        const arr=res.data.amcs ||{};
        const testarr={amcs:['rizwan','rizwan2']}
        console.log("track-transact",arr);
        setamcArray(arr);

      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  
  
  const [selectedValue1, setSelectedValue1] = useState('select');
  const [selectedValue2, setSelectedValue2] = useState('select');
const logSelectedValue = (selectedValue) => {
  setNav(0);
  setChangePercent(0);
  setChange(0);
  setSelectedValue1(selectedValue);
  setSelectedValue2("select");
  handleChange(0);
      // console.log('Selected Value in File 2:', selectedValue);
  
      const apiUrl = 'https://api.fundsindia.com/core/products/mf';
  
  const requestBody = {
    page: 1,
    size: 100,
    orderBy: 'rating',
    orderType: 'DESC',
    categories: [],
    subCategories: [],
    query: '',
    risk: [],
    ratings: [],
    amcs: [
      {
        // name: 'Aditya Birla Sun Life',
        // sort: true,
        value: selectedValue,
      },
    ],
    searchCode: [],
  };
  
  // Fetch details from the API
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "x-api-version": "1.0.0",
      // You might need additional headers, such as authorization tokens
    },
    body: JSON.stringify(requestBody),
  })
  .then((res) => res.json())
  .then((res) => {
    // Use setamcArray to update the state
    // const arr=res.data ||[]
    const schemeNameToCodeMap = {};

    const jsonData=res.data.content ||{}  ;
    jsonData.forEach(item => {
      schemeNameToCodeMap[item.name] = item.schemeCode;
    });
    console.log(schemeNameToCodeMap);
    // console.log("track-transact",res.data)
    // const schemeNames = jsonData.map(item => item.name);
    // console.log(schemeNames);
    setSchemeArray(jsonData);
  
  })
  .catch((err) => {
    console.log("Error", err);
  });
  
  console.log('Selected  File 2:', selectedValue);

      
    };


    const logSelectedSchemeValue=(selectedValue)=>{
      console.log('Selected Scheme Value in File 2:', selectedValue);
      const schemeCode=selectedValue;
      getNavDetails(schemeCode);
      setSelectedValue2(selectedValue);
    }

    const getNavDetails = (schemeCode) => {
      console.log("schemeCode of  Nav details",schemeCode);
      fetch(`https://api.fundsindia.com/core/product-search/mf/scheme-details?schemeCode=${schemeCode}`, {
        headers: {
          "Content-Type": "application/json",
          "x-api-version": "1.0.0",
        },
          method: "get",
        })
          .then((res) => res.json())
          .then((res) => {
            // Use setamcArray to update the state
            const navData=res.data ||{};
            // console.log("nav Detailsfbhuewhi",navData)
            const nav = navData.nav;
            setNav(nav);
            const changePercent = (navData.changePercent).toFixed(2);
            setChangePercent(`${changePercent}%`);
            const change = (navData.change).toFixed(2);
            setChange(change)

            console.log("nav",nav);
            console.log("changePercent",changePercent);
            console.log("chang",navData.change);


            handleChange(navData.change);
          })
          .catch((err) => {
            console.log("ERroR", err);
          });
    }
  // Call getAMCDetails on component mount
  useEffect(() => {
    getAMCDetails();
  }, []); // Empty dependency array ensures the effect runs only once on mount



  
  const [CaretValue, CaretSetValue] = useState(0);
  


  const handleChange = (changePercent) => {
    // Update the state value
    console.log("handler",changePercent)
    if(changePercent>=0)
    {CaretSetValue(0);console.log("Green")}
    else
    {CaretSetValue(1);console.log("Red")}

  };
  // const [assessmentYear, setAssessmentYear] = useState("2024-2025");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [redirectPath, setRedirectPath] = useState("");
  const [loginSession, setLoginSession] = useState(true);
  let timeout;
  const [active, setActive] = useState(false);
  

  const handleClose = () => {
    setOpen(false);
    try {
      $zoho.salesiq.floatbutton.visible("show");
  } catch {
      //console.log("zoho chat loading failed")
  }
  };

  const checkLoginFlag = () => {
    if (getCookie("loginInFlag") == true) {
      setLoginSession(true);
    } else {
      setLoginSession(false);
    }
  };

  const onRedirect = (url) => {
    if (loginSession) {
      router.push(url);
    } else {
      setOpen(true);
      try {
        $zoho.salesiq.floatbutton.visible("hide");
    } catch {
        //console.log("zoho chat loading failed")
    }
      setRedirectPath(url);
    }
  };

  const [mediaJson, setMediaContent] = useState([]);

  const [mediaFi, setMediaFi] = useState([]);



  const [fundsindiaOfferings, setfundsindiaOfferings] = useState([]);

  const fetchFiMediaDetails = () => {
    fetch(CDN_PATH + `media.json`)
      .then((res) => res.json())
      .then((res) => {
        setMediaFi(res);
      });
  };

  const fetchfundsindiaOfferings = () => {
    fetch(CDN_PATH + `fundsindia-offerings.json`)
      .then((res) => res.json())
      .then((res) => {
        setfundsindiaOfferings(res);
      });
  };

  const [transactionDetails, setTransactionDetails] = useState({});

  const fetchTransactionDetails = () => {
    fetch(CDN_PATH + `data${process.env.NEXT_PUBLIC_QA_PATH}/homepage.json`)
      .then((res) => res.json())
      .then((res) => {
        setTransactionDetails(res.transactionDetails);
      });
  };

  const fetchMediaDetails = () => {
    fetch(CDN_PATH + "in-the-media/in-the-media.json")
      .then((res) => res.json())
      .then((res) => {
        setMediaContent(res);
      });
  };

  useEffect(() => {
    checkLoginFlag();
    fetchTransactionDetails();
    fetchMediaDetails();
    fetchFiMediaDetails();
    fetchfundsindiaOfferings();
  }, []);




    const [topicIndex, setTopicIndex] = useState(-1);
    const [collectionIndex, setCollectionIndex] = useState(-1);
    const [faqDetails, setFaqDetails] = useState([]);
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        fetch("https://cdn.fundsindia.com/prelogin/faqs.json")
            .then((res) => res.json())
            .then((res) => {
                setFaqDetails(res);
                setShowLoader(false);
            });
    }, []);


  return (





    <div className="app-bg-container ">
     <div>
            <PageSEO title={'Track & Transact | FundsIndia'}
                description={'Track Your Mutual Fund NAV and Transact Online with FundsIndia.'}
                ogImage={'thumbsup.svg'} />
      </div>
      <div className={"page-bg-container "+" "+teststtyles.fontfamily}>
{/* for ribbon */}

      
<div className={teststtyles.cardsContainer1 + " transparent-gray-bg "}>
      <div className={teststtyles.navleftSideimg+" hidden md:block"}>
        <img src= "https://cdn.fundsindia.com/prelogin/images/Group_13946.svg" ></img>
      </div>
      <div className={" xs: absolute xs:bottom-[42%] xs:right-[-130px] "+" md:absolute md:bottom-[-105px] md:right-[-130px]"}>
        <img src= "https://cdn.fundsindia.com/prelogin/images/Group_95318.svg" alt="fijf"></img>
      </div>


      <div className={teststtyles.bggray1}>
        <img src="https://cdn.fundsindia.com/prelogin/images/Ellipse_2329.svg"></img>
      </div>
      <div className={teststtyles.bggreen1}>
        <img src="https://cdn.fundsindia.com/prelogin/images/Ellipse_1709.svg"></img>
      </div>
      <div className={teststtyles.bggray2}>
        <img src="https://cdn.fundsindia.com/prelogin/images/Ellipse_1707.svg"></img>
      </div>
      <div className={teststtyles.bggreen2}>
        <img src="https://cdn.fundsindia.com/prelogin/images/Group_95317.svg"></img>
      </div>
      <div className={teststtyles.bggreen3}>
        <img src="https://cdn.fundsindia.com/prelogin/images/Ellipse_2332.svg"></img>
        </div>
      <div className={teststtyles.bggray3}>
        <img src="https://cdn.fundsindia.com/prelogin/images/Ellipse_1706.svg"></img>
      </div>
      <div className={teststtyles.bggreen4}>
        <img src="https://cdn.fundsindia.com/prelogin/images/Ellipse_1710.svg"></img>
      </div>
      <div className={teststtyles.bggreen5}>
        <img src="https://cdn.fundsindia.com/prelogin/images/Ellipse_2330.svg"></img>
      </div>
      <section className={styles.fiContainer + " "  + " " }>
        
        <div
          className={
            " pb-24 lg:pb-[100px] max-lg:pt-[65px] max-lg:pb-[30px] ptb-80 md:pad-top relative w-[100%] md:pl-[%] 3xl:ml-[-7%] 3xl:mr-[1%]" 
          }
        >
          <div className="flex-col-reverse justify-between lg:flex-row h-full vertical-middle mt-[5%]">
            <div className="lg:w-3/5 z-10 xl:pad-right-8per xs:w-[108%] md:mt-[5%] flex justify-center">
              <div className={"inline-block lg:pt-0 text-center lg:text-left "}>
                <div
                  data-aos="fade-up"
                  data-aos-delay="500"
                  data-aos-duration="600"
                >
                  <h1 className="pageTitle lg:text-left max-lg:font-bold lg:mb-5 xs:w-[100%] xs:mb-[9px] xs:text-[24px] md:text-[40px]">
                  Track your 
                    <div className="text-[#0161FF] ">Mutual Fund NAV</div>
                  </h1>
                  {/* <div className="max-lg:my-[10px] max-lg:w-[43px] mx-auto lg:mx-0 pageTitleBorder"></div> */}
                </div>
                {/* <div
                  className=" max-lg:mb-[10px] pageExplanation lg:text-left xl2:text-24px font-semibold lg:my-4 text-[#1b1c20]"
                  data-aos="fade-up"
                  data-aos-delay="600"
                  data-aos-duration="600"
                >
                  {" "}
                  Instant Liquidity | Lower Interest Rates |
                  <div>100% Digital And Hassle-Free Process</div>
                </div> */}
                <div
                  className="text-[#464143] pageExplanation md:text-[20px] xs: xs:text-[14px]"
                  data-aos="fade-up"
                  data-aos-delay="600"
                  data-aos-duration="600"
                >
                  Let us help you track and grow your wealth
                </div>
                    <div
                      className="  md:mt-7 xs:mt-[25px]  md:text-[16px] xs:text-[12px]"
                      data-aos="fade-up"
                      data-aos-delay="600"
                      data-aos-duration="600"

                    >
                      {/* main block of subdiv 3 */}
                      
                          <div className="flex items-center md:mb-[25px] xs:mb-[18px] text-left">
                            {/* <img className=""
                            src="https://cdn.fundsindia.com/prelogin/images/Group_572636.svg"/> */}
                            <div className="md:w-[33px] md:h-[33px] xs:w-[26px] xs:h-[26px]">
                            <Image className="mt-[2px]" 
                            src={`images/Group_573060.svg`}
                            alt="My SVG"
                            width={32.74}
                            height={32.74}
                            />
                            </div>
                            <div className="ml-[9px] ">Want to track all your wealth in one place?</div> 
                          </div> 
                          <div className="flex items-center md:mb-[25px] xs:mb-[18px] text-left">
                            {/* <img className=""
                            src="https://cdn.fundsindia.com/prelogin/images/Group_572636.svg"/> */}
                            <div className="md:w-[33px] md:h-[33px] xs:w-[30px] xs:h-[30px]">
                            <Image className="mt-[2px] " 
                            src={`images/Group_573061.svg`}
                            alt="My SVG"
                            width={32.74}
                            height={32.74}
                            />
                            </div>
                            <div className=" ml-[9px]">Want to understand your investments performance?</div> 
                          </div> 
                          <div className="flex items-center md:mb-[25px] xs:mb-[18px]  text-left">
                            {/* <img className=""
                            src="https://cdn.fundsindia.com/prelogin/images/Group_572636.svg"/> */}
                            <div className="md:w-[40px] md:h-[40px] xs:w-[34px] xs:h-[34px]">
                            <Image className="mt-[2px]" 
                            src={`images/Group_573062.svg`}
                            alt="My SVG"
                            width={32.74}
                            height={32.74}
                            />
                            </div>
                            <div className="ml-[9px]">Get your free account now and easily transfer the holdings</div> 
                          </div> 
                          

                    </div>
                <div
                  className="flex justify-center lg:block pt-[10px] lg:pt-10 "
                  data-aos="fade-up"
                  data-aos-delay="250"
                >

                  <div className=" flex md:flex-row flex-col items-center">
                    <div className="dashedBtnDiv xs:mb-[13px]">
                    <button
                      className="md:text-[16px] xs:text-[20px] customPrimaryBtn  md:h-[54px] md:w-[227.76px] flex items-center justify-center xs:w-[230px] xs:h-[52px] "
                      onClick={() => onRedirect("/user/")}

                    >
                      REGISTER
                    </button>
                    </div>
                    {/* <button onClick={handleChange}>Toggle Value</button> */}
                    <div className="">
                    <button
                      className="md:text-[16px] xs:text-[20px] flex justify-center text-[#1B1C20] font-semibold  bg-[#DBDBDB] shadow-md rounded-full  md:h-[48px] md:w-[180.3px] flex items-center md:ml-6 border border-white xs:w-[221px] xs:h-[46px] md:mb-[20px] md:mt-[3px]"
                      onClick={() =>
                        window.open(
                          "https://www.fundsindia.com/blog/platform/fundsindia-features-easy-transfer/15876"
                        )
                      }
                    >
                      <div className="text-center ">Know More</div>
                    </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className=" z-10 lg:ml-12    flex justify-center titleImg"
              data-aos="fade-down"
              data-aos-delay="750"
              data-aos-duration="600"
            >
            <div className={"lg:w-[541px] lg:h-[593px] xs:mr-[30px] "}>
              <img  className="md:ml-[10%]"

              src="https://cdn.fundsindia.com/prelogin/images/Group_572571@2x.png"
              alt='https://cdn.fundsindia.com/prelogin/images/Group_572571.png'
              >

              </img>
              </div>
              {/* <ImageWithFallback
                width={780}
                height={730}
                // src="/Group_572571.png"
                src='https://cdn.fundsindia.com/prelogin/images/Group_572571.png'
                // src="C:/Users/moham/Downloads/Group 572571/Group 572571.png"
                alt="Loans Against Mutual Funds"
              /> */}
            </div>
          </div>
          
          <div
            className={"hidden lg:block top-12 " + styles.loansBgLine}
            data-aos="fade-left"
            data-aos-delay="250"
            data-aos-duration="600"
          ></div>
        </div>
      
      </section>
      </div>
      
      

{/* 
</div>
        <div className={teststtyles.mmleftSideimg}>
        <img src= "https://cdn.fundsindia.com/prelogin/images/Group_572466.svg" ></img>
      </div>
      <div className={teststtyles.mmrightSideimg}>
        <img src= "https://cdn.fundsindia.com/prelogin/images/Group_572471.svg" ></img>
      </div>
    */}

		{/* Current Nav for all mutual funds */}
<div className={"bg-[#D5D5D5]  max-md1:pt-[40px] max-md1:px-5 pb-0 bg-opacity-60 "}>
<div className={teststtyles.cardsContainer1}>
  {/* BG IMAGES */}
  <div className={teststtyles.tranmfLeftSideimg+" "+" hidden md:block"}>
    <img src= "https://cdn.fundsindia.com/prelogin/images/Group_572466.svg" ></img>
  </div>
  <div className={teststtyles.tranmfRightSideimg+" "+" hidden md:block"}>
    <img src= "https://cdn.fundsindia.com/prelogin/images/Group_572471.svg" ></img>
  </div>
  <div className={"sm:hidden  transform rotate-45 absolute left-[93%] top-[1%] w-[165%]"}>
    <img src= "https://cdn.fundsindia.com/prelogin/images/Group_572471.svg" ></img>
    {/* <img src= "https://cdn.fundsindia.com/prelogin/images/Group_572466.svg" ></img> */}

  </div>
    <section className={
      teststtyles.fiContainer+" "+teststtyles.homePageWrapper+
      // styles.mediaWrapper +
            " " +
            // styles.grayBg +
            
            " " 
            //+ styles.sixthBlockBgDots
          }
          data-aos="fade-up"
          data-aos-delay="250">
    <div>
			<div className={'flex flex-col items-center justify-center 3xl:pl-[14%] 3xl:pr-[14%] md:pl-[6%] md:pr-[6%] xs:ml-[-5%] xs:mr-[-5%] phone:ml-[0%] phone:mr-[0%]'}>
				<div className='flex items-center md:w-[57%]  text-center  md:mb-[30px] md:mt-[25px] xs:mb-[35px]'>
					<div className='  font-semibold md:text-[30px] xs:text-[24px] md:leading-[51px] xs:leading-[36px]  '>
						<span>Transfer All Your Mutual Funds Investment To FundsIndia</span>
						<span className='text-[#0161FF] ml-2'>Without Any Charges</span>
					</div>  
				</div>

				<div className={" bg-white   md:mb-[53px] xs:mb-[20px]  flex flex-col shadow-vibrant-card  border-2 border-white backdrop-blur-30 bg-opacity-50 rounded-[41px]"}>


          
					<div className=' flex flex-col '>
						<div className=' text-center tracking-normal capitalize opacity-100  mt-7 mb-2.5 '>
							<div className='font-semibold  xs:text-[18px] md:text-[22px]'>
								<span>Current Nav For</span>
								{/* <br/> */}
								<span className='ml-2  text-[#0161FF] '>All Mutual Funds</span>
							</div>
						</div>

						<div className=' tracking-normal  opacity-100  md:mb-[30px] xs:mb-[20px] text-center '>
							<div className='font-medium  md:text-[18px] xs:text-[16px]'>
								<span>Select a AMC and Scheme to view its current NAV</span>
								{/* <br/> */}
								{/* <span className="ml-2  text-[#0161FF] ">
                All Mutual Funds
            </span>         */}
							</div>
						</div>








            <div className="flex flex-col  md:flex-row  w-[100%] md:items-center md:justify-between md:pl-[50px] xs:pl-[16px]  xs:pr-[16px]">

						<div className={'  mt-[-1.5%] ' +teststtyles.DropDownwidth}>
              
                <div className={" xs:mt-[0px] " +" " + teststtyles.customSelect}>
                                        <DropDown
                                            heading={"Select AMC :"}
                                            options={amcArray}
                                            value={selectedValue1}
                                            // paramvalue={"amcs"}
                                            // value={"Select AMC"}
                                            // setValue={setAssessmentYear}
                                            onChange={logSelectedValue}

                                        />
                                        
                </div>
                <div className={"md:mt-[25px] xs:mt-[20px]" +" " + teststtyles.customSelect}>
                    <DropDown
                        heading={"Select Scheme"}
                        options={schemeArray}
                        value={selectedValue2}
                        
                        // value={assessmentYear}
                        // setValue={setAssessmentYear}
                        onChange={logSelectedSchemeValue}
                    />
                </div>

						</div>



            <div className='border xs:w-[100%] xs:mt-[20px] md:w-[50%] flex  items-center flex-row justify-center   border-[3px] border-white rounded-br-20px rounded-tl-20px rounded-bl-80px rounded-tr-80px rounded-[50px] shadow-md mr-[38px] h-[176px] bg-[#F1F6FE] '>

              <div className='   text-center'>

                <div>
                  Current Nav (Rs.):
                </div>

                <div className={teststtyles.roundvalue}>
                  
                  <div className="flex justify-center  ">

                      <span className="xs:pl-[17px] font-semibold md:text-[20px] xs:text-[16px] text-[#1B1C20]">{nav} </span>
                      {/* <div className=""> */}
                      {CaretValue == 1 ? ( 
                      <span className={`${teststtyles.caretred} w-[12px] h-[12px] md:mt-[7px] xs:pt-[5px] xs:mt-[5px] ml-[10px] mr-[5px]`} /> 
                      ) : ( 
                      <span className={`${teststtyles.caretgreen} w-[12px] h-[12px] md:mt-[2px] xs:pt-[5px] ml-[10px] xs:mr-[9px] md:mr-[5px]`} /> 

                      )} 
                      {/* </div> */}
                      {/* </div> */}

                      {CaretValue == 1 ? ( 
                      <span className="font-semibold md:text-[20px] xs:text-[16px] text-[#d30505] w-[52px] h-[28px] mr-[5px] xs:mr-[4px]">{change} </span>

                      ) : ( 
                      <span className="font-semibold md:text-[20px] xs:text-[16px] text-[#05D382] w-[52px] h-[28px] mr-[5px] xs:mr-[4px]">+{change} </span>


                      )} 


                      {/* <span className="font-bold text-[#05D382] w-[52px] h-[28px]">{change} </span> */}
                      <span className=" font-medium md:text-[16px] mt-[2px] xs:text-[14px] w-[74px] h-[23px] ">({changePercent})</span>
                  </div>

                </div>


              </div>

            </div>

            </div>


					</div>



<div className="md:mt-[25px] xs:mt-[20px] xs:mb-[20px] md:mb-[30px]">
					<div className='xs:ml-[16px] md:ml-[50px] xs:mr-[16px] md:mr-[50px] mb-[21px]'>
						<div className="xs:text-[16px] md:text-[18px] font-medium xs:mb-[10px] ">
							<span>
								What is Net Asset Value (NAV)?
							</span>
						</div>
						<div>
							<span style={{ fontSize: "14px", lineHeight: "20px",color:"#464143"}}>
								Net Asset Value (NAV) is a fund’s market value per unit. It is
								calculated by dividing the total value of all the assets in a
								portfolio, minus all its liabilities.
							</span>
						</div>
					</div>

					<div className='xs:ml-[16px] md:ml-[50px] xs:mr-[16px] md:mr-[50px] mb-[21px]'>
						<div className="xs:text-[16px] md:text-[18px] font-medium xs:mb-[10px] ">
							<span >
								How is NAV calculated?
							</span>
						</div>
						<div className="">
							<span style={{ fontSize: "14px", lineHeight: "20px",color:"#464143" }}>
								NAV is calculated at the end of every market day, after taking
								into account the closing market prices of the securities in its
								portfolio. When selecting a mutual fund for investments,
								remember that daily changes in NAV don’t matter. It is best to
								look at the annualised return of a fund over different time
								frames to estimate the performance of the fund.
							</span>
						</div>
					</div>
</div>

				</div>
			</div>
		</div>

    </section>
</div>
</div>
   

   <div className={teststtyles.cardsContainer1+" "}>

    {/* <div className={styles.dotCircle}>
        <div className={styles.blueTopRight}>
          <img
            src="https://cdn.fundsindia.com/prelogin/images/blue-blurred-dot.png"
            alt="dot"
          />
        </div>
        <div className={styles.blueBottomLeft}>
          <img
            src="https://cdn.fundsindia.com/prelogin/images/blue-blurred-dot.png"
            alt="dot"
          />
        </div>
        <div className={styles.greenBottomRight}>
          <img
            src="https://cdn.fundsindia.com/prelogin/images/green-blurred-dot.png"
            alt="dot"
          />
        </div>
      </div> */}
      <div className={teststtyles.testimoLeftSideimg+" "+"hidden md:block"}>
        <img src= "https://cdn.fundsindia.com/prelogin/images/Group_572466.svg" ></img>
      </div>
      <div className={teststtyles.testimoRightSideimg+" "+"hidden md:block"}>
        <img src= "https://cdn.fundsindia.com/prelogin/images/Group_572471.svg" ></img>
      </div>
      



      <div className={teststtyles.testi1dot+" "+"hidden md:block"}>
        <img src= "https://cdn.fundsindia.com/prelogin/images/Group_572584.svg" ></img>
      </div>
      <div className={teststtyles.testi2dot+" "+"hidden md:block"}>
        <img src= "https://cdn.fundsindia.com/prelogin/images/Group_572584.svg" ></img>
      </div>
      <div className={teststtyles.testi3dot+" "+"hidden md:block"}>
        <img src= "https://cdn.fundsindia.com/prelogin/images/Ellipse_2532.svg" ></img>
      </div>
      <div className={teststtyles.testi4dot+" "+"hidden md:block"}>
        <img src= "https://cdn.fundsindia.com/prelogin/images/Ellipse_2533.svg" ></img>
      </div>

      
        <section  
          className={styles.fiContainer + " " + "testimonial max-sm:pl-[15px] max-sm:pr-[15px] "}
          data-aos="fade-up"
          data-aos-delay="250"
          >
            {/* <div className={teststtyles.cardsContainer1}> */}
          <div className="">

          <HomePageTestimonial/>
          </div>
            {/* </div> */}
        </section>

    </div>








<div className="bg-[#D5D5D5] pt-[50px] max-md1:pt-[40px] max-md1:px-5 pb-0 bg-opacity-60">
        <div className={teststtyles.cardsContainer1}>
        <div className={teststtyles.mmleftSideimg+" "+"hidden md:block"}>
        <img src= "https://cdn.fundsindia.com/prelogin/images/Group_572466.svg" ></img>
      </div>
      <div className={teststtyles.mmrightSideimg+" "+"hidden md:block"}>
        <img src= "https://cdn.fundsindia.com/prelogin/images/Group_572471.svg" ></img>
      </div>
      <div className={"sm:hidden  transform rotate-45 absolute left-[93%] top-[-135px] w-[165%]"}>
    <img src= "https://cdn.fundsindia.com/prelogin/images/Group_572471.svg" ></img>
    {/* <img src= "https://cdn.fundsindia.com/prelogin/images/Group_572466.svg" ></img> */}

  </div>
        <section
          className={
            styles.mediaWrapper +
            " " +
            // styles.grayBg +
            " " +
            teststtyles.fourthBlockBgDots
          }
          data-aos="fade-up"
          data-aos-delay="250"
        >
          <div
            className="centerPageTitle text-[30px] max-md1:text-[22px] max-md1:mb-[60px]"
            data-aos="fade-up"
            data-aos-delay="350"
          >
            <span className="text-bright-blue">Media</span>{" "}
            <span>Mentions</span>
          </div>
          <div
            className="md:mt-10"
            data-aos="fade-up"
            data-aos-delay="350"
          >
            <div className={styles.mediaMentions}>
              {mediaFi &&
                mediaFi.map((x, index) => {
                  return (
                    <div key={index} className={styles.individualMediaMentions}>
                        <Image
                        src={x.image}
                        width="336"



                        height="249"
                        data-aos="fade-down"
                        data-aos-delay="450"
                        alt={x.title}
                      ></Image>
                      <div
                        className={styles.mediaInfoWrapper}
                        data-aos="fade-up"
                        data-aos-delay="450"
                      >
                        <div className="relative h-full">
                          <div className={styles.labelDateWrapper}>
                            <div className={styles.label}>{x.title}</div>
                            <div className={styles.
                              Date}><span className="font-semibold text-[#0071E7] text-[14px] pr-[15px]">{x.date}</span>
                              </div>
                          </div>
                          <div className="p-4 pb-[4px]">
                            <div className="md:my-5 text-12px">{x.review}</div>
                          </div>
                          <div className="absolute bottom-3 p-4">
                            <Link href={x.mediaLink}>
                              <div className={styles.readMore}>
                                Read More{" "}
                                <span className="pl-[4px] pt-[2px]">
                                  <Image
                                    src="prev-button.svg"
                                    width="16"
                                    height="16"
                                    alt="readMore"
                                  ></Image>
                                </span>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div
              className="flex justify-center"
              data-aos="fade-up"
              data-aos-delay="350"
            >
              <div className="dashedBtnDiv md:mt-[53px] mb-[30px]">
                <button className="md:customPrimaryBtn xs:text-[16px] text-white font-semibold xs:w-[261px] xs:h-[51px] shadow-md bg-[#00d382] rounded-full" onClick={() => onRedirect("/user/")}>
                  Join the FundsIndia Family
                </button>
              </div>
            </div>
          </div>
        </section>
        </div>
        </div>















        <div className={teststtyles.cardsContainer1}>
        <div className={teststtyles.gray1+" "+"hidden md:block 2xl:hidden"}>
        <img src= "https://cdn.fundsindia.com/prelogin/images/Ellipse_2528.svg" ></img>
      </div>
      <div className={teststtyles.gray2+" "+"hidden md:block 2xl:hidden"}>
        <img src= "https://cdn.fundsindia.com/prelogin/images/Ellipse_2527.svg" ></img>
      </div>
      <div className={teststtyles.blue1+" "+"hidden md:block 2xl:hidden"}>
        <img src= "https://cdn.fundsindia.com/prelogin/images/Ellipse_2526.svg" ></img>
      </div>
        <section className="h-full xs:mb-[30px] md:mb-[75.86px] md:pt-[40px] xs:pt-[15px]">
          
        <div className={"container  flex flex-col  items-center "}>
              {/* <div className=" font-semibold text-2xl leading-[51px]  w-[894px] h-[94px] mb-[30px]  border-[5px] ">
              
                <span
                  className="text-bright-blue"
                  
                >
                  FREE to join, FREE to operate 
                </span>
                - manage all your mutual fund investments in one place for your entire family!
              </div> */}
              <div className='mx-auto font-semibold  text-center md:text-[30px] xs:text-[24px] md:leading-[51px] xs:leading-[36px] md:w-[65%]
                md:mb-[30px] xs:mb-[20px] '>
  <span className='text-[#0161FF] '>FREE to join, FREE to operate </span>
  <span>- manage all your mutual fund investments in one place for your entire family!</span>
</div>
 
            <div className={"  text-center md:text-[14px] md:leading-[20px] text-[#464143] md:w-[76%] xs:text-[14px] xs:leading-[20px] xs:mb-[30px]"}>
              <div className="mb-3">
              FundsIndia is India’s friendliest online 
              investment platform. 
              Here, investors 
              (resident Indians and NRIs) get access to a wide range of Mutual Funds, 
              Equities from the Bombay Stock Exchange (BSE), National Stock Exchange (NSE), Corporate Deposits from premium companies,
               and various other investment products in one convenient online location.
               </div>
               <div className="mb-3">
                FundsIndia also offers a host 
               of beneficial value-added services like free Financial 
               Partner services, flexible types of Systematic Investment Plans (SIPs), trigger-based investing, Portfolio-level SIPs,
                Value-averaging Investment Plans (VIPs), and so much more that further enrich an investor’s investment experience. Also, with India’s most complete automated 
                advisory service 
                </div>
                <div className="mb-3">
                Investing with a FundsIndia account is absolutely safe and secure. The platform is registered with entities such
                 as the Association of Mutual Funds in India (AMFI), the Bombay Stock Exchange (BSE), National Stock Exchange (NSE),
                  the Credit Information Bureau Limited (CIBIL), the Central Depository Services
                   Limited (CDSL), and the Central Insurance Repository Limited (CIRL).
                   </div> 
                  <div>
                    Registering with FundsIndia takes less than ten minutes, what with the Aadhaar-based eKYC system. This makes investing a paperless and hassle-free process, and FundsIndia the best investment platform in India.
                   </div>

              </div>


              <div className="flex md:flex-row xs:flex-col xs:items-center  md:pt-[50px] xs:pt-[30px] text-center ">
                <div className={teststtyles.objectiveCard + " curvyTransCard md:mr-[11%] xs:w-[300px] md:w-[400px] md:h-[224px]"}>
                  <div
                    className={teststtyles.objectiveCardLogo+" "+""}
                    data-aos="fade-up "
                    data-aos-delay="250"
                  >
                    <Image
                    // className="mb-9 "
                      src="images/Group_572508.svg"
                      width={129}
                      height={126}
                      alt="Guarantee retire"
                    ></Image>
                  </div>
                  <div
                    className="font-semibold text-[#00D382] md:text-[18px] xs:text-[16px] "
                    data-aos="fade-up"
                    data-aos-delay="250"

                  >
                    FREE Registration
                  </div>
                  <div
                    className="pt-[15px] md:text-[16px] xs:text-[14px]"
                    data-aos="fade-up"
                    data-aos-delay="250"
                  >
                    That’s right! It is absolutely free to register with us.
                  </div>
                </div>
                <div className={teststtyles.objectiveCard + "  curvyTransCard md:mr-[11%] xs:w-[300px] md:w-[400px] md:h-[224px]"}>
                  <div
                    className={teststtyles.objectiveCardLogo}
                    data-aos="fade-up"
                    data-aos-delay="250"
                  >
                    <Image
                      src="images/Group_572508-1.svg"
                      width={129.23}
                      height={126.05}
                      alt="Regular Pension"
                    ></Image>
                  </div>
                  <div
                    className="font-semibold text-[#00D382] md:text-[18px] xs:text-[16px] "
                    data-aos="fade-up"
                    data-aos-delay="250"
                  >
                    Regular Pension
                  </div>
                  <div
                    className="pt-[15px] md:text-[16px] xs:text-[14px]"
                    data-aos="fade-up"
                    data-aos-delay="250"
                  >
                    Get access to innovative SIPs, Triggers and Reports at no extra cost!
                  </div>
                </div>
                <div className={teststtyles.objectiveCard + "  curvyTransCard  xs:w-[300px] md:w-[400px] md:h-[224px]"}>
                  <div
                    className={teststtyles.objectiveCardLogo}
                    data-aos="fade-up"
                    data-aos-delay="250"
                  >
                    <Image
                      src="images/Group_572508-2.svg"
                      width={129.23}
                      height={126.05}
                      alt="Market based"
                    ></Image>
                  </div>
                  <div
                    className="font-semibold text-[#00D382] md:text-[18px] xs:text-[16px] "
                    data-aos="fade-up"
                    data-aos-delay="250"
                  >
                    Spectrum of Products
                  </div>
                  <div
                    className="pt-[15px] md:text-[16px] xs:text-[14px] "
                    data-aos="fade-up"
                    data-aos-delay="250"
                  >
                    Choose from ll Mutual Funds Funds, Stocks, Fixed Deposits, NPS, Insurance, and more…
                  </div>
                </div>
              </div>


            </div>
        </section>
        </div>















      </div>
      
      <Model open={open} redirectPath={redirectPath} handleClose={handleClose} />
    
    </div>
  );
};

export default Track_Transact;