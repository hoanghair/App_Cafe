"use client";

import { Input } from "@/libs/components";
import { DialogBase } from "@/libs/components/Dialog/DialogBase";
import request from "@/libs/config/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";
import { QueryClient, useMutation } from "@tanstack/react-query";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ButtonCreateEditForm } from "../Product/styled";
import { CategoryCreateSchema, CategoryCreateType } from "./type";
import { enqueueSnackbar } from "notistack";

type DialogDetailProps = {
  open: boolean;
  close: () => void;
  refetch: () => void;
};

const DialogCreate: React.FC<DialogDetailProps> = ({
  open,
  close,
  refetch,
}) => {
  const queryClient = new QueryClient();

  const { mutate: create } = useMutation({
    mutationFn: async (data: CategoryCreateType) => {
      const response = await request.post("/category", data);
      return response.data;
    },
    onSuccess: () => {
      close();
      refetch();
      enqueueSnackbar("Thêm danh mục sản phẩm thành công", {
        variant: "success",
      });
    },
  });

  const { handleSubmit, control } = useForm<CategoryCreateType>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(CategoryCreateSchema),
  });

  const onSubmit: SubmitHandler<CategoryCreateType> = (data) => {
    create(data);
  };

  return (
    <DialogBase open={open} title={"Thêm mới danh mục"} onClose={close}>
      <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          control={control}
          name="name"
          label="Tên danh mục phẩm"
          placeholder="Nhập tên danh mục sản phẩm"
          fullWidth
        />
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          gap={3}
        >
          <ButtonCreateEditForm
            sx={{ width: 140 }}
            fullWidth
            type="submit"
            variant="contained"
          >
            Thêm mới
          </ButtonCreateEditForm>
        </Stack>
      </Stack>
    </DialogBase>
  );
};

export { DialogCreate };
