"use client";

import { Input } from "@/UI/atoms";  // Asegúrate de que el componente Input permita la clase 'className'
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
    classname?: string;  // Haz 'classname' opcional para permitir que no se pase
}

export const FormField = <T extends FieldValues>({
    label,
    type,
    name,
    control,
    error,
    id,
    placeholder,
    classname,  // Asegúrate de recibir classname
}: IPropsFormField<T>) => {
    return (
        <div className={`w-full flex flex-col mb-4 ${classname ? classname : ''}`}>  {/* Agrega la clase si se pasa */}
            <label
                htmlFor={id || label.toLowerCase()}
                className={`text-sm font-medium`}
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
                        className={classname}  
                    />
                )}
            />
        </div>
    );
};
