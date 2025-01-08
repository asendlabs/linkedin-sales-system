"use client";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth/client";

// Types for session and user
interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null;
}

interface Session {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  token: string;
  ipAddress?: string | null;
  userAgent?: string | null;
}

interface SessionResponse {
  user: User;
  session: Session;
}

// Utility to get encryption key
const getKey = async () => {
  const keyBuffer = Uint8Array.from(
    atob(process.env.NEXT_PUBLIC_CACHE_ENCRYPTION_KEY || ""),
    (c) => c.charCodeAt(0),
  );
  return window.crypto.subtle.importKey("raw", keyBuffer, "AES-GCM", true, [
    "encrypt",
    "decrypt",
  ]);
};

// Function to strip large data before caching
const prepareDataForCache = (data: SessionResponse): SessionResponse => {
  if (!data) return data;

  // Create a shallow copy of the data
  const preparedData = { ...data };

  // Create a shallow copy of the user object
  preparedData.user = { ...data.user };

  // Remove the image if it's a large base64 string
  if (preparedData.user.image?.startsWith("data:image")) {
    preparedData.user.image = null;
  }

  return preparedData;
};

// Encrypt data with size check
const encryptData = async (
  data: SessionResponse | null,
): Promise<string | null> => {
  try {
    if (!data) return null;

    // Prepare data for caching by removing large fields
    const preparedData = prepareDataForCache(data);

    const key = await getKey();
    const jsonString = JSON.stringify(preparedData);

    // Check size before proceeding
    const estimatedSize = new Blob([jsonString]).size;
    if (estimatedSize > 5 * 1024 * 1024) {
      // 5MB limit
      console.warn("Data too large for caching");
      return null;
    }

    const encoder = new TextEncoder();
    const encodedData = encoder.encode(jsonString);

    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encryptedData = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv,
      },
      key,
      encodedData,
    );

    const combined = new Uint8Array(iv.length + encryptedData.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(encryptedData), iv.length);

    return btoa(String.fromCharCode(...combined));
  } catch (error) {
    console.error("Encryption error:", error);
    return null;
  }
};

// Decrypt data with safety checks
const decryptData = async (
  encryptedData: string,
): Promise<SessionResponse | null> => {
  try {
    if (!encryptedData) return null;

    // Basic size check before processing
    if (encryptedData.length > 7 * 1024 * 1024) {
      // 7MB limit for base64
      console.warn("Encrypted data too large");
      return null;
    }

    const key = await getKey();
    const combined = Uint8Array.from(atob(encryptedData), (c) =>
      c.charCodeAt(0),
    );

    const iv = combined.slice(0, 12);
    const data = combined.slice(12);

    const decryptedBuffer = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv,
      },
      key,
      data,
    );

    const decoder = new TextDecoder();
    const jsonString = decoder.decode(decryptedBuffer);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};

// Custom hook for caching session with error handling
export const useCachedSession = () => {
  const { data: sessionData, isPending: isSessionPending } =
    authClient.useSession();
  const [cachedData, setCachedData] = useState<SessionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCachedData = async () => {
      try {
        const cached = localStorage.getItem("cache-user-session");
        if (cached) {
          const decrypted = await decryptData(cached);
          if (decrypted) {
            setCachedData(decrypted);
          }
        }
      } catch (error) {
        console.error("Error loading cached data:", error);
        // Clear corrupted cache
        localStorage.removeItem("cache-user-session");
      } finally {
        setIsLoading(false);
      }
    };

    loadCachedData();
  }, []);

  useEffect(() => {
    const updateCache = async () => {
      if (sessionData) {
        try {
          const encrypted = await encryptData(sessionData);
          if (encrypted) {
            localStorage.setItem("cache-user-session", encrypted);
            setCachedData(sessionData);
          }
        } catch (error) {
          console.error("Error updating cache:", error);
        }
      }
    };

    updateCache();
  }, [sessionData]);

  return {
    data: sessionData || cachedData, // Prioritize live session data over cached
    isPending: isLoading && isSessionPending,
  };
};
