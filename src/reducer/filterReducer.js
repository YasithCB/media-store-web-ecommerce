import { products3 } from "@/data/products";

export const initialState = {
  price: [0, 100],

  isNew: "All",

  deals: "All",

  rating: "All",

  brands: [],
  filtered: products3,
  sortingOption: "Default",
  sorted: products3,
  currentPage: 1,
  itemPerPage: 6,
};

export function reducer(state, action) {
  switch (action.type) {
    case "SET_PRICE":
      return { ...state, price: action.payload };

    case "SET_DEALS":
      return { ...state, deals: action.payload };
    case "SET_RATING":
      return { ...state, rating: action.payload };
    case "SET_ISNEW":
      return { ...state, isNew: action.payload };
    case "SET_BRANDS":
      return { ...state, brands: action.payload };
    case "SET_FILTERED":
      return { ...state, filtered: [...action.payload] };
    case "SET_SORTING_OPTION":
      return { ...state, sortingOption: action.payload };
    case "SET_SORTED":
      return { ...state, sorted: [...action.payload] };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    case "TOGGLE_FILTER_ON_SALE":
      return { ...state, activeFilterOnSale: !state.activeFilterOnSale };
    case "SET_ITEM_PER_PAGE":
      return { ...state, itemPerPage: action.payload };
    case "CLEAR_FILTER":
      return {
        ...state,
        price: [0, 100],

        isNew: "All",

        deals: "All",

        rating: "All",

        brands: [],
      };
    default:
      return state;
  }
}
