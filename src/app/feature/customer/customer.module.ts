import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCustomerComponent } from './components/list-customer/list-customer.component';
import { FormCustomerComponent } from './components/form-customer/form-customer.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    ListCustomerComponent,
    FormCustomerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    DataTablesModule,
    SharedModule,
    NgSelectModule
  ],
  exports:[
    FormCustomerComponent
  ]
})
export class CustomerModule { }
