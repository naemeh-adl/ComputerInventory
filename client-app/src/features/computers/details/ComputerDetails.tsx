import { Button, Card, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { Item } from "../form/Item";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ComputerDetails() {
  //This is Computer Detail When User Clicks on View Record
  const { ComputerStore } = useStore();
  const { selectedComputer: Computer, cancelSelectedComputer } = ComputerStore;
  if (!Computer) return <LoadingComponent />;
  const ExtraField: JSX.Element[] = [];
  Computer.tempExtraProps.forEach((x) => {
    ExtraField.push(<Item key={x.index} Key={x.Key} Value={x.Value} />);
  });
  return (
    <Card fluid>
      <Card.Content>
        <div className="ui blue ribbon label">{Computer.type}</div>
        <Segment>
          <Card.Meta>
            <span style={{ fontWeight: "bolder" }}>Brand: </span>
            <span>{Computer.brand}</span>
          </Card.Meta>
          <Card.Description>
            <span style={{ fontWeight: "bolder" }}>Processor: </span>
            {Computer.processor}
          </Card.Description>
          <Card.Description>
            <span style={{ fontWeight: "bolder" }}>Form Factor: </span>{" "}
            {Computer.fromFactor}
          </Card.Description>
        </Segment>
        <Segment>
          <Card.Description>
            <span style={{ fontWeight: "bolder" }}>Number of USB Ports: </span>
            {Computer.usbNum}
          </Card.Description>
          <Card.Description>
            <span style={{ fontWeight: "bolder" }}>Number of RAM Slots: </span>
            {Computer.ramSlotsNum}
          </Card.Description>
          <Card.Description>
            <span style={{ fontWeight: "bolder" }}>Quantity: </span>
            {Computer.quantity}
          </Card.Description>
        </Segment>
      </Card.Content>
      <Card.Content extra>
        {ExtraField.length > 0 && <Segment>{ExtraField}</Segment>}
        <Button
          onClick={cancelSelectedComputer}
          style={{ float: "right" }}
          basic
          color="grey"
          className={"fas fa-window-close"}
        >
          <FontAwesomeIcon icon={faWindowClose} />
        </Button>
      </Card.Content>
    </Card>
  );
}
