
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Upload, Loader2, Trash2, Plus } from "lucide-react";
import {
  useGetNavbarContentQuery,
  useUpdateNavbarContentMutation,
  useUploadFileMutation,
} from "@/store/api/technazApi";

const EMPTY_COLUMN = { heading: "", items: [] };
const EMPTY_ITEM = { label: "", href: "", logo: "" };

export default function EditNavbarDropdown() {
  const [column1, setColumn1] = useState(EMPTY_COLUMN);
  const [column2, setColumn2] = useState(EMPTY_COLUMN);
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState(null);
  const [message, setMessage] = useState(null);
  const { data, isLoading, isError } = useGetNavbarContentQuery();
  const [updateNavbarContent] = useUpdateNavbarContentMutation();
  const [uploadFile] = useUploadFileMutation();

  useEffect(() => {
    if (isError) {
      setMessage({
        type: "error",
        text: "Failed to load content.",
      });
      return;
    }

    const dropdown = data?.content?.productDropdown;

    if (dropdown) {
      setColumn1({
        heading: dropdown.column1?.heading || "",
        items: dropdown.column1?.items || [],
      });

      setColumn2({
        heading: dropdown.column2?.heading || "",
        items: dropdown.column2?.items || [],
      });
    }
  }, [data, isError]);

  const getColumnState = (col) => (col === 1 ? column1 : column2);

  const setColumnState = (col) =>
    col === 1 ? setColumn1 : setColumn2;

  const handleHeadingChange = (col, value) => {
    setColumnState(col)((prev) => ({
      ...prev,
      heading: value,
    }));
  };

  const handleItemChange = (col, index, field, value) => {
    setColumnState(col)((prev) => {
      const items = [...prev.items];

      items[index] = {
        ...items[index],
        [field]: value,
      };

      return {
        ...prev,
        items,
      };
    });
  };

  const handleLogoUpload = async (col, index, file) => {
    if (!file) return;

    const key = `${col}-${index}`;

    setUploadingKey(key);
    setMessage(null);

    try {
      const uploadData = await uploadFile(file).unwrap();

      handleItemChange(col, index, "logo", uploadData.url);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.data?.error || err.message || "Upload failed.",
      });
    } finally {
      setUploadingKey(null);
    }
  };

  const handleAddItem = (col) => {
    setColumnState(col)((prev) => ({
      ...prev,
      items: [...prev.items, { ...EMPTY_ITEM }],
    }));
  };

  const handleRemoveItem = (col, index) => {
    setColumnState(col)((prev) => {
      const items = [...prev.items];

      items.splice(index, 1);

      return {
        ...prev,
        items,
      };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      await updateNavbarContent({
        productDropdown: {
          column1,
          column2,
        },
      }).unwrap();

      setMessage({
        type: "success",
        text: "Navbar dropdown updated successfully.",
      });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.data?.error || err.message || "Save failed.",
      });
    } finally {
      setSaving(false);
    }
  };

  const inputClasses =
    "w-full text-sm border border-dashed border-brand-border rounded-lg px-4 py-3 outline-none focus:border-brand-green focus:shadow-lg transition-all bg-white";

  if (isLoading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <Loader2
          className="animate-spin text-brand-green"
          size={28}
        />
      </section>
    );
  }

  const renderColumn = (col, state) => (
    <div className="rounded-2xl border border-brand-border bg-white p-6 md:p-8">
      <label className="mb-2 block text-sm font-semibold text-brand-dark">
        Column Heading
      </label>

      <input
        type="text"
        value={state.heading}
        onChange={(e) =>
          handleHeadingChange(col, e.target.value)
        }
        className={inputClasses}
        placeholder={col === 1 ? "Platforms" : "Solutions"}
      />

      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm font-semibold text-brand-dark">
          Links
        </span>

        <button
          type="button"
          onClick={() => handleAddItem(col)}
          className="inline-flex items-center gap-1.5 rounded-full border border-brand-green px-3 py-1 text-xs font-semibold text-brand-green transition-colors hover:bg-brand-green hover:text-white"
        >
          <Plus size={13} />
          Add Link
        </button>
      </div>

      <div className="mt-3 space-y-3">
        {state.items.map((item, index) => {
          const key = `${col}-${index}`;
          const isUploading = uploadingKey === key;

          return (
            <div
              key={index}
              className="rounded-lg border border-dashed border-brand-border p-3"
            >
              <div className="flex gap-3">
                <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md bg-gray-50">
                  {item.logo ? (
                    <Image
                      src={item.logo}
                      alt={item.label || "Logo"}
                      fill
                      className="object-contain p-1"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[10px] text-brand-gray">
                      No logo
                    </div>
                  )}

                  {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/70">
                      <Loader2
                        className="animate-spin text-brand-green"
                        size={14}
                      />
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-1.5">
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) =>
                      handleItemChange(
                        col,
                        index,
                        "label",
                        e.target.value
                      )
                    }
                    placeholder="Link label"
                    className="w-full rounded-md border border-gray-200 px-2.5 py-1.5 text-xs font-semibold outline-none focus:border-brand-green"
                  />

                  <input
                    type="text"
                    value={item.href}
                    onChange={(e) =>
                      handleItemChange(
                        col,
                        index,
                        "href",
                        e.target.value
                      )
                    }
                    placeholder="https://..."
                    className="w-full rounded-md border border-gray-200 px-2.5 py-1.5 text-xs outline-none focus:border-brand-green"
                  />

                  <div className="flex items-center gap-2 pt-0.5">
                    <label className="flex cursor-pointer items-center gap-1 rounded-md border border-brand-border px-2.5 py-1 text-[11px] font-medium text-brand-dark transition-colors hover:border-brand-green hover:text-brand-green">
                      <Upload size={11} />

                      {item.logo
                        ? "Replace Logo"
                        : "Upload Logo"}

                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleLogoUpload(
                            col,
                            index,
                            e.target.files?.[0]
                          )
                        }
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveItem(col, index)
                      }
                      className="flex items-center gap-1 rounded-md border border-red-200 px-2 py-1 text-[11px] text-red-500 transition-colors hover:bg-red-50"
                    >
                      <Trash2 size={11} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <section className="relative px-6 py-10 lg:px-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold leading-tight text-brand-dark md:text-3xl">
          Edit{" "}
          <span className="text-brand-green">
            Navbar — Product Dropdown
          </span>
        </h1>

        <div
          className="mt-3 flex items-center"
          aria-hidden="true"
        >
          <span className="text-base leading-none text-brand-green">
            ◆
          </span>

          <span className="mx-1 h-[1.5px] w-20 bg-brand-green" />
        </div>

        <p className="mt-3 text-sm text-brand-gray">
          Update the two columns of partner links shown in the
          &quot;Product&quot; menu at the top of the site.
        </p>
      </div>

      <div className="grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
        {renderColumn(1, column1)}
        {renderColumn(2, column2)}
      </div>

      {message && (
        <p
          className={`mt-6 text-sm font-medium ${
            message.type === "error"
              ? "text-red-600"
              : "text-brand-green"
          }`}
        >
          {message.text}
        </p>
      )}

      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark disabled:opacity-60"
      >
        {saving && (
          <Loader2
            className="animate-spin"
            size={16}
          />
        )}

        {saving ? "Saving..." : "Save Changes"}
      </button>
    </section>
  );
}

