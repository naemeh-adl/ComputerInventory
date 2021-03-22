import { ITempExtraProps } from "./ITempExtraProps";
export interface Computer {
    id: string;
    type: string;
    processor : string;
    brand: string;
    usbNum: number;
    ramSlotsNum: number;
    fromFactor :string;
    quantity :number;
    tempExtraProps: ITempExtraProps[];
    extraProps: string,
    tempKey:string,
    tempValue:string
  }