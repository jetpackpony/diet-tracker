import "../src/App.css";
import "../src/reset.css";
import SelectionContext, { useSelection } from "../src/SelectionContext";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => {
    const selectionContextValue = useSelection();
    return (
      <SelectionContext.Provider value={selectionContextValue}>
        <Story />
      </SelectionContext.Provider>
    );
  },
];