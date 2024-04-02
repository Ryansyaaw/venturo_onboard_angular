import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { CustomerService } from "../../services/customer.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtOptions: any;

  showLoading:boolean;
  listCustomer: any;
  titleModal: string;
  CustomerId: number;
  filter: {
    is_verifyed :'';
    name: '';
  };


  constructor(
    private CustomerService: CustomerService,
    private modalService: NgbModal
  ) {}

  setDefault() {
    this.filter = {
      name: '',
      is_verifyed : null
    };
  }

  ngOnInit(): void {
    this.setDefault();
    this.getCustomer();
  }
  

  getCustomer() {
    this.dtOptions = {
      serverSide: true,
      processing: true,
      ordering: false,
      pageLength: 25,
      ajax: (dtParams: any, callback) => {
        const params = {
          ...this.filter,
          per_page: dtParams.length,
          page: dtParams.start / dtParams.length + 1,
        };

        this.CustomerService.getCustomers(params).subscribe(
          (res: any) => {
            const { list, meta } = res.data;

            let number = dtParams.start + 1;
            list.forEach((val) => (val.no = number++));
            this.listCustomer = list;
           
            callback({
              recordsTotal: meta.total,
              recordsFiltered: meta.total,
              data: [],
            });
          },
          (err: any) => {}
        );
      },
    };
  }

  reloadDataTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

  createCustomer(modalId) {
    this.titleModal = "Tambah Customer";
    this.CustomerId = 0;
    this.modalService.open(modalId, { size: "lg", backdrop: "static" });
  }

  updateCustomer(modalId, Customer) {
    this.titleModal = "Edit Customer: " + Customer.name;
    this.CustomerId = Customer.id;
    this.modalService.open(modalId, { size: "lg", backdrop: "static" });
  }

  deleteCustomer(CustomerId) {
    Swal.fire({
      title: "Apakah kamu yakin ?",
      text: "Customer ini tidak dapat login setelah kamu menghapus datanya",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#34c38f",
      cancelButtonColor: "#f46a6a",
      confirmButtonText: "Ya, Hapus data ini !",
    }).then((result) => {
      if (!result.value) return false;

      this.CustomerService.deleteCustomer(CustomerId).subscribe((res: any) => {
        this.reloadDataTable();
      });
    });
  }
}
