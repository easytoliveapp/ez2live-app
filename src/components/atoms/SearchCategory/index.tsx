"use client";
import React, { FC } from "react";
import { Input } from "@/components";
import Image from "next/image";
import Search from "@/images/easytolive/icons/search.svg";

interface SearchCategoryProps {
	onChange?: (e: any) => void;
	onClick?: (e: any) => void;
	onSubmit?: (e: any) => void;
	value?: string | number | readonly string[];
	isLoading?: boolean;
	placeholder?: string;
}

const SearchCategory: FC<SearchCategoryProps> = ({
	value,
	onChange,
	onClick,
	onSubmit,
	isLoading = false,
	placeholder = "Buscar por estabelecimento / categoria",
}) => {
	return (
		<div className="relative m-auto my-4 flex items-center w-full">
			<Input
				type="search"
				className="relative w-full h-auto"
				onSubmit={onSubmit}
				onChange={onChange}
				value={value}
				placeholder={placeholder}
			/>

			<div className="absolute right-1 top-3 h-full flex justify-center w-auto bg-transparent">
				{isLoading ? (
					<div className="pr-5 bg-generic-background">
						<svg
							className="animate-spin -mr-1 ml-3 h-5 w-5"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="3"
							></circle>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
					</div>
				) : (
					<Image
						onClick={onClick}
						src={Search}
						alt="search-icon"
						className="h-6 "
					/>
				)}
			</div>
		</div>
	);
};

export default SearchCategory;
