function DraggableItem({ type, label, id }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", type);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      id={id}
      draggable
      onDragStart={handleDragStart}
      className="w-16 h-16 flex items-center justify-center border rounded cursor-move bg-white shadow"
    >
      {label}
    </div>
  );
}

export default DraggableItem;
