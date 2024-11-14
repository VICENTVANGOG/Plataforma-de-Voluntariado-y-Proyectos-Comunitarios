"use client";
import { IResponsProjects } from "@/app/core/application/dto";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";
import styles from './Pagination.module.scss';

interface IProps {
    data: IResponsProjects;
}

function Pagination({ data }: IProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const onPageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        router.push(`?${params.toString()}`);
    };

    const currentPage = data.metadata.currentPage;
    const totalPages = data.metadata.totalPages;

    return (
        <div className={styles.pagination}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`${styles.button} ${currentPage === 1 ? styles['disabled-button'] : ''}`}
            >
                <IoMdArrowDropleftCircle className={styles.icon} />
            </button>
            <span>Page</span>
            <span> {currentPage}</span>
            <span>  of  </span>
            <span> {totalPages}</span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`${styles.button} ${currentPage === totalPages ? styles['disabled-button'] : ''}`}
            >
                <IoMdArrowDroprightCircle className={styles.icon} />
            </button>
        </div>
    );
}

export default Pagination;
