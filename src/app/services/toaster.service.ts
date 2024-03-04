import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ToasterModel } from "../core/domain/others/toaster.mode";
import { ToasterType } from "../core/enumes/ToasterType.enum";

@Injectable({
    providedIn:'root'
}) 

export class ToasterService {
    private toasts = new BehaviorSubject<ToasterModel[]> ([]);

    show(text: string, type:ToasterType) {
        const restAllToasts = this.toasts.getValue();
        const toastId = Math.floor(Math.random() * 1000).toString();
        const newToast:ToasterModel = { text: text, id: toastId , type: type};

        this.toasts.next([...restAllToasts, newToast]);
    }

    remove(toastId:string) {
        const toasts = this.toasts.getValue();
        const updatedToasts = toasts.filter(toast => toast.id !== toastId);

        this.toasts.next(updatedToasts);
    }
    
    getToasts() {
        return this.toasts;
    }

    success(message:string){
        this.show(message, ToasterType.Success);
    }

    error(message:string){
        this.show(message, ToasterType.Error);
    }

    warn(message:string){
        this.show(message, ToasterType.Warn);
    }

}