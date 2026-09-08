import React from "react";
import FilterContent from "./filter-content";

const DesktopSideBar = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: {
  categories :string[] ,
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}) => {
  return (
    <aside className="hidden w-64 shrink-0 rounded-xl border border-slate-200 p-5 lg:block">
      <FilterContent
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </aside>
  );
};

export default DesktopSideBar;
