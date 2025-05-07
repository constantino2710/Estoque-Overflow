"use client";

import { useState } from "react";
import { AdminCreateAccountModal } from "./adminComponents/adminCreateAccountModal";
import { IfAdmin } from "@/auth/ifAdmin";
import { UserAdminList } from "./adminComponents/userList";
import { Header } from "@/components/header";

export function AdminPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <IfAdmin>
      <div className="flex flex-col h-screen w-full bg-[var(--gray-900)] overflow-hidden">
        <Header title="Admin" />

        {/* Conteúdo abaixo do header */}
        <div className="flex flex-1 px-4 pb-4 pt-4 overflow-hidden">
          <div className="flex-1 h-full w-full bg-[var(--gray-800)] p-6 rounded-xl shadow-md border border-[var(--gray-200)] flex flex-col overflow-hidden">
            {/* Lista com rolagem interna */}
            <UserAdminList onOpenModal={() => setIsModalOpen(true)} />

            {/* Modal de criação */}
            <AdminCreateAccountModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      </div>
    </IfAdmin>
  );
}
