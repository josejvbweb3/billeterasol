import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SolBalance {
  private readonly _httpClient= inject(HttpClient);
  private readonly _header= { 'x-api-key': '2Uxl_qOb31_gMXfy' };
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
  private readonly _key = '2Uxl_qOb31_gMXfy'
  private readonly _header= { 'x-api-key': this._key };
  
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

  getEndpoint() {
    const url = new URL('https://rpc.shyft.to');
    
    url.searchParams.set('api_key', this._key );

    return url.toString();
  }
}

@Injectable({ providedIn: 'root' })
  export class TokensList {
    private readonly _httpClient= inject(HttpClient);
    private readonly _key = '2Uxl_qOb31_gMXfy'
    private readonly _header= { 'x-api-key': this._key };
  
    getAllTokens(publicKey: string | undefined | null) {

    if (!publicKey) {
      return of(null);
    }
    
    const url = new URL('https://api.shyft.to/sol/v1/wallet/all_tokens');

    url.searchParams.set('network', 'mainnet-beta');
    url.searchParams.set('wallet', publicKey);
    
    return this._httpClient.get<{
      result: { address: string ; balance: number; info: { name: string, symbol: string, image: string }; }[];
    }>(url.toString(), { headers: this._header })
    .pipe(map((response) => response.result));
  }
}


