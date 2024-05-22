"use client";

import { Input } from "@/libs/components";
import { ReactTable } from "@/libs/components/Table";
import request from "@/libs/config/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  ProductListType,
  ProductSchema,
  ProductSearchType,
  ProductType,
} from "../Product";
import { ButtonEdit } from "../Product/styled";
import { useState } from "react";
import { OrderListType, Root } from "./type";
import { DialogCreate } from "./DialogCreate";

const Order = () => {
  const router = useRouter();

  const queryClient = new QueryClient();

  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [idCategory, setIdCategory] = useState<string | null>(null);

  const handleRowClickDetail = (categoryId: string) => {
    setIdCategory(categoryId);
    setOpenDetail(true);
  };

  const handleRowClickUpdate = (categoryId: string) => {
    setIdCategory(categoryId);
    setOpenEdit(true);
  };

  const handleRowClickCreate = () => {
    setOpenCreate(true);
  };

  const closeDetail = () => {
    setOpenDetail(false);
  };

  const closeEdit = () => {
    setOpenEdit(false);
  };

  const closeCreate = () => {
    setOpenCreate(false);
  };

  const columnHelper = createColumnHelper<Root>();

  // ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELED"]

  const columns = [
    columnHelper.accessor("_id", {
      header: () => "ID",
    }),
    columnHelper.accessor("products.product.name", {
      header: () => "Tên sản phẩm",
      cell: (info) =>
        info.row.original.products.map((item, index) => (
          <span key={index}>{item.product?.name}</span>
        )),
    }),
    columnHelper.accessor("products.quantity", {
      header: () => "Số lượng",
    }),
    columnHelper.accessor("products.price", {
      header: () => "Giá sản phẩm",
      cell: (info) => <span>{info.row.original.products[0].price}</span>,
    }),
    columnHelper.accessor("phone", {
      header: () => "Số diện thoại",
    }),
    columnHelper.accessor("shippingAddress", {
      header: () => "Địa chỉ giao hàng",
    }),
    columnHelper.accessor("status", {
      header: () => "Trạng thái",
    }),
    columnHelper.accessor("_id", {
      id: "action",
      header: "",
      cell: (info) => (
        <Stack direction="row" alignItems="center" spacing={3.5}>
          <ButtonEdit
            onClick={() => handleRowClickUpdate(info.getValue())}
            sx={{ color: "red" }}
          >
            <EditIcon />
          </ButtonEdit>
        </Stack>
      ),
    }),
  ];

  const { control, handleSubmit, watch } = useForm<ProductSearchType>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(ProductSchema),
  });

  const { data, isLoading, refetch } = useQuery({
    queryFn: async () => {
      if (!watch("name")) {
        const response = await request.get<OrderListType>("/order");
        return response.data.data;
      }

      const response = await request.get<OrderListType>("/order");
      return response.data.data;
    },
    queryKey: ["order", watch("name")],
  });

  return (
    <>
      <ReactTable columns={columns} data={data || []} isLoading={isLoading} />

      {openEdit && (
        <DialogCreate
          close={closeEdit}
          open={openEdit}
          orderId={idCategory}
          refetch={refetch}
        />
      )}
    </>
  );
};
export { Order };
