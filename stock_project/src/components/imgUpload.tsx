import { useState, useRef} from 'react';

interface ImageUploadProps {
  onUpload: (url: string) => void;
}

export function ImageUpload({ onUpload }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onUpload(result); // envia para o formulário pai
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();
  const handleDragEnter = () => setIsDragging(true);
  const handleDragLeave = () => setIsDragging(false);
  const triggerFileInput = () => fileInputRef.current?.click();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-[var(--gray-700)] rounded-xl w-full max-w-sm">
      {!preview ? (
        <>
          <h2 className="text-xl text-white font-semibold">Upload de imagem</h2>

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onClick={triggerFileInput}
            className={`flex flex-col items-center justify-center w-full h-40 border-2 ${
              isDragging
                ? 'border-[var(--green-300)] bg-[var(--gray-600)]'
                : 'border-dashed border-gray-400'
            } rounded-lg cursor-pointer transition`}
          >
            <p className="text-white text-sm text-center px-4">
              Arraste uma imagem aqui ou clique para selecionar
            </p>
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleInputChange}
            className="hidden"
          />
        </>
      ) : (
        <img
          src={preview}
          alt="Imagem selecionada"
          className="w-30 h-30 object-cover rounded-lg border-2 border-[var(--green-500)] shadow-lg"
        />
      )}
    </div>
  );
}
