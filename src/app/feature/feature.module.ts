import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarModule, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { FeatureRoutingModule } from './feature-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormUserComponent } from './user/components/form-user/form-user.component';
import { BrowserModule } from '@angular/platform-browser';
import { TestDirectiveComponent } from './test/components/test-directive/test-directive.component';
import { UserModule } from './user/user.module';
import { DataTablesModule } from 'angular-datatables';
import { CustomerModule } from './customer/customer.module';
import { ProductModule } from './product/product.module';
import { PromoModule } from './promo/promo.module';
import { SaleModule } from './sale/sale.module';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    wheelSpeed: 0.3
};

@NgModule({
    declarations: [DashboardComponent, TestDirectiveComponent],
    imports: [
        ReactiveFormsModule,
        NgbAlertModule,
        CommonModule,
        FeatureRoutingModule,
        PerfectScrollbarModule,
        FormsModule,
        UserModule,
        DataTablesModule,
        FormsModule,
        CustomerModule,
        ProductModule,
        PromoModule,
        SaleModule,
        NgbModule
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ]
})
export class FeatureModule { }
