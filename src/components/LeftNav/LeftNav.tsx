import { Code, Group, Navbar, NavbarProps, ScrollArea, createPolymorphicComponent, createStyles, rem } from '@mantine/core';
import React, { useEffect } from 'react'
import {TbGauge, TbNotes, TbCalendarStats, TbPresentationAnalytics, TbFileAnalytics, TbAdjustments, TbLock} from 'react-icons/tb'
import { LinksGroup } from './NavbarLinksGroup';
import { UserButton } from '../User/UserButton';


const mockdata = [
    { label: 'Dashboard', icon: TbGauge, link: '/dashboard' },
    {
      label: 'Market news',
      icon: TbNotes,
      initiallyOpened: true,
      links: [
        { label: 'Overview', link: '/' },
        { label: 'Forecasts', link: '/' },
        { label: 'Outlook', link: '/' },
        { label: 'Real time', link: '/' },
      ],
    },
    {
      label: 'Releases',
      icon: TbCalendarStats,
      links: [
        { label: 'Upcoming releases', link: '/' },
        { label: 'Previous releases', link: '/' },
        { label: 'Releases schedule', link: '/' },
      ],
    },
    { label: 'Analytics', icon: TbPresentationAnalytics },
    { label: 'Contracts', icon: TbFileAnalytics },
    { label: 'Settings', icon: TbAdjustments },
    {
      label: 'Security',
      icon: TbLock,
      links: [
        { label: 'Enable 2FA', link: '/' },
        { label: 'Change password', link: '/' },
        { label: 'Recovery codes', link: '/' },
      ],
    },
  ];

  

  const useStyles = createStyles((theme) => ({
    navbar: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      paddingBottom: 0,
      transition: 'all 200ms ease',
      position: "fixed",
      height: "calc(100vh - 3.5rem)",
    },
  
    header: {
      padding: theme.spacing.md,
      paddingTop: 0,
      marginLeft: `calc(${theme.spacing.md} * -1)`,
      marginRight: `calc(${theme.spacing.md} * -1)`,
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
    },
  
    links: {
      marginLeft: `calc(${theme.spacing.md} * -1)`,
      marginRight: `calc(${theme.spacing.md} * -1)`,
      transition: 'all 200ms ease',
    },
  
    linksInner: {
      paddingTop: theme.spacing.xl,
      paddingBottom: theme.spacing.xl,
      transition: 'all 200ms ease',
    },
  
    footer: {
      marginLeft: `calc(${theme.spacing.md} * -1)`,
      marginRight: `calc(${theme.spacing.md} * -1)`,
      borderTop: `${rem(1)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4]
      }`,
    },
  }));


  interface LeftNavProps {
    openState: boolean;
    setOpenState: React.Dispatch<React.SetStateAction<boolean>>;
  }


const LeftNav = ({openState, setOpenState}: LeftNavProps) => {
    
    const { classes } = useStyles();
    const links = mockdata.map(
      (item, index) => <LinksGroup initial={{opacity: 0, x: -30}} animate={{opacity: 1, x:0}} transition={{delay: index * 0.1}} openState={openState} setNavOpenState={setOpenState} {...item} key={item.label} />
    );
  
    return (
      <Navbar  height={800} width={{ sm: openState ? 300 : 65 }} p="md" className={classes.navbar}>
        <Navbar.Section className={classes.header}>
          <Group position="apart">
            <Code sx={{ fontWeight: 700 }}>v3.1.2</Code>
          </Group>
        </Navbar.Section>
  
        <Navbar.Section grow className={classes.links} component={ScrollArea}>
          <div className={classes.linksInner}>{links}</div>
        </Navbar.Section>
  
        <Navbar.Section className={classes.footer}>
          <UserButton
            image="https://static.wikia.nocookie.net/youtube/images/7/7a/ThatVeganTeacherFace.jpg/revision/latest?cb=20210113090901"
            name="Ann Nullpointer"
            email="anullpointer@yahoo.com"
            openNavState={openState}
          />
        </Navbar.Section>
      </Navbar>
    );
}

export default LeftNav