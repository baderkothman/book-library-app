import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";

const API = "http://localhost:4000";

type Category = { id: number; name: string };
type Book = {
  id: number;
  title: string;
  author: string;
  cover_url?: string | null;
  summary?: string | null;
};

export default function HomeScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);

  const [search, setSearch] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  const query = useMemo(() => {
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (activeCategoryId) params.set("categoryId", String(activeCategoryId));
    return params.toString();
  }, [search, activeCategoryId]);

  useEffect(() => {
    (async () => {
      const r = await fetch(`${API}/categories`);
      setCategories(await r.json());
    })();
  }, []);

  useEffect(() => {
    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const r = await fetch(`${API}/books?${query}`);
        setBooks(await r.json());
      } finally {
        setLoading(false);
      }
    }, 350); // debounce
    return () => clearTimeout(t);
  }, [query]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Library</Text>

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search title or author..."
        placeholderTextColor="rgba(255,255,255,0.5)"
        style={styles.input}
      />

      <FlatList
        data={[{ id: 0, name: "All" } as any, ...categories]}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item: any) => String(item.id)}
        contentContainerStyle={{ gap: 10, paddingVertical: 10 }}
        renderItem={({ item }: any) => {
          const isAll = item.id === 0;
          const selected = isAll
            ? activeCategoryId === null
            : activeCategoryId === item.id;

          return (
            <Pressable
              onPress={() => setActiveCategoryId(isAll ? null : item.id)}
              style={[styles.chip, selected && styles.chipActive]}
            >
              <Text
                style={[styles.chipText, selected && styles.chipTextActive]}
              >
                {item.name}
              </Text>
            </Pressable>
          );
        }}
      />

      <Text style={styles.section}>
        {loading ? "Loading..." : `Books (${books.length})`}
      </Text>

      <FlatList
        data={books}
        keyExtractor={(b) => String(b.id)}
        contentContainerStyle={{ paddingBottom: 20 }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.bookAuthor}>{item.author}</Text>
            {!!item.summary && (
              <Text style={styles.bookSummary} numberOfLines={2}>
                {item.summary}
              </Text>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#0B1220" },
  title: { color: "#FFF", fontSize: 26, fontWeight: "900", marginTop: 10 },
  input: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#FFF",
  },
  chip: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  chipActive: { backgroundColor: "#4F8CFF", borderColor: "transparent" },
  chipText: { color: "rgba(255,255,255,0.8)", fontWeight: "700" },
  chipTextActive: { color: "#FFF" },
  section: {
    color: "rgba(255,255,255,0.8)",
    marginTop: 8,
    marginBottom: 8,
    fontWeight: "800",
  },
  card: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    borderRadius: 16,
    padding: 14,
  },
  bookTitle: { color: "#FFF", fontSize: 16, fontWeight: "900" },
  bookAuthor: {
    color: "rgba(255,255,255,0.75)",
    marginTop: 4,
    fontWeight: "700",
  },
  bookSummary: {
    color: "rgba(255,255,255,0.65)",
    marginTop: 8,
    lineHeight: 18,
  },
});
