import React, { useRef, useState } from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  acceptedFileTypes?: string;
}

export function FileUpload({ 
  onFileSelect,
  acceptedFileTypes = ".csv,.xlsx,.xls"
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>('');

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Validate file type
    const fileType = file.name.split('.').pop()?.toLowerCase();
    if (fileType && ['csv', 'xlsx', 'xls'].includes(fileType)) {
      setFileName(file.name);
      onFileSelect(file);
    } else {
      alert('Please upload a valid CSV or Excel file');
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  return (
    <div
      className={`relative flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
        isDragging
          ? 'border-green-500 bg-green-500/10'
          : 'border-zinc-700 bg-zinc-900 hover:border-green-500/50'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept={acceptedFileTypes}
        onChange={handleFileInput}
      />
      
      <Upload className="mb-4 h-10 w-10 text-zinc-400" />
      
      {fileName ? (
        <div className="text-center">
          <p className="mb-2 text-sm text-green-500">File selected:</p>
          <p className="text-sm text-zinc-400">{fileName}</p>
        </div>
      ) : (
        <>
          <p className="mb-2 text-sm text-zinc-400">
            Drag and drop your inventory file, or{' '}
            <span className="text-green-500">browse</span>
          </p>
          <p className="text-xs text-zinc-500">Supports CSV and Excel files</p>
        </>
      )}
    </div>
  );
}