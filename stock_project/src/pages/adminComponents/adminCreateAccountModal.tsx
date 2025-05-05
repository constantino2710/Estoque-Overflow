"use client";

import { useState } from "react";
import Parse from "@/api/parseClient";
import { ImageUpload } from "@/components/imgUpload";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminCreateAccountModal({ isOpen, onClose }: ModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleRegister = async () => {
    if (!username || !password) {
      alert("Preencha usuário e senha.");
      return;
    }

    if (username.length > 15) {
      alert("O nome de usuário deve ter no máximo 15 caracteres.");
      return;
    }

    const currentUser = Parse.User.current();
    if (!currentUser) {
      setMessage("Você precisa estar logado para criar contas.");
      return;
    }

    const sessionToken = currentUser.getSessionToken();

    const user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("isAdmin", isAdmin);
    user.set("createdBy", currentUser);

    if (imageBase64) {
      const byteString = atob(imageBase64.split(",")[1]);
      const mimeString = imageBase64.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      const file = new Parse.File(`${username}_avatar.png`, blob);
      user.set("profileImage", file);
    }

    try {
      await user.signUp();
      await Parse.User.become(sessionToken);
      window.location.reload();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage("Erro ao cadastrar: " + err.message);
      } else {
        setMessage("Erro ao cadastrar: erro desconhecido.");
      }
    }
  };

  const handleClose = () => {
    setMessage("");
    setUsername("");
    setPassword("");
    setIsAdmin(false);
    setImageBase64(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[var(--bgModal)] flex justify-center items-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="bg-[var(--gray-800)] p-6 rounded-xl w-full max-w-md text-white shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-center">Criar Conta</h2>

        {message && (
          <p className="text-sm text-center mb-4 text-[var(--primary)]">{message}</p>
        )}

        <div className="mb-4">
          <label htmlFor="username" className="block mb-1">Nome de usuário:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            maxLength={15}
            className="w-full px-3 py-2 rounded border border-gray-600 bg-[#1e1e20] text-white"
            placeholder="Digite no máximo 15 caracteres"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">Senha:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded border border-gray-600 bg-[#1e1e20] text-white"
            placeholder="Digite a senha"
          />
        </div>

        <div className="flex items-center gap-2 mb-6 text-sm">
          <input
            id="isAdmin"
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          <label htmlFor="isAdmin">É administrador?</label>
        </div>

        <ImageUpload onUpload={(base64) => setImageBase64(base64)} />

        <div className="flex justify-between gap-2 mt-6">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-lg bg-[var(--red)] hover:bg-[var(--red-100)] text-white transition cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleRegister}
            className="px-4 py-2 rounded-lg bg-[var(--primary)] hover:bg-[var(--secondary)] text-white transition cursor-pointer"
          >
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}
