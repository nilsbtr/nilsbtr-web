"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  Delete02Icon,
  MoreHorizontalIcon,
  ShieldKeyIcon,
  UserBlock01Icon,
  UserCheck01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { authClient } from "@/lib/auth-client";
import { formatDate } from "@/lib/utils";

import type { User } from "../types";
import { RoleBadge } from "./role-badge";
import { SetRoleDialog } from "./set-role-dialog";
import { TableSkeleton } from "./skeletons";

export function UsersTab({ currentUserId }: { currentUserId: string }) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState<SortingState>([]);

  const [roleDialog, setRoleDialog] = useState<{ open: boolean; user: User | null }>({
    open: false,
    user: null,
  });
  const [removeDialog, setRemoveDialog] = useState<{ open: boolean; user: User | null }>({
    open: false,
    user: null,
  });

  const fetchUsers = useCallback(async () => {
    try {
      const { data, error } = await authClient.admin.listUsers({
        query: { limit: 100, sortBy: "createdAt", sortDirection: "desc" },
      });
      if (error) {
        setUsers([]);
        toast.error("Failed to load users.");
        return;
      }
      setUsers((data?.users as User[]) ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  const usersInit = useRef(false);
  useEffect(() => {
    if (usersInit.current) return;
    usersInit.current = true;
    void fetchUsers();
  }, [fetchUsers]);

  async function handleSetRole(userId: string, role: "user" | "admin") {
    const { error } = await authClient.admin.setRole({ userId, role });
    if (error) {
      toast.error(error.message ?? "Failed to update role.");
      return;
    }
    toast.success("Role updated.");
    setRoleDialog({ open: false, user: null });
    fetchUsers();
  }

  const handleBanToggle = useCallback(
    async (user: User) => {
      if (user.banned) {
        const { error } = await authClient.admin.unbanUser({ userId: user.id });
        if (error) {
          toast.error(error.message ?? "Failed to unban user.");
          return;
        }
        toast.success(`${user.name} has been unbanned.`);
      } else {
        const { error } = await authClient.admin.banUser({ userId: user.id });
        if (error) {
          toast.error(error.message ?? "Failed to ban user.");
          return;
        }
        toast.success(`${user.name} has been banned.`);
      }
      fetchUsers();
    },
    [fetchUsers]
  );

  async function handleRemoveUser(userId: string) {
    const { error } = await authClient.admin.removeUser({ userId });
    if (error) {
      toast.error(error.message ?? "Failed to remove user.");
      return;
    }
    toast.success("User removed.");
    setRemoveDialog({ open: false, user: null });
    fetchUsers();
  }

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => <span className="text-muted-foreground">{row.original.email}</span>,
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => <RoleBadge role={row.original.role} />,
      },
      {
        id: "status",
        header: "Status",
        accessorFn: (row) => (row.banned ? "banned" : "active"),
        cell: ({ row }) =>
          row.original.banned ? (
            <Badge variant="destructive">Banned</Badge>
          ) : (
            <Badge variant="secondary">Active</Badge>
          ),
      },
      {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => (
          <span className="text-muted-foreground">{formatDate(row.original.createdAt)}</span>
        ),
      },
      {
        id: "actions",
        size: 40,
        cell: ({ row }) => {
          const user = row.original;
          const isSelf = user.id === currentUserId;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="ghost" size="icon-xs" />}>
                <HugeiconsIcon icon={MoreHorizontalIcon} strokeWidth={2} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={4}>
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => setTimeout(() => setRoleDialog({ open: true, user }), 0)}
                  >
                    <HugeiconsIcon icon={ShieldKeyIcon} strokeWidth={2} />
                    Set Role
                  </DropdownMenuItem>
                  {!isSelf && (
                    <>
                      <DropdownMenuItem onClick={() => handleBanToggle(user)}>
                        <HugeiconsIcon
                          icon={user.banned ? UserCheck01Icon : UserBlock01Icon}
                          strokeWidth={2}
                        />
                        {user.banned ? "Unban" : "Ban"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => setTimeout(() => setRemoveDialog({ open: true, user }), 0)}
                      >
                        <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />
                        Remove
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [currentUserId, handleBanToggle]
  );

  const table = useReactTable({
    data: users,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (loading) {
    return <TableSkeleton rows={3} cols={6} />;
  }

  return (
    <>
      <div className="mt-4 rounded-lg border border-border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="py-8 text-center text-muted-foreground"
                >
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <SetRoleDialog
        open={roleDialog.open}
        user={roleDialog.user}
        onOpenChange={(open) => setRoleDialog((prev) => ({ ...prev, open }))}
        onConfirm={handleSetRole}
      />

      <AlertDialog
        open={removeDialog.open}
        onOpenChange={(open) => setRemoveDialog((prev) => ({ ...prev, open }))}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove user</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete <strong>{removeDialog.user?.name}</strong> and all their
              data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => removeDialog.user && handleRemoveUser(removeDialog.user.id)}
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
