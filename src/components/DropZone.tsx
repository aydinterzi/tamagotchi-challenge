function DropZone({ onDrop, label }) {
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedType = e.dataTransfer.getData("text/plain");
    onDrop(droppedType);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="w-full h-32 border-2 border-dashed border-gray-400 flex items-center justify-center"
    >
      {label}
    </div>
  );
}

export default DropZone;
