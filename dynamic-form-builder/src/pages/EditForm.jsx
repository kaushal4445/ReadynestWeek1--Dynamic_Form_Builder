import {
  useParams,
  useNavigate,
} from "react-router-dom";
import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
import SortableField from "../components/SortableField";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useState, useEffect } from "react";
import axios from "axios";

function EditForm() {

  const { id } = useParams();

  const navigate = useNavigate();


  // STATES

const [loading, setLoading] = useState(true);

const [title, setTitle] = useState("");

const [description, setDescription] =
  useState("");

const [fields, setFields] = useState([]);

useEffect(() => {
  fetchForm();
}, []);

const fetchForm = async () => {
  try {
    const token =
      localStorage.getItem("token");

    const res = await axios.get(
      `http://localhost:5000/api/forms/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const form = res.data;

    setTitle(form.title || "");
    setDescription(
      form.description || ""
    );
    setFields(form.fields || []);

  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  // UPDATE FIELD

 const updateField = (
  fieldId,
  key,
  value
) => {

  const updatedFields = fields.map(
    (field) =>
      field.id === fieldId
        ? {
            ...field,
            [key]: value,
          }
        : field
  );

  setFields(updatedFields);
};

  const handleDragEnd = (event) => {
  const { active, over } = event;

  if (!over || active.id === over.id) return;

  setFields((items) => {
    const oldIndex = items.findIndex(
      (item) => item.id === active.id
    );

    const newIndex = items.findIndex(
      (item) => item.id === over.id
    );

    return arrayMove(
      items,
      oldIndex,
      newIndex
    );
  });
};

  // UPDATE FORM

  const updateForm = async () => {
  try {
    const token =
      localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/forms/${id}`,
      {
        title,
        description,
        fields,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Form Updated!");

    navigate("/my-forms");

  } catch (err) {
    console.error(err);
    alert("Failed to update form");
  }
};


if (loading) {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      Loading...
    </div>
  );
}


  return (

    <div className="min-h-screen bg-slate-900 text-white p-10">

      <h1 className="text-5xl font-bold mb-10">

        Edit Form

      </h1>

      {/* TITLE */}

      <input
        type="text"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        placeholder="Form Title"
        className="w-full p-4 rounded-xl bg-slate-800 mb-6"
      />

      {/* DESCRIPTION */}

      <textarea
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
        placeholder="Description"
        className="w-full p-4 rounded-xl bg-slate-800 mb-10"
      />

      {/* FIELDS */}

     
<DndContext
  collisionDetection={closestCenter}
  onDragEnd={handleDragEnd}
>
  <SortableContext
    items={fields.map(
      (field) => field.id
    )}
    strategy={
      verticalListSortingStrategy
    }
  >
    <div className="space-y-6">
      {fields.map((field) => (
        <SortableField
          key={field.id}
          field={field}
          updateField={updateField}
        />
      ))}
    </div>
  </SortableContext>
</DndContext>

      {/* BUTTON */}

      <button
        onClick={updateForm}
        className="mt-10 bg-cyan-500 px-8 py-4 rounded-2xl font-bold"
      >

        Update Form

      </button>

    </div>

  );

}

export default EditForm;