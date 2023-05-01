import { Button, ButtonProps, Group } from "@mantine/core";
import { GoogleIcon } from "../Icons/GoogleIcons";
import { FacebookIcon } from "../Icons/FacebookIcons";

interface ExtendedButtonProps extends ButtonProps {
  onClick?: () => void;
}

export function GoogleButton(props: ExtendedButtonProps) {
  return (
    <Button
      leftIcon={<GoogleIcon />}
      variant="default"
      color="gray"
      {...props}
    />
  );
}

export function FacebookButton(props: ButtonProps) {
  return (
    <Button
      leftIcon={<FacebookIcon />}
      sx={(theme) => ({
        backgroundColor: "#4267B2",
        color: "#fff",
        "&:not([data-disabled]):hover": {
          backgroundColor: theme.fn.darken("#4267B2", 0.1),
        },
      })}
      {...props}
    />
  );
}

// Twitter button as anchor
// export function TwitterButton(props: ButtonProps & React.ComponentPropsWithoutRef<'a'>) {
//   return (
//     <Button
//       component="a"
//       leftIcon={<TwitterIcon size="1rem" color="#00ACEE" />}
//       variant="default"
//       {...props}
//     />
//   );
// }

// export function GithubButton(props: ButtonProps) {
//   return (
//     <Button
//       {...props}
//       leftIcon={<GithubIcon size="1rem" />}
//       sx={(theme) => ({
//         backgroundColor: theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
//         color: '#fff',
//         '&:hover': {
//           backgroundColor: theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
//         },
//       })}
//     />
//   );
// }

export function SocialButtons() {
  return (
    <Group position="center" sx={{ padding: 15 }}>
      <GoogleButton>Continue with Google</GoogleButton>
      {/* <TwitterButton href="https://twitter.com/mantinedev" target="_blank">
        Follow on Twitter
      </TwitterButton> */}
      <FacebookButton>Sign in with Facebook</FacebookButton>
      {/* <GithubButton>Login with GitHub</GithubButton> */}
    </Group>
  );
}
