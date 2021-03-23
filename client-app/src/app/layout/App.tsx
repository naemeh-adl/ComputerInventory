import React, { useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ComputerDashboard from "../../features/computers/dashboard/ComputerDashboard";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { ToastContainer } from "react-toastify";

function App() {
  const { ComputerStore } = useStore();

  useEffect(() => {
    ComputerStore.loadComputers();
  }, [ComputerStore]);

  if (ComputerStore.loadingInitial)
    return <LoadingComponent content="Loading app" />;

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ComputerDashboard />
      </Container>
    </>
  );
}


export default observer(App);
