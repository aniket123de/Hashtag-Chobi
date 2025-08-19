import { useQuery } from "@tanstack/react-query";
import { getAboutData, type AboutData } from "@/lib/firestore";

const QUERY_KEY = ["about", "main"] as const;

export function useAbout() {
	return useQuery<AboutData, Error>({
		queryKey: QUERY_KEY,
		queryFn: getAboutData,
		staleTime: 1000 * 60 * 5, // 5 minutes
		gcTime: 1000 * 60 * 30, // 30 minutes
		retry: 2
	});
} 