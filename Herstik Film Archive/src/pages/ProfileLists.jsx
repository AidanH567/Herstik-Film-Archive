import { Link } from "react-router-dom";
import ListCard from "../components/ListCard";
import LoadingCard from "../components/LoadingCard";
import { getMyLists } from "../services/listService";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function ProfileLists() {

    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(true);

    const { session } = useAuth()
    const userName = session?.user?.user_metadata?.name;

    useEffect(() => {
        async function loadLists() {
            try {
                const data = await getMyLists();
                setLists(data);
            } catch (err) {
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadLists();
    }, []);


    return (
        <div className="my-lists-page">
            <div className="my-lists-reviews">
                <h1>{userName ? `${userName}'s` : "Your"} Lists</h1>

                <div className="recently-added-grid">
                    <hr />
                    {loading
                        ? Array.from({ length: 3 }).map((_, i) => (
                            <LoadingCard key={i} />
                        ))
                        : lists.map((list) => (
                            <ListCard key={list.id}
                                list={list}
                            />
                        ))}
                </div>
            </div>
            <div className="my-lists-sidebar">
                <Link to="/lists/new">Create a New List....</Link>
            </div>
        </div>
    );
}