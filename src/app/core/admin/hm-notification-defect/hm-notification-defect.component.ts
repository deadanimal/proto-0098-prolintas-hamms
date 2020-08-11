import {
  Component,
  OnInit,
  OnDestroy,
  NgZone,
  TemplateRef,
} from "@angular/core";
import { Audit } from "src/assets/mock/admin-audit/audit.model";
import { MocksService } from "src/app/shared/services/mocks/mocks.service";
// import { AuditData } from 'src/assets/mock/admin-audit/audit.data.json'
import * as moment from "moment";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

//
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import swal from "sweetalert2";
import { LoadingBarService } from "@ngx-loading-bar/core";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { NotifyService } from "src/app/shared/handler/notify/notify.service";
import { Router, ActivatedRoute } from "@angular/router";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-hm-notification-defect",
  templateUrl: "./hm-notification-defect.component.html",
  styleUrls: ["./hm-notification-defect.component.scss"],
})
export class HmNotificationDefectComponent implements OnInit, OnDestroy {
  // Chart
  chart: any;

  // Datepicker
  bsDPConfig = {
    isAnimated: true,
    containerClass: "theme-default",
  };

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered",
  };

  // Table
  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: Audit[] = [];
  SelectionType = SelectionType;
  listData: any = [
    {
      name: "Notification Defect",
      text: "This is a text message for Notification Defect.",
      type: "Bore Pile",
      status: "Active",
      created_at: "2019-07-27T01:07:14Z",
    },
    {
      name: "Notification Defect",
      text: "This is a text message for Notification Defect.",
      type: "Micro Pile",
      status: "Approved",
      created_at: "2019-07-27T01:07:14Z",
    },
    {
      name: "Notification Defect",
      text: "This is a text message for Notification Defect.",
      type: "Crosshead",
      status: "Approved",
      created_at: "2019-07-27T01:07:14Z",
    },
    {
      name: "Notification Defect",
      text: "This is a text message for Notification Defect.",
      type: "Beam",
      status: "Reviewed",
      created_at: "2019-07-27T01:07:14Z",
    },
    {
      name: "Notification Defect",
      text: "This is a text message for Notification Defect.",
      type: "Parapet",
      status: "Reviewed",
      created_at: "2019-07-27T01:07:14Z",
    },
    {
      name: "Notification Defect",
      text: "This is a text message for Notification Defect.",
      type: "Caisson Pile",
      status: "Approved",
      created_at: "2019-07-27T01:07:14Z",
    },
  ];

  constructor(
    private mockService: MocksService,
    private notifyService: NotifyService,
    private zone: NgZone,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private loadingBar: LoadingBarService,
    private router: Router,
    private _route: ActivatedRoute
  ) {
    // this.getData();
  }

  ngOnInit() {
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
  //   this.mockService.getAll(this.listReceipt).subscribe(
  //     (res) => {
  //       // Success
  //       this.tableRows = [...res];
  //       this.tableTemp = this.tableRows.map((prop, key) => {
  //         return {
  //           ...prop,
  //           id: key,
  //         };
  //       });
  //       console.log("Svc: ", this.tableTemp);
  //     },
  //     () => {
  //       // Unsuccess
  //     },
  //     () => {
  //       // After
  //       this.getChart();
  //     }
  //   );
  // }

  openModal(modalRef: TemplateRef<any>, row) {
    // if (row) {
    //   console.log(row);
    //   this.editActionForm.patchValue(row);
    // }
    // this.modal = this.modalService.show(
    //   modalRef,
    //   Object.assign({}, { class: "gray modal-xl" })
    // );
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
    // this.editActionForm.reset();
  }

  navigatePage(path: String, id) {
    // let qq = "db17a36a-1da6-4919-9746-dfed8802ec9d";
    console.log(id);
    console.log(path + "/" + id);
    if (path == "/admin//utility/Actions") {
      return this.router.navigate([path]);
    } else if (path == "/admin//utility/Action-detail") {
      return this.router.navigate([path, id]);
    }
  }

  successMessage() {
    let title = "Success";
    let message = "Create New Action";
    this.notifyService.openToastr(title, message);
  }

  successEditMessage() {
    let title = "Success";
    let message = "Edit Action";
    this.notifyService.openToastr(title, message);
  }

  errorAlert(task) {
    swal.fire({
      title: "Error",
      text: "Cannot " + task + " Action, Please Try Again!",
      type: "error",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-danger",
      confirmButtonText: "Close",
    });
  }

  successAlert(task) {
    swal.fire({
      title: "Success",
      text: "Successfully " + task,
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success",
      confirmButtonText: "Close",
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

  getCharts() {
    this.zone.runOutsideAngular(() => {
      this.getChart();
      // this.getChart2();
    });
  }

  getChart() {
    // let chart = am4core.create("chartScheduler", am4charts.XYChart);
    let chart = am4core.create("chartScheduler1", am4charts.XYChart3D);

    // Add data
    chart.data = [
      {
        country: "Jan",
        visits: 2025,
      },
      {
        country: "Feb",
        visits: 1882,
      },
      {
        country: "Mar",
        visits: 1809,
      },
      {
        country: "Apr",
        visits: 1322,
      },
      {
        country: "May",
        visits: 1122,
      },
      {
        country: "Jun",
        visits: 1114,
      },
      {
        country: "Jul",
        visits: 984,
      },
      {
        country: "Aug",
        visits: 711,
      },
      {
        country: "Sep",
        visits: 665,
      },
      {
        country: "Oct",
        visits: 580,
      },
      {
        country: "Nov",
        visits: 443,
      },
      {
        country: "Dec",
        visits: 441,
      },
    ];

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.renderer.labels.template.hideOversized = false;
    categoryAxis.renderer.minGridDistance = 20;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.tooltip.label.rotation = 270;
    categoryAxis.tooltip.label.horizontalCenter = "right";
    categoryAxis.tooltip.label.verticalCenter = "middle";

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    // valueAxis.title.text = "Countries";
    valueAxis.title.fontWeight = "bold";

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries3D());
    series.dataFields.valueY = "visits";
    series.dataFields.categoryX = "country";
    series.name = "Visits";
    series.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = 0.8;

    let columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;
    columnTemplate.stroke = am4core.color("#FFFFFF");

    columnTemplate.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    columnTemplate.adapter.add("stroke", function (stroke, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.strokeOpacity = 0;
    chart.cursor.lineY.strokeOpacity = 0;
  }

  getChart2() {
    let chart = am4core.create("chartScheduler2", am4charts.XYChart);

    // Add data
    chart.data = [
      {
        date: new Date(2018, 3, 20),
        value: 90,
      },
      {
        date: new Date(2018, 3, 21),
        value: 102,
      },
      {
        date: new Date(2018, 3, 22),
        value: 65,
      },
      {
        date: new Date(2018, 3, 23),
        value: 62,
      },
      {
        date: new Date(2018, 3, 24),
        value: 55,
      },
      {
        date: new Date(2018, 3, 25),
        value: 81,
      },
    ];

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());

    // Create value axis
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.valueY = "value";
    lineSeries.dataFields.dateX = "date";
    lineSeries.name = "Sales";
    lineSeries.strokeWidth = 3;

    // Add simple bullet
    let bullet = lineSeries.bullets.push(new am4charts.Bullet());
    let image = bullet.createChild(am4core.Image);
    image.href = "https://www.amcharts.com/lib/images/star.svg";
    image.width = 30;
    image.height = 30;
    image.horizontalCenter = "middle";
    image.verticalCenter = "middle";
  }
}
