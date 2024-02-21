import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInput} from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from "@angular/material/button";

export interface TransferFormModel {
    memo: string | null;
    amount: number | null;
    receiverAddress: string | null;
}

export interface TransferFormPayload {
    memo: string;
    amount: number;
    receiverAddress: string;
}

@Component({
    selector: 'billeterasol-transfer-form',
    template: `
        <form #form1="ngForm" class="w-[400px]" (ngSubmit)="onSubmitForm(form1)">
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
            />
            <mat-icon matSuffix>attach_money</mat-icon>

            @if (form1.submitted && amountControl.errors) {
                <mat-error>
                    @if (amountControl.errors['required']) {
                        Amount required.
                    } @else if (amountControl.errors['min']) {
                        the quantity must be greater than 0
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

            <footer class="flex justify-center" >
                <button type="submit" mat-raised-button color="primary">Send</button>
            </footer>

        </form> 
        `,
        standalone: true,
        imports: [FormsModule, MatFormFieldModule, MatInput, MatIcon, MatButton],
})

export class TransferFormComponent {
    readonly model: TransferFormModel = {
        memo: null,
        amount: null,
        receiverAddress: null
    };

    @Output() readonly submitForm = new EventEmitter<TransferFormPayload>()
    
    onSubmitForm(form: NgForm) {
        if (
            form.invalid  || 
            this.model.amount === null || 
            this.model.memo ===  null || 
            this.model.receiverAddress === null 
            ) {
            console.error('el formulario es invalido.');
        } else {
            this.submitForm.emit({
                amount: this.model.amount * 10 ** 9,
                memo: this.model.memo,
                receiverAddress: this.model.receiverAddress
            })
        }
    }
}