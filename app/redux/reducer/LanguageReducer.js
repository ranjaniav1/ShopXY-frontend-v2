const initialState = {
  language: 'en',  // Default to English
};

const languageReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'SET_LANGUAGE':
          return {
              ...state,
              language: action.payload,
          };
      default:
          return state;
  }
};

export const setLanguage = (lang) => ({
  type: 'SET_LANGUAGE',
  payload: lang,
});

export default languageReducer;
