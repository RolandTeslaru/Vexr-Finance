import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import {
  Container,
  Title,
  rem,
  Text,
  List,
  ThemeIcon,
  Group,
  Button,
  createStyles,
  Center,
  Paper,
  Grid,
} from "@mantine/core";
import { TbCheck } from "react-icons/tb";
import Image from "next/image";
import { Auth } from "@/components/Auth/Auth";
import { DiReact } from "react-icons/di";
import { SiNextdotjs, SiTypescript, SiMongodb, SiExpress } from "react-icons/si";
import { GrNode, GrBitcoin} from "react-icons/gr";
import {RiShieldKeyholeFill} from "react-icons/ri";


const inter = Inter({ subsets: ["latin"] });

const useStyles = createStyles((theme) => ({
  home: {},
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: `calc(${theme.spacing.xl} * 8)`,
    paddingBottom: `calc(${theme.spacing.xl} * 5)`,
  },

  content: {
    maxWidth: rem(480),
    marginRight: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(44),
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.sm,
    padding: `${rem(4)} ${rem(12)}`,
  },
}));

export default function Home() {
  const { classes } = useStyles();
  return (
    <div className={classes.home} >
      <Container sx={{ minHeight: "70vh", marginTop: "1rem" }}>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              A <span className={classes.highlight}>modern</span> way <br /> to
              trade crypto
            </Title>
            <Text color="dimmed" mt="md">
              Build fully functional accessible web applications faster than
              ever - Mantine includes more than 120 customizable components and
              hooks to cover you in any situation
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <TbCheck size={rem(12)} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>TypeScript based</b> – build type safe applications, all
                components and hooks export types
              </List.Item>
              <List.Item>
                <b>Free and open source</b> – all packages have MIT license, you
                can use Mantine in any project
              </List.Item>
              <List.Item>
                <b>No annoying focus ring</b> – focus ring will appear only when
                user navigates with keyboard
              </List.Item>
            </List>

            <Group mt={30}>
              <Button radius="xl" size="md" className={classes.control}>
                Get started
              </Button>
              <Button
                variant="default"
                radius="xl"
                size="md"
                className={classes.control}
              >
                Source code
              </Button>
            </Group>
          </div>

          <Auth />
        </div>
      </Container>

      <Container sx={{minWidth: "80%"}}>
        <Center h={"90px"}>
          <h2>Powerd By</h2>
        </Center>
        <Grid grow>

          <Grid.Col md={3} span={4}>
            <Paper sx={{padding:"20px"}}>
              <Center display={"flex"} sx={{flexDirection: "column"}} >
                  <DiReact size={100}/>
                  <h4>React</h4>
              </Center>
            </Paper>
          </Grid.Col>

          <Grid.Col md={3}span={4}>
            <Paper sx={{padding:"20px"}}>
              <Center display={"flex"} sx={{flexDirection: "column"}}>
                <SiNextdotjs size={100} />
                <h4>NextJS</h4>
              </Center>
            </Paper>
          </Grid.Col>

          <Grid.Col md={3}span={4}>
            <Paper sx={{padding:"20px"}}>
              <Center display={"flex"} sx={{flexDirection: "column"}}>
                <GrNode size={100}/>
                <h4>NodeJS</h4>
              </Center>
            </Paper>
          </Grid.Col>

          <Grid.Col md={3} span={4}>
            <Paper sx={{padding:"20px"}}>
              <Center display={"flex"} sx={{flexDirection: "column"}}>
                <SiTypescript size={100}/>
                <h4>TypeScript</h4>
              </Center>
            </Paper>
          </Grid.Col>
          <Grid.Col md={3} span={4}>
            <Paper sx={{padding:"20px"}}>
              <Center display={"flex"} sx={{flexDirection: "column"}}>
                <SiMongodb size={100}/>
                <h4>MongoDB</h4>
              </Center>
            </Paper>
          </Grid.Col>
          
          <Grid.Col md={3} span={4}>
            <Paper sx={{padding:"20px"}}>
              <Center display={"flex"} sx={{flexDirection: "column"}}>
                <GrBitcoin size={100}/>
                <h4>CoinGecko</h4>
              </Center>
            </Paper>
          </Grid.Col>

          <Grid.Col md={3} span={4}>
            <Paper sx={{padding:"20px"}}>
              <Center display={"flex"} sx={{flexDirection: "column"}}>
                <RiShieldKeyholeFill size={100}/>
                <h4>NextAuth</h4>
              </Center>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}
