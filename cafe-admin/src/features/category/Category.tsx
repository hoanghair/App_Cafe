"use client";

import { Input } from "@/libs/components";
import { ReactTable } from "@/libs/components/Table";
import request from "@/libs/config/axios";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  CategoryListType,
  CategorySearchType,
  CategoryType,
  DialogCreate,
  DialogDetail,
  DialogEdit,
} from ".";
import { ButtonCreate, ButtonEdit } from "../Product/styled";

import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";

const Category = () => {
  const router = useRouter();
  const columnHelper = createColumnHelper<CategoryType>();
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

  const columns = [
    columnHelper.accessor("name", {
      header: () => "Tên",
    }),
    columnHelper.accessor("_id", {
      id: "action",
      header: "",
      cell: (info) => (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={"flex-end"}
          spacing={3.5}
        >
          <ButtonEdit onClick={() => handleRowClickDetail(info.getValue())}>
            <VisibilityIcon />
          </ButtonEdit>
          <ButtonEdit onClick={() => handleRowClickUpdate(info.getValue())}>
            <EditIcon />
          </ButtonEdit>
        </Stack>
      ),
    }),
  ];

  const { control, watch } = useForm<CategorySearchType>({
    defaultValues: {
      name: "",
    },
  });

  const { data, isLoading, refetch } = useQuery({
    queryFn: async () => {
      if (!watch("name")) {
        const response = await request.get<CategoryListType>("/category");
        return response.data.data;
      }

      const response = await request.get<CategoryListType>("/category", {
        params: {
          name: watch("name"),
        },
      });
      return response.data.data;
    },
    queryKey: ["category", watch("name")],
  });

  const closeDetail = () => {
    setOpenDetail(false);
  };

  const closeEdit = () => {
    setOpenEdit(false);
  };

  const closeCreate = () => {
    setOpenCreate(false);
  };

  return (
    <>
      <Stack direction="row" justifyContent="flex-end" mb={2}>
        <ButtonCreate
          variant="outlined"
          endIcon={<ArrowForwardIcon />}
          sx={{ width: 140 }}
          onClick={handleRowClickCreate}
        >
          Tạo mới
        </ButtonCreate>
      </Stack>

      <Stack
        direction="row"
        justifyContent={"flex-end"}
        spacing={4}
        component="form"
        mb={4}
      >
        <Stack direction="row" spacing={2}>
          <Input
            control={control}
            name="name"
            placeholder="Tìm kiếm..."
            controlProps={{
              sx: { label: { fontWeight: 500, marginBottom: 0, fontSize: 14 } },
            }}
            sx={{
              width: 200,
              "& .MuiOutlinedInput-input": {
                fontSize: 12,
                height: 24,
              },
            }}
          />
        </Stack>
      </Stack>

      <ReactTable columns={columns} data={data || []} isLoading={isLoading} />
      <DialogDetail
        categoryId={idCategory}
        open={openDetail}
        close={closeDetail}
      />
      <DialogEdit
        categoryId={idCategory}
        open={openEdit}
        close={closeEdit}
        refetch={refetch}
      />
      <DialogCreate open={openCreate} close={closeCreate} refetch={refetch} />
    </>
  );
};
export { Category };
