import { FC, ChangeEvent, useState } from "react";
import { Form, Segment } from "semantic-ui-react";
import { Computer } from "../../../app/models/computer";

interface IProps {
  data: Computer;
  numOfExtraProps: number;
}
export const Property: FC<IProps> = ({ data, numOfExtraProps }) => {
  const [inputKey, setInputKey] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleChangeKey = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputKey(event.target.value);
    var a = data.tempExtraProps.find((x) => x.index === numOfExtraProps);
    if (a) {
      data.tempExtraProps = data.tempExtraProps.filter(
        (x) => x.index !== numOfExtraProps
      );
    }
    data.tempExtraProps.push({
      index: numOfExtraProps,
      Key: event.target.value,
      Value: inputValue,
    });
  };
  const handleChangeVal = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(event.target.value);
    var a = data.tempExtraProps.find((x) => x.index === numOfExtraProps);
    if (a) {
      data.tempExtraProps = data.tempExtraProps.filter(
        (x) => x.index !== numOfExtraProps
      );
    }
    data.tempExtraProps.push({
      index: numOfExtraProps,
      Key: inputKey,
      Value: event.target.value,
    });
  };
  return (
    <Segment>
      <label>Name</label>
      <Form.Input
        placeholder="Name"
        name={"tempKey"}
        onChange={handleChangeKey}
      />
      <label>Value</label>
      <Form.Input
        placeholder="Value"
        name={"tempValue"}
        onChange={handleChangeVal}
      />
    </Segment>
  );
};
