import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

export interface ConfirmModaltModel {
    title: string;
    question: string;
}

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent extends DialogComponent<ConfirmModaltModel, boolean> implements ConfirmModaltModel {

    title: string;
    question: string;
    message = false;

    constructor(dialogService: DialogService) {
        super(dialogService);
    }

    apply(): void {
        this.result = true;
        this.close();
    }

}
