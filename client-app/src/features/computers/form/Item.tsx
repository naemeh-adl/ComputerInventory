import { FC } from "react";
import { Segment } from "semantic-ui-react";

interface IProps {
  Key: string;
  Value: String;
}
export const Item: FC<IProps> = ({ Key, Value }) => {
  return (
    <Segment>
      <span style={{ fontWeight: "bolder" }}>{Key} : </span>
      <span>{Value}</span>
    </Segment>
  );
};
