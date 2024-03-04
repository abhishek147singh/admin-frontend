import { ToasterType } from "../../enumes/ToasterType.enum";

export interface ToasterModel{
    id:string;
    text:string;
    type:ToasterType;
}