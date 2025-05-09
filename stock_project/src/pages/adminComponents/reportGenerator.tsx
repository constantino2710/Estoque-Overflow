import { useState } from "react";
import Parse from "parse/dist/parse.min.js";


export default function ReportButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleExport = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await Parse.Cloud.run("exportAllDataAsXLSX");
      const fileUrl = result.url;

      // Forçar download
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = "relatorio.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Erro ao gerar relatório:", err);
      setError("Erro ao gerar relatório.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-end items-center mt-2 mb-2'>
      <button
        onClick={handleExport}
        disabled={loading}
        className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white hover:bg-[var(--secondary)] disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Gerando..." : "Gerar Relatório"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
