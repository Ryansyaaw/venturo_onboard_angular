import { Injectable } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';

@Injectable({
  providedIn: 'root'
})
export class PromoService {

  constructor(private landaService: LandaService) { }

  getPromo(arrParameter = {}) {
      return this.landaService.DataGet('/v1/promos', arrParameter);
  }

  getPromoById(PromoId) {
      return this.landaService.DataGet('/v1/promos/' + PromoId);
  }

  createPromo(payload) {
      return this.landaService.DataPost('/v1/promos', payload);
  }

  updatePromo(payload) {
      return this.landaService.DataPut('/v1/promos', payload);
  }

  deletePromo(PromoId) {
      return this.landaService.DataDelete('/v1/promos/' + PromoId);
  }
}
