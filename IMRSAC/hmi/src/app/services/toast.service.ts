import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    constructor(private messageService: MessageService) {}

    showSuccess(message: string) {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: message });
    }

    showInfo(message: string) {
        this.messageService.add({ severity: 'info', summary: 'Info', detail: message });
    }

    showWarn(message: string) {
        this.messageService.add({ severity: 'warn', summary: 'Warning', detail: message });
    }

    showError(message: string) {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: message });
    }

    showContrast(message: string) {
        this.messageService.add({ severity: 'contrast', summary: 'Erro', detail: message });
    }

    showSecondary(message: string) {
        this.messageService.add({ severity: 'secondary', summary: 'Secondary', detail: message });
    }
}