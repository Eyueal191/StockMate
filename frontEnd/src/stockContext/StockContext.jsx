import React, { createContext, useState, useEffect } from "react";
import Axios from "../axios/axios.config.js"; 
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setItems } from "../redux/item.Slice.js"; // Redux slice action

export const StockContext = createContext();

function StockProvider({ children }) {
  const dispatch = useDispatch();

  // ------------------ States ------------------
  const [searchItem, setSearchItem] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchSale, setSearchSale] = useState("");
  const [upperDate, setUpperDate] = useState("");
  const [lowerDate, setLowerDate] = useState("");

  // ------------------ Fetch function ------------------
  const getItemsList = async () => {
    try {
      const paramsPayload = {
        categories: JSON.stringify(selectedCategories),
        search: searchItem,
      };

      const res = await Axios.get("/api/item/", { params: paramsPayload });
      if (!res.data.success) throw new Error("No items fetched");

      return res.data.items;
    } catch (error) {
      console.error("Failed to fetch items list:", error);
      throw error;
    }
  };

  // ------------------ React Query for Items ------------------
  const { 
    data: fetchedItemsList = [], 
    error,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ["items", selectedCategories, searchItem],
    queryFn: getItemsList,
    keepPreviousData: true,
    staleTime: 0,
  });

  // ------------------ Sync React Query data to Redux ------------------
  useEffect(() => {
    if (fetchedItemsList.length > 0) {
      dispatch(setItems(fetchedItemsList));
    }
  }, [fetchedItemsList, dispatch]);

  // ------------------ Context values ------------------
  const values = {
    // Items filtering
    searchItem,
    setSearchItem,
    selectedCategories,
    setSelectedCategories,
    fetchedItemsList,
    isLoading,
    isError,
    error,
    refetch,

    // Sales filtering
    searchSale,
    setSearchSale,
    upperDate,
    setUpperDate,
    lowerDate,
    setLowerDate,
  };

  return (
    <StockContext.Provider value={values}>
      {children}
    </StockContext.Provider>
  );
}

export default StockProvider;
