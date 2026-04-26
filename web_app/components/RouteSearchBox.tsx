"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { RouteInfo, RouteType } from "@/types/apiResponses";
import { chooseIconByRouteType } from "@/utils/chooseIconByRouteType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MAX_RESULTS = 3;

function normalizeSearchValue(value: string) {
	return value.toLowerCase().trim();
}

function getRouteSearchText(route: RouteInfo) {
	return Object.entries(route)
		.map(([key, value]) => `${key} ${String(value)}`)
		.join(" ")
		.toLowerCase();
}

export default function RouteSearchBox() {
	const router = useRouter();
	const wrapperRef = useRef<HTMLDivElement | null>(null);

	const [query, setQuery] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [highlightedIndex, setHighlightedIndex] = useState(-1);
	const [routes, setRoutes] = useState<RouteInfo[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [errorText, setErrorText] = useState("");

	useEffect(() => {
		const controller = new AbortController();

		async function loadRoutes() {
			setIsLoading(true);
			setErrorText("");

			try {
				const res = await fetch("/api/all-routes", {
					signal: controller.signal
				});

				if (!res.ok) {
					throw new Error("API Error");
				}

				const data = (await res.json()) as RouteInfo[];
				setRoutes(Array.isArray(data) ? data : []);
			} catch (error) {
				if (error instanceof DOMException && error.name === "AbortError") {
					return;
				}

				setErrorText("Could not load routes");
			} finally {
				setIsLoading(false);
			}
		}

		loadRoutes();

		return () => controller.abort();
	}, []);

	useEffect(() => {
		function handleOutsideClick(event: MouseEvent) {
			if (!wrapperRef.current) {
				return;
			}

			if (!wrapperRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}

		document.addEventListener("mousedown", handleOutsideClick);
		return () => document.removeEventListener("mousedown", handleOutsideClick);
	}, []);

	const filteredRoutes = useMemo(() => {
		const cleanQuery = normalizeSearchValue(query);

		if (!cleanQuery) {
			return routes.slice(0, MAX_RESULTS);
		}

		return routes
			.filter((route) => getRouteSearchText(route).includes(cleanQuery))
			.sort((a, b) => {
				const aShort = normalizeSearchValue(a.route_short_name);
				const bShort = normalizeSearchValue(b.route_short_name);
				const aStarts = aShort.startsWith(cleanQuery) ? 1 : 0;
				const bStarts = bShort.startsWith(cleanQuery) ? 1 : 0;

				if (aStarts !== bStarts) {
					return bStarts - aStarts;
				}

				return aShort.localeCompare(bShort);
			})
			.slice(0, MAX_RESULTS);
	}, [query, routes]);

	function chooseRoute(route: RouteInfo) {
		setQuery(route.route_short_name);
		setIsOpen(false);
		router.push(`/route/${encodeURIComponent(route.route_id)}`);
	}

	function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
		if (!isOpen) {
			if (event.key === "ArrowDown") {
				setIsOpen(true);
			}
			return;
		}

		if (event.key === "ArrowDown") {
			event.preventDefault();
			setHighlightedIndex((previous) =>
				previous < filteredRoutes.length - 1 ? previous + 1 : 0
			);
			return;
		}

		if (event.key === "ArrowUp") {
			event.preventDefault();
			setHighlightedIndex((previous) =>
				previous > 0 ? previous - 1 : filteredRoutes.length - 1
			);
			return;
		}

		if (event.key === "Enter") {
			if (highlightedIndex >= 0 && highlightedIndex < filteredRoutes.length) {
				event.preventDefault();
				chooseRoute(filteredRoutes[highlightedIndex]);
			}
			return;
		}

		if (event.key === "Escape") {
			setIsOpen(false);
		}
	}

	return (
		<div ref={wrapperRef} className="relative w-full">
			<input
				id="route-search"
				type="text"
				value={query}
				onChange={(event) => {
					setQuery(event.target.value);
					setIsOpen(true);
					setHighlightedIndex(-1);
				}}
				onFocus={() => setIsOpen(true)}
				onKeyDown={handleInputKeyDown}
				placeholder={isLoading ? "Loading..." : "Search for any PID service..."}
				className="w-full rounded-md border border-stone-700 bg-stone-900 px-4 py-2 text-white outline-none transition focus:border-orange-500"
				autoComplete="off"
			/>

			{isOpen && !isLoading && (
				<div className="absolute z-50 mt-2 max-h-80 w-full overflow-auto rounded-md border border-stone-700 bg-stone-900 shadow-lg">
					{errorText ? (
						<div className="px-4 py-3 text-sm text-red-400">{errorText}</div>
					) : filteredRoutes.length === 0 ? (
						<div className="px-4 py-3 text-sm text-stone-300">No matching routes</div>
					) : (
						<ul>
							{filteredRoutes.map((route, index) => {
								const isActive = index === highlightedIndex;

								return (
									<li key={route.route_id}>
										<button
											type="button"
											onMouseEnter={() => setHighlightedIndex(index)}
											onClick={() => chooseRoute(route)}
											className={`w-full cursor-pointer px-4 py-3 text-left transition ${
												isActive ? "bg-stone-800" : "hover:bg-stone-800"
											}`}
										>
											<p className="text-sm font-semibold text-white">
												<FontAwesomeIcon icon={chooseIconByRouteType(route.route_type)} className="mr-1" />
												{route.route_type === RouteType.Subway ? "Metro " : ""}
												{route.route_short_name}
											</p>
											<p className="text-xs text-stone-300">
												{route.route_long_name == "nan" ? "" : route.route_long_name}
											</p>
										</button>
									</li>
								);
							})}
						</ul>
					)}
				</div>
			)}
		</div>
	);
}
