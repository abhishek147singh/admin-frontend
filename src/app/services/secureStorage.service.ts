import { Injectable } from "@angular/core";
// import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})

export class SecureStorageService {
    // private encryptionKey: string = 'it is secret key';

    // private encrypt(txt: string): string {
    //     return CryptoJS.AES.encrypt(txt, this.encryptionKey).toString();
    // }

    // private decrypt(txtToDecrypt: string) {
    //     return CryptoJS.AES.decrypt(txtToDecrypt, this.encryptionKey).toString(CryptoJS.enc.Utf8);
    // }

    setItem(key: string, value: any) {
        // localStorage.setItem(key, this.encrypt(JSON.stringify(value)));
        localStorage.setItem(key, JSON.stringify(value));
    }

    getItem(key: string) {
        let data = localStorage.getItem(key) || "";
        if(data){
            // return JSON.parse(this.decrypt(data));   
            return JSON.parse(data);   
        }else{
            return {};
        }
    }

    removeItem(key: string) {
        localStorage.removeItem(key);
    }

    clear(){
        localStorage.clear();
    }
}