import { Center, Container, createStyles } from "@mantine/core";
import React from "react";
import { Auth } from "@/components/Auth/Auth";

const style = createStyles((theme) => ({
  inner: {
    paddingTop: `calc(${theme.spacing.xl} * 8)`,
    paddingBottom: `calc(${theme.spacing.xl} * 5)`,
  },
}));

const auth = () => {
  const { classes } = style();

  return (
    <div>
      <Container sx={{ minHeight: "70vh", marginTop: "1rem" }}>
        <Center className={classes.inner}>
          <Auth />
        </Center>
      </Container>
    </div>
  );
};

export default auth;
