"use client";

interface DownloadButtonProps {
  accessToken: string;
  slug: string;
}

export function DownloadButton({ accessToken, slug }: DownloadButtonProps) {
  const handleDownload = () => {
    window.location.href = `/api/download/${slug}?access=${encodeURIComponent(accessToken)}`;
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="btn-vintage text-sm py-2 px-4 shrink-0"
    >
      PDF herunterladen
    </button>
  );
}
