import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  createAlert(message, motif) {
    window.EDS.alerts.create(message, {
      motif: motif,
      region: 'bottom-center',
      timeout: 3000
    });
  }
}
