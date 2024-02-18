import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShyftApiService {
  private readonly _httpClient= inject(HttpClient);
  private readonly _header= { 'x-api-key': 'EraF45wUGdcVjhRP' };
  private readonly _mint ='EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';

  getAccount(publicKey: string | undefined | null) {

    if (!publicKey) {
      return of(null);
    }
    
    const url = new URL('https://api.shyft.to/sol/v1/wallet/token_balance');

    url.searchParams.set('network', 'mainnet-beta');
    url.searchParams.set('wallet', publicKey);
    url.searchParams.set('token', this._mint)

    return this._httpClient.get<{
      result: { balance: number; info: { image: string, name: string } };
    }>(url.toString(), { headers: this._header })
    .pipe(map((response) => response.result));
  }
}
@Injectable({ providedIn: 'root' })
export class TokenUsdc {
  private readonly _httpClient= inject(HttpClient);
  private readonly _header= { 'x-api-key': 'EraF45wUGdcVjhRP' };
  private readonly _mint ='7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs';
  getAccount1(publicKey1: string | undefined | null) {

    if (!publicKey1) {
      return of(null);
    }
    
    const url = new URL('https://api.shyft.to/sol/v1/wallet/token_balance');

    url.searchParams.set('network', 'mainnet-beta');
    url.searchParams.set('wallet', publicKey1);
    url.searchParams.set('token', this._mint)

    return this._httpClient.get<{
      result: { balance: number; info: { image: string, name: string } };
    }>(url.toString(), { headers: this._header })
    .pipe(map((response) => response.result));
  }
}

@Injectable({ providedIn: 'root' })
export class SolBalance {
  private readonly _httpClient= inject(HttpClient);
  private readonly _header= { 'x-api-key': 'EraF45wUGdcVjhRP' };
  getAccount2(publicKey2: string | undefined | null) {

    if (!publicKey2) {
      return of(null);
    }
    
    const url = new URL('https://api.shyft.to/sol/v1/wallet/balance');

    url.searchParams.set('network', 'mainnet-beta');
    url.searchParams.set('wallet', publicKey2);
    

    return this._httpClient.get<{
      result: { balance: number };
    }>(url.toString(), { headers: this._header })
    .pipe(map((response) => response.result));
  }
}

@Injectable({ providedIn: 'root' })
export class ActivityWallet {
  private readonly _httpClient= inject(HttpClient);
  private readonly _header= { 'x-api-key': 'EraF45wUGdcVjhRP' };
  getTransactionsHistory(publicKey: string | undefined | null) {

    if (!publicKey) {
      return of(null);
    }
    
    const url = new URL('https://api.shyft.to/sol/v1/transaction/history');

    url.searchParams.set('network', 'mainnet-beta');
    url.searchParams.set('account', publicKey);
    url.searchParams.set('tx_num', '10');
    

    return this._httpClient.get<{
      result: { type: string; status: string; timestamp: string; }[]
    }>(url.toString(), { headers: this._header })
    .pipe(map((response) => response.result));
  }
}