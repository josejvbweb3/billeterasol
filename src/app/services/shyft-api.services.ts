import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map, of, tap } from 'rxjs';

// peticion para buscar el balance de sol de la wallet
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

// peticion para buscar la actividad de la wallet
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
      result: { 
        type: string; 
        status: string; 
        timestamp: string; 
        fee: number;
        fee_payer: string;
        signers: string[];
        signatures: string[];
        protocol: {
          address: string;
          name: string;
        };
        actions: {
          info: {
            amount: number;
            receiver: string;
            sender: string;
            receiver_associated_account: string;
            nft_address: string;
          };
          source_protocol: string;
          type: string;
        }[]; 
      }[]
    }>(url.toString(), { headers: this._header })
      .pipe(map((response) => response.result));
  }

  // RPC
  getEndpoint() {
    const url = new URL('https://rpc.shyft.to');
    
    url.searchParams.set('api_key', this._key );

    return url.toString();
  }
}

//peticion para buscar los NFT de la wallet
@Injectable({ providedIn: 'root' })
export class NftList {
  private readonly _httpClient= inject(HttpClient);
  private readonly _key = '2Uxl_qOb31_gMXfy'
  private readonly _header= { 'x-api-key': this._key };
  
  getAllNfts(publicKey: string | undefined | null) {
    
    if (!publicKey) {
      return of(null);
    }
    
    const url = new URL('https://api.shyft.to/sol/v1/nft/read_all');

    url.searchParams.set('network', 'mainnet-beta');
    url.searchParams.set('address', publicKey);
    
    return this._httpClient.get<{
      result: { symbol: string ;  image_uri: string  }[];
    }>(url.toString(), { headers: this._header })
    .pipe(map((response) => response.result));
  }
}

//peticion para consultar el precio de sol a traves de jupiter
@Injectable({ providedIn: 'root' })
  export class PriceSol {
    private readonly _httpClient= inject(HttpClient);
    //private readonly _tokenAddress = 'So11111111111111111111111111111111111111112'
    
    getPriceSol(publicKey: string | undefined | null) {
      
    if (!publicKey) {
      return of(null);
    }
    
    const url = new URL('https://price.jup.ag/v4/price');
    
    url.searchParams.set('ids', 'SOL');
        
    return this._httpClient.get<{
      data: { SOL: { mintSymbol: string, vsToken: string, vsTokenSymbol: string, price: number , timeTaken: number }  };
    }>(url.toString())
    .pipe(map((response) => response.data));
  }
}
// peticion para buscar los tokens de la wallet
@Injectable({ providedIn: 'root' })
export class TokensList {
    private readonly _httpClient= inject(HttpClient);
    private readonly _key = '2Uxl_qOb31_gMXfy'
    private readonly _header= { 'x-api-key': this._key };
    private  _tokenAddress = '';
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getAllTokens(publicKey: string | undefined | null): Observable<any> {

    if (!publicKey) {
      return of(null);
    }
    
    const url = new URL('https://api.shyft.to/sol/v1/wallet/all_tokens');
    
    url.searchParams.set('network', 'mainnet-beta');
    url.searchParams.set('wallet', publicKey);
    
    return this._httpClient.get<{
      result: { address: string ; balance: number; info: { name: string, symbol: string, image: string }; }[];
    }>(url.toString(), { headers: this._header }).pipe(
    tap(response => {
      // Almacenar la dirección del token
      if (response.result && response.result.length > 0) {
        this._tokenAddress = response.result[0].address;
      }
    }),
    map((response) => response.result)
    );
  }
  getTokenAddress(): string {
    return this._tokenAddress;
  }
}

//peticion para buscar el precio del token
@Injectable({ providedIn: 'root' })
export class PriceToken {
  private readonly _httpClient= inject(HttpClient);
    constructor(private tokensList: TokensList) { }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getPriceToken(publicKey: string | undefined | null): Observable<any> {
    const tokenAddress = this.tokensList.getTokenAddress();
    
    
    if (!publicKey || !tokenAddress) {
      return of(null);
    }
    
    const url = new URL('https://price.jup.ag/v4/price');
    
    url.searchParams.set('ids', 'SOL');
    url.searchParams.set('vsToken', tokenAddress );
    
    return this._httpClient.get<{
      data: { SOL: { mintSymbol: string, vsToken: string, vsTokenSymbol: string, price: number , timeTaken: number }  };
    }>(url.toString())
    .pipe(map((response) => response.data));
  }
}

