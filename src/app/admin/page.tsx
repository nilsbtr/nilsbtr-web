"use client";

import { useState } from "react";

import {
  Cancel01Icon,
  CheckmarkCircle01Icon,
  Copy01Icon,
  Delete02Icon,
  ShieldKeyIcon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authClient } from "@/lib/auth-client";
import { type CreateInviteValues, createInviteSchema } from "@/lib/validations";

// ---------------------------------------------------------------------------
// Users Tab
// ---------------------------------------------------------------------------

function UsersTab() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "users", search],
    queryFn: async () => {
      const res = await authClient.admin.listUsers({
        query: {
          limit: 100,
          ...(search ? { searchValue: search, searchField: "email", searchOperator: "contains" } : {}),
        },
      });
      return res.data;
    },
  });

  const banMutation = useMutation({
    mutationFn: (userId: string) => authClient.admin.banUser({ userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      toast.success("User banned.");
    },
    onError: () => toast.error("Failed to ban user."),
  });

  const unbanMutation = useMutation({
    mutationFn: (userId: string) => authClient.admin.unbanUser({ userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      toast.success("User unbanned.");
    },
    onError: () => toast.error("Failed to unban user."),
  });

  const removeMutation = useMutation({
    mutationFn: (userId: string) => authClient.admin.removeUser({ userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      toast.success("User removed.");
    },
    onError: () => toast.error("Failed to remove user."),
  });

  const setRoleMutation = useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: "admin" | "user" }) =>
      authClient.admin.setRole({ userId, role }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      toast.success("Role updated.");
    },
    onError: () => toast.error("Failed to update role."),
  });

  const users = data?.users ?? [];

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search by email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading &&
              Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-36" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-14" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-14" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-20 ml-auto" /></TableCell>
                </TableRow>
              ))}
            {!isLoading && users.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-6">
                  No users found.
                </TableCell>
              </TableRow>
            )}
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell className="text-muted-foreground">{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                    {user.role ?? "user"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {user.banned ? (
                    <Badge variant="destructive">Banned</Badge>
                  ) : (
                    <Badge variant="outline">Active</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    {user.role !== "admin" ? (
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        title="Promote to admin"
                        onClick={() => setRoleMutation.mutate({ userId: user.id, role: "admin" })}
                      >
                        <HugeiconsIcon icon={ShieldKeyIcon} strokeWidth={2} />
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        title="Demote to user"
                        onClick={() => setRoleMutation.mutate({ userId: user.id, role: "user" })}
                      >
                        <HugeiconsIcon icon={UserIcon} strokeWidth={2} />
                      </Button>
                    )}
                    {user.banned ? (
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        title="Unban user"
                        onClick={() => unbanMutation.mutate(user.id)}
                      >
                        <HugeiconsIcon icon={CheckmarkCircle01Icon} strokeWidth={2} />
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        title="Ban user"
                        onClick={() => banMutation.mutate(user.id)}
                      >
                        <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
                      </Button>
                    )}
                    <AlertDialog>
                      <AlertDialogTrigger
                        render={
                          <Button variant="destructive" size="icon-xs" title="Remove user">
                            <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />
                          </Button>
                        }
                      />
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remove user?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete {user.name}&apos;s account. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            variant="destructive"
                            onClick={() => removeMutation.mutate(user.id)}
                          >
                            Remove
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Invites Tab
// ---------------------------------------------------------------------------

interface Invite {
  id: string;
  codeHash: string;
  maxUses: number;
  useCount: number;
  expiresAt: string;
  createdBy: string;
  createdAt: string;
}

function InvitesTab() {
  const queryClient = useQueryClient();
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "invites"],
    queryFn: async () => {
      const res = await fetch("/api/admin/invites");
      if (!res.ok) throw new Error("Failed to load invites.");
      return res.json() as Promise<{ invites: Invite[] }>;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (values: CreateInviteValues) => {
      const res = await fetch("/api/admin/invites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Failed to create invite.");
      return res.json() as Promise<{ id: string; token: string; expiresAt: string; maxUses: number }>;
    },
    onSuccess: (data) => {
      const link = `${window.location.origin}/signup?code=${data.token}`;
      setGeneratedLink(link);
      queryClient.invalidateQueries({ queryKey: ["admin", "invites"] });
      toast.success("Invite created.");
    },
    onError: () => toast.error("Failed to create invite."),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/invites/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete invite.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "invites"] });
      toast.success("Invite deleted.");
    },
    onError: () => toast.error("Failed to delete invite."),
  });

  const form = useForm<CreateInviteValues>({
    resolver: zodResolver(createInviteSchema),
    defaultValues: { maxUses: 1, expiresInHours: 168 },
  });

  function onSubmit(values: CreateInviteValues) {
    setGeneratedLink(null);
    createMutation.mutate(values);
  }

  function copyLink(link: string) {
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard.");
  }

  const invites = data?.invites ?? [];

  function inviteStatus(invite: Invite) {
    if (invite.useCount >= invite.maxUses) return "used";
    if (new Date(invite.expiresAt) < new Date()) return "expired";
    return "active";
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create invite</CardTitle>
          <CardDescription>Generate a new invite link to share.</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="invite-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className="grid grid-cols-2 gap-4">
                <Controller
                  name="maxUses"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid || undefined}>
                      <FieldLabel htmlFor="invite-max-uses">Max uses</FieldLabel>
                      <Input
                        id="invite-max-uses"
                        type="number"
                        min={1}
                        max={1000}
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        onBlur={field.onBlur}
                        ref={field.ref}
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name="expiresInHours"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid || undefined}>
                      <FieldLabel htmlFor="invite-expires">Expires in (hours)</FieldLabel>
                      <Input
                        id="invite-expires"
                        type="number"
                        min={1}
                        max={720}
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        onBlur={field.onBlur}
                        ref={field.ref}
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </div>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex-col items-stretch gap-3">
          {generatedLink && (
            <div className="flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-2">
              <code className="flex-1 truncate text-xs">{generatedLink}</code>
              <Button variant="ghost" size="icon-xs" onClick={() => copyLink(generatedLink)}>
                <HugeiconsIcon icon={Copy01Icon} strokeWidth={2} />
              </Button>
            </div>
          )}
          <Button
            type="submit"
            form="invite-form"
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? "Creating..." : "Create invite link"}
          </Button>
        </CardFooter>
      </Card>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Uses</TableHead>
              <TableHead>Expires</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading &&
              Array.from({ length: 2 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-14" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-10" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-8 ml-auto" /></TableCell>
                </TableRow>
              ))}
            {!isLoading && invites.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-6">
                  No invites yet.
                </TableCell>
              </TableRow>
            )}
            {invites.map((invite) => {
              const status = inviteStatus(invite);
              return (
                <TableRow key={invite.id}>
                  <TableCell>
                    <Badge
                      variant={
                        status === "active" ? "outline" : status === "used" ? "secondary" : "destructive"
                      }
                    >
                      {status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {invite.useCount}/{invite.maxUses}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(invite.expiresAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(invite.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      size="icon-xs"
                      title="Delete invite"
                      onClick={() => deleteMutation.mutate(invite.id)}
                    >
                      <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Admin Page
// ---------------------------------------------------------------------------

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-medium">Admin</h1>
        <p className="text-sm text-muted-foreground">Manage users and invitations.</p>
      </div>
      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="invites">Invites</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <UsersTab />
        </TabsContent>
        <TabsContent value="invites">
          <InvitesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
