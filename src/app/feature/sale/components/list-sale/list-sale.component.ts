import { Component, Input, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/feature/customer/services/customer.service';
import { ProductService } from 'src/app/feature/product/product/services/product.service';
import { PromoService } from 'src/app/feature/promo/services/promo.service';
import { SaleService } from '../../services/sale.service';
import { DiscountService } from 'src/app/feature/promo/discount/services/discount.service';
import { VoucherService } from 'src/app/feature/promo/voucher/services/voucher.service';
import { LandaService } from 'src/app/core/services/landa.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-sale',
  templateUrl: './list-sale.component.html',
  styleUrls: ['./list-sale.component.scss']
})
export class ListSaleComponent implements OnInit{
  selectedCustomer : any;
  listCustomers : any ;
  listProducts : any ;
  showLoading : any;
  customerselect : any;
  customerdata: any;
  voucher:any;
  discount:any;
  menu:any;
  selectedProduct: any = [];
  titleModal:any;
  productId:any;

  filtercust:{
    customer_id: null,
    status: any
  }

  filterprod:{
    name : any,
    is_available : '1',
  }
  
  constructor(
    private promoService : PromoService,
    private customerService : CustomerService,
    private productService : ProductService,
    private discountService : DiscountService,
    private voucherService : VoucherService,
    private modalService: NgbModal
  ){}

  ngOnInit(): void {
    this.selectedProduct = [];
    this.selectedCustomer = 0;
    this.customerdata = null;
    this.setDefaultFilter();
    this.getCustomers(); 
    this.getProducts();   
  }

  setDefaultFilter(){
    this.filtercust={
      customer_id: null,
      status : 1
    }

    this.filterprod={
      name : '',
      is_available : '1',
    }
  }

  filterProduct(product){
    let products = [];
    product.forEach(val => (products.push(val.name)));
    if (!products) return false;
  }

  onCustomerSelectionChange(event: any) {
    if (!event) {
        this.customerdata = null;
    }else{
      this.filtercust.customer_id = this.selectedCustomer
      this.getVoucher()
      this.getDiscount()
      this.customerService.getCustomerById(this.selectedCustomer).subscribe(
        (res:any) =>{
          this.customerdata = res.data;
        }
      )
    }
    console.log(this.customerdata)
}

  getCustomers(name = "") {
    this.customerService.getCustomers({ name: name }).subscribe(
      (res: any) => {
        this.listCustomers = res.data.list;
        console.log(this.listCustomers)
        this.showLoading = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getProducts(){
    this.productService.getProducts(this.filterprod).subscribe(
      (res:any) => {
        res.data.list.forEach(product => {
          product.selected = false;
        });
        this.listProducts = res.data.list;
        this.showLoading = false;
      },
      (err) =>{
        console.log(err);
      }
    );
  }

  getVoucher(){
    const params= {
      ...this.filtercust
    }

    this.voucherService.getVoucher(params).subscribe((res:any)=>{
      const {list, meta} = res.data;
      let usevoucher = list[0];
      for(let i = 0; i < list.length; i++){
        if(list[i].nominal_rupiah > usevoucher.nominal_rupiah){
          usevoucher = list[i]
        }
      }
      console.log(usevoucher)
      this.voucher = usevoucher;
      if(this.voucher == undefined){
        this.voucher = {
          id : null,
          nominal_rupiah : 0,
          promo_name : null
        }
      }
      console.log("voucher " + this.voucher)
    })
  }
  
  getDiscount(){
    const params= {
      ...this.filtercust
    }

    this.discountService.getDiscount(params).subscribe((res:any)=>{
      const {list, meta} = res.data;
      console.log(list)
      let usediscount = list[0];
      for(let i = 0; i < list.length; i++){
        if(list[i].nominal_percentage > usediscount.nominal_percentage){
          usediscount = list[i]
        }
      }
      console.log(usediscount)
      if(usediscount == undefined){
        this.discount = {
          id : null,
          nominal_percentage : 0,
          promo_name : null
        }
      }else{
        this.getDiscountPromo(usediscount.promo_id)
      }
    })
  }

  getDiscountPromo(dc){
    this.promoService.getPromoById(dc).subscribe((res:any)=>{
        this.discount = res.data
        console.log("discount " + this.discount)
      },(err)=>{
        console.log(err);
      }
    )
  }

  selectProduct(product) {
    product.total_item = 1;
    this.selectedProduct.push(product);
    product.selected = true;
  }

  unselectProduct(product) {
    product.total_item = 0;
    const index = this.selectedProduct.indexOf(product);
    if (index !== -1) {
      this.selectedProduct.splice(index, 1);
    }
    product.selected = false;
  }
  
  updateProduct(modalId, product) {
    this.titleModal = 'Edit Menu: ' + product.name;
    this.productId = product.id
    this.modalService.open(modalId, { size: 'xl', backdrop: 'static' });
  }
}
