import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
    toggleMovieLike,
    getMovieLikeCount,
    hasUserLikedMovie
} from "../services/movieLikeService"; // adjust path if needed
import { supabase } from "../supabase-client"; // ensure this is correctly imported

export function useMovieLikes(movie) {
    const { session } = useAuth();

    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!movie) return;

        async function loadLikes() {
            try {
                // Step 1: Ensure movie exists in DB
                const { data: movieRow } = await supabase
                    .from("movies")
                    .select("id")
                    .eq("tmdb_id", movie.id)
                    .maybeSingle();

                if (!movieRow) {
                    setLikeCount(0);
                    setLiked(false);
                    setLoading(false);
                    return;
                }

                const movieUuid = movieRow.id;

                // Step 2: Load likes using UUID
                const count = await getMovieLikeCount(movieUuid);

                let likedStatus = false;
                if (session?.user) {
                    likedStatus = await hasUserLikedMovie(movieUuid, session.user.id);
                }

                setLikeCount(count);
                setLiked(likedStatus);
            } catch (err) {
                console.error("Failed to load movie likes:", err.message);
            } finally {
                setLoading(false);
            }
        }

        loadLikes();
    }, [movie, session?.user]);

    async function handleToggleLike() {
        if (!session?.user || !movie) return;

        try {
            const newLikedState = await toggleMovieLike(movie, session.user.id);
            setLiked(newLikedState);

            setLikeCount(prev => newLikedState ? prev + 1 : prev - 1);
        } catch (err) {
            console.error("Failed to toggle movie like:", err.message);
        }
    }

    return {
        liked,
        likeCount,
        toggleLike: handleToggleLike,
        loading
    };
}