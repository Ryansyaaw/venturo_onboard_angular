import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // import CommonModule
import { ListUserComponent } from './components/list-user/list-user.component';
import { FormUserComponent } from './components/form-user/form-user.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from "angular-datatables";
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ListUserComponent,
    FormUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    DataTablesModule,
    SharedModule
  ]
})
export class UserModule { }
