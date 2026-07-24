import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export async function POST(request: Request) {
  const { folder = "steedart" } = await request.json().catch(() => ({ folder: "steedart" }));
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_URL?.split("@").at(1);
  const apiKey = process.env.CLOUDINARY_URL?.split("//").at(1)?.split(":").at(0);
  const timestamp = Math.round(Date.now() / 1000);

  if (!cloudName || !apiKey || !process.env.CLOUDINARY_URL) {
    return NextResponse.json({ error: "Cloudinary is not configured." }, { status: 500 });
  }

  const signature = cloudinary.utils.api_sign_request(
    {
      folder,
      timestamp,
    },
    cloudinary.config().api_secret || "",
  );

  return NextResponse.json({
    apiKey,
    cloudName,
    folder,
    timestamp,
    signature,
  });
}
