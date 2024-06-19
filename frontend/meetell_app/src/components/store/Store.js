import React, { createContext, useReducer, useContext } from 'react';

// Создаем контекст
const StoreContext = createContext();

// Определяем действия
const SET_ITEM = 'SET_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const CLEAR_STORE = 'CLEAR_STORE';

// Инициализируем начальное состояние
const initialState = {};

// Определяем редуктор
const reducer = (state, action) => {
  switch (action.type) {
    case SET_ITEM:
      return { ...state, [action.key]: action.value };
    case REMOVE_ITEM:
      const newState = { ...state };
      delete newState[action.key];
      return newState;
    case CLEAR_STORE:
      return initialState;
    default:
      return state;
  }
};

// Создаем провайдер
export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setItem = (key, value) => {
    dispatch({ type: SET_ITEM, key, value });
  };

  const removeItem = (key) => {
    dispatch({ type: REMOVE_ITEM, key });
  };

  const clearStore = () => {
    dispatch({ type: CLEAR_STORE });
  };

  const getItem = (key) => {
    return state[key];
  };

  return (
    <StoreContext.Provider value={{ state, setItem, removeItem, clearStore, getItem }}>
      {children}
    </StoreContext.Provider>
  );
};

// Хук для использования хранилища
export const useStore = () => useContext(StoreContext);
