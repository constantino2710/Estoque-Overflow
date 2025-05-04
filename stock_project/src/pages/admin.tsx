// src/pages/AdminPage.tsx
"use client";

import { useState } from "react";
import { AdminCreateAccountModal } from "./adminComponents/adminCreateAccountModal";
import { IfAdmin } from "@/auth/ifAdmin";
import { UserAdminList } from "./adminComponents/userList";

export function AdminPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <IfAdmin>
      <div className="flex items-center justify-center h-screen w-full px-6">
        <div className="w-full max-w-[60rem] bg-[var(--gray-800)] p-8 rounded-lg shadow-md relative">
          {/* Botão de criar conta */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[var(--primary)] hover:bg-[var(--secondary)] text-white px-4 py-2 rounded-lg text-sm font-medium shadow cursor-pointer"
            >
              Criar nova conta
            </button>
          </div>

          {/* Lista de usuários */}
          <UserAdminList />

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
