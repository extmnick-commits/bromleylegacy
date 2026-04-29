"use client";

import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import imageCompression from "browser-image-compression";

interface MediaUploaderProps {
  onUploadSuccess: (url: string) => void;
  folder?: string;
}

export default function MediaUploader({ onUploadSuccess, folder = "media" }: MediaUploaderProps) {
  const [uploadStatus, setUploadStatus] = useState<"idle" | "compressing" | "uploading" | "success" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadStatus("idle");
    setErrorMsg("");

    let fileToUpload = file;

    // Strict check for Videos (Max 15MB)
    if (file.type.startsWith("video/")) {
      const maxVideoSize = 15 * 1024 * 1024; // 15MB
      if (file.size > maxVideoSize) {
        setErrorMsg("Video file exceeds the 15MB limit.");
        setUploadStatus("error");
        return;
      }
    } 
    // Client-side browser compression for Images
    else if (file.type.startsWith("image/")) {
      setUploadStatus("compressing");
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      try {
        fileToUpload = await imageCompression(file, options);
      } catch (err) {
        console.error("Compression error:", err);
        setErrorMsg("Failed to optimize image.");
        setUploadStatus("error");
        return;
      }
    } else {
      setErrorMsg("Unsupported file type.");
      setUploadStatus("error");
      return;
    }

    // Execute Upload directly to Firebase Storage
    setUploadStatus("uploading");
    const storageRef = ref(storage, `${folder}/${Date.now()}_${fileToUpload.name}`);
    const uploadTask = uploadBytesResumable(storageRef, fileToUpload);

    uploadTask.on("state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        console.error("Upload error:", error);
        setErrorMsg("Upload failed.");
        setUploadStatus("error");
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setUploadStatus("success");
        onUploadSuccess(downloadURL);
      }
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <input type="file" accept="image/*,video/*" onChange={handleFileChange} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
      {uploadStatus === "compressing" && <p className="text-sm text-yellow-600 font-medium">Compressing...</p>}
      {uploadStatus === "uploading" && <p className="text-sm text-blue-600 font-medium">Uploading: {Math.round(progress)}%</p>}
      {uploadStatus === "error" && <p className="text-sm text-red-600 font-medium">{errorMsg}</p>}
      {uploadStatus === "success" && <p className="text-sm text-green-600 font-medium">Upload successful!</p>}
    </div>
  );
}