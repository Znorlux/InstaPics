"use client";
import Image from "next/image";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import Link from "next/link";
import { SingleImageDropzone } from "./components/single-image-dropzone";
export default function Home() {
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState(0);
  const { edgestore } = useEdgeStore();
  const [urls, setUrls] = useState<{
    url: string;
    thumbnailUrl: string | null;
  }>();

  return (
    <div className="flex flex-col items-center m-6 gap-2">
      <SingleImageDropzone
        width={200}
        height={200}
        value={file}
        dropzoneOptions={{ maxSize: 1024 * 1024 * 15 }} // Peso maximo 15 MB
        onChange={(file) => {
          setFile(file);
        }}
      />
      <div className="h-[6px] w-44 border rounded overflow-hidden mt-2">
        <div
          className="h-full bg-white transition-all durantion-150"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
      <button
        className="bg-white text-black rounded px-2 hover:opacity-80"
        onClick={async () => {
          if (file) {
            const res = await edgestore.myPublicImages.upload({
              file,
              onProgressChange: (progress) => {
                setProgress(progress);
              },
            });
            //Guardamos la url y la url de la miniatura
            setUrls({
              url: res.url,
              thumbnailUrl: res.thumbnailUrl,
            });
          }
        }}
      >
        Subir
      </button>
      {urls?.url && (
        <Link href={urls.url} target="_blank">
          URL
        </Link>
      )}
      {urls?.thumbnailUrl && <Link href={urls.thumbnailUrl}>Miniatura</Link>}
    </div>
  );
}
