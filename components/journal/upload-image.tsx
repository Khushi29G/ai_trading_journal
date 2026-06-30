"use client";

import { useRef, useState } from "react";
import { UploadCloud, CheckCircle2, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default function UploadImage({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState("");

  async function uploadFile(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setUploading(true);
    setFileName(file.name);

    const fileNameUnique =
      `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("journal-screenshots")
      .upload(fileNameUnique, file);

    if (error) {
      setUploading(false);
      alert(error.message);
      return;
    }

    const { data } = supabase.storage
      .from("journal-screenshots")
      .getPublicUrl(fileNameUnique);

    onUpload(data.publicUrl);

    setUploading(false);
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={uploadFile}
        className="hidden"
      />

      <div
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer rounded-2xl border-2 border-dashed border-slate-700 bg-slate-900 hover:border-emerald-500 hover:bg-slate-800 transition-all duration-300 p-8 flex flex-col items-center justify-center text-center"
      >
        {uploading ? (
          <>
            <Loader2 className="w-10 h-10 text-emerald-400 animate-spin" />
            <p className="mt-3 text-white font-medium">
              Uploading...
            </p>
          </>
        ) : (
          <>
            <UploadCloud className="w-12 h-12 text-emerald-400" />

            <h3 className="mt-4 text-lg font-semibold text-white">
              Click to Upload Screenshot
            </h3>

            <p className="text-sm text-slate-400 mt-1">
              PNG, JPG or JPEG
            </p>

            {fileName && (
              <div className="mt-4 flex items-center gap-2 text-emerald-400">
                <CheckCircle2 size={18} />
                <span className="text-sm break-all">
                  {fileName}
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}