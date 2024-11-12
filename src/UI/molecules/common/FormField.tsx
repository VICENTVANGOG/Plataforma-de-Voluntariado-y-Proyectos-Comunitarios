import { Input } from "@/UI/atoms";
import "./FormField.scss";
import {
    Control,
    Controller,
    FieldError,
    FieldValues,
    Path,
} from "react-hook-form";


interface IPropsFormField<T extends FieldValues> {
    label: string;
    type: string;
    name: Path<T>;
    control: Control<T>;
    error?: FieldError;
    id?: string;
    placeholder?: string;
    className?: string;
}
export const FormField = <T extends FieldValues>({
    label,
    type,
    name,
    control,
    error,
    id,
    placeholder,
    className, 
}: IPropsFormField<T>) => {
    return (
        <div className={`form-field ${className || ""}`}>
            <label
                htmlFor={id || label.toLowerCase()}
                className="form-field__label"
            >
                {label}
            </label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Input
                        id={id || label.toLowerCase()}
                        type={type}
                        error={error?.message}
                        placeholder={placeholder || `Ingrese su ${label.toLowerCase()}`}
                        {...field}
                        className="form-field__input"
                    />
                )}
            />
            {error && <p className="form-field__error">{error.message}</p>}
        </div>
    );
};
