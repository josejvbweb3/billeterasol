import { Component } from "@angular/core";
import { TransferFormComponent, TransferFormPayload } from './transfer-form.component';

@Component ({
    selector: 'billeterasol-transfer-modal',
    template: `
        <div class="px-8 pt-16 pb-8">
            <h2 class="text-3xl text-center mb-8">Transfer funds</h2>

            <billeterasol-transfer-form (submitForm)="onTransfer($event)"></billeterasol-transfer-form>
        </div>`,
    standalone: true,
    imports: [TransferFormComponent],
})
export class TransferModalComponent {
    onTransfer(payload: TransferFormPayload) {
        console.log('hola mundo', payload);
    }
}