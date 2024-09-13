import { useState, useCallback, useMemo } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { DateTimeInput, useThemedStyle } from "atlas-design-system";
import moment from "moment";

export default function DateTimeInputGallery() {
  const styles = useStyles().styles;
  const [date, setDate] = useState(new Date());

  const error = useMemo(() => {
    console.log({date})
    if (moment(date).isBefore(moment(), 'day')){
      return 
    } 
    return "Date must be in past"
  }, [date])

  console.log({error})
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <DateTimeInput value={date} onChange={setDate} label="Date Time Input"/>
      <DateTimeInput error={error} value={date} onSave={setDate} label="Date Time Input"/>
    </ScrollView>
  );
}

const useStyles = () =>
  useThemedStyle(
    useCallback(
      (t) =>
        StyleSheet.create({
          container: {
            paddingTop: t.size.baseSize *4,
            paddingHorizontal: t.size.baseSize * 4,
          },
        }),
      []
    )
  );
