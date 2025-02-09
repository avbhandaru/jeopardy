// src/app/hooks/useBackendUser.tsx

import { useEffect, useState } from "react";
import { useAuth } from "../lib/AuthProvider";
import { findUserByFirebaseUid } from "../lib/serverQueries";
import { User } from "@/__generated__/types";

export default function useBackendUser() {
  const { user } = useAuth();
  const [backendUser, setBackendUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.uid) {
      const fetchBackendUser = async () => {
        try {
          const userResult = await findUserByFirebaseUid(user.uid);
          setBackendUser(userResult);
        } catch (error) {
          console.error("Error fetching user:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchBackendUser();
    } else {
      setLoading(false);
    }
  }, [user]);

  return { backendUser, loading };
}
