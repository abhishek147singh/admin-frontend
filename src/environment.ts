import { isDevMode } from "@angular/core";

export const baseUrl = isDevMode() ? '/proxy' : 'http://localhost:3000';
export const assetsPaths = 'http://localhost:3000/';