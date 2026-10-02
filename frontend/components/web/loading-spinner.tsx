import { Loader2 } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center

        bg-slate-100/80
        backdrop-blur-sm

        dark:bg-slate-950/80
      "
    >
      <div
        className="
          flex
          flex-col
          items-center
          gap-3
          rounded-lg
          border
          border-slate-300
          bg-slate-100
          px-6
          py-5
          shadow-lg

          dark:border-slate-800
          dark:bg-slate-950
        "
      >
        <Loader2
          className="
            h-8
            w-8
            animate-spin

            text-slate-950

            dark:text-slate-100
          "
        />

        <p
          className="
            text-sm
            font-medium

            text-slate-700

            dark:text-slate-300
          "
        >
          Loading...
        </p>
      </div>
    </div>
  );
}