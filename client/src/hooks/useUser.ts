// hooks/useAuth.ts
"use client"

import { useEffect, useState } from "react";
import axios from "axios";

interface User {
    email: string;
}

export const useUser = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            return;
        }

        axios
            .get("http://localhost:8000/me", {
                // headers: {
                //     Authorization: `Bearer ${token}`,
                // },
            })
            .then((res) => {
                setUser(res.data);
                console.log(res.data)
            })
            .catch(() => {
                setUser(null);
            })
            .finally(() => console.log("Get Data from Request")
            );
    }, []);

    return {user}
};
