import React from "react";
import { FlatList } from "react-native";
import { ListItem } from "./ListItem";
import { GLOBAL_STYLES } from "../../styles/globalStyles";

export const ProductsList = ({
  products,
  onProductLongPress,
  isEditMode,
  deleteProductHandler,
  editProductId,
  editProductHandler,
}) => {
  return (
    <FlatList
      contentContainerStyle={[
        styles.list,
        { paddingTop: isEditMode ? 33 : 15 },
      ]}
      data={products}
      renderItem={({ item }) => (
        <ListItem
          product={item}
          isEditMode={isEditMode}
          isCurrentInEdit={editProductId === item.id}
          onLongPress={() => onProductLongPress(item.id)}
          onDeletePress={() => deleteProductHandler(item.id)}
          onEditPress={() => editProductHandler(item)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: GLOBAL_STYLES.PADDING,
  },
});
