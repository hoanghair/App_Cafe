"use client";

import { DialogBase } from "@/libs/components/Dialog/DialogBase";
import { TableSkeleton } from "@/libs/components/Table/TableSkeleton";
import request from "@/libs/config/axios";
import { Stack, Typography, styled } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { CategoryDetailType } from "./type";

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
    queryKey: ["category", categoryId],
    queryFn: async () => {
      const { data } = await request.get<CategoryDetailType>(
        `/category/${categoryId}`
      );
      return data.data;
    },
    enabled: !!categoryId,
  });

  return (
    <DialogBase open={open} title={"Chi tiết danh mục"} onClose={close}>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <Stack direction={"row"} gap={3}>
          <Label>Tên danh mục: </Label>
          <Value>{data?.name}</Value>
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
