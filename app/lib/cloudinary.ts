import type { CmsImage } from "./cms";

export async function uploadToCloudinary(file: File, folder = "steedart") {
  const signatureResponse = await fetch("/api/cloudinary/sign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ folder }),
  });

  if (!signatureResponse.ok) {
    throw new Error("Could not create Cloudinary upload signature.");
  }

  const signatureData = await signatureResponse.json();
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", signatureData.apiKey);
  formData.append("timestamp", signatureData.timestamp);
  formData.append("signature", signatureData.signature);
  formData.append("folder", signatureData.folder);

  const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${signatureData.cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });

  if (!uploadResponse.ok) {
    throw new Error("Cloudinary upload failed.");
  }

  const uploaded = await uploadResponse.json();
  return {
    url: uploaded.secure_url,
    publicId: uploaded.public_id,
    width: uploaded.width,
    height: uploaded.height,
  } satisfies CmsImage;
}
