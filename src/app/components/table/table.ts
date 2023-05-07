import { Component, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'ngbd-modal-options',
	standalone: true,
	templateUrl: './table.component.html',
	encapsulation: ViewEncapsulation.None,
})
export class NgbdModalOptions {
	closeResult: string | undefined;

	constructor(private modalService: NgbModal) {}

	openScrollableContent(longContent: any) {
		this.modalService.open(longContent, { scrollable: true });
	}
}