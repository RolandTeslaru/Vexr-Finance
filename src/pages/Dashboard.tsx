import React from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { Card, Center, Container, Paper, createStyles } from "@mantine/core";
import s from "../styles/dashboard.module.scss";
import Banner from "@/components/Banner/Banner";
import Trending from "@/components/Trending/Trending";
import Markets from "@/components/Markets/Markets";

const style = createStyles((theme) => ({
  card: {
    width: "80%",
    height: "500px",
    marginTop: "80px",
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3],
  },
}));

const Dashboard = () => {
  const { data: session } = useSession();
  const { classes, theme } = style();

  return (
    <div className={s.dashboard}>
      <Banner title={"Dashboard"}/>
      <Center sx={{marginBottom: "40px"}}>
          <Trending/>
      </Center>

      <Center>
        <Markets/>    
      </Center>
    </div>
  );
};

export default Dashboard;

export async function getServerSideProps({ req }: any) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
