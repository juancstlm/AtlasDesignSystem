import { useState, useCallback, useMemo } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { useThemedStyle, Search, Text } from "atlas-design-system";

const f1Drivers2024 = [
  "Max Verstappen",
  "Sergio Pérez",
  "Charles Leclerc",
  "Carlos Sainz",
  "Lando Norris",
  "Oscar Piastri",
  "Lewis Hamilton",
  "George Russell",
  "Pierre Gasly",
  "Esteban Ocon",
  "Alexander Albon",
  "Logan Sargeant",
  "Kevin Magnussen",
  "Nico Hülkenberg",
  "Yuki Tsunoda",
  "Daniel Ricciardo",
  "Valtteri Bottas",
  "Zhou Guanyu",
];

export default function SearchGallery() {
  const styles = useStyles().styles;

  const [query, setQuery] = useState("");

  const driversFiltered = useMemo(() => {
    if (!query) {
      return f1Drivers2024;
    }
    const lowerCaseQuery = query.toLowerCase();

    return f1Drivers2024.filter((driver) =>
      driver.toLowerCase().includes(lowerCaseQuery)
    );
  }, [query]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Search
        label="Search Drivers"
        searchQuery={query}
        onChangeText={setQuery}
      />
      {driversFiltered.map((driver) => (<Text key={driver}>{driver}</Text>))}
    </ScrollView>
  );
}

const useStyles = () =>
  useThemedStyle(
    useCallback(
      (t) =>
        StyleSheet.create({
          section: {
            rowGap: t.size.baseSize * 2,
          },
          container: {
            rowGap: t.size.baseSize * 4,
            paddingVertical: t.size.baseSize * 4,
            paddingHorizontal: t.size.baseSize * 4,
          },
        }),
      []
    )
  );
