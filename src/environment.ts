import { isDevMode } from "@angular/core";

export const baseUrl = isDevMode() ? '/proxy' : '';
export const assetsPaths = 'http://localhost:3000/';