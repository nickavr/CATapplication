import React from 'react';
import * as Ai from 'react-icons/ai';
import * as Io from 'react-icons/io';
import * as Md from 'react-icons/md';

export const SidebarData = [
    // admin & examinee
    {
        title: 'Home',
        path: '/home',
        icon: <Ai.AiFillHome />,
        colName: 'nav-text',
        forAnyone: true,
    },
    // examinee
    {
        title: 'Join test',
        path: '/join-test',
        icon: <Md.MdAssignment />,
        colName: 'nav-text',
        forAdmin: false,
    },
    {
        title: 'Analytics',
        path: '/analytics',
        icon: <Io.IoMdAnalytics />,
        colName: 'nav-text',
        forAdmin: false,
    },
    // Admin
    {
        title: 'Start test',
        path: '/start-test',
        icon: <Io.IoMdFastforward />,
        colName: 'nav-text',
        forAdmin: true,
    },
    {
        title: 'Statistics',
        path: '/statistics',
        icon: <Io.IoIosPie />,
        colName: 'nav-text',
        forAdmin: true,
    },
];
