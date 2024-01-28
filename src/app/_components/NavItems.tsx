"use client";

import { useEffect, useRef, useState } from "react";

import { PRODUCT_CATEGORIES } from "@/config";
import { NavItem } from "./NavItem";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

export const NavItems = () => {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const navRef = useRef<HTMLDivElement | null>(null);

	const isAnyOpen = activeIndex !== null;

	useOnClickOutside(navRef, () => {
		setActiveIndex(null);
	});

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.key === "Escape") setActiveIndex(null);
		};

		document.addEventListener("keydown", handler);

		return () => document.removeEventListener("keydown", handler);
	}, []);

	return (
		<div className="flex gap-3 h-full" ref={navRef}>
			{PRODUCT_CATEGORIES.map((category, index) => {
				const handleOpen = () => {
					if (activeIndex === index) setActiveIndex(null);
					else setActiveIndex(index);
				};

				const isOpen = index === activeIndex;
				return (
					<NavItem
						key={category.value}
						category={category}
						isOpen={isOpen}
						handleOpen={handleOpen}
						isAnyOpen={isAnyOpen}
					/>
				);
			})}
		</div>
	);
};
