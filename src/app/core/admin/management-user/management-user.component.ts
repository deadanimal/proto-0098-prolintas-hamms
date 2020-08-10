import {
  Component,
  OnInit,
  OnDestroy,
  NgZone,
  TemplateRef,
} from "@angular/core";
// import { User } from 'src/assets/mock/admin-user/users.model'
// import { MocksService } from 'src/app/shared/services/mocks/mocks.service';

import * as moment from "moment";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
am4core.useTheme(am4themes_animated);

import swal from "sweetalert2";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";

import { User } from "src/app/shared/services/users/users.model";
import { UsersService } from "src/app/shared/services/users/users.service";

import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-management-user",
  templateUrl: "./management-user.component.html",
  styleUrls: ["./management-user.component.scss"],
})
export class ManagementUserComponent implements OnInit, OnDestroy {
  // Table
  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: User[] = [];
  SelectionType = SelectionType;

  listUsers: any = [
    {
      name: "Mariam",
      email: "mariam@email.com.my",
      username: "mariam231",
      usertype: "Admin",
      created_at: "2019-07-27T01:07:14Z",
    },
    {
      name: "Zainal",
      email: "Zainal@email.com.my",
      username: "Zainal999",
      usertype: "Admin",
      created_at: "2019-07-27T01:07:14Z",
    },
    {
      name: "Kumar",
      email: "Kumar@email.com.my",
      username: "KumarOne",
      usertype: "User",
      created_at: "2019-07-27T01:07:14Z",
    },
  ];

  // Chart
  chart: any;
  chartJan: number = 0;
  chartFeb: number = 0;
  chartMar: number = 0;
  chartApr: number = 0;
  chartMay: number = 0;
  chartJun: number = 0;
  chartJul: number = 0;
  chartAug: number = 0;
  chartSep: number = 0;
  chartOct: number = 0;
  chartNov: number = 0;
  chartDec: number = 0;

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered",
  };

  // Data
  public datas: any = [];
  listuser: any;

  // Form
  registerForm: FormGroup;
  registerFormMessages = {
    name: [{ type: "required", message: "Name is required" }],
    email: [
      { type: "required", message: "Email is required" },
      { type: "email", message: "A valid email is required" },
    ],
  };

  constructor(
    private UserData: UsersService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private zone: NgZone,
    private http: HttpClient
  ) {
    // this.getData()
    this.UserData.getAll().subscribe((res) => {
      this.listuser = res;
      this.tableRows = [...res];
      console.log("list user = ", this.listuser);
      // this.listuser = this.tableRows.map((prop, key) => {
      //   // console.log("test =>", prop, key);
      //   return {
      //     ...prop,
      //     // id: key,
      //   };
      // });
      // console.log("Svc: ", this.listuser);
    });
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: new FormControl("", Validators.compose([Validators.required])),
      email: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.email])
      ),
    });
    this.getCharts();
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  // getData() {
  //   this.mockService.getAll('admin-user/users.data.json').subscribe(
  //     (res) => {
  //       // Success
  //       this.tableRows = [...res]
  //       this.tableTemp = this.tableRows.map((prop, key) => {
  //         return {
  //           ...prop,
  //           id: key
  //         };
  //       });
  //       // console.log('Svc: ', this.tableTemp)
  //       this.calculateCharts()
  //     },
  //     () => {
  //       // Unsuccess
  //     },
  //     () => {
  //       // After
  //       this.getCharts()
  //     }
  //   )
  // }

  getCharts() {
    this.zone.runOutsideAngular(() => {
      this.getChart();
    });
  }

  openModal(modalRef: TemplateRef<any>) {
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
    this.registerForm.reset();
  }

  confirm() {
    swal
      .fire({
        title: "Confirmation",
        text: "Are you sure to create this new user?",
        type: "info",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-info",
        confirmButtonText: "Confirm",
        showCancelButton: true,
        cancelButtonClass: "btn btn-danger",
        cancelButtonText: "Cancel",
      })
      .then((result) => {
        if (result.value) {
          this.register();
        }
      });
  }

  register() {
    swal
      .fire({
        title: "Success",
        text: "A new user has been created!",
        type: "success",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
        confirmButtonText: "Close",
      })
      .then((result) => {
        if (result.value) {
          this.modal.hide();
          this.registerForm.reset();
        }
      });
  }

  entriesChange($event) {
    this.tableEntries = $event.target.value;
  }

  filterTable($event) {
    let val = $event.target.value;
    this.tableTemp = this.tableRows.filter(function (d) {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }

  onSelect({ selected }) {
    this.tableSelected.splice(0, this.tableSelected.length);
    this.tableSelected.push(...selected);
  }

  onActivate(event) {
    this.tableActiveRow = event.row;
  }

  getChart() {
    let chart = am4core.create("chartUser", am4charts.XYChart);

    // Add data
    chart.data = [
      {
        month: "Jan",
        count: "110",
      },
      {
        month: "Feb",
        count: "120",
      },
      {
        month: "Mar",
        count: "112",
      },
      {
        month: "Apr",
        count: "109",
      },
      {
        month: "May",
        count: "120",
      },
      {
        month: "Jun",
        count: "132",
      },
      {
        month: "Jul",
        count: "123",
      },
      {
        month: "Aug",
        count: "134",
      },
      {
        month: "Sep",
        count: "137",
      },
      {
        month: "Oct",
        count: "128",
      },
      {
        month: "Nov",
        count: "125",
      },
      {
        month: "Dec",
        count: "119",
      },
    ];

    // Create axes

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "month";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    categoryAxis.renderer.labels.template.adapter.add("dy", function (
      dy,
      target
    ) {
      if (target.dataItem && target.dataItem.index && 2 == 2) {
        return dy + 25;
      }
      return dy;
    });

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "count";
    series.dataFields.categoryX = "month";
    series.name = "count";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = 0.8;

    let columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;

    this.chart = chart;
  }
}
