import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  header: string = null;
  payload = null;
  signature: string = null;
  payloadDecoded: any = null;

  constructor() {}

  decodeToken(token: string) {
    /** Corta el token en 3 partes. header.payload.signature */
    const tokenDividido = token.split('.');
    this.payload = tokenDividido[1];

    const base64 = this.payload.replace('-', '+').replace('_', '/');
    this.payloadDecoded = JSON.parse(window.atob(base64));

    return this.payloadDecoded;
  }
}
