import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableField({
  field,
  updateField,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: field.id,
  });

  const style = {
    transform: CSS.Transform.toString(
      transform
    ),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-slate-800 p-6 rounded-2xl border border-slate-700"
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="mb-4 cursor-grab active:cursor-grabbing text-cyan-400 font-bold"
      >
        ☰ Drag to reorder
      </div>

      {/* Label */}
      <input
        type="text"
        value={field.label}
        onChange={(e) =>
          updateField(
            field.id,
            "label",
            e.target.value
          )
        }
        placeholder="Field Label"
        className="w-full p-3 rounded-lg bg-slate-700 mb-4 text-white"
      />

      {/* Placeholder */}
      <input
        type="text"
        value={field.placeholder || ""}
        onChange={(e) =>
          updateField(
            field.id,
            "placeholder",
            e.target.value
          )
        }
        placeholder="Placeholder"
        className="w-full p-3 rounded-lg bg-slate-700 text-white"
      />
    </div>
  );
}

export default SortableField;