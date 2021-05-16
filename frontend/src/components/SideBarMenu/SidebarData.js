import React from 'react';
import * as Bs from 'react-icons/bs';
import * as Io from 'react-icons/io';
import * as Md from 'react-icons/md';

export const SidebarData = [
    // admin & examinee
    // {
    //     title: 'Home',
    //     path: '/home',
    //     icon: <Ai.AiFillHome />,
    //     colName: 'nav-text',
    //     status: 'general',
    //     display: true,
    // },
    // examinee
    {
        title: 'Join test',
        path: '/join-test',
        icon: <Md.MdAssignment />,
        colName: 'nav-text',
        status: 'examinee',
        display: false,
    },
    {
        title: 'Analytics',
        path: '/analytics',
        icon: <Io.IoMdAnalytics />,
        colName: 'nav-text',
        status: 'examinee',
        display: false,
    },
    // Examiner
    {
        title: 'Test results',
        path: '/test-results',
        icon: <Io.IoMdBookmarks />,
        colName: 'nav-text',
        status: 'examiner',
        display: false,
    },
    {
        title: 'Start test',
        path: '/start-test',
        icon: <Io.IoMdFastforward />,
        colName: 'nav-text',
        status: 'examiner',
        display: false,
    },
    {
        title: 'Statistics',
        path: '/statistics',
        icon: <Io.IoIosPie />,
        colName: 'nav-text',
        status: 'examiner',
        display: false,
    },

    {
        title: 'Manage questions',
        path: '/manage-questions',
        icon: <Bs.BsQuestionSquareFill />,
        colName: 'nav-text',
        status: 'examiner',
        display: false,
    },
];
