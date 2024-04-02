import { Component, EventEmitter, Input, Output, SimpleChange } from '@angular/core';
import { CustomerService } from 'src/app/feature/customer/services/customer.service';
import { ProductService } from 'src/app/feature/product/product/services/product.service';
import { DiscountService } from 'src/app/feature/promo/discount/services/discount.service';
import { PromoService } from 'src/app/feature/promo/services/promo.service';
import { VoucherService } from 'src/app/feature/promo/voucher/services/voucher.service';
import { SaleService } from '../../services/sale.service';
import { LandaService } from 'src/app/core/services/landa.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form-sale',
  templateUrl: './form-sale.component.html',
  styleUrls: ['./form-sale.component.scss']
})
export class FormSaleComponent {
  @Input() selectedCustomer : any;
  @Input() discount : any;
  @Input() voucher : any;
  @Input() product: any;
  @Input() callbackFunction: ((product: any) => void)
  @Output() afterSave = new EventEmitter<boolean>();
  customer : any ;
  titleModal : any;
  customerId : any;
  
  formModel: {
    id : number,
    m_customer_id: any,
    m_voucher_id: any,
    voucher_nominal: any,
    m_discount_id: any,
    date: string,
    details: any,
  };
  constructor(
    private saleService : SaleService,
    private landaService : LandaService,
    private modalService : NgbModal
  ){}

  currentDate = new Date();
  year = this.currentDate.getFullYear();
  month = String(this.currentDate.getMonth() + 1).padStart(2, "0");
  day = String(this.currentDate.getDate()).padStart(2, "0");
  formattedDate = `${this.year}-${this.month}-${this.day}`;


  ngOnInit(): void {
    this.setDeafultVoucher();
    this.setDefaultDiscount();
  }

  addAmount(product, i){
    product.total_item++
  }

  minAmount(product, i){
    product.total_item--
  }

  setDefaultDiscount() {
    this.discount = {
      id: null,
      nominal_percentage: 0,
      promo_name: null
    }
  }

  setDeafultVoucher() {
    this.voucher = {
      id: null,
      nominal_rupiah: 0,
      promo_name: null
    }
  }

  subtotal(product){
    let subtotal = 0;
    product.forEach(val => {
      subtotal = subtotal + (val.price * val.total_item)
    });
    return subtotal;
  }

  tax(product){
    return this.subtotal(product) * 11/100
  }

  discountTotal(product){
    if(this.discount != null){
      return this.subtotal(product) * this.discount.nominal_percentage / 100
    }

    return 0;
  }

  total(product){
    let totalprice = 0;
    totalprice = (this.subtotal(product) + this.tax(product)) - this.discountTotal(product) - this.voucher.nominal_rupiah 
    if(totalprice > 0){
      return totalprice
    }
    return 0
  }

  insert(){
    this.formModel = {
      id: 0,
    m_customer_id: this.selectedCustomer.id,
    m_voucher_id: this.voucher.id,
    voucher_nominal: this.voucher.nominal_rupiah,
    m_discount_id: this.discount.id,
    date: this.formattedDate,
    details: this.product.map(product => {
      return {
        is_added: true,
        m_product_id: product.id,
        m_product_detail_id: product.details.length == 0 ? null : product.details[0].id,
        total_item: product.total_item,
        price: product.price,
        discount_nominal: product.price * product.total_item * this.discount.nominal_percentage / 100
      }
    })
    }

    console.log(this.formModel)
    this.saleService.CreateSale(this.formModel).subscribe((res: any) => {
      this.landaService.alertSuccess('Berhasil', res.message);
      this.resetForm();
      this.afterSave.emit();
    }, err => {
      this.landaService.alertError('Mohon Maaf', err.error.errors);
    });
  }

  resetForm() {
    this.product = [];
    this.customer = [];
    this.ngOnInit();
  }

  updateCustomer(modalId){
    this.titleModal = 'Edit Customer ' + this.selectedCustomer.name
    this.customerId = this.selectedCustomer.id
    this.modalService.open(modalId,{size:'lg', backdrop:'static'})
  }
}
