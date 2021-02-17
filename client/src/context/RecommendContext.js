import React, { useReducer, createContext } from "react";
import RecommendReducer from "../reducer/RecommendReducer";

const RecommendContext = createContext();

const RecommendProvider = ({ children }) => {
  const [Recommend, RecommendDispatch] = useReducer(RecommendReducer, {
    Good: false,
    Bad: false,
    Id: [],
  });
  return (
    <RecommendContext.Provider value={[Recommend, RecommendDispatch]}>
      {children}
    </RecommendContext.Provider>
  );
};

const RecommendConsumer = RecommendContext.Consumer;

export { RecommendProvider, RecommendConsumer };

export default RecommendContext;
