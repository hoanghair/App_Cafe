"use client";

import { Input, Select } from "@/libs/components";
import { DialogBase } from "@/libs/components/Dialog/DialogBase";
import request from "@/libs/config/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ButtonCreateEditForm } from "../Product/styled";
import { CategoryListType } from "../category";
import {
  ProductCreateSchema,
  ProductCreateType,
  ProductDetailType,
} from "./type";

type DialogDetailProps = {
  open: boolean;
  close: () => void;
  refetch: () => void;
  productId?: string;
};

const DialogEdit: React.FC<DialogDetailProps> = ({
  open,
  close,
  refetch,
  productId,
}) => {
  const queryClient = new QueryClient();

  const { data } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const { data } = await request.get<ProductDetailType>(
        `/product/${productId}`
      );
      return data.data;
    },
    enabled: !!productId,
  });

  const { data: category } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const { data } = await request.get<CategoryListType>("/category");
      return data.data;
    },
  });

  const categoryOptions =
    category?.map((item) => ({
      label: item.name,
      value: item._id,
    })) || [];

  const { mutate: updateProduct } = useMutation({
    mutationFn: async (data: ProductCreateType) => {
      const response = await request.put(`/product/${productId}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const { handleSubmit, control } = useForm<ProductCreateType>({
    defaultValues: {
      name: "",
      price: "",
      description: "",
      quantity: "",
      image: "",
      categoryId: "",
      cost: "",
    },
    values: data,
    resolver: zodResolver(ProductCreateSchema),
  });

  const onSubmit: SubmitHandler<ProductCreateType> = (data) => {
    updateProduct(data);
  };

  return (
    <DialogBase open={open} title={"Thêm mới sản phẩm"} onClose={close}>
      <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          control={control}
          name="name"
          label="Tên sản phẩm"
          placeholder="Nhập tên sản phẩm"
          fullWidth
        />

        <Input
          control={control}
          name="quantity"
          label="Số lượng sản phẩm"
          placeholder="Nhập số lượng sản phẩm"
          fullWidth
        />

        <Input
          control={control}
          name="cost"
          label="Giá nhập sản phẩm"
          placeholder="Nhập giá nhập sản phẩm"
          fullWidth
        />

        <Input
          control={control}
          name="price"
          label="Giá bán sản phẩm"
          placeholder="Nhập giá bán sản phẩm"
          fullWidth
        />

        <Input
          control={control}
          name="image"
          label="Hình ảnh sản phẩm"
          placeholder="Nhập hình ảnh sản phẩm"
          fullWidth
        />

        <Input
          control={control}
          name="description"
          label="Mô tả sản phẩm"
          placeholder="Nhập mô tả sản phẩm"
          fullWidth
        />

        <Select
          control={control}
          name="categoryId"
          label="Danh mục"
          options={categoryOptions}
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
        </Stack>
      </Stack>
    </DialogBase>
  );
};

export { DialogEdit };
