import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormUserComponent } from './user/components/form-user/form-user.component';
import { TestDirectiveComponent } from './test/components/test-directive/test-directive.component';
import { ListUserComponent } from './user/components/list-user/list-user.component';
import { ListCustomerComponent } from './customer/components/list-customer/list-customer.component';
import { ListCategoryComponent } from './product/category/components/list-category/list-category.component';
import { ListProductComponent } from './product/product/components/list-product/list-product.component';
import { ListPromoComponent } from './promo/component/list-promo/list-promo.component';
import { ListVoucherComponent } from './promo/voucher/components/list-voucher/list-voucher.component';
import { ListDiscountComponent } from './promo/discount/components/list-discount/list-discount.component';
import { ListSaleComponent } from './sale/components/list-sale/list-sale.component';


const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: DashboardComponent },
    { path: 'user', component: ListUserComponent },
    { path: 'test', component: TestDirectiveComponent},
    { path: 'customer', component: ListCustomerComponent},
    { path: 'category', component: ListCategoryComponent },
    { path: 'product', component: ListProductComponent },
    { path: 'promo', component: ListPromoComponent },
    { path: 'voucher', component: ListVoucherComponent },
    { path: 'discount', component: ListDiscountComponent },
    { path: 'sale', component: ListSaleComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeatureRoutingModule { }
