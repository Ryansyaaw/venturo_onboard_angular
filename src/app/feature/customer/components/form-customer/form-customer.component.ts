import { Component, EventEmitter, Input, Output, SimpleChange } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { LandaService } from 'src/app/core/services/landa.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-customer',
  templateUrl: './form-customer.component.html',
  styleUrls: ['./form-customer.component.scss']
})
export class FormCustomerComponent {
  @Input() CustomerId: number;
  @Output() afterSave  = new EventEmitter<boolean>();
  public radioGroupForm: FormGroup;
  
 readonly MODE_CREATE = 'add';
 readonly MODE_UPDATE = 'update';

 activeMode: string;

 formModel: {
   id: number,
   name: string,
   email: string,
   phone_number: string,
   date_of_birth: string,
   photo_url: string,
   is_verifyed: string,
 }
 
 isDisabledForm: boolean= false;
 constructor(
  private customerService: CustomerService,
  private landaService: LandaService
) { }

getCroppedImage($event) {
  this.formModel.photo_url = $event;
 }
getCustomer(CustomerId) {

  this.customerService.getCustomerById(CustomerId).subscribe((res: any) => {
   this.formModel = res.data;
   this.formModel.is_verifyed = String(res.data.is_verifyed);
 }, err => {
   console.log(err);
 });
 }

 
resetForm() {
  this.formModel = {
    id: 0,
    name: '',
    email: '',
    phone_number: '',
    date_of_birth: '',
    photo_url: '',
    is_verifyed: '',
  }
  
  if (this.CustomerId != 0) {
    this.activeMode = this.MODE_UPDATE;
    this.getCustomer(this.CustomerId);
    return true;
  }
  
  this.activeMode = this.MODE_CREATE;
  }
  save() {
    switch (this.activeMode) {
      case this.MODE_CREATE:
        this.insert();
        break;
      case this.MODE_UPDATE:
        this.update();
        break;
    }
    }
    
     insert() {
    
            this.isDisabledForm = true;
    
            this.customerService.createCustomer(this.formModel).subscribe((res: any) => {
    
              this.landaService.alertSuccess('Berhasil', res.message);
    
              this.afterSave.emit();
    
              this.isDisabledForm = false;
    
            }, err => {
    
              this.landaService.alertError('Mohon Maaf', err.error.errors);
    
              this.isDisabledForm = false;
    
            });
    
      }
    
    
      update() {
    
            this.isDisabledForm = true;
    
            this.customerService.updateCustomer(this.formModel).subscribe((res: any) => {
    
              this.landaService.alertSuccess('Berhasil', res.message);
    
              this.afterSave.emit();
    
              this.isDisabledForm = false;
    
            }, err => {
    
              this.landaService.alertError('Mohon Maaf', err.error.errors);
    
              this.isDisabledForm = false;
    
            });
    
      }

      
ngOnChanges(changes: SimpleChange) {
  this.resetForm();
  }


}
