"use client";

import { useState } from "react";
import { AdminCreateAccountModal } from "./adminComponents/adminCreateAccountModal";
import { IfAdmin } from "@/auth/ifAdmin";
import { UserAdminList } from "./adminComponents/userList";

export function AdminPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <IfAdmin>
      <div className="flex items-center justify-center h-screen w-full px-6 flex-col gap-6">
      <h1 className="text-5xl">Admin</h1>
        <div className="w-full max-w-[60rem] bg-[var(--gray-800)] p-8 rounded-lg shadow-md relative border border-[var(--gray-200)]">
          {/* Lista de usuários com título e botão */}
          <UserAdminList onOpenModal={() => setIsModalOpen(true)} />

          {/* Modal de criação */}
          <AdminCreateAccountModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>
    </IfAdmin>
  );
}
