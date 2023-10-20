import "../styles/globals.scss";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../src/redux/store";
import { useEffect } from "react";
import PrivateRoute from "../src/routes/privateRoute";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {getLayout(
          pageProps.privateRoute ? (
            <PrivateRoute component={Component} {...pageProps} />
          ) : (
            <Component {...pageProps} />
          )
        )}
        <ToastContainer />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
