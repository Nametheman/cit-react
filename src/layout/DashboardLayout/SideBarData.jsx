import React from "react";
import {AiOutlineAppstore, AiOutlineBank, AiTwotoneBank} from 'react-icons/ai'
import {BsPeople, BsCardChecklist, BsCreditCard2Front, BsWifi}  from 'react-icons/bs'
import {MdOutlineManageAccounts, MdOutlineContactless} from 'react-icons/md'
import {HiOutlineDevicePhoneMobile, HiOutlineLightBulb} from 'react-icons/hi'
import {GiRobotAntennas} from 'react-icons/gi'
import {IoCellularOutline} from 'react-icons/io'
import {RxCaretUp, RxCaretDown} from 'react-icons/rx'



export const sideBarTabs = [
    {id: 1,
    name: 'Dashboard',
    link: '/dashboard',
    icon:  <AiOutlineAppstore/>
    },

    {id: 2,
    name: 'Customers',
    link: '/customers',
    icon:  <BsPeople/>

    },

    {id: 3,
    name: 'Transfers',
    link: '/transfers',
    icon:  <AiOutlineAppstore/>,
    iconClosed: <RxCaretDown/>,
    iconOpened: <RxCaretUp/>,

    subNav: [
        {
            name: 'CIT Bank',
            path: '/transfers/cit',
            icon: <AiOutlineBank/>,
        },
        {
            name: 'Other Banks',
            path: '/transfers/others',
            icon: <AiTwotoneBank/>,
        },
    ]
    },
    {
    id: 4,
    name: 'Bill Payment',
    link: '/bills',
    icon: <BsCardChecklist/>,
    iconClosed: <RxCaretDown/>,
    iconOpened: <RxCaretUp/>,

    subNav: [
        {
            name: 'Airtime',
            path: 'bills/airtime',
            icon: <HiOutlineDevicePhoneMobile/>
        },
        {
            name: 'Data',
            path: 'bills/data',
            icon: <BsWifi/>
        },
        {
            name: 'Cable TV',
            path: 'bills/cable-tv',
            icon: <GiRobotAntennas/>
        },
        {
            name: 'Electricity',
            path: 'bills/electricity',
            icon: <HiOutlineLightBulb/>
        },
    ]
    },
    {id: 5,
    name: 'Audit Trail',
    link: '/audit',
    icon:  <MdOutlineContactless/>
    },
    {id: 6,
    name: 'Report',
    link: '/report',
    icon:  <IoCellularOutline/>
    },
]