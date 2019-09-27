import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService } from './alert.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    message: any;
    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.subscription = this.alertService.getAlert()
            .subscribe(message => {
                switch (message && message.type) {
                    case 'success':
                        message.cssClass = 'alert alert-success';
                        setTimeout(() => {
                            message.cssClass = '';
                            this.message = '';
                        }, 2000);
                        break;
                    case 'error':
                        message.cssClass = 'alert alert-danger';
                        setTimeout(() => {
                            message.cssClass = '';
                            this.message = '';
                        }, 2000);
                        break;
                }
                this.message = message;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
