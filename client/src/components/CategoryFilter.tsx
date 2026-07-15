interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onChange: (category: string) => void;
}

export const CategoryFilter = ({
  categories,
  selected,
  onChange,
}: CategoryFilterProps) => {
  const allCategories = ['all', ...categories];

  return (
    <div className="flex flex-wrap gap-2">
      {allCategories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition ${
            selected === category
              ? 'bg-primary text-white'
              : 'bg-white text-slate-600 shadow-sm hover:bg-slate-100'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
