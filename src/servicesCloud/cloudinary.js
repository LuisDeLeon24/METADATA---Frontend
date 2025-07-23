export async function uploadToCloudinary(file) {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "metadata-evidencias"); 
  data.append("folder", "evidencias");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/lisandrojv/auto/upload",
    {
      method: "POST",
      body: data,
    }
  );

  if (!res.ok) throw new Error("Error al subir a Cloudinary");

  const result = await res.json();
  return {
    url: result.secure_url,
    public_id: result.public_id,
    original_filename: result.original_filename,
  };
}
