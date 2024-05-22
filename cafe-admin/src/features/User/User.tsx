"use client";

import { Input } from "@/libs/components";
import { ReactTable } from "@/libs/components/Table";
import request from "@/libs/config/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";
// import CreateIcon from '@public/assets/svgs/add.svg'
// import DetailIcon from '@public/assets/svgs/detail.svg'
// import EditIcon from '@public/assets/svgs/edit.svg'
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { UserListType, UserSchema, UserSearchType, UserType } from ".";

const User = () => {
  const router = useRouter();

  const columnHelper = createColumnHelper<UserType>();

  const columns = [
    columnHelper.accessor("username", {
      header: () => "Tên người dùng",
    }),
    columnHelper.accessor("email", {
      header: () => "Email",
    }),
    columnHelper.accessor("role", {
      header: () => "Vai trò",
    }),
  ];

  const { control, watch } = useForm<UserSearchType>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(UserSchema),
  });

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      if (!watch("name")) {
        const response = await request.get<UserListType>("/user");
        return response.data.data;
      }

      const response = await request.get<UserListType>("/user", {
        params: {
          name: watch("name"),
        },
      });
      return response.data.data;
    },
    queryKey: ["user", watch("name")],
  });

  return (
    <>
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
    </>
  );
};
export { User };
