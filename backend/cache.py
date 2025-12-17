"""
Simple in-memory caching system for the Physical AI & Humanoid Robotics textbook project.
Caches embeddings and retrieved content to improve performance.
"""
import time
import hashlib
from typing import Any, Optional
from threading import Lock

class SimpleCache:
    """
    A simple in-memory cache with TTL (Time To Live) expiration.
    """
    def __init__(self, default_ttl: int = 300):  # 5 minutes default TTL
        self.default_ttl = default_ttl
        self._cache = {}
        self._lock = Lock()

    def _make_key(self, *args, **kwargs) -> str:
        """Create a cache key from arguments."""
        key_str = str(args) + str(sorted(kwargs.items()))
        return hashlib.md5(key_str.encode()).hexdigest()

    def get(self, key: str) -> Optional[Any]:
        """Get a value from cache if it exists and hasn't expired."""
        with self._lock:
            if key in self._cache:
                value, expiry = self._cache[key]
                if time.time() < expiry:
                    return value
                else:
                    # Remove expired entry
                    del self._cache[key]
        return None

    def set(self, key: str, value: Any, ttl: Optional[int] = None) -> None:
        """Set a value in cache with optional TTL."""
        if ttl is None:
            ttl = self.default_ttl
            
        expiry = time.time() + ttl
        with self._lock:
            self._cache[key] = (value, expiry)

    def delete(self, key: str) -> None:
        """Delete a key from cache."""
        with self._lock:
            if key in self._cache:
                del self._cache[key]

    def clear(self) -> None:
        """Clear all entries from cache."""
        with self._lock:
            self._cache.clear()

    def cleanup_expired(self) -> None:
        """Remove all expired entries from cache."""
        current_time = time.time()
        with self._lock:
            expired_keys = [
                key for key, (_, expiry) in self._cache.items()
                if current_time >= expiry
            ]
            for key in expired_keys:
                del self._cache[key]


# Global cache instance
cache = SimpleCache(default_ttl=600)  # 10 minutes TTL for most items


def get_cached_embedding(text: str, model: str = "embed-english-v3.0") -> Optional[list]:
    """Get a cached embedding if it exists."""
    key = f"embedding_{model}_{text[:100]}"  # Use first 100 chars to limit key length
    return cache.get(key)


def set_cached_embedding(text: str, embedding: list, model: str = "embed-english-v3.0", ttl: int = 3600) -> None:
    """Cache an embedding."""
    key = f"embedding_{model}_{text[:100]}"
    cache.set(key, embedding, ttl)


def get_cached_retrieval(query: str, collection: str, limit: int) -> Optional[str]:
    """Get cached retrieval results if they exist."""
    key = f"retrieve_{collection}_{limit}_{query[:100]}"
    return cache.get(key)


def set_cached_retrieval(query: str, result: str, collection: str, limit: int, ttl: int = 300) -> None:
    """Cache retrieval results."""
    key = f"retrieve_{collection}_{limit}_{query[:100]}"
    cache.set(key, result, ttl)


def invalidate_embeddings() -> None:
    """Clear all cached embeddings."""
    with cache._lock:
        keys_to_delete = [key for key in cache._cache.keys() if key.startswith("embedding_")]
        for key in keys_to_delete:
            del cache._cache[key]


def invalidate_retrieval_cache() -> None:
    """Clear all cached retrieval results."""
    with cache._lock:
        keys_to_delete = [key for key in cache._cache.keys() if key.startswith("retrieve_")]
        for key in keys_to_delete:
            del cache._cache[key]


if __name__ == "__main__":
    # Test the cache
    test_cache = SimpleCache()
    
    # Test basic functionality
    test_cache.set("test_key", "test_value", ttl=2)  # 2 seconds TTL
    print("Value:", test_cache.get("test_key"))  # Should print "test_value"
    
    time.sleep(3)  # Wait for TTL to expire
    print("Value after TTL:", test_cache.get("test_key"))  # Should print "None"
    
    # Test caching embeddings
    sample_embedding = [0.1, 0.2, 0.3, 0.4, 0.5]
    set_cached_embedding("sample text", sample_embedding)
    cached = get_cached_embedding("sample text")
    print("Cached embedding:", cached)
    
    # Test caching retrieval
    sample_result = "Sample retrieved content"
    set_cached_retrieval("sample query", sample_result, "default_collection", 5)
    cached_result = get_cached_retrieval("sample query", "default_collection", 5)
    print("Cached retrieval:", cached_result)