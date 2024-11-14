interface InputselectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: { value: string, label: string }[];
    placeholder?: string;
    error?: string;
    name?: string;
}

const InputSelect = ({
    options,
    placeholder = "Seleccione",
    error,
    name,
    ...props
}: InputselectProps) => {
    return (
        <div className="flex flex-col">
            <select
                name={name}
                className="p-2 border rounded-sm border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...props}
            >
                <option>{placeholder}</option>
                {options.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                ))}
            </select>
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>
    );
};

export default InputSelect;
