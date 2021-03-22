import * as ReactDOM from "react-dom";
import NavBar from "./NavBar";
import ComputerDashboard from "../../features/computers/dashboard/ComputerDashboard";
import ComputerList from "../../features/computers/dashboard/ComputerList";
import ComputerForm from "../../features/computers/form/ComputerForm";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import { Button, Container, Menu } from "semantic-ui-react";
import App from "./App";

test("reaches the correct content here!", () => {
  const root = document.createElement("div");
  ReactDOM.render(<App />, root);
  Enzyme.configure({ adapter: new Adapter() });
  const wrapper = shallow(<NavBar />);
  const Container = wrapper.find(".Title");
  expect(Container.text()).toBe("Computer Inventory System");
});
describe("Test Button component", () => {
  it("Test Adding Extra Properties", () => {
    const mockCallBack = jest.fn();
    const myButton = shallow(<Button onClick={mockCallBack}>Ok!</Button>);
    myButton.find("button").simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
describe("App", () => {
  it("App renders correctly", () => {
    shallow(<App />);
  });
});
describe("ComputerDashboard", () => {
  it("ComputerDashboard renders correctly", () => {
    shallow(<ComputerDashboard />);
  });
});
describe("ComputerList", () => {
  it("ComputerList renders correctly", () => {
    shallow(<ComputerList />);
  });
});
describe("NavBar", () => {
  it("NavBar renders correctly", () => {
    shallow(<NavBar />);
  });
});
describe("ComputerForm", () => {
  it("ComputerForm renders correctly", () => {
    shallow(<ComputerForm />);
  });
});
