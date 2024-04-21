import { CardItem } from "../../types";

export const removeDuplicates = (
  array: CardItem[],
  key: keyof CardItem
): CardItem[] => {
  const seenItems = new Set();

  return array.filter((item) => {
    const itemId = item[key];

    if (seenItems.has(itemId)) {
      return false;
    }

    seenItems.add(itemId);
    return true;
  });
};
