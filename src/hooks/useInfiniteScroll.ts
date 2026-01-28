import { useEffect, useRef } from "react";

type useInfiniteScrollProps = {
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage: () => void;
};

export default function useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
}: useInfiniteScrollProps) {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!hasNextPage || isFetchingNextPage) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            {
                rootMargin: "200px",
            }
        );

        const el = ref.current;
        if (el) observer.observe(el);

        return () => {
            if (el) observer.unobserve(el);
            observer.disconnect();
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    return ref;
}
