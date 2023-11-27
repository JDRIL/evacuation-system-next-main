interface EmptyListProps {
  label: string;
  onClick: () => void;
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref">
  >;
}

const EmptyList = ({ label, onClick, icon: Icon }: EmptyListProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 px-12 py-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
    >
      <Icon className="mx-auto h-12 w-12 text-gray-400" />
      <span className="mt-2 block text-sm font-semibold text-gray-900">
        {label}
      </span>
    </button>
  );
};

export default EmptyList;
