import { Component, computed, inject } from "@angular/core";
import { TransferFormComponent, TransferFormPayload } from './transfer-form.component';
import { WalletStore, injectTransactionSender } from "@heavy-duty/wallet-adapter";
import { createTransferInstructions } from '@heavy-duty/spl-utils';
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatProgressSpinner} from "@angular/material/progress-spinner"
import { TokensList } from "./services/shyft-api.services";
import { computedAsync } from "ngxtension/computed-async";
import { toSignal } from "@angular/core/rxjs-interop";

@Component ({
    selector: 'billeterasol-transfer-modal',
    template: `
        <div class="px-8 pt-16 pb-8 bg-blue-800">
            <h2 class="text-3xl text-center mb-8 bg-blue-800">Transfer tokens</h2>

            <billeterasol-transfer-form
                [disabled]="isRunning()"
                [tokens]="allTokens() ?? []"
                (sendTransfer)="onSendTransfer($event)"
                (cancelTransfer)="onCancelTransfer()"
            >
            </billeterasol-transfer-form>

            @if (isRunning()) {
                <div class="absolute w-full h-full top-0 left-0 flex">

                <mat-progress-spinner
                    color="primary"
                    mode="indeterminate"
                    diameter="64"
                ></mat-progress-spinner>
                <p class="capitalize text-xl">{{ transactionStatus() }}...</p>
                </div>
            }
        </div>`,
    standalone: true,
    imports: [TransferFormComponent, MatProgressSpinner, TransferModalComponent],
})
export class TransferModalComponent {
    private readonly _matSnackbar = inject(MatSnackBar);
    private readonly _matDialogRef = inject(MatDialogRef);
    private readonly _walletStore = inject(WalletStore);
    private readonly _publicKey = toSignal(this._walletStore.publicKey$);
    private readonly _transactionSender = injectTransactionSender();
    private readonly _tokensList = inject(TokensList);

    readonly transactionStatus = computed(() => this._transactionSender().status);
    readonly isRunning = computed(
        () =>
            this.transactionStatus() === 'sending' ||
            this.transactionStatus() === 'confirming' ||
            this.transactionStatus() === 'finalizing',
    );

    readonly allTokens = computedAsync(() => this._tokensList.getAllTokens(this._publicKey()?.toBase58()),);
    

    onSendTransfer(payload: TransferFormPayload) {
        this._matDialogRef.disableClose = true;
        
        
        this._transactionSender
            .send(({  publicKey }) =>
                createTransferInstructions ({
                    senderAddress: publicKey.toBase58(),
                    receiverAddress: payload.receiverAddress,
                    mintAddress: payload.mintAddress,
                    amount: payload.amount,
                    fundReceiver: true,
                    memo: payload.memo,
            }) )
            .subscribe({
                next: (signature) => {
                    console.log(`Firma: ${signature}`);
                    this._matDialogRef.close();
                },
                error: error => {
                    console.error(error)
                    this._matDialogRef.disableClose = false;
                },
                complete: () => {console.log('Transaction complete')
                this._matSnackbar.open('transaction done', 'close', {duration:4000, horizontalPosition: 'end'})}
                
            })
    }
    onCancelTransfer() {
        this.onCancelTransfer;
    }
}