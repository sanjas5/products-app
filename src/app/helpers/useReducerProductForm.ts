type FormState = {
  title: string;
  description: string;
  price: string;
  category: string;
  image: string;
  priceError: string;
};

type Action =
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_DESCRIPTION"; payload: string }
  | { type: "SET_PRICE"; payload: string }
  | { type: "SET_CATEGORY"; payload: string }
  | { type: "SET_IMAGE"; payload: string }
  | { type: "SET_PRICE_ERROR"; payload: string }
  | { type: "RESET_FORM" };

export const initialState: FormState = {
  title: "",
  description: "",
  price: "",
  category: "",
  image: "",
  priceError: "",
};

export const formReducer = (state: FormState, action: Action): FormState => {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload };
    case "SET_PRICE":
      return { ...state, price: action.payload };
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    case "SET_IMAGE":
      return { ...state, image: action.payload };
    case "SET_PRICE_ERROR":
      return { ...state, priceError: action.payload };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};
