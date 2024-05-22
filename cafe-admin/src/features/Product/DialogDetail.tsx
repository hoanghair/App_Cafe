"use client";

import { DialogBase } from "@/libs/components/Dialog/DialogBase";
import { TableSkeleton } from "@/libs/components/Table/TableSkeleton";
import request from "@/libs/config/axios";
import { Stack, Typography, styled } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ProductDetailType } from "./type";

type DialogDetailProps = {
  open: boolean;
  close: () => void;
  categoryId: string | null;
};

const DialogDetail: React.FC<DialogDetailProps> = ({
  open,
  close,
  categoryId,
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["product", categoryId],
    queryFn: async () => {
      const { data } = await request.get<ProductDetailType>(
        `/product/${categoryId}`
      );
      return data.data;
    },
    enabled: !!categoryId,
  });

  const Product = [
    {
      title: "Tên sản phẩm",
      value: data?.name,
    },
    {
      title: "Mô tả",
      value: data?.description,
    },
    {
      title: "Giá",
      value: data?.price,
    },
    {
      title: "Hình ảnh",
      value: <img src={data?.image} alt="product" width={50} height={50} />,
    },
    {
      title: "Danh mục",
      value: data?.categoryId,
    },
  ];

  return (
    <DialogBase open={open} title={"Chi tiết sản phẩm"} onClose={close}>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <Stack spacing={1}>
          {Product.map((item, index) => (
            <Stack direction="row" key={index}>
              <Label variant="body2" width="50%">
                {item.title}
              </Label>

              <Value>{item.value}</Value>
            </Stack>
          ))}
        </Stack>
      )}
    </DialogBase>
  );
};

const Label = styled(Typography)({
  color: "#D17842",
  fontSize: 16,
});

const Value = styled(Typography)({
  color: "#000",
  fontSize: 16,
});

export { DialogDetail };
