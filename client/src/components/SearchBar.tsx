interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = ({
  value,
  onChange,
  placeholder = 'Search products...',
}: SearchBarProps) => {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-4 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
    </div>
  );
};
