import { Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { WalletStore } from "@heavy-duty/wallet-adapter";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Clipboard } from "@angular/cdk/clipboard";


@Component ({
    selector: 'billeterasol-receive-modal',
    template: `
        
        <div class="px-8 pt-16 pb-8 bg-blue-950">
            <h2 class="text-3xl text-center mb-8 text-white">Receive tokens</h2>
            <h2 class="text-3xl text-center mb-8 text-white">
                {{ publicKey()?.toBase58() }} 
                <mat-icon class="center" (click)="copyToClipboard(publicKey()?.toBase58())" fontIcon="content_copy"></mat-icon>
            </h2>
        </div>
    `,
        
    standalone: true,

    imports: [ MatIconModule]
    
})
export class ReceiveModalComponent {
    private readonly _walletStore = inject(WalletStore);
    private readonly _publicKey = toSignal(this._walletStore.publicKey$);


    readonly wallet = this._walletStore
    readonly publicKey = this._publicKey
    
    constructor(private clipboard: Clipboard, private snackBar: MatSnackBar) {}

    copyToClipboard(text: string | undefined) {
        if (text) {
            this.clipboard.copy(text);
            this.snackBar.open('Address copied to clipboard!', 'Close', {
                duration: 2000,
                horizontalPosition: 'end',
            });
        } else {
            console.error('Error: Text to copy is undefined.');
        }
    }
}