import { useState, useEffect, useMemo } from 'react';

export default function useFileUpload2({
  uploadInputRef,
  files,
  onChange,
  multiple,
  placeholder,
  error,
  file
}) {
  const [filesText, setFilesText] = useState('');
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    if (files.length === 0) {
      setFilesText('');
    } else if (files.length === 1) {
      setFilesText(files[0].name);
    } else {
      setFilesText(`${files.length} files selected`);
    }
  }, [files]);

  const handleBrowse = () => {
    uploadInputRef.current?.click();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);

    if (!error && !file) {
      const items = event.dataTransfer.items;
      const newFiles = getAllFiles(items);
      onChange(newFiles);
    }
  };

  const getAllFiles = (items) => {
    const newFiles = [];
    for (let item of items) {
      if (item.kind === 'file') {
        const file = item.getAsFile();
        newFiles.push(file);
      }
    }

    return newFiles;
  };

  const handleFiles = (event) => {
    const newFiles = Array.from(event.target.files);
    onChange(newFiles);
  };

  const handleReset = (event) => {
    event.stopPropagation();

    setFilesText('');
    onChange && onChange(undefined);
  };

  const getPlaceholder = useMemo(() => {
    const multipleSuffix = multiple ? '(s)' : '';
    const defaultPlaceholder = `Drag and drop your file${multipleSuffix} or click to browse`;
    const dragPlaceholder = `Drop your file${multipleSuffix} here...`;

    let placeholderText;
    if (dragOver) {
      placeholderText = dragPlaceholder;
    } else {
      placeholderText = placeholder || defaultPlaceholder;
    }
    return placeholderText;
  }, [dragOver, multiple, placeholder]);

  const inputEvents = {
    onDragOver: handleDragOver,
    onDragLeave: handleDragLeave,
    onDrop: handleDrop,
    onClick: handleBrowse
  };

  return {
    filesText,
    getPlaceholder,
    dragOver,
    inputEvents,
    handleFiles,
    handleReset
  };
}
