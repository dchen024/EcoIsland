"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type Container = {
  id: string;
  created_at: string;
  status: "Inactive" | "Active" | "Returned" | "Cleaning";
  cycle_count: number;
  borrower_id: string | null;
  profiles: { full_name: string } | null;
};

export const columns: ColumnDef<Container>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleString(),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const container = row.original;
      return (
        <Select
          defaultValue={container.status}
          onValueChange={(newStatus) => {
            // This function will be defined in the page component
            (row.original as any).onStatusChange(
              container.id,
              newStatus as Container["status"],
            );
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Inactive">Inactive</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Returned">Returned</SelectItem>
            <SelectItem value="Cleaning">Cleaning</SelectItem>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey: "cycle_count",
    header: "Cycle Count",
  },
  {
    accessorKey: "profiles.full_name",
    header: "Borrower",
    cell: ({ row }) => row.original.profiles?.full_name || "N/A",
  },
];
