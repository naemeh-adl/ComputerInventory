import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default observer(function ComputerList() {
  const { ComputerStore } = useStore();
  const { deleteComputer, listOfComputers, loading } = ComputerStore;

  const [target, setTarget] = useState("");

  function handleComputerDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    deleteComputer(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {listOfComputers.map((Computer) => (
          <Item key={Computer.id}>
            <Item.Content>
              <Item.Header>{Computer.type}</Item.Header>
              <div>
                <Item.Header>{Computer.brand}</Item.Header>
              </div>
              <Item.Meta>
                <div className="ui horizontal segments">
                  <div className="ui segment">
                    <span style={{ fontWeight: "bold", color: "black" }}>
                      Processor:{" "}
                    </span>
                    {Computer.processor}{" "}
                  </div>
                  <div className="ui segment">
                    <span style={{ fontWeight: "bold", color: "black" }}>
                      Form Factor:{" "}
                    </span>
                    {Computer.fromFactor}
                  </div>
                </div>
              </Item.Meta>
              <Item.Extra>
                <Button
                  onClick={() => ComputerStore.selectComputer(Computer.id)}
                  floated="right"
                  color="blue"
                  className="ui teal button"
                >
                  <FontAwesomeIcon icon={faEye} />
                </Button>
                <Button
                  name={Computer.id}
                  loading={loading && target === Computer.id}
                  onClick={(e) => handleComputerDelete(e, Computer.id)}
                  floated="right"
                  color="red"
                  className="fa fas fa-eye"
                >
                  {" "}
                  <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
});
