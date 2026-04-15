"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { USER_ROLE } from "@/lib/permissions";

import { AVAILABLE_ROLES, type User, getRoleLabel } from "../types";

export function SetRoleDialog({
  open,
  user,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  user: User | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: (userId: string, role: "user" | "admin") => void;
}) {
  const [selectedRole, setSelectedRole] = useState(user?.role ?? USER_ROLE);

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (nextOpen && user) setSelectedRole(user.role ?? USER_ROLE);
        onOpenChange(nextOpen);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set role for {user?.name}</DialogTitle>
          <DialogDescription>Choose a role. This takes effect immediately.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <Label>Role</Label>
          <Select
            value={selectedRole}
            onValueChange={(v) => {
              if (v) setSelectedRole(v);
            }}
          >
            <SelectTrigger className="w-full">
              <span>{getRoleLabel(selectedRole)}</span>
            </SelectTrigger>
            <SelectContent>
              {AVAILABLE_ROLES.map((role) => (
                <SelectItem key={role.value} value={role.value}>
                  {role.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => user && onConfirm(user.id, selectedRole as "user" | "admin")}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
