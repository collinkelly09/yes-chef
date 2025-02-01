import React from "react";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { registerRootComponent } from "expo";
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

const NewRootComponent = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default registerRootComponent(NewRootComponent);
