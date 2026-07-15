interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState = ({ title, description, action }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 text-6xl opacity-30">📦</div>
      <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
      {description && <p className="mt-2 max-w-md text-slate-500">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};
