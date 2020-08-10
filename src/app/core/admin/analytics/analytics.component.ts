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
import { tileLayer, latLng, marker, icon } from "leaflet";
import { BsDropdownConfig } from "ngx-bootstrap/dropdown";
import { TranslateService } from "@ngx-translate/core";

// import { Bill } from "src/app/shared/services/bill/bill.model";
// import { BillService } from "src/app/shared/services/bill/bill.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

declare var tableau: any;

@Component({
  selector: "app-analytics",
  templateUrl: "./analytics.component.html",
  styleUrls: ["./analytics.component.scss"],
})
export class AnalyticsComponent implements OnInit, OnDestroy {
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

  // Data
  public datas: any = [];
  listBill: any;

  // Table
  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  // tableRows: Bill[] = [];
  SelectionType = SelectionType;
  listBillPresent: any = [
    {
      lang: "English",
      curr: "Ringgit Malaysia (RM)",
      acc: "1231231",
      total: "RM120.50",
      created_at: "2019-07-27T01:07:14Z",
    },
    {
      lang: "Bahasa Malaysia",
      curr: "Ringgit Malaysia (RM)",
      acc: "1231231",
      total: "RM120.47",
      created_at: "2019-07-27T01:07:14Z",
    },
    {
      lang: "English",
      curr: "Singapore Dollar (SGD)",
      acc: "1231231",
      total: "SGD120.82",
      created_at: "2019-07-27T01:07:14Z",
    },
  ];

  listAnalytic: any = [
    {
      anomalies: "High Usage In short time",
      action: "Change WIFI password",
    },
    {
      anomalies: "High Number of calls",
      action: "Use free internet calls",
    },
  ];
  vizOne: any;
  vizTwo: any;

  constructor(
    private mockService: MocksService,
    private notifyService: NotifyService,
    private zone: NgZone,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private loadingBar: LoadingBarService,
    private router: Router,
    private _route: ActivatedRoute,
    public translate: TranslateService // private BillData: BillService
  ) {}

  ngOnInit() {
    // this.getCharts();
    // this.getChart3(); // barchart
    this.getChartTrendYear();
    this.getChart10();
    this.getChart11();
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

  // genReport() {
  //   this.BillData.generateReport().subscribe(
  //     (res) => {
  //       console.log("qwe", res.report[0].url);
  //       console.log("asdas", res.report);
  //       window.open(res.report[0].url, "_blank");
  //       // Success
  //       // this.isLoading = false
  //       // this.successMessage();
  //     },
  //     () => {
  //       // Failed
  //       // this.isLoading = false
  //       // this.successMessage();
  //     },
  //     () => {
  //       // After
  //       // this.notifyService.openToastr("Success", "Welcome back");
  //       // this.navigateHomePage();
  //     }
  //   );
  // }

  changeChart(value) {
    console.log(value);
    if (value == "2") {
      this.getChartTrendYear(); // Yearly
    } else if (value == "3") {
      this.getChartTrendMonth(); // Monthly
    } else if (value == "4") {
      this.getChartTrendWeek(); // Weekly
    } else if (value == "5") {
      this.getChartTrendDay(); // daily
    } else {
      this.getChartTrendYear(); // yearly
    }
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
    this.modal = this.modalService.show(
      modalRef,
      Object.assign({}, { class: "gray modal-xl" })
    );
    this.getChart3();
    this.getChart8();
    this.getChart9();
    // this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
    // this.editActionForm.reset();
  }

  navigatePage(path: String) {
    // let qq = "db17a36a-1da6-4919-9746-dfed8802ec9d";
    console.log(path);
    if (path == "/admin//utility/Actions") {
      return this.router.navigate([path]);
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

  confirm() {
    swal
      .fire({
        title: "Confirmation",
        text: "Are you sure to delete data?",
        type: "info",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-info",
        confirmButtonText: "Confirm",
        showCancelButton: true,
        cancelButtonClass: "btn btn-danger",
        cancelButtonText: "Cancel",
      })
      .then((task) => {
        // if (result.value) {
        this.successAlert("delete data");
        // }
      });
  }

  entriesChange($event) {
    this.tableEntries = $event.target.value;
  }

  // filterTable($event) {
  //   let val = $event.target.value;
  //   this.tableTemp = this.tableRows.filter(function (d) {
  //     for (var key in d) {
  //       if (d[key].toLowerCase().indexOf(val) !== -1) {
  //         return true;
  //       }
  //     }
  //     return false;
  //   });
  // }

  onSelect({ selected }) {
    this.tableSelected.splice(0, this.tableSelected.length);
    this.tableSelected.push(...selected);
  }

  onActivate(event) {
    this.tableActiveRow = event.row;
  }

  // getCharts() {
  //   this.zone.runOutsideAngular(() => {
  //     // this.getChart();
  //     // this.getChart1();
  //     // this.getChart2();
  //     this.getChart3(); // bar chart
  //     this.getChart4(); // line
  //     // this.getChart5();
  //     this.getChart6(); // pie chart
  //   });
  // }

  getChart3() {
    // chatt petak warna warni
    let chart = am4core.create("chartBillCustBillAnal3", am4charts.XYChart);
    // chart.scrollbarX = new am4core.Scrollbar();

    // Add data
    chart.data = [
      {
        country: "May",
        visits: 1122,
      },
      {
        country: "Jun",
        visits: 1114,
      },
      {
        country: "July",
        visits: 984,
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
    // categoryAxis.renderer.minHeight = 110;

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

    // this.chart2 = chart;
  }

  getChart4() {
    // chart 2 line
    // let chart = am4core.create("chartReceipt", am4charts.XYChart);
    let chart = am4core.create("chartBillCustBillAnal", am4charts.XYChart);

    // Add data
    chart.data = [
      {
        month: "Jan",
        active: 1,
        inactive: 5,
      },
      {
        month: "Feb",
        active: 3,
        inactive: 2,
      },
      {
        month: "Mar",
        active: 5,
        inactive: 4,
      },
      {
        month: "Apr",
        active: 3,
        inactive: 3,
      },
      {
        month: "May",
        active: 6,
        inactive: 5,
      },
      {
        month: "Jun",
        active: 2,
        inactive: 4,
      },
      {
        month: "Jul",
        active: 4,
        inactive: 3,
      },
      {
        month: "Aug",
        active: 6,
        inactive: 5,
      },
      {
        month: "Sep",
        active: 5,
        inactive: 4,
      },
      {
        month: "Oct",
        active: 5,
        inactive: 5,
      },
      {
        month: "Nov",
        active: 4,
        inactive: 5,
      },
      {
        month: "Dec",
        active: 5,
        inactive: 6,
      },
    ];
    // Create category axis
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "month";

    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 110;
    // categoryAxis.renderer.opposite = true;

    // Create value axis
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    // valueAxis.renderer.inversed = true;
    valueAxis.title.text = "File";
    valueAxis.renderer.minLabelPosition = 0.01;

    // Create series
    let series1 = chart.series.push(new am4charts.LineSeries());
    series1.dataFields.valueY = "active";
    series1.dataFields.categoryX = "month";
    series1.name = "Active";
    series1.strokeWidth = 3;
    series1.bullets.push(new am4charts.CircleBullet());
    series1.tooltipText = "Amount {name} in {categoryX}: {valueY}";
    series1.legendSettings.valueText = "{valueY}";
    series1.visible = false;

    let series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.valueY = "inactive";
    series2.dataFields.categoryX = "month";
    series2.name = "Inactive";
    series2.strokeWidth = 3;
    series2.bullets.push(new am4charts.CircleBullet());
    series2.tooltipText = "Amount {name} in {categoryX}: {valueY}";
    series2.legendSettings.valueText = "{valueY}";

    // Add chart cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "zoomY";

    // Add legend
    chart.legend = new am4charts.Legend();
  }

  getChart5() {
    // chart bar 2 line
    // let chart = am4core.create("chartReceipt", am4charts.XYChart);
    let chart = am4core.create("chartBillCustBillAnal5", am4charts.XYChart);
    chart.colors.step = 2;

    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";
    chart.legend.paddingBottom = 20;
    chart.legend.labels.template.maxWidth = 95;

    let xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    xAxis.dataFields.category = "category";
    xAxis.renderer.cellStartLocation = 0.1;
    xAxis.renderer.cellEndLocation = 0.9;
    xAxis.renderer.grid.template.location = 0;

    let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;

    function createSeries(value, name) {
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = value;
      series.dataFields.categoryX = "category";
      series.name = name;

      series.events.on("hidden", arrangeColumns);
      series.events.on("shown", arrangeColumns);

      let bullet = series.bullets.push(new am4charts.LabelBullet());
      bullet.interactionsEnabled = false;
      bullet.dy = 30;
      bullet.label.text = "{valueY}";
      bullet.label.fill = am4core.color("#ffffff");

      return series;
    }

    chart.data = [
      {
        category: "Jan",
        first: 40,
        second: 55,
        third: 35,
      },
      {
        category: "Feb",
        first: 30,
        second: 78,
        third: 54,
      },
      {
        category: "Mar",
        first: 27,
        second: 40,
        third: 43,
      },
      {
        category: "Apr",
        first: 50,
        second: 33,
        third: 43,
      },
      {
        category: "May",
        first: 55,
        second: 43,
        third: 37,
      },
      {
        category: "Jun",
        first: 60,
        second: 53,
        third: 43,
      },
      {
        category: "Jul",
        first: 70,
        second: 57,
        third: 50,
      },
    ];

    createSeries("first", "Motorcycle");
    createSeries("second", "Car");
    createSeries("third", "Bicycle");

    function arrangeColumns() {
      let series = chart.series.getIndex(0);

      let w =
        1 -
        xAxis.renderer.cellStartLocation -
        (1 - xAxis.renderer.cellEndLocation);
      if (series.dataItems.length > 1) {
        let x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
        let x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
        let delta = ((x1 - x0) / chart.series.length) * w;
        if (am4core.isNumber(delta)) {
          let middle = chart.series.length / 2;

          let newIndex = 0;
          chart.series.each(function (series) {
            if (!series.isHidden && !series.isHiding) {
              series.dummyData = newIndex;
              newIndex++;
            } else {
              series.dummyData = chart.series.indexOf(series);
            }
          });
          let visibleCount = newIndex;
          let newMiddle = visibleCount / 2;

          chart.series.each(function (series) {
            let trueIndex = chart.series.indexOf(series);
            let newIndex = series.dummyData;

            let dx = (newIndex - trueIndex + middle - newMiddle) * delta;

            series.animate(
              { property: "dx", to: dx },
              series.interpolationDuration,
              series.interpolationEasing
            );
            series.bulletsContainer.animate(
              { property: "dx", to: dx },
              series.interpolationDuration,
              series.interpolationEasing
            );
          });
        }
      }
    }
  }

  getChart6() {
    // pie chart
    // let chart = am4core.create("chartReceipt", am4charts.XYChart);
    let chart = am4core.create("chartBillCustBillAnal6", am4charts.PieChart);

    // Add data
    chart.data = [
      {
        label: "Jan",
        amount: 3025,
      },
      {
        label: "Feb",
        amount: 1882,
      },
      {
        label: "Mar",
        amount: 1809,
      },
      {
        label: "Apr",
        amount: 1322,
      },
      {
        label: "May",
        amount: 1122,
      },
      {
        label: "Jun",
        amount: 1114,
      },
      {
        label: "July",
        amount: 984,
      },
      {
        label: "Aug",
        amount: 711,
      },
      {
        label: "Sep",
        amount: 665,
      },
      {
        label: "Oct",
        amount: 580,
      },
      {
        label: "Nov",
        amount: 443,
      },
      {
        label: "Dec",
        amount: 441,
      },
    ];

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "amount";
    pieSeries.dataFields.category = "label";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    chart.hiddenState.properties.radius = am4core.percent(0);
  }

  getChartTrendYear() {
    // yearly chart lind with trend
    let chart = am4core.create("chartBillCustBillAnal", am4charts.XYChart);

    // Export
    chart.exporting.menu = new am4core.ExportMenu();

    // Data for both series
    let data = [
      {
        year: "2015",
        income: 23.5,
        expenses: 21.1,
      },
      {
        year: "2016",
        income: 26.2,
        expenses: 30.5,
      },
      {
        year: "2017",
        income: 30.1,
        expenses: 34.9,
      },
      {
        year: "2018",
        income: 29.5,
        expenses: 31.1,
      },
      {
        year: "2019",
        income: 30.6,
        expenses: 28.2,
        lineDash: "5,5",
      },
      {
        year: "2020",
        income: 34.1,
        expenses: 32.9,
        strokeWidth: 1,
        columnDash: "5,5",
        fillOpacity: 0.2,
        additional: "(projection)",
      },
    ];

    /* Create axes */
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.renderer.minGridDistance = 30;

    /* Create value axis */
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    /* Create series */
    let columnSeries = chart.series.push(new am4charts.ColumnSeries());
    columnSeries.name = "Income";
    columnSeries.dataFields.valueY = "income";
    columnSeries.dataFields.categoryX = "year";

    columnSeries.columns.template.tooltipText =
      "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]";
    columnSeries.columns.template.propertyFields.fillOpacity = "fillOpacity";
    columnSeries.columns.template.propertyFields.stroke = "stroke";
    columnSeries.columns.template.propertyFields.strokeWidth = "strokeWidth";
    columnSeries.columns.template.propertyFields.strokeDasharray = "columnDash";
    columnSeries.tooltip.label.textAlign = "middle";

    let lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.name = "Expenses";
    lineSeries.dataFields.valueY = "expenses";
    lineSeries.dataFields.categoryX = "year";

    lineSeries.stroke = am4core.color("#fdd400");
    lineSeries.strokeWidth = 3;
    lineSeries.propertyFields.strokeDasharray = "lineDash";
    lineSeries.tooltip.label.textAlign = "middle";

    let bullet = lineSeries.bullets.push(new am4charts.Bullet());
    bullet.fill = am4core.color("#fdd400"); // tooltips grab fill from parent by default
    bullet.tooltipText =
      "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]";
    let circle = bullet.createChild(am4core.Circle);
    circle.radius = 4;
    circle.fill = am4core.color("#fff");
    circle.strokeWidth = 3;

    chart.data = data;
  }

  getChartTrendMonth() {
    // yearly chart lind with trend
    let chart = am4core.create("chartBillCustBillAnal", am4charts.XYChart);

    // Export
    chart.exporting.menu = new am4core.ExportMenu();

    // Data for both series
    let data = [
      {
        year: "Jan",
        income: 23.5,
        expenses: 21.1,
      },
      {
        year: "Feb",
        income: 23.5,
        expenses: 21.1,
      },
      {
        year: "Mar",
        income: 26.2,
        expenses: 30.5,
      },
      {
        year: "Apr",
        income: 30.1,
        expenses: 34.9,
      },
      {
        year: "May",
        income: 29.5,
        expenses: 31.1,
      },
      {
        year: "Jun",
        income: 30.6,
        expenses: 28.2,
        lineDash: "5,5",
      },
      {
        year: "Jul",
        income: 34.1,
        expenses: 32.9,
        strokeWidth: 1,
        columnDash: "5,5",
        fillOpacity: 0.2,
        additional: "(projection)",
      },
    ];

    /* Create axes */
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.renderer.minGridDistance = 30;

    /* Create value axis */
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    /* Create series */
    let columnSeries = chart.series.push(new am4charts.ColumnSeries());
    columnSeries.name = "Income";
    columnSeries.dataFields.valueY = "income";
    columnSeries.dataFields.categoryX = "year";

    columnSeries.columns.template.tooltipText =
      "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]";
    columnSeries.columns.template.propertyFields.fillOpacity = "fillOpacity";
    columnSeries.columns.template.propertyFields.stroke = "stroke";
    columnSeries.columns.template.propertyFields.strokeWidth = "strokeWidth";
    columnSeries.columns.template.propertyFields.strokeDasharray = "columnDash";
    columnSeries.tooltip.label.textAlign = "middle";

    let lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.name = "Expenses";
    lineSeries.dataFields.valueY = "expenses";
    lineSeries.dataFields.categoryX = "year";

    lineSeries.stroke = am4core.color("#fdd400");
    lineSeries.strokeWidth = 3;
    lineSeries.propertyFields.strokeDasharray = "lineDash";
    lineSeries.tooltip.label.textAlign = "middle";

    let bullet = lineSeries.bullets.push(new am4charts.Bullet());
    bullet.fill = am4core.color("#fdd400"); // tooltips grab fill from parent by default
    bullet.tooltipText =
      "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]";
    let circle = bullet.createChild(am4core.Circle);
    circle.radius = 4;
    circle.fill = am4core.color("#fff");
    circle.strokeWidth = 3;

    chart.data = data;
  }

  getChartTrendWeek() {
    // yearly chart lind with trend
    let chart = am4core.create("chartBillCustBillAnal", am4charts.XYChart);

    // Export
    chart.exporting.menu = new am4core.ExportMenu();

    // Data for both series
    let data = [
      {
        year: "Week 1",
        income: 23.5,
        expenses: 21.1,
      },
      {
        year: "Week 2",
        income: 26.2,
        expenses: 30.5,
      },
      {
        year: "Week 3",
        income: 30.1,
        expenses: 34.9,
      },
      {
        year: "Week 4",
        income: 29.5,
        expenses: 31.1,
      },
      {
        year: "Week 5",
        income: 30.6,
        expenses: 28.2,
        lineDash: "5,5",
      },
      {
        year: "Week 6",
        income: 34.1,
        expenses: 32.9,
        strokeWidth: 1,
        columnDash: "5,5",
        fillOpacity: 0.2,
        additional: "(projection)",
      },
    ];

    /* Create axes */
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.renderer.minGridDistance = 30;

    /* Create value axis */
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    /* Create series */
    let columnSeries = chart.series.push(new am4charts.ColumnSeries());
    columnSeries.name = "Income";
    columnSeries.dataFields.valueY = "income";
    columnSeries.dataFields.categoryX = "year";

    columnSeries.columns.template.tooltipText =
      "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]";
    columnSeries.columns.template.propertyFields.fillOpacity = "fillOpacity";
    columnSeries.columns.template.propertyFields.stroke = "stroke";
    columnSeries.columns.template.propertyFields.strokeWidth = "strokeWidth";
    columnSeries.columns.template.propertyFields.strokeDasharray = "columnDash";
    columnSeries.tooltip.label.textAlign = "middle";

    let lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.name = "Expenses";
    lineSeries.dataFields.valueY = "expenses";
    lineSeries.dataFields.categoryX = "year";

    lineSeries.stroke = am4core.color("#fdd400");
    lineSeries.strokeWidth = 3;
    lineSeries.propertyFields.strokeDasharray = "lineDash";
    lineSeries.tooltip.label.textAlign = "middle";

    let bullet = lineSeries.bullets.push(new am4charts.Bullet());
    bullet.fill = am4core.color("#fdd400"); // tooltips grab fill from parent by default
    bullet.tooltipText =
      "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]";
    let circle = bullet.createChild(am4core.Circle);
    circle.radius = 4;
    circle.fill = am4core.color("#fff");
    circle.strokeWidth = 3;

    chart.data = data;
  }

  getChartTrendDay() {
    // yearly chart lind with trend
    let chart = am4core.create("chartBillCustBillAnal", am4charts.XYChart);

    // Export
    chart.exporting.menu = new am4core.ExportMenu();

    // Data for both series
    let data = [
      {
        year: "Sun",
        income: 23.5,
        expenses: 21.1,
      },
      {
        year: "Mon",
        income: 26.2,
        expenses: 30.5,
      },
      {
        year: "Tue",
        income: 30.1,
        expenses: 34.9,
      },
      {
        year: "Wed",
        income: 29.5,
        expenses: 31.1,
      },
      {
        year: "Thu",
        income: 30.6,
        expenses: 28.2,
        lineDash: "5,5",
      },
      {
        year: "Fri",
        income: 30.6,
        expenses: 28.2,
        lineDash: "6,6",
      },
      {
        year: "Sat",
        income: 34.1,
        expenses: 32.9,
        strokeWidth: 1,
        columnDash: "5,5",
        fillOpacity: 0.2,
        additional: "(projection)",
      },
    ];

    /* Create axes */
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.renderer.minGridDistance = 30;

    /* Create value axis */
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    /* Create series */
    let columnSeries = chart.series.push(new am4charts.ColumnSeries());
    columnSeries.name = "Income";
    columnSeries.dataFields.valueY = "income";
    columnSeries.dataFields.categoryX = "year";

    columnSeries.columns.template.tooltipText =
      "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]";
    columnSeries.columns.template.propertyFields.fillOpacity = "fillOpacity";
    columnSeries.columns.template.propertyFields.stroke = "stroke";
    columnSeries.columns.template.propertyFields.strokeWidth = "strokeWidth";
    columnSeries.columns.template.propertyFields.strokeDasharray = "columnDash";
    columnSeries.tooltip.label.textAlign = "middle";

    let lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.name = "Expenses";
    lineSeries.dataFields.valueY = "expenses";
    lineSeries.dataFields.categoryX = "year";

    lineSeries.stroke = am4core.color("#fdd400");
    lineSeries.strokeWidth = 3;
    lineSeries.propertyFields.strokeDasharray = "lineDash";
    lineSeries.tooltip.label.textAlign = "middle";

    let bullet = lineSeries.bullets.push(new am4charts.Bullet());
    bullet.fill = am4core.color("#fdd400"); // tooltips grab fill from parent by default
    bullet.tooltipText =
      "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]";
    let circle = bullet.createChild(am4core.Circle);
    circle.radius = 4;
    circle.fill = am4core.color("#fff");
    circle.strokeWidth = 3;

    chart.data = data;
  }

  getChart8() {
    let chart = am4core.create("chartBillCustBillAnal8", am4charts.PieChart);

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "amaunt";
    pieSeries.dataFields.category = "label";

    // Let's cut a hole in our Pie chart the size of 30% the radius
    chart.innerRadius = am4core.percent(30);

    // Put a thick white border around each Slice
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    // change the cursor on hover to make it apparent the object can be interacted with
    pieSeries.slices.template.cursorOverStyle = [
      {
        property: "cursor",
        value: "pointer",
      },
    ];

    pieSeries.alignLabels = false;
    // pieSeries.labels.template.bent = true;
    pieSeries.labels.template.radius = 3;
    pieSeries.labels.template.padding(0, 0, 0, 0);

    pieSeries.ticks.template.disabled = true;

    // Create a base filter effect (as if it's not there) for the hover to return to
    let shadow = pieSeries.slices.template.filters.push(
      new am4core.DropShadowFilter()
    );
    shadow.opacity = 0;

    // Create hover state
    let hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

    // Slightly shift the shadow and make it more prominent on hover
    let hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter());
    hoverShadow.opacity = 0.7;
    hoverShadow.blur = 5;

    // Add a legend
    chart.legend = new am4charts.Legend();

    chart.data = [
      {
        label: "Subscription",
        amaunt: 50,
      },
      {
        label: "Other charges",
        amaunt: 65,
      },
    ];
  }

  getChart9() {
    let chart = am4core.create("chartBillCustBillAnal9", am4charts.PieChart);

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "amaunt";
    pieSeries.dataFields.category = "label";

    // Let's cut a hole in our Pie chart the size of 30% the radius
    chart.innerRadius = am4core.percent(30);

    // Put a thick white border around each Slice
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    // change the cursor on hover to make it apparent the object can be interacted with
    pieSeries.slices.template.cursorOverStyle = [
      {
        property: "cursor",
        value: "pointer",
      },
    ];

    pieSeries.alignLabels = false;
    // pieSeries.labels.template.bent = true;
    pieSeries.labels.template.radius = 3;
    pieSeries.labels.template.padding(0, 0, 0, 0);

    pieSeries.ticks.template.disabled = true;

    // Create a base filter effect (as if it's not there) for the hover to return to
    let shadow = pieSeries.slices.template.filters.push(
      new am4core.DropShadowFilter()
    );
    shadow.opacity = 0;

    // Create hover state
    let hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

    // Slightly shift the shadow and make it more prominent on hover
    let hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter());
    hoverShadow.opacity = 0.7;
    hoverShadow.blur = 5;

    // Add a legend
    chart.legend = new am4charts.Legend();

    chart.data = [
      {
        label: "Equipment",
        amaunt: 50,
      },
      {
        label: "Support",
        amaunt: 50,
      },
      {
        label: "Upgrade Charges",
        amaunt: 50,
      },
      {
        label: "Penalty",
        amaunt: 200,
      },
    ];
  }

  getChart10() {
    let chart = am4core.create("chartBillCustBillAnalAno1", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

    chart.data = [
      {
        country: "Normal",
        value1: 225,
        value2: 525,
        value3: 325,
      },
      {
        country: "Abnormal",
        value1: 725,
        value2: 290,
        value3: 595,
      },
      {
        country: "Normal",
        value1: 425,
        value2: 350,
        value3: 195,
      },
    ];

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.minGridDistance = 40;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    let series = chart.series.push(new am4charts.CurvedColumnSeries());
    series.dataFields.categoryX = "country";

    series.dataFields.valueY = "value1";
    series.tooltipText = "{valueY.value}";
    series.columns.template.strokeOpacity = 0;
    series.clustered = false;
    series.hiddenState.properties.visible = true; // this is added in case legend is used and first series is hidden.

    let series2 = chart.series.push(new am4charts.CurvedColumnSeries());
    series2.dataFields.categoryX = "country";

    series2.dataFields.valueY = "value2";
    series2.tooltipText = "{valueY.value}";
    series2.columns.template.strokeOpacity = 0;
    series2.clustered = false;

    let series3 = chart.series.push(new am4charts.CurvedColumnSeries());
    series3.dataFields.categoryX = "country";

    series3.dataFields.valueY = "value3";
    series3.tooltipText = "{valueY.value}";
    series3.columns.template.strokeOpacity = 0;
    series3.clustered = false;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.maxTooltipDistance = 0;

    chart.scrollbarX = new am4core.Scrollbar();

    series.dataItems.template.adapter.add("width", (width, target) => {
      return am4core.percent((target.valueY / valueAxis.max) * 100);
    });

    series2.dataItems.template.adapter.add("width", (width, target) => {
      return am4core.percent((target.valueY / valueAxis.max) * 100);
    });

    series3.dataItems.template.adapter.add("width", (width, target) => {
      return am4core.percent((target.valueY / valueAxis.max) * 100);
    });

    series.columns.template.events.on("parentset", function (event) {
      event.target.zIndex = valueAxis.max;
    });

    series2.columns.template.events.on("parentset", function (event) {
      event.target.parent = series.columnsContainer;
      event.target.zIndex = valueAxis.max;
    });

    series3.columns.template.events.on("parentset", function (event) {
      event.target.parent = series.columnsContainer;
      event.target.zIndex = valueAxis.max;
    });
  }

  getChart11() {
    let chart = am4core.create("chartBillCustBillAnalAno2", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

    chart.data = [
      {
        country: "Normal",
        value1: 125,
        value2: 525,
        value3: 325,
      },
      {
        country: "Abnormal",
        value1: 825,
        value2: 225,
        value3: 525,
      },
      {
        country: "Normal",
        value1: 525,
        value2: 325,
        value3: 225,
      },
    ];

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.minGridDistance = 40;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    let series = chart.series.push(new am4charts.CurvedColumnSeries());
    series.dataFields.categoryX = "country";

    series.dataFields.valueY = "value1";
    series.tooltipText = "{valueY.value}";
    series.columns.template.strokeOpacity = 0;
    series.clustered = false;
    series.hiddenState.properties.visible = true; // this is added in case legend is used and first series is hidden.

    let series2 = chart.series.push(new am4charts.CurvedColumnSeries());
    series2.dataFields.categoryX = "country";

    series2.dataFields.valueY = "value2";
    series2.tooltipText = "{valueY.value}";
    series2.columns.template.strokeOpacity = 0;
    series2.clustered = false;

    let series3 = chart.series.push(new am4charts.CurvedColumnSeries());
    series3.dataFields.categoryX = "country";

    series3.dataFields.valueY = "value3";
    series3.tooltipText = "{valueY.value}";
    series3.columns.template.strokeOpacity = 0;
    series3.clustered = false;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.maxTooltipDistance = 0;

    chart.scrollbarX = new am4core.Scrollbar();

    series.dataItems.template.adapter.add("width", (width, target) => {
      return am4core.percent((target.valueY / valueAxis.max) * 100);
    });

    series2.dataItems.template.adapter.add("width", (width, target) => {
      return am4core.percent((target.valueY / valueAxis.max) * 100);
    });

    series3.dataItems.template.adapter.add("width", (width, target) => {
      return am4core.percent((target.valueY / valueAxis.max) * 100);
    });

    series.columns.template.events.on("parentset", function (event) {
      event.target.zIndex = valueAxis.max;
    });

    series2.columns.template.events.on("parentset", function (event) {
      event.target.parent = series.columnsContainer;
      event.target.zIndex = valueAxis.max;
    });

    series3.columns.template.events.on("parentset", function (event) {
      event.target.parent = series.columnsContainer;
      event.target.zIndex = valueAxis.max;
    });
  }
}
