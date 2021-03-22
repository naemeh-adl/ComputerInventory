import { observer } from "mobx-react-lite";
import { ChangeEvent, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { Property } from "./Property";
import { faWindowClose, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default observer(function ComputerForm() {
  //This is Computer Detail When User Clicks on Add Record
  const { ComputerStore } = useStore();
  const {
    selectedComputer,
    closeForm,
    createComputer,
    updateComputer,
    loading,
    addExtraProps,
    numOfExtraProps,
  } = ComputerStore;
  const initialState = selectedComputer ?? {
    id: "",
    type: "",
    processor: "",
    brand: "",
    usbNum: 0,
    ramSlotsNum: 0,
    fromFactor: "",
    quantity: 0,
    tempExtraProps: [],
    extraProps: "",
    tempValue: "",
    tempKey: "",
  };
  const [Computer, setComputer] = useState(initialState);
  const [extrafields, setExtraFields] = useState<JSX.Element[]>([]);
  useEffect(() => {
    if (
      selectedComputer &&
      ComputerStore.selectedComputer &&
      ComputerStore.selectedComputer.tempExtraProps
    )
      ComputerStore.selectedComputer.tempExtraProps.forEach((element) => {
        setExtraFields([
          ...extrafields,
          <Property
            key={numOfExtraProps}
            data={Computer}
            numOfExtraProps={numOfExtraProps}
          />,
        ]);
      });
  }, [Computer, ComputerStore.selectedComputer, extrafields, numOfExtraProps, selectedComputer]);
  function handleSubmit() {
    var isValid = clientSideValidation();
    if (isValid)
      Computer.id ? updateComputer(Computer) : createComputer(Computer);
  }
  function clientSideValidation() {
    let isValid = true;
    if (Computer.type.length <= 0) {
      toast.error("Type Should Be Specified!");
      isValid = false;
    }
    const { usbNum, ramSlotsNum, quantity } = Computer;
    if (usbNum < 0 || !Number.isInteger(Number.parseFloat(usbNum.toString()))) {
      toast.error(
        "Number Of USB Should Be an Integer Grater Than or Equal to 0"
      );
      isValid = false;
    }
    if (
      ramSlotsNum < 0 ||
      !Number.isInteger(Number.parseFloat(ramSlotsNum.toString()))
    ) {
      toast.error(
        "Number Of RAM Slots Should Be an Integer Grater Than or Equal to 0"
      );
      isValid = false;
    }
    if (
      quantity < 0 ||
      !Number.isInteger(Number.parseFloat(quantity.toString()))
    ) {
      toast.error("Quantity Should Be an Integer Grater Than or Equal to 0");
      isValid = false;
    }
    return isValid;
  }
  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    let { name, value } = event.target;
    setComputer({ ...Computer, [name]: value });
  }
  const addExtraLine = () => {
    addExtraProps();
    setExtraFields([
      ...extrafields,
      <Property
        key={numOfExtraProps}
        data={Computer}
        numOfExtraProps={numOfExtraProps}
      />,
    ]);
  };
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <div className="ui green ribbon label">New</div>
        <br />
        <label>Type</label>
        <Form.Input
          placeholder="Type"
          value={Computer.type}
          name="type"
          onChange={handleInputChange}
        />
        <label>Brand</label>
        <Form.Input
          placeholder="Brand"
          value={Computer.brand}
          name="brand"
          onChange={handleInputChange}
          style={{ margin: "5" }}
        />
        <label>Processor</label>
        <Form.Input
          placeholder="Processor"
          value={Computer.processor}
          name="processor"
          onChange={handleInputChange}
        />
        <label>Form Factor</label>
        <Form.Input
          placeholder="Form Factor"
          value={Computer.fromFactor}
          name="fromFactor"
          onChange={handleInputChange}
        />
        <label>USB Ports</label>
        <Form.Input
          type={"Number"}
          placeholder="USB"
          value={Computer.usbNum}
          name="usbNum"
          onChange={handleInputChange}
        />
        <label>RAM Slots</label>
        <Form.Input
          type={"Number"}
          placeholder="RAM Slots"
          value={Computer.ramSlotsNum}
          name="ramSlotsNum"
          onChange={handleInputChange}
        />
        <label>Quantity</label>
        <Form.Input
          type={"Number"}
          placeholder="Quantity"
          value={Computer.quantity}
          name="quantity"
          onChange={handleInputChange}
        />

        {extrafields}
        <div style={{ display: "block" }}>
          <button
            style={{ color: "green" }}
            onClick={() => addExtraLine()}
            type="button"
            className="ui icon left labeled button"
          >
            <i aria-hidden="true" className="add icon "></i>
            More Properties
          </button>
        </div>
        <Button
          loading={loading}
          floated="right"
          positive
          type="submit"
        >
          <FontAwesomeIcon icon={faSave} />{" "}
        </Button>
        <Button
          onClick={closeForm}
          floated="right"
          type="button"
          className={"fas fa-window-close"}
        >
          <FontAwesomeIcon icon={faWindowClose} />
        </Button>
      </Form>
    </Segment>
  );
});
