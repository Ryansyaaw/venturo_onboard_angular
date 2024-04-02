import { Injectable } from "@angular/core";
import { LandaService } from "src/app/core/services/landa.service";

@Injectable({
    providedIn: 'root'
  })
export class CustomerService {

  constructor(private landaService: LandaService) { }

  getCustomers(arrParameter = {}) {
      return this.landaService.DataGet('/v1/customers', arrParameter);
  }

  getCustomerById(CustomerId) {
      return this.landaService.DataGet('/v1/customers/' + CustomerId);
  }

  createCustomer(payload) {
      return this.landaService.DataPost('/v1/customers', payload);
  }

  updateCustomer(payload) {
      return this.landaService.DataPut('/v1/customers', payload);
  }

  deleteCustomer(CustomerId) {
      return this.landaService.DataDelete('/v1/customers/' + CustomerId);
  }
}