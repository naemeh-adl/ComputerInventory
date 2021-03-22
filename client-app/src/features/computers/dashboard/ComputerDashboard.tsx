import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ComputerDetails from "../details/ComputerDetails";
import ComputerForm from "../form/ComputerForm";
import ComputerList from "./ComputerList";

export default observer(function ComputerDashboard() {
  const { ComputerStore } = useStore();
  const { selectedComputer, editMode } = ComputerStore;
  const { loadComputers, ComputerRegistry } = ComputerStore;
  useEffect(() => {
    if (ComputerRegistry.size <= 1) loadComputers();
  }, [ComputerRegistry.size, loadComputers]);
  if (ComputerStore.loadingInitial)
    return <LoadingComponent content="Loading Data" />;
  return (
    <Grid>
      <Grid.Column width="10">
        <ComputerList />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedComputer && !editMode && <ComputerDetails />}
        {editMode && <ComputerForm />}
      </Grid.Column>
    </Grid>
  );
});
