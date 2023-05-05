import { Autocomplete, Box, Burger, Center, Group, Header, Navbar, SegmentedControl, createStyles, rem, useMantineColorScheme } from '@mantine/core';
import React from 'react'
import s from './topNav.module.scss'
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import { TbSearch, TbSun, TbMoon } from 'react-icons/tb';
import { IconMoon, IconSun } from '@tabler/icons';


const useStyles = createStyles((theme) => ({
    header: {
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,
      position: "fixed",
    },
  
    inner: {
      height: rem(56),
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  
    links: {
      [theme.fn.smallerThan('md')]: {
        display: 'none',
      },
    },
  
    search: {
      [theme.fn.smallerThan('xs')]: {
        display: 'none',
      },
    },
  
    link: {
      display: 'block',
      lineHeight: 1,
      padding: `${rem(8)} ${rem(12)}`,
      borderRadius: theme.radius.sm,
      textDecoration: 'none',
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
      fontSize: theme.fontSizes.sm,
      fontWeight: 500,
  
      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3],
      },
    },
  }));

interface TopNavProps{
    links: {link: string, label: string}[]
    openState: boolean
    openHandler: () => void
}

const TopNav = ({links, openState, openHandler}: TopNavProps ) => {
    const { classes } = useStyles();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const items = links.map((link) => (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    ));
  
    return (
      <Header height={56} className={classes.header} >
        <div className={classes.inner}>
          <Group>
            <Burger opened={openState} onClick={openHandler} size="sm" />
            {colorScheme === 'dark' ? <>
            <Image alt="VexrLogo"  width={140} height={25} src={"/VexrLogo-WhitePNG.webp"}/>
             </> : <>
            <Image alt="VexrLogo"  width={140} height={25} src={"/VexrLogo-Black.webp"}/>

            </>}
          </Group>
  
          <Group>
            <Group ml={50} spacing={5} className={classes.links}>
              {items}
            </Group>
            <Autocomplete
              className={classes.search}
              placeholder="Search"
              icon={<TbSearch/>}
              data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
            />
            <SegmentedControl
                value={colorScheme}
                onChange={(value: 'light' | 'dark') => toggleColorScheme(value)}
                data={[
                {
                    value: 'light',
                    label: (
                    <Center>
                        <TbSun size="1rem" />
                        <Box ml={10}>Light</Box>
                    </Center>
                    ),
                },
                {
                    value: 'dark',
                    label: (
                    <Center>
                        <TbMoon size="1rem"  />
                        <Box ml={10}>Dark</Box>
                    </Center>
                    ),
                },
                ]}
            />
          </Group>
        </div>
      </Header>
    );
}

export default TopNav
