'use client';

import React, { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { IoIosCloseCircleOutline } from "react-icons/io"
import Input from '@mui/joy/Input'
import Textarea from '@mui/joy/Textarea'
import { IPostProject } from "@/app/core/application/dto"
import styles from './ProjectModal.module.scss'

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
        reset,
    } = useForm<IPostProject>({
        mode: "onChange",
        defaultValues: {
            title: initialData?.title || "", 
            description: initialData?.description || "",
            startDate: initialData?.startDate || "",
            endDate: initialData?.endDate || "",
        },
    })

    
    useEffect(() => {
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
        <div className={`${styles['modal-overlay']} ${isOpen ? styles.open : ''}`} onClick={onClose}>
            <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
                <div className={styles['modal-header']}>
                    <h2 className={styles['modal-title']}>{initialData ? "Edit Project" : "Add Project"}</h2>
                    <button onClick={onClose} className={styles['close-button']} aria-label="Close modal">
                        <IoIosCloseCircleOutline className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit(handlePostService)} className="p-6 space-y-4">
                    <div className={styles['form-group']}>
                        <label htmlFor="title" className={styles['label']}>Project Title</label>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    color="primary"
                                    type="text"
                                    id="title"
                                    className={`${styles['input-field']} w-full`}
                                    placeholder="Enter the project title"
                                    value={field.value || ""} 
                                />
                            )}
                        />
                    </div>
                    <div className={styles['form-group']}>
                        <label htmlFor="description" className={styles['label']}>Description</label>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <Textarea
                                    {...field}
                                    minRows={3}
                                    placeholder="Enter a description"
                                    className={`${styles['textarea-field']} w-full`}
                                    variant="outlined"
                                    color="primary"
                                    value={field.value || ""} 
                                />
                            )}
                        />
                    </div>
                    <div className={styles['form-group']}>
                        <label htmlFor="startDate" className={styles['label']}>Start Date</label>
                        <Controller
                            name="startDate"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="date"
                                    color="primary"
                                    className={`${styles['input-field']} w-full`}
                                    value={field.value || ""} 
                                />
                            )}
                        />
                    </div>
                    <div className={styles['form-group']}>
                        <label htmlFor="endDate" className={styles['label']}>End Date</label>
                        <Controller
                            name="endDate"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="date"
                                    color="primary"
                                    className={`${styles['input-field']} w-full`}
                                    value={field.value || ""} 
                                />
                            )}
                        />
                    </div>
                    <button
                        type="submit"
                        className={styles['submit-button']}
                        disabled={isLoading}
                    >
                        {isLoading ? "Saving..." : initialData ? "Save Changes" : "Add Project"}
                    </button>
                </form>
            </div>
        </div>
    )
}
