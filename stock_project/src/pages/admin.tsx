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
      <div className="flex flex-col h-screen w-full bg-[var(--bg1)] overflow-hidden transition-all duration-300">
        <Header title="Admin" />

        {/* Conteúdo abaixo do header */}
        <div className="flex flex-1 px-4 pb-4 pt-4 overflow-hidden">
          <div className="flex-1 h-full w-full bg-[var(--bg2)] pt-4 pl-4 pr-4 rounded-xl shadow-md border border-[var(--border)] flex flex-col overflow-hidden transition-all duration-300">
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
