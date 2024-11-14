'use client'

import React, { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { IoIosCloseCircleOutline } from "react-icons/io"
import Button from "@mui/joy/Button"
import Input from '@mui/joy/Input'
import Textarea from '@mui/joy/Textarea'
import { IPostProject } from "@/app/core/application/dto"

const postServiceSchema = yup.object().shape({
    title: yup.string().required("The title is required"),
    description: yup
        .string()
        .min(10, "The description must be at least 10 characters long")
        .required("The description is required"),
    startDate: yup
        .string()
        .required("Start date is required")
        .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Use YYYY-MM-DD."),
    endDate: yup
        .string()
        .required("End date is required")
        .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Use YYYY-MM-DD."),
})

interface PostServiceModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: IPostProject) => void
    initialData?: IPostProject | null
}

export const ProjectModal: React.FC<PostServiceModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [isLoading, setIsLoading] = useState(false)

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IPostProject>({
        mode: "onChange",
        resolver: yupResolver(postServiceSchema),
    })

    React.useEffect(() => {
        if (initialData) {
            reset(initialData)
        }
    }, [initialData, reset])

    const handlePostService = async (data: IPostProject) => {
        setIsLoading(true)
        try {
            await onSubmit(data) 
            reset() 
            onClose()
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                <div className="flex justify-between items-center p-6 border-b border-blue-300">
                    <h2 className="text-2xl font-semibold text-gray-800">{initialData ? "Edit Service" : "Add Service"}</h2>
                    <Button
                        color="danger"
                        variant="outlined"
                        onClick={onClose}
                        className="transition-colors"
                        aria-label="Close modal"
                    >
                        <IoIosCloseCircleOutline className="w-6 h-6" />
                    </Button>
                </div>
                <form onSubmit={handleSubmit(handlePostService)} className="p-6 space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Service Title
                        </label>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    color="primary"
                                    type="text"
                                    id="title"
                                    className="w-full text-gray-300"
                                    placeholder="Enter the service title"
                                />
                            )}
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <Textarea
                                    {...field}
                                    minRows={3}
                                    placeholder="Enter a description"
                                    className="w-full"
                                    variant="outlined"
                                    color="primary"
                                />
                            )}
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Start Date
                        </label>
                        <Controller
                            name="startDate"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="date"
                                    color="primary"
                                    className="w-full"
                                />
                            )}
                        />
                        {errors.startDate && (
                            <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                            End Date
                        </label>
                        <Controller
                            name="endDate"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="date"
                                    color="primary"
                                    className="w-full"
                                />
                            )}
                        />
                        {errors.endDate && (
                            <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
                        )}
                    </div>
                    <Button
                        color="primary"
                        variant="outlined"
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-2 px-4 rounded-md text-white font-medium ${isLoading
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            } transition-colors`}
                    >
                        {isLoading ? "Saving..." : initialData ? "Save Changes" : "Add Service"}
                    </Button>
                </form>
            </div>
        </div>
    )
}
