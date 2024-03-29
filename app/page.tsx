"use client";
import Image from "next/image";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import Link from "next/link";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const { edgestore } = useEdgeStore();
  const [urls, setUrls] = useState<{
    url: string;
    thumbnailUrl: string | null;
  }>();

  return (
    <div className="flex flex-col items-center m-6 gap-2">
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files?.[0] ?? null);
        }}
      />
      <button
        className="bg-white text-black rounded px-2 hover:opacity-80"
        onClick={async () => {
          if (file) {
            const res = await edgestore.myPublicImages.upload({ file });
            //Guardamos la url y la url de la miniatura
            setUrls({
              url: res.url,
              thumbnailUrl: res.thumbnailUrl,
            });
          }
        }}
      >
        Upload
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
