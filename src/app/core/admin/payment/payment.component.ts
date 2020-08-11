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

declare var tableau: any;

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"],
})
export class PaymentComponent implements OnInit, OnDestroy {
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

  // tableau
  vizOne: any;
  vizTwo: any;

  // Table
  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows = [];
  SelectionType = SelectionType;
  listData: any = [
    {
      id: "WO0122334",
      name: "Work Order",
      text: "Defect 1",
      type: "Bore Pile",
      status: "AC",
      created_at: "2019-07-27T01:07:14Z",
    },
    {
      id: "WO0122334",
      name: "Work Order",
      text: "Defect 2.",
      type: "Micro Pile",
      status: "AP",
      created_at: "2019-07-27T01:07:14Z",
    },
    {
      id: "WO0122334",
      name: "Work Order",
      text: "Defect 3.",
      type: "Crosshead",
      status: "AP",
      created_at: "2019-07-27T01:07:14Z",
    },
    {
      id: "WO0122334",
      name: "Work Order",
      text: "Defect 4.",
      type: "Beam",
      status: "RE",
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
    // this.getCharts();
  }

  ngAfterViewInit() {
    this.initTableauOne();
    this.initTableauTwo();
  }

  initTableauOne() {
    var placeholderDiv = document.getElementById("vizContainerOne");
    // Replace this url with the url of your Tableau dashboard
    var url =
      "https://public.tableau.com/views/testing_15890862200980/DashboardMovement?:display_count=y&:origin=viz_share_link";
    var options = {
      hideTabs: true,
      width: "80%",
      height: "600px",
      onFirstInteractive: function () {
        // The viz is now ready and can be safely used.
        console.log("Run this code when the viz has finished loading.");
      },
    };
    // Creating a viz object and embed it in the container div.
    this.vizOne = new tableau.Viz(placeholderDiv, url, options);
  }

  initTableauTwo() {
    var placeholderDiv = document.getElementById("vizContainerTwo");
    // Replace this url with the url of your Tableau dashboard
    var url =
      "https://public.tableau.com/views/testing_15890862200980/DashboardStockValue?:display_count=y&:origin=viz_share_link";
    var options = {
      hideTabs: true,
      width: "80%",
      height: "600px",
      onFirstInteractive: function () {
        // The viz is now ready and can be safely used.
        console.log("Run this code when the viz has finished loading.");
      },
    };
    // Creating a viz object and embed it in the container div.
    this.vizTwo = new tableau.Viz(placeholderDiv, url, options);
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
      this.getChart2();
      this.getChart3();
    });
  }

  getChart() {
    // let chart = am4core.create("chartPayment", am4charts.XYChart);
    let chart = am4core.create("chartPayment1", am4charts.PieChart);

    // Add data
    chart.data = [
      {
        country: "Success",
        litres: 100,
      },
      {
        country: "Pending",
        litres: 210,
      },
      {
        country: "Cancelled",
        litres: 90,
      },
      {
        country: "Failed",
        litres: 50,
      },
    ];

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeOpacity = 1;

    /// change
    pieSeries.radius = 80;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    chart.hiddenState.properties.radius = am4core.percent(0);
  }

  getChart2() {
    // Create chart instance
    let chart = am4core.create("chartPayment2", am4charts.XYChart);
    chart.scrollbarX = new am4core.Scrollbar();

    // Add data
    chart.data = [
      {
        country: "Jan",
        visits: 3025,
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
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 110;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "visits";
    series.dataFields.categoryX = "country";
    series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
    series.columns.template.strokeWidth = 0;

    series.tooltip.pointerOrientation = "vertical";

    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.8;

    // on hover, make corner radiuses bigger
    let hoverState = series.columns.template.column.states.create("hover");
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    series.columns.template.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    // Cursor
    chart.cursor = new am4charts.XYCursor();
  }

  getChart3() {
    // Create chart instance
    let chart = am4core.create("chartPayment3", am4charts.XYChart);

    // Add data
    chart.data = [
      {
        year: "Jan",
        italy: 10000,
        germany: 50000,
        uk: 30000,
      },
      {
        year: "Feb",
        italy: 10000,
        germany: 20000,
        uk: 60000,
      },
      {
        year: "Mar",
        italy: 20000,
        germany: 30000,
        uk: 10000,
      },
      {
        year: "Apr",
        italy: 30000,
        germany: 40000,
        uk: 10000,
      },
      {
        year: "May",
        italy: 50000,
        germany: 10000,
        uk: 20000,
      },
      {
        year: "Jun",
        italy: 30000,
        germany: 20000,
        uk: 10000,
      },
      {
        year: "Jul",
        italy: 10000,
        germany: 20000,
        uk: 30000,
      },
      {
        year: "Aug",
        italy: 20000,
        germany: 10000,
        uk: 50000,
      },
    ];

    // Create category axis
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.renderer.opposite = true;

    // Create value axis
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inversed = true;
    valueAxis.title.text = "Place taken";
    valueAxis.renderer.minLabelPosition = 0.01;

    // Create series
    let series1 = chart.series.push(new am4charts.LineSeries());
    series1.dataFields.valueY = "italy";
    series1.dataFields.categoryX = "year";
    series1.name = "Budget";
    series1.bullets.push(new am4charts.CircleBullet());
    series1.tooltipText = "{name} in {categoryX}: {valueY}";
    series1.legendSettings.valueText = "{valueY}";
    series1.visible = false;

    let series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.valueY = "germany";
    series2.dataFields.categoryX = "year";
    series2.name = "Utilization";
    series2.bullets.push(new am4charts.CircleBullet());
    series2.tooltipText = "{name} in {categoryX}: {valueY}";
    series2.legendSettings.valueText = "{valueY}";

    // Add chart cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "zoomY";

    let hs1 = series1.segments.template.states.create("hover");
    hs1.properties.strokeWidth = 5;
    series1.segments.template.strokeWidth = 1;

    let hs2 = series2.segments.template.states.create("hover");
    hs2.properties.strokeWidth = 5;
    series2.segments.template.strokeWidth = 1;

    // Add legend
    chart.legend = new am4charts.Legend();
    // chart.legend.itemContainers.template.events.on("over", function (event) {
    //   let segments = event.target.dataItem.dataContext.segments;
    //   segments.each(function (segment) {
    //     segment.isHover = true;
    //   });
    // });

    // chart.legend.itemContainers.template.events.on("out", function (event) {
    //   let segments = event.target.dataItem.dataContext.segments;
    //   segments.each(function (segment) {
    //     segment.isHover = false;
    //   });
    // });
  }
}
