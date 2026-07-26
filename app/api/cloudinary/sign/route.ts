import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export async function POST(request: Request) {
  const { folder = "steedart" } = await request.json().catch(() => ({ folder: "steedart" }));
  const credentials = getCloudinaryCredentials();
  const timestamp = Math.round(Date.now() / 1000);

  if (!credentials) {
    return NextResponse.json({ error: "Cloudinary is not configured." }, { status: 500 });
  }

  cloudinary.config({
    cloud_name: credentials.cloudName,
    api_key: credentials.apiKey,
    api_secret: credentials.apiSecret,
    secure: true,
  });

  const signature = cloudinary.utils.api_sign_request(
    {
      folder,
      timestamp,
    },
    credentials.apiSecret,
  );

  return NextResponse.json({
    apiKey: credentials.apiKey,
    cloudName: credentials.cloudName,
    folder,
    timestamp,
    signature,
  });
}

function getCloudinaryCredentials() {
  const cloudinaryUrl = process.env.CLOUDINARY_URL;
  if (!cloudinaryUrl) return null;

  try {
    const parsed = new URL(cloudinaryUrl);
    const apiKey = parsed.username;
    const apiSecret = parsed.password;
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || parsed.hostname;

    if (!apiKey || !apiSecret || !cloudName) return null;

    return {
      apiKey,
      apiSecret,
      cloudName,
    };
  } catch {
    return null;
  }
}
