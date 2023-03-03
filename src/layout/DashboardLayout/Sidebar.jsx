import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../assets/images/logo.png'
import { AiOutlineAppstore, AiOutlineBank, AiTwotoneBank, AiOutlineMobile } from 'react-icons/ai'
import { BsPeople, BsCardChecklist, BsCreditCard2Front, BsWifi, BsLightbulb } from 'react-icons/bs'
import { MdOutlineManageAccounts, MdOutlineContactless } from 'react-icons/md'
import { HiOutlineDevicePhoneMobile, HiOutlineLightBulb } from 'react-icons/hi'
import { GiRobotAntennas } from 'react-icons/gi'
import { IoCellularOutline } from 'react-icons/io'
import { RxCaretUp, RxCaretDown } from 'react-icons/rx'
import logoutIcon from '../../assets/icons/logoutIcon.svg'


// import { sideBarTabs } from './SideBarData';

const Sidebar = () => {
  const location = useLocation()

  let myname;
  
  const currLocation = location.pathname.slice(1)
  console.log(currLocation)

  const activeTab = sessionStorage.getItem('tab');

  const [trsfSubNav, setTrsfSubNav] = useState(false)
  const [billSubNav, setBillSubNav] = useState(false)

  const showTrsfSubNav = () => setTrsfSubNav(!trsfSubNav);
  const showBillsSubNav = () => setBillSubNav(!billSubNav);


  return (
    <Container>
      <LogoConatiner>

        <div className='side-wrapper'>
          <img src={Logo} alt="" />
          <div className='side-head'>
            <h3>CITMFB LTD.</h3>
            <p>Admin Dashboard</p>
          </div>
        </div>
      </LogoConatiner>

      <SidebarLinks>
        {/* 
      <div className='side-link'>
        <AiOutlineAppstore/> */}
        <Link to='/dashboard' className={currLocation === activeTab ? 'active' : ''} myname='dashboard'> <AiOutlineAppstore />Dashboard</Link>
        <Link to='/customers' className={currLocation === myname ? 'active' : ''} myname='customers'> <BsPeople />Customers</Link>
        <Link to='/requests'> <MdOutlineManageAccounts />Account Request</Link>

        <TrsfWrapper onClick={showTrsfSubNav}>
          <TrsfLink> <BsCreditCard2Front /> <p>Transfer</p> </TrsfLink>
          {trsfSubNav === true ? <RxCaretUp/> : <RxCaretDown/>}
        </TrsfWrapper>

        {trsfSubNav && <div style={{ marginLeft: '30px' }}>
          <Link to='/cit' style={{ width: '150px' }}> <AiTwotoneBank />CIT Bank</Link>
          <Link to='/others' style={{ width: '150px' }}> <AiOutlineBank />Other Banks</Link>
        </div>}
        <TrsfWrapper onClick={showBillsSubNav}>
          <TrsfLink> <BsCardChecklist /> <p>Bill Payment</p></TrsfLink>
          {billSubNav === true ? <RxCaretUp/> : <RxCaretDown/>}
        </TrsfWrapper>
        {billSubNav && <div style={{ marginLeft: '30px' }}>
          <Link to='/airtime' style={{ width: '150px' }}> <AiOutlineMobile />Airtime</Link>
          <Link to='/data' style={{ width: '150px' }}> <BsWifi />Data </Link>
          <Link to='/cable' style={{ width: '150px' }}> <GiRobotAntennas />Cable TV</Link>
          <Link to='/electricity' style={{ width: '150px' }}> <BsLightbulb />Electricity</Link>
        </div>}

        <LogoutWrapper>
          <img src={logoutIcon} alt="" />
          <Link to='/login' onClick={() => {sessionStorage.clear()}}>Logout</Link>
        </LogoutWrapper>
      </SidebarLinks>
    </Container>
  )
}

export default Sidebar


const Container = styled.div`
  position: fixed;
  left: 0;
  height: calc(100vh - 64px);
  width: 250px;
  background: #fff;
  padding: 1em 1em 0;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  .active {
    background: #0e814a !important;
    color: #fff;
    p {
      color: #fff !important;
    }
    .icon {
      filter: contrast(500);
    }
    :hover {
      opacity: 0.7;
    }
  }
`;

const LogoConatiner = styled.div`

  margin-left: 20px;

    .side-wrapper {
      display: flex;
      align-items:center;
      gap: 10px;

      img{
        width: 60px;
      }
      .side-head{
        display: flex;
        flex-direction: column;
        h3{
          font-size: 14px;
        }
        p{
          margin-top:-10px;
          margin-bottom: 20px;
          font-size: 10px;
          color: #3d3d3d;
        }
      }
    }
    `
    
    
    const SidebarLinks = styled.div`
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    // padding: 20px;
    // list-style: none;
    // height: 60px;
    // text-decoration: none;
    // font-size: 18px;
    
    // .side-link{
  //   display: flex;
  //   align-items: center;
  //   gap: 10px;
  //   padding: 10px;
  //   width: 200px;
  
  //   a{
    //     text-decoration: none;
    //     color: #000;
    //     font-size:14px;
    //     font-weight: 500;
    //   } 
    
    //   svg{
      //     font-size: 20px;
      //     color: #3d3d3d
      //   }
      
      //   &:hover{
        //     background: #0e814a;
        //      color: #fff
        //   }
        // }
        
        a{
          display:flex;
          align-items: center;
          text-decoration: none;
          color: #3d3d3d;
          font-weight: 500;
          font-size: 13px;
          width: 200px;
          height: 20px;
          padding: 10px;
    
    
          svg{
            font-size: 20px;
            margin-right: 10px;
          }
    
          &:hover{
            background: #0e814a;
            color: #fff;
            border-radius: 5px;  
            opacity: 0.7;

          }

          .active {
            background: #0e814a !important;
            color: #fff;
            border-radius: 5px;  

            p {
              color: #fff !important;
            }
            // .icon {
            //   filter: contrast(500);
            // }
           
          }
        }
  
  
  `;
  
  const TrsfLink = styled.div`
    display:flex;
      align-items: center;
      // text-decoration: none;
      // color: #3d3d3d;
      // height: 20px;
      // padding: 10px;
      
      p{
        font-weight: 500;
        font-size: 13px;
      }
      svg{
        font-size: 20px;
        margin-right: 10px;
      }
      
  
    
  `
    const TrsfWrapper = styled.div`
      display: flex;
      justify-content: space-between;
      width: 200px;
      align-items: center;
      text-decoration: none;
      color: #3d3d3d;
      height: 20px;
      padding: 10px;

          &:hover{
            background: #0e814a;
            color: #fff;
            border-radius: 5px;  
            opacity: 0.7;

    `
    
    const SidebarLabel = styled.span`
  margin-left: 16px;
  `;


const DropdownLink = styled(Link)`
  background: #252831;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;
 
  &:hover {
    background: green;
    cursor: pointer;
  }
`;

const LogoutWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  

  img{
    width: 20px;
  }

  a{
    color: red;
    background: transparent !important;

    :hover{
      color: red;
    }
  }
`