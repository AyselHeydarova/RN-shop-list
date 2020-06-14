import React from "react";
import { FlatList } from "react-native";
import { ListItem } from "./ListItem";

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
      contentContainerStyle={[{ paddingTop: isEditMode ? 33 : 15 }]}
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
