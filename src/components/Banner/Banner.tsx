import React, {FC} from 'react'
import s from "./Banner.module.scss"
import { Card, Center, Title } from '@mantine/core'
import { signOut, useSession } from 'next-auth/react'
import { createStyles } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  card: {
    width: "80%",
    height: "500px",
    marginTop: "80px",
    overflowX: "hidden",
    position: "relative",
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],

  },
}))

interface BannerProps {
  children?: React.ReactNode
  title?: string
}

const Banner:FC<BannerProps> = ({children, title}) => {

  const { data: session } = useSession()
  const { classes, theme } = useStyles()

  return (
    <div className={s.Header}>
      <Center sx={{ minHeight: "500px" }}>
        <Card withBorder className={s.card + " " + classes.card}>
          <div className={s.content}>
            <h1>{title}</h1>
            {children}
            <div className={s.center}>
              {session?.user ? (
                <>
                  <h2>Welcome back {session.user.name}</h2>
                  <button onClick={() => signOut()}>Sign out</button>
                </>
              ) : (
                <>
                  <p>Not signed in</p>
                </>
              )}
            </div>
          </div>
        </Card>
      </Center>
    </div>
  );
}

export default Banner