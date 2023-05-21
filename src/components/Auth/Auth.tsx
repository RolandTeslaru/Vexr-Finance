import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
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
} from "@mantine/core";
import { GoogleButton, FacebookButton } from "../SocialButtons/SocialButtons";
import PasswordCheckInput from "../PasswordInput/PasswordInput";
import { notifications } from "@mantine/notifications";
import { TbCheck } from "react-icons/tb";
import { signIn, signOut, useSession, getSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import { LoginUserParams } from "../../types/index";

const loginUser = async ({ email, password }: LoginUserParams) => {
  const res = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });

  return res;
};

const handleGoogleSignIn = async () => {
    const result = await signIn("google", { callbackUrl: "http://localhost:3000/dashboard"});

    if (result?.error) {
      notifications.show({
        title: "Something went wrong",
        message: result.error,
        color: "red",
      });
    }
}

export function Auth(props: PaperProps) {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const router = useRouter();

  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },
    
    validate: {
      email: (val: string) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const handleSubmit = async (data: any) => {

    if (type === "register") {
      try {
        setSubmitLoading(true);
        const apiRes = await axios.post(
          "http://localhost:3000/api/auth/signUp",
          data
        );

        if (apiRes?.data.success) {
          const loginRes = await loginUser({
            email: data.email,
            password: data.password,
          });

          if (loginRes && !loginRes.ok) {
            setSubmitError(loginRes.error || "login failed");
            notifications.show({
              title: "Error",
              message: loginRes.error || "login failed",
              color: "red",
            });
          } else {
            notifications.show({
              title: "Succesfully created you account",
              message: "You can now login to your account",
              icon: <TbCheck size="1.5rem" />,
              color: "teal",
            });
            router.push("/dashboard");
          }
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          const errorMsg = error.response?.data?.error;

          setSubmitError(errorMsg);

          notifications.show({
            title: "Error",
            message: errorMsg,
            color: "red",
          });
        }
      }

      setSubmitLoading(false);
    } else if (type === "login") {
      try {
        setSubmitLoading(true);

        const loginRes = await loginUser({
          email: data.email,
          password: data.password,
        });

        if (loginRes && !loginRes.ok) {
          setSubmitError(loginRes.error || "login failed");
          notifications.show({
            title: "Error",
            message: loginRes.error || "login failed",
            color: "red",
          });
        } else {
          notifications.show({
            title: "Succesfully logged in",
            message: "Welcome back",
            icon: <TbCheck size="1.5rem" />,
            color: "teal",
          });
          router.push("/dashboard");
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMsg = error.response?.data?.error;

          setSubmitError(errorMsg);

          notifications.show({
            title: "Error",
            message: errorMsg,
            color: "red",
          });
        }
        notifications.show({
          title: "Error",
          message: "Inavlid email or password",
          color: "red",
        });
      }

      setSubmitLoading(false);
    }
  };

  return (
    <Paper
      radius="md"
      p="xl"
      withBorder
      style={{ minWidth: "400px", transition: "all 100ms ease" }}
      {...props}
    >
      <Text size="lg" weight={500}>
        Welcome to Vexr Finance,
      </Text>
      <Text size="lg" weight={500}>
        Login with your Vexr Account
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton
          radius="xl"
          onClick={handleGoogleSignIn}
        >
          Google
        </GoogleButton>
        <FacebookButton radius="xl">Facebook</FacebookButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form
        onSubmit={form.onSubmit((data, event: any) => {
          handleSubmit(data);
          event.currentTarget.reset();
        })}
      >
        <Stack>
          {type === "register" && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
            radius="md"
          />
          {type === "register" ? (
            <PasswordCheckInput
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
              value={form.values.password}
            />
          ) : (
            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
              radius="md"
            />
          )}

          {type === "register" && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
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
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl" disabled={submitLoading}>
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
