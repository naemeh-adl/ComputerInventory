import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Computer } from "../models/computer";
import { v4 as uuid } from "uuid";

export default class ComputerStore {
  ComputerRegistry = new Map<string, Computer>();
  selectedComputer: Computer | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;
  numOfExtraProps = 0;

  constructor() {
    makeAutoObservable(this);
  }

  get listOfComputers() {
    return Array.from(this.ComputerRegistry.values());
  }

  loadComputers = async () => {
    try {
      const Computers = await agent.Computers.list();
      Computers.forEach((Computer) => {
        this.ComputerRegistry.set(Computer.id, Computer);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };
  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  selectComputer = (id: string) => {
    this.editMode = false;
    this.selectedComputer = this.ComputerRegistry.get(id);
    let data = this.selectedComputer
      ? JSON.parse(String(this.selectedComputer?.extraProps))
      : undefined;
    let myprops: { index: number; Key: string; Value: string }[] = [];
    if (data !== null) {
      data.forEach((x: any) => {
        myprops.push(x);
      });
      if (this.selectedComputer) this.selectedComputer.tempExtraProps = myprops;
    }
  };
  cancelSelectedComputer = () => {
    this.selectedComputer = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectComputer(id) : this.cancelSelectedComputer();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  addExtraProps = () => {
    this.numOfExtraProps += 1;
  };
  createComputer = async (Computer: Computer) => {
    this.loading = true;
    Computer.id = uuid();
    //To Save Flexible number of Properties
    Computer.extraProps = JSON.stringify(Computer.tempExtraProps);
    try {
      await agent.Computers.create(Computer);
      runInAction(() => {
        this.ComputerRegistry.set(Computer.id, Computer);
        this.selectedComputer = Computer;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateComputer = async (Computer: Computer) => {
    this.loading = true;
    try {
      await agent.Computers.update(Computer);
      runInAction(() => {
        this.ComputerRegistry.set(Computer.id, Computer);
        this.selectedComputer = Computer;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteComputer = async (id: string) => {
    this.loading = true;
    try {
      await agent.Computers.delete(id);
      runInAction(() => {
        this.ComputerRegistry.delete(id);
        if (this.selectedComputer?.id === id) this.cancelSelectedComputer();
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
