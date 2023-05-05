import { useState, useEffect } from 'react';
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  createStyles,
  rem,
} from '@mantine/core';
import {TbChevronRight , TbChevronLeft, TbCalendarStats } from "react-icons/tb"
import { HTMLMotionProps, motion } from 'framer-motion';

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: 'block',
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.black,
    fontSize: theme.fontSizes.sm,
    transition: "all 200ms ease",
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[4],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: 'block',
    textDecoration: 'none',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    paddingLeft: rem(31),
    marginLeft: rem(30),
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[8],
    borderLeft: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[4]
    }`,

    transition: "all 200ms ease",
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  chevron: {
    transition: 'all 200ms ease',
    overflow: 'hidden',
  },

  text: {
    whiteSpace: "nowrap"
  }
}));

interface LinksGroupProps extends HTMLMotionProps<"div">{
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
  openState: boolean
  setNavOpenState: React.Dispatch<React.SetStateAction<boolean>>
}

export function LinksGroup({ icon: Icon, label, initiallyOpened, links,openState, setNavOpenState, ...rest }: LinksGroupProps) {

  const { classes, theme } = useStyles();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const ChevronIcon = theme.dir === 'ltr' ? TbChevronRight : TbChevronLeft;
  const [showChevron, setShowChevron] = useState(false);

  const items = (hasLinks ? links : []).map((link) => (
    <Text<'a'>
      component="a"
      className={classes.link}
      href={link.link}
      key={link.label}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </Text>
  ));

  const handleGroupOpen = () => {    
    setNavOpenState(true)
    if(opened === false)
      setOpened(true)

    if(openState && opened)
    {
      setOpened(false)
      setShowChevron(false)
    }
  }

  //Delay Chevron appearence so that the animations doesnt bug out 
  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;
    if (openState) {
      timeoutId = setTimeout(() => {
        setShowChevron(true);
      }, 400);
    }
    return () => clearTimeout(timeoutId);
  }, [hasLinks, openState]);

  return (
    <motion.div {...rest}>
      <UnstyledButton onClick={handleGroupOpen} className={classes.control}>
        <Group position="apart" spacing={0} sx={{flexWrap: "nowrap"}} >
          <Box sx={{ display: 'flex', alignItems: 'center'}}>
            <ThemeIcon variant="light" size={30}>
              <Icon size="1.1rem" />
            </ThemeIcon>
            {openState && 
              <Box ml="md" className={classes.text}>{label}</Box>
            }
          </Box>
          
          {hasLinks && openState && (
              <ChevronIcon
                className={classes.chevron}
                size="1rem"
                style={{
                  transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
                }}
              />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks && openState ? <Collapse in={opened} sx={{flexWrap:"nowrap"}}>{items}</Collapse> : null}
    </motion.div>
  );
}

const mockdata = {
  label: 'Releases',
  icon: TbCalendarStats,
  links: [
    { label: 'Upcoming releases', link: '/' },
    { label: 'Previous releases', link: '/' },
    { label: 'Releases schedule', link: '/' },
  ],
};

// export function NavbarLinksGroup() {
//   return (
//     <Box
//       sx={(theme) => ({
//         minHeight: rem(220),
//         padding: theme.spacing.md,
//         backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
//       })}
//     >
//       <LinksGroup {...mockdata} />
//     </Box>
//   );
// }