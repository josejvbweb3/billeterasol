import { Component, EventEmitter, Output, inject, input } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInput} from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from "@angular/material/button";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatOption, MatSelect } from "@angular/material/select";


export interface TransferFormModel {
    receiverAddress: string | null;
    memo: string | null;
    amount: number | null;
    tokens2: {
        address: string; 
        balance: number;
        info: { name: string; symbol: string; image: string };
    } | null;
}

export interface TransferFormPayload {
    memo: string;
    receiverAddress: string;
    amount: number;
    mintAddress: string;
}

@Component({
    selector: 'billeterasol-transfer-form',
    template: `
        <form #form1="ngForm" class="w-[400px]" (ngSubmit)="onSubmit(form1)">
            <mat-form-field class=" w-full mb-4">
                <mat-label>Token</mat-label>
                <mat-select 
                    [(ngModel)]="model.tokens2" 
                    name="token2" 
                    required
                    #token2Control="ngModel"
                >
                @for (token1 of tokens2(); track token1) {
                    <mat-option [value]="token1.address">
                    <div class="flex items-center gap-2">
                        <img [src]="token1.info.image" class="rounded-full" w-8 h-8 />
                        <span>{{ token1.info.symbol }}</span>
                    </div>
                    </mat-option>
                }
            </mat-select>
            
            @if (form1.submitted && token2Control.errors) {
                <mat-error>
                    @if (token2Control.errors['required']) {
                        token required.
                    }
                </mat-error>
            }

            <mat-hint> select token</mat-hint>
            </mat-form-field>
            
        
            <mat-form-field appearance="fill" class="w-full mb-4">
            <mat-label>Memo</mat-label>
            <input
                name="memo"
                matInput
                type="text" 
                placeholder="example: pay electricity bill"
                [(ngModel)]="model.memo"
                required
                #memoControl="ngModel"
                
            />
            <mat-icon matSuffix>description</mat-icon>

            @if (form1.submitted && memoControl.errors) {
                <mat-error>
                    @if (memoControl.errors['required']) {
                        Memo required.
                    }
                </mat-error>
            }

            <mat-hint>Reason for transfer</mat-hint>
            </mat-form-field>

            <mat-form-field appearance="fill" class="w-full mb-4">
            <mat-label>Amount</mat-label>
            <input
                name="amount"
                matInput
                type="number" 
                min="0"
                placeholder="Amount"
                [(ngModel)]="model.amount"
                required
                #amountControl="ngModel"
                
                [max]="token2Control.value?.balance ?? undefined "
            />
            <mat-icon matSuffix>attach_money</mat-icon>

            @if (form1.submitted && amountControl.errors) {
                <mat-error>
                    @if (amountControl.errors['required']) {
                        Amount required.
                    } @else if (amountControl.errors['min']) {
                        the quantity must be greater than 0
                    } @else if (amountControl.errors['max']) {
                        the quantity must be minor than {{ token2Control.value.balance }}
                    }
                </mat-error>
            }

            <mat-hint>Amount must be greater than 0</mat-hint>
            </mat-form-field>

            <mat-form-field appearance="fill" class="w-full mb-4">
            <mat-label>Address</mat-label>
            <input
                name="receiverAddress"
                matInput
                type="text" 
                placeholder="public key receiver address"
                [(ngModel)]="model.receiverAddress"
                required
                #receiverAddressControl="ngModel"
                
            />
            <mat-icon matSuffix>key</mat-icon>

            @if (form1.submitted && receiverAddressControl.errors) {
                <mat-error>
                    @if (receiverAddressControl.errors['required']) {
                        receiverAdress required.
                    } 
                </mat-error>
            }

            <mat-hint>receiverAdress It must be a solana wallet</mat-hint>
            </mat-form-field>

            <footer class="flex justify-center gap-4" >
                <button type="submit" mat-raised-button color="primary" >Send</button>
                <!-- <button type="button" mat-raised-button color="warn" (click)="onCancel()">Cancel</button> -->
            </footer>

        </form> 
        `,
        standalone: true,
        imports: [
            FormsModule, 
            MatFormFieldModule, 
            MatInput, 
            MatIcon, 
            MatButton, 
            MatSelect, 
            MatOption,
            
        ],
})

export class TransferFormComponent {


    private readonly _matSnackbar = inject(MatSnackBar);
    
    readonly tokens2 = input<{ address: string, balance: number, info: { name: string, symbol: string, image: string} }[]>([]);
    
      //readonly disabled = input<boolean>(false);
    
      @Output() readonly sendTransfer = new EventEmitter<TransferFormPayload>();
      @Output() readonly cancelTransfer = new EventEmitter();
       
    readonly model: TransferFormModel = {
        tokens2: null,
        memo: null,
        amount: null,
        receiverAddress: null
    };
    
    onSubmit(form: NgForm) {
        if (
            form.invalid  || 
            this.model.tokens2?.address === null ||  
            this.model.amount === null || 
            this.model.memo ===  null || 
            this.model.receiverAddress === null 
            ) {
            this._matSnackbar.open(' form invalid', 'close', {
                duration:4000,
                horizontalPosition: 'end',
            });
        } else {
              this.sendTransfer.emit({
                mintAddress: this.model.memo,// hay que cambiar este valor por mintAdress
                amount: this.model.amount * 10 ** 9,
                memo: this.model.memo,
                receiverAddress: this.model.receiverAddress
              })
        }

        
    }
    //onCancel() {
    //    this.cancelTransfer.emit();
    //}
}