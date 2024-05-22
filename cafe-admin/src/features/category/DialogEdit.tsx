"use client";

import { Input } from "@/libs/components";
import { DialogBase } from "@/libs/components/Dialog/DialogBase";
import request from "@/libs/config/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ButtonDelete,
  ButtonEdit,
  ButtonCreateEditForm,
} from "../Product/styled";
import {
  CategoryCreateSchema,
  CategoryCreateType,
  CategoryDetailType,
} from "./type";
import { enqueueSnackbar } from "notistack";

type DialogDetailProps = {
  open: boolean;
  close: () => void;
  categoryId: string | null;
  refetch: () => void;
};

const DialogEdit: React.FC<DialogDetailProps> = ({
  open,
  close,
  categoryId,
  refetch,
}) => {
  const queryClient = new QueryClient();

  const { data } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: async () => {
      const { data } = await request.get<CategoryDetailType>(
        `/category/${categoryId}`
      );
      return data.data;
    },
    enabled: !!categoryId,
  });

  const { mutate: update } = useMutation({
    mutationFn: async (data: CategoryCreateType) => {
      const response = await request.put(`/category/${categoryId}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      enqueueSnackbar("Sửa danh mục thành công", {
        variant: "success",
      });
      close();
      refetch();
    },
  });

  const { handleSubmit, control } = useForm<CategoryCreateType>({
    defaultValues: {
      name: "",
    },
    values: data,
    resolver: zodResolver(CategoryCreateSchema),
  });

  const onSubmit: SubmitHandler<CategoryCreateType> = (data) => {
    update(data);
  };

  const { mutate: deleteCategory } = useMutation({
    mutationFn: async () => {
      const response = await request.delete(`/category/${categoryId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      enqueueSnackbar("Xóa danh mục sản phẩm thành công", {
        variant: "success",
      });
    },
    onError: () => {
      enqueueSnackbar(
        "Xóa danh mục sản phẩm không thành công. Vui lòng thử lại sau!",
        {
          variant: "error",
        }
      );
    },
  });

  return (
    <DialogBase open={open} title={"Sửa danh mục"} onClose={close}>
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
            Cập nhật
          </ButtonCreateEditForm>
          <ButtonDelete
            sx={{ width: 140 }}
            fullWidth
            type="submit"
            variant="contained"
            onClick={() => deleteCategory()}
          >
            Xoá
          </ButtonDelete>
        </Stack>
      </Stack>
    </DialogBase>
  );
};

export { DialogEdit };
