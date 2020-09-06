import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import TransactionPage from "./pages/TransactionPage";
import EmptyPage from "./pages/EmptyPage";

function App() {
  const [currentPage, setCurrentPage] = React.useState();

  const renderPage = (pageName) => {
    switch (pageName) {
      case "Home":
        return <TransactionPage />;
      case "Lorem":
        return <EmptyPage />;
      default:
        return <TransactionPage />;
    }
  };
  return (
    <React.Fragment>
      <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage(currentPage)}
    </React.Fragment>
  );
}

export default App;
