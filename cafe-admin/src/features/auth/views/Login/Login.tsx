"use client";

import { login } from "@/libs/api/auth";
import { Input } from "@/libs/components";
import { useAuth } from "@/libs/context";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { loginText } from "@public/locales";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginInputSchema, LoginInputType } from ".";
import { DescriptionTitle, SubTitle } from "../styled";

const Login = () => {
  const router = useRouter();
  const { setAccessToken, setAdmin } = useAuth();

  const { control, handleSubmit } = useForm<LoginInputType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginInputSchema),
  });

  const mutation = useMutation({
    mutationFn: login,
  });

  const onSubmit: SubmitHandler<LoginInputType> = async (data, event) => {
    const { email, password } = data;

    mutation.mutate(
      { email, password },
      {
        onError: (error) => {
          enqueueSnackbar(error.message, { variant: "error" });
        },
        onSuccess: (data) => {
          setAdmin(data);
          setAccessToken(data.token);
          router.push("/");
        },
      }
    );
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="center"
        pt={{ xs: 30, sm: 30 }}
        height={"100%"}
      >
        <Stack
          sx={{
            width: { xs: "100%", sm: 450 },
            height: "100%",
            alignItems: "center",
            justifyContent: "flex-start",
            border: "6px solid #D17842",
            padding: "24px",
            borderRadius: "6px",
          }}
        >
          <Stack alignItems="center" mb={4}>
            <SubTitle align="center" color={"#D17842"}>
              Đăng Nhập{" "}
              <a style={{ fontSize: "16px", color: "#000" }}>
                (Quản trị hệ thống)
              </a>
            </SubTitle>
          </Stack>

          <Stack
            width="100%"
            spacing={2}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              control={control}
              name="email"
              label={loginText.email}
              fullWidth
              placeholder={loginText.email}
              autoComplete="email"
            />

            <Input
              control={control}
              name="password"
              label={loginText.password}
              type="password"
              fullWidth
              placeholder={loginText.password}
              autoComplete="new-password"
            />

            <Button
              fullWidth
              style={{
                backgroundColor: "#D17842",
              }}
              variant="contained"
              type="submit"
            >
              {loginText.submit}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export { Login };
