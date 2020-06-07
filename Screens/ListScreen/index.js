import React, { useState } from "react";
import { View } from "react-native";
import { ListForm } from "./ListForm";
import { StaticListHeader } from "./StaticListHeader";
import { ProductsList } from "./ProductsList";
import { connect } from "react-redux";

import {
  toggleItemBought,
  addListItem,
  deleteListItem,
  resetBought,
  updateListItem,
} from "../../Store/lists";

const mapStateToProps = (state, { route }) => {
  return {
    list: selectSingleListByID(
      state,
      route.params.listType,
      route.params.listId
    ),
  };
};

const singleProductEditInitialState = {
  status: false,
  product: {},
};

export const ListScreen = connect(mapStateToProps, {
  toggleItemBought,
  addListItem,
  deleteListItem,
  resetBought,
  updateListItem,
})(
  ({
    route,
    list,
    toggleItemBought,
    addListItem,
    deleteListItem,
    resetBought,
    updateListItem,
  }) => {
    const { listId, isEditMode, listType } = route.params;

    const [singleProductEditState, setSingleProductEditState] = useState(
      singleProductEditInitialState
    );

    const editProductHandler = (product) => {
      setSingleProductEditState({
        status: true,
        product,
      });
    };

    const onProductUpdateCancel = () => {
      setSingleProductEditState(singleProductEditInitialState);
    };

    const fillPayload = (value) => ({ listId, listType, ...value });

    const onProductUpdateSubmit = (product) => {
      updateListItem(fillPayload({ product }));
      onProductUpdateCancel();
    };

    const onProductLongPressHandler = (productID) => {
      toggleItemBought(fillPayload({ productID }));
    };

    const deleteProductHandler = (productID) => {
      deleteListItem(fillPayload({ productID }));
    };

    const addProductHandler = (product) => {
      addListItem(fillPayload({ product }));
    };

    const resetListHandler = () => {
      resetBought(fillPayload());
    };

    return (
      <View>
        {isEditMode && (
          <ListForm
            singleProductEditState={singleProductEditState}
            onProductUpdateCancel={onProductUpdateCancel}
            onProductUpdateSubmit={onProductUpdateSubmit}
            onCreateSubmit={addProductHandler}
          />
        )}

        {!isEditMode && (
          <StaticListHeader
            onReset={resetListHandler}
            products={list.listItems}
            listType={listType}
          />
        )}

        <ProductsList
          editProductId={singleProductEditState.product?.id}
          products={list.listItems}
          isEditMode={isEditMode}
          editProductHandler={editProductHandler}
          onProductLongPress={onProductLongPressHandler}
          deleteProductHandler={deleteProductHandler}
          editProductHandler={editProductHandler}
        />
      </View>
    );
  }
);
