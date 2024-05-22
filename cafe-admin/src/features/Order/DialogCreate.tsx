"use client";

import { Input, Select } from "@/libs/components";
import { DialogBase } from "@/libs/components/Dialog/DialogBase";
import request from "@/libs/config/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ButtonCreateEditForm, ButtonDelete } from "../Product/styled";
import { CategoryListType } from "../category";
import { OrderUpdateType, OrderUpdateSchema, OrderDetailType } from "./type";
import { status } from "@/libs/config/theme/colors";

type DialogDetailProps = {
  open: boolean;
  close: () => void;
  refetch: () => void;
  orderId?: string | null;
};

const DialogCreate: React.FC<DialogDetailProps> = ({
  open,
  close,
  refetch,
  orderId,
}) => {
  const { data } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const { data } = await request.get<OrderDetailType>(`/order/${orderId}`);
      return data.data.status;
    },
    enabled: !!orderId,
  });

  const { handleSubmit, control } = useForm<OrderUpdateType>({
    defaultValues: {
      status: "",
    },
    values: {
      status: data || "PENDING",
    },
    resolver: zodResolver(OrderUpdateSchema),
  });

  const { mutate: updateOrder } = useMutation({
    mutationFn: async (data: OrderUpdateType) => {
      const response = await request.put(
        `/order/update-status/${orderId}`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      enqueueSnackbar("Cập nhật order thành công", {
        variant: "success",
      });
      close();
      refetch();
    },
  });

  const onSubmit: SubmitHandler<OrderUpdateType> = (data) => {
    updateOrder(data);
  };

  const StatusOptions = [
    {
      value: "PENDING",
      label: "Chờ xử lý",
    },
    {
      value: "PROCESSING",
      label: "Đang xử lý",
    },
    {
      value: "SHIPPED",
      label: "Đã giao hàng",
    },
    {
      value: "DELIVERED",
      label: "Đã nhận hàng",
    },
    {
      value: "CANCELED",
      label: "Đã hủy",
    },
  ];

  return (
    <DialogBase open={open} title="Cập nhật đơn hàng" onClose={close}>
      <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Select
          control={control}
          name="status"
          label="Trạng thái"
          fullWidth
          options={StatusOptions}
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

export { DialogCreate };
