import React from "react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
