"use client";

import { createClient } from "@/lib/supabase/client";
const supabase = createClient();

export default function UploadImage({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) {
  async function uploadFile(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    const fileName =
      Date.now() + "-" + file.name;

    const { error } = await supabase.storage
      .from("journal-screenshots")
      .upload(fileName, file);

  if (error) {
  console.log(error);
  alert(JSON.stringify(error));
  return;
}

    const { data } = supabase.storage
      .from("journal-screenshots")
      .getPublicUrl(fileName);

    onUpload(data.publicUrl);
  }

  return (
    <input
      type="file"
      accept="image/*"
      onChange={uploadFile}
    />
  );
}