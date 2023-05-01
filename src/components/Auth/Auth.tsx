import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  ButtonProps,
} from '@mantine/core';
import { GoogleButton, FacebookButton } from "../SocialButtons/SocialButtons";
import PasswordCheckInput from '../PasswordInput/PasswordInput';
import { notifications } from '@mantine/notifications';
import { TbCheck } from "react-icons/tb"
import { signIn, signOut, useSession, getSession } from "next-auth/react";

export function Auth(props: PaperProps) {
  const [type, toggle] = useToggle(['login', 'register']);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val: string) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const handleSubmit = async (data:any) => {
    console.log(data);

    if(type === "register")
    {
        notifications.show({
            title: "Succesfully created you account",
            message: "You can now login to your account",
            icon: <TbCheck size="1.5rem" />,
            color: "teal",
        })

    }
    else if(type ==="login"){
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      //@ts-expect-error
      if(result.error){
        //@ts-expect-error
        console.error(result.error);
        notifications.show({
          title:"Error",
          message: "Inavlid email or password",
          color: "red",
        })
      }
    }
  }

  return (
    <Paper radius="md" p="xl" withBorder style={{minWidth: "400px", transition: "all 100ms ease"}} {...props}>
      <Text size="lg" weight={500}>
        Welcome to Vexr Finance,
      </Text>
      <Text size="lg" weight={500}>
        Login with your Vexr Account
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl" onClick={() => signIn("google", {callbackUrl: "http://localhost:3000"})} >Google</GoogleButton>
        <FacebookButton radius="xl">Facebook</FacebookButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit((data, event:any) => { 
        handleSubmit(data)
         event.currentTarget.reset() })}>
        <Stack>
          {type === 'register' && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />
          {type === "register" ? 
            <PasswordCheckInput
                onChange={(event) => form.setFieldValue('password', event.currentTarget.value)} 
                error={form.errors.password && 'Password should include at least 6 characters'}
                value={form.values.password}

            /> 
            : 
            <PasswordInput
                required
                label="Password"
                placeholder="Your password"
                value={form.values.password}
                onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                error={form.errors.password && 'Password should include at least 6 characters'}
                radius="md"
            />
        }

          

          {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          )}
        </Stack>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl" >
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}

// export async function getServerSideProps(context:any) {
//   const session = await getSession(context)
//   if(!session){
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       }
//     }
//   }

//   return {
//     props: { session }
//   }
// }