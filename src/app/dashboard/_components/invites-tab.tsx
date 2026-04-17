"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  Add01Icon,
  Cancel01Icon,
  Copy01Icon,
  MoreHorizontalIcon,
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

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
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
import { formatDate, getBaseUrl } from "@/lib/utils";

import type { Invite } from "../types";
import { CreateInviteDialog } from "./create-invite-dialog";
import { RoleBadge } from "./role-badge";
import { TableSkeleton } from "./skeletons";

function InviteStatusBadge({ status }: { status: Invite["status"] }) {
  const variants: Record<Invite["status"], "secondary" | "default" | "destructive" | "outline"> = {
    pending: "outline",
    used: "secondary",
    canceled: "destructive",
    rejected: "destructive",
  };
  return <Badge variant={variants[status]}>{status}</Badge>;
}

export function InvitesTab() {
  const [invites, setInvites] = useState<Invite[]>([]);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [createOpen, setCreateOpen] = useState(false);

  const fetchInvites = useCallback(async () => {
    try {
      const { data, error } = await authClient.invite.list({
        query: { limit: 100, sortBy: "createdAt", sortDirection: "desc" },
      });
      if (error) {
        toast.error("Failed to load invites.");
        return;
      }
      setInvites((data?.invitations as Invite[]) ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  const invitesInit = useRef(false);
  useEffect(() => {
    if (invitesInit.current) return;
    invitesInit.current = true;
    void fetchInvites();
  }, [fetchInvites]);

  const handleCancel = useCallback(
    async (token: string) => {
      const { error } = await authClient.invite.cancel({ token });
      if (error) {
        toast.error(error.message ?? "Failed to cancel invite.");
        return;
      }
      toast.success("Invite cancelled.");
      fetchInvites();
    },
    [fetchInvites]
  );

  const handleCopyLink = useCallback(async (token: string) => {
    const url = `${getBaseUrl()}/invite/${token}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Invite link copied to clipboard.");
    } catch {
      toast.error("Failed to copy link. Please copy it manually.");
    }
  }, []);

  const columns = useMemo<ColumnDef<Invite>[]>(
    () => [
      {
        accessorKey: "token",
        header: "Token",
        cell: ({ row }) => (
          <span className="font-mono text-xs">
            {row.original.token ? `${row.original.token.slice(0, 12)}...` : "—"}
          </span>
        ),
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => <RoleBadge role={row.original.role} />,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <InviteStatusBadge status={row.original.status} />,
      },
      {
        accessorKey: "maxUses",
        header: "Max Uses",
        cell: ({ row }) => <span className="text-muted-foreground">{row.original.maxUses}</span>,
      },
      {
        accessorKey: "expiresAt",
        header: "Expires",
        cell: ({ row }) => (
          <span className="text-muted-foreground">{formatDate(row.original.expiresAt)}</span>
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
          const invite = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="ghost" size="icon-xs" />}>
                <HugeiconsIcon icon={MoreHorizontalIcon} strokeWidth={2} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={4}>
                <DropdownMenuGroup>
                  {invite.token && (
                    <DropdownMenuItem onClick={() => handleCopyLink(invite.token!)}>
                      <HugeiconsIcon icon={Copy01Icon} strokeWidth={2} />
                      Copy link
                    </DropdownMenuItem>
                  )}
                  {invite.status === "pending" && invite.token && (
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => handleCancel(invite.token!)}
                    >
                      <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
                      Cancel
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [handleCancel, handleCopyLink]
  );

  const table = useReactTable({
    data: invites,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (loading) {
    return <TableSkeleton rows={2} cols={7} />;
  }

  return (
    <>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {invites.length} invitation{invites.length !== 1 ? "s" : ""}
        </p>
        <Button size="sm" onClick={() => setCreateOpen(true)}>
          <HugeiconsIcon icon={Add01Icon} strokeWidth={2} data-icon="inline-start" />
          Create invite
        </Button>
      </div>

      <div className="mt-3 rounded-lg border border-border">
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
            {table.getRowModel().rows.length > 0 ? (
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
                  No invites yet. Create one to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <CreateInviteDialog open={createOpen} onOpenChange={setCreateOpen} onCreated={fetchInvites} />
    </>
  );
}
