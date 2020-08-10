import {
  Component,
  OnInit,
  TemplateRef,
  ElementRef,
  ViewChild,
  OnDestroy,
  NgZone,
} from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_timeline from "@amcharts/amcharts4/plugins/timeline";
am4core.useTheme(am4themes_animated);

import { Router } from "@angular/router";
import noUiSlider from "nouislider";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import swal from "sweetalert2";

import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interaction from "@fullcalendar/interaction";

const mock = [
  {
    income_dis: "RM 5500.00",
    price_return: "RM 2000.00",
    income_return: "RM 1500.00",
    total_return: "RM 6000.00",
    fund_vol: "RM 5500.00",
    std_dev: "RM 2000.00",
    info_ratio: "RM 1500.00",
    sharp_ratio: "6000.00",
    created_at: "27-07-2019",
  },
  {
    income_dis: "RM 3500.00",
    price_return: "RM 1000.00",
    income_return: "RM 500.00",
    total_return: "RM 4000.00",
    fund_vol: "RM 3500.00",
    std_dev: "RM 1000.00",
    info_ratio: "RM 500.00",
    sharp_ratio: "4000.00",
    created_at: "27-07-2019",
  },
  {
    income_dis: "RM 7500.00",
    price_return: "RM 5000.00",
    income_return: "RM 2500.00",
    total_return: "RM 9000.00",
    fund_vol: "RM 7500.00",
    std_dev: "RM 5000.00",
    info_ratio: "RM 2500.00",
    sharp_ratio: "4000.00",
    created_at: "27-07-2019",
  },
];

@Component({
  selector: "app-asset-warranty",
  templateUrl: "./asset-warranty.component.html",
  styleUrls: ["./asset-warranty.component.scss"],
})
export class AssetWarrantyComponent implements OnInit, OnDestroy {
  chart;

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered",
  };

  // data
  // datas = mock;
  datas = [
    {
      name: "Bore Pile",
      desc: "Asset Description 1",
      amount: "RM 300000",
      status: "Active",
      start_date: "2019-07-27T01:07:14Z",
      end_date: "2019-12-27T01:07:14Z",
      created_at: "2019-07-27T01:07:14Z",
    },
    {
      name: "Micro Pile",
      desc: "Asset Description 2",
      amount: "RM 20000",
      status: "Active",
      start_date: "2019-07-27T01:07:14Z",
      end_date: "2019-12-27T01:07:14Z",
      created_at: "2019-07-27T01:07:14Z",
    },
    {
      name: "Crosshead",
      desc: "Asset Description 3",
      amount: "RM 780000",
      status: "Ended",
      start_date: "2019-07-27T01:07:14Z",
      end_date: "2019-11-27T01:07:14Z",
      created_at: "2019-07-27T01:07:14Z",
    },
  ];

  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  constructor(private zone: NgZone, private modalService: BsModalService) {}

  ngOnInit() {
    // this.initChart();
    this.initChart2();
    // this.initChart3();
    var c: any = document.getElementById("input-slider"),
      d = document.getElementById("input-slider-value");

    noUiSlider.create(c, {
      start: 100,
      connect: [true, false],
      //step: 1000,
      range: {
        min: 100,
        max: 500,
      },
    }),
      c.noUiSlider.on("update", function (a, b) {
        d.textContent = a[b];
      });

    var c1: any = document.getElementById("input-slider-range"),
      d1 = document.getElementById("input-slider-range-value-low"),
      e = document.getElementById("input-slider-range-value-high"),
      f = [d1, e];

    noUiSlider.create(c1, {
      start: [
        parseInt(d1.getAttribute("data-range-value-low")),
        parseInt(e.getAttribute("data-range-value-high")),
      ],
      connect: !0,
      range: {
        min: parseInt(c1.getAttribute("data-range-value-min")),
        max: parseInt(c1.getAttribute("data-range-value-max")),
      },
    }),
      c1.noUiSlider.on("update", function (a, b) {
        f[b].textContent = a[b];
      });
  }

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

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        console.log("Chart disposed");
        this.chart.dispose();
      }
    });
  }

  initChart() {
    let chart = am4core.create(
      "chartdivAW",
      am4plugins_timeline.SerpentineChart
    );
    chart.curveContainer.padding(20, 20, 20, 20);
    chart.levelCount = 8;
    chart.orientation = "horizontal";
    chart.fontSize = 11;

    let colorSet = new am4core.ColorSet();
    colorSet.saturation = 0.6;

    chart.data = [
      {
        category: "Routine #1",
        start: "2016-01-10",
        end: "2016-01-13",
        color: colorSet.getIndex(0),
        task: "Gathering requirements",
      },
      {
        category: "Routine #1",
        start: "2016-02-05",
        end: "2016-04-18",
        color: colorSet.getIndex(0),
        task: "Development",
      },
      {
        category: "Routine #2",
        start: "2016-01-08",
        end: "2016-01-10",
        color: colorSet.getIndex(5),
        task: "Gathering requirements",
      },
      {
        category: "Routine #2",
        start: "2016-01-12",
        end: "2016-01-15",
        color: colorSet.getIndex(5),
        task: "Producing specifications",
      },
      {
        category: "Routine #2",
        start: "2016-01-16",
        end: "2016-02-05",
        color: colorSet.getIndex(5),
        task: "Development",
      },
      {
        category: "Routine #2",
        start: "2016-02-10",
        end: "2016-02-18",
        color: colorSet.getIndex(5),
        task: "Testing and QA",
      },
      {
        category: "",
        task: "",
      },
      {
        category: "Routine #3",
        start: "2016-01-01",
        end: "2016-01-19",
        color: colorSet.getIndex(9),
        task: "Gathering requirements",
      },
      {
        category: "Routine #3",
        start: "2016-02-01",
        end: "2016-02-10",
        color: colorSet.getIndex(9),
        task: "Producing specifications",
      },
      {
        category: "Routine #3",
        start: "2016-03-10",
        end: "2016-04-15",
        color: colorSet.getIndex(9),
        task: "Development",
      },
      {
        category: "Routine #3",
        start: "2016-04-20",
        end: "2016-04-30",
        color: colorSet.getIndex(9),
        task: "Testing and QA",
      },
      {
        category: "Routine #4",
        start: "2016-01-15",
        end: "2016-02-12",
        color: colorSet.getIndex(15),
        task: "Gathering requirements",
      },
      {
        category: "Routine #4",
        start: "2016-02-25",
        end: "2016-03-10",
        color: colorSet.getIndex(15),
        task: "Development",
      },
      {
        category: "Routine #4",
        start: "2016-03-23",
        end: "2016-04-29",
        color: colorSet.getIndex(15),
        task: "Testing and QA",
      },
    ];

    chart.dateFormatter.dateFormat = "yyyy-MM-dd";
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis() as any);
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.labels.template.paddingRight = 25;
    categoryAxis.renderer.minGridDistance = 10;
    categoryAxis.renderer.innerRadius = -60;
    categoryAxis.renderer.radius = 60;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis() as any);
    dateAxis.renderer.minGridDistance = 70;
    dateAxis.baseInterval = { count: 1, timeUnit: "day" };

    dateAxis.renderer.tooltipLocation = 0;
    dateAxis.startLocation = -0.5;
    dateAxis.renderer.line.strokeDasharray = "1,4";
    dateAxis.renderer.line.strokeOpacity = 0.7;
    dateAxis.tooltip.background.fillOpacity = 0.2;
    dateAxis.tooltip.background.cornerRadius = 5;
    dateAxis.tooltip.label.fill = new am4core.InterfaceColorSet().getFor(
      "alternativeBackground"
    );
    dateAxis.tooltip.label.paddingTop = 7;

    let labelTemplate = dateAxis.renderer.labels.template;
    labelTemplate.verticalCenter = "middle";
    labelTemplate.fillOpacity = 0.7;
    labelTemplate.background.fill = new am4core.InterfaceColorSet().getFor(
      "background"
    );
    labelTemplate.background.fillOpacity = 1;
    labelTemplate.padding(7, 7, 7, 7);

    let categoryAxisLabelTemplate = categoryAxis.renderer.labels.template;
    categoryAxisLabelTemplate.horizontalCenter = "left";
    categoryAxisLabelTemplate.adapter.add("rotation", function (
      rotation,
      target
    ) {
      let position = dateAxis.valueToPosition(dateAxis.min);
      return dateAxis.renderer.positionToAngle(position) + 90;
    });

    let series1 = chart.series.push(
      new am4plugins_timeline.CurveColumnSeries()
    );
    series1.columns.template.height = am4core.percent(20);
    series1.columns.template.tooltipText =
      "{task}: [bold]{openDateX}[/] - [bold]{dateX}[/]";

    series1.dataFields.openDateX = "start";
    series1.dataFields.dateX = "end";
    series1.dataFields.categoryY = "category";
    series1.columns.template.propertyFields.fill = "color"; // get color from data
    series1.columns.template.propertyFields.stroke = "color";
    series1.columns.template.strokeOpacity = 0;

    let bullet = new am4charts.CircleBullet();
    series1.bullets.push(bullet);
    bullet.circle.radius = 3;
    bullet.circle.strokeOpacity = 0;
    bullet.propertyFields.fill = "color";
    bullet.locationX = 0;

    let bullet2 = new am4charts.CircleBullet();
    series1.bullets.push(bullet2);
    bullet2.circle.radius = 3;
    bullet2.circle.strokeOpacity = 0;
    bullet2.propertyFields.fill = "color";
    bullet2.locationX = 1;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.align = "center";
    chart.scrollbarX.width = am4core.percent(90);

    let cursor = new am4plugins_timeline.CurveCursor();
    chart.cursor = cursor;
    cursor.xAxis = dateAxis;
    cursor.yAxis = categoryAxis;
    cursor.lineY.disabled = true;
    cursor.lineX.strokeDasharray = "1,4";
    cursor.lineX.strokeOpacity = 1;

    dateAxis.renderer.tooltipLocation2 = 0;
    categoryAxis.cursorTooltipEnabled = false;

    // this.chart = chart
  }

  initChart2() {
    let chart = am4core.create("chartdivAW2", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.paddingRight = 30;
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm";

    let colorSet = new am4core.ColorSet();
    colorSet.saturation = 0.4;

    chart.data = [
      {
        name: "Bore Pile",
        fromDate: "2018-01-01 08:00",
        toDate: "2018-01-01 10:00",
        color: colorSet.getIndex(0).brighten(0),
      },
      {
        name: "Bore Pile",
        fromDate: "2018-01-01 12:00",
        toDate: "2018-01-01 15:00",
        color: colorSet.getIndex(0).brighten(0.4),
      },
      {
        name: "Bore Pile",
        fromDate: "2018-01-01 15:30",
        toDate: "2018-01-01 21:30",
        color: colorSet.getIndex(0).brighten(0.8),
      },

      {
        name: "Micro Pile",
        fromDate: "2018-01-01 09:00",
        toDate: "2018-01-01 12:00",
        color: colorSet.getIndex(2).brighten(0),
      },
      {
        name: "Micro Pile",
        fromDate: "2018-01-01 13:00",
        toDate: "2018-01-01 17:00",
        color: colorSet.getIndex(2).brighten(0.4),
      },

      {
        name: "Crosshead",
        fromDate: "2018-01-01 11:00",
        toDate: "2018-01-01 16:00",
        color: colorSet.getIndex(4).brighten(0),
      },
      {
        name: "Crosshead",
        fromDate: "2018-01-01 16:00",
        toDate: "2018-01-01 19:00",
        color: colorSet.getIndex(4).brighten(0.4),
      },

      {
        name: "Beam",
        fromDate: "2018-01-01 16:00",
        toDate: "2018-01-01 20:00",
        color: colorSet.getIndex(6).brighten(0),
      },
      {
        name: "Beam",
        fromDate: "2018-01-01 20:30",
        toDate: "2018-01-01 24:00",
        color: colorSet.getIndex(6).brighten(0.4),
      },

      {
        name: "Parapet",
        fromDate: "2018-01-01 13:00",
        toDate: "2018-01-01 24:00",
        color: colorSet.getIndex(8).brighten(0),
      },
    ];

    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "name";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.inversed = true;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.dateFormatter.dateFormat = "yyyy-MM-dd HH:mm";
    dateAxis.renderer.minGridDistance = 70;
    dateAxis.baseInterval = { count: 30, timeUnit: "minute" };
    dateAxis.max = new Date(2018, 0, 1, 24, 0, 0, 0).getTime();
    dateAxis.strictMinMax = true;
    dateAxis.renderer.tooltipLocation = 0;

    let series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.columns.template.width = am4core.percent(80);
    series1.columns.template.tooltipText = "{name}: {openDateX} - {dateX}";

    series1.dataFields.openDateX = "fromDate";
    series1.dataFields.dateX = "toDate";
    series1.dataFields.categoryY = "name";
    series1.columns.template.propertyFields.fill = "color"; // get color from data
    series1.columns.template.propertyFields.stroke = "color";
    series1.columns.template.strokeOpacity = 1;

    chart.scrollbarX = new am4core.Scrollbar();
  }

  initChart3() {
    let chart = am4core.create("chartdivAW3", am4charts.GaugeChart);
    chart.innerRadius = am4core.percent(82);

    /**
     * Normal axis
     */

    let axis = chart.xAxes.push(new am4charts.ValueAxis() as any);
    axis.min = 0;
    axis.max = 100;
    axis.strictMinMax = true;
    axis.renderer.radius = am4core.percent(80);
    axis.renderer.inside = true;
    axis.renderer.line.strokeOpacity = 1;
    axis.renderer.ticks.template.disabled = false;
    axis.renderer.ticks.template.strokeOpacity = 1;
    axis.renderer.ticks.template.length = 10;
    axis.renderer.grid.template.disabled = true;
    axis.renderer.labels.template.radius = 40;
    axis.renderer.labels.template.adapter.add("text", function (text) {
      return text + "%";
    });

    /**
     * Axis for ranges
     */

    let colorSet = new am4core.ColorSet();

    let axis2 = chart.xAxes.push(new am4charts.ValueAxis() as any);
    axis2.min = 0;
    axis2.max = 100;
    axis2.strictMinMax = true;
    axis2.renderer.labels.template.disabled = true;
    axis2.renderer.ticks.template.disabled = true;
    axis2.renderer.grid.template.disabled = true;

    let range0 = axis2.axisRanges.create();
    range0.value = 0;
    range0.endValue = 50;
    range0.axisFill.fillOpacity = 1;
    range0.axisFill.fill = colorSet.getIndex(0);

    let range1 = axis2.axisRanges.create();
    range1.value = 50;
    range1.endValue = 100;
    range1.axisFill.fillOpacity = 1;
    range1.axisFill.fill = colorSet.getIndex(2);

    /**
     * Label
     */

    let label = chart.radarContainer.createChild(am4core.Label);
    label.isMeasured = false;
    label.fontSize = 45;
    label.x = am4core.percent(50);
    label.y = am4core.percent(100);
    label.horizontalCenter = "middle";
    label.verticalCenter = "bottom";
    label.text = "50%";

    /**
     * Hand
     */

    let hand = chart.hands.push(new am4charts.ClockHand());
    hand.axis = axis2;
    hand.innerRadius = am4core.percent(20);
    hand.startWidth = 10;
    hand.pin.disabled = true;
    hand.value = 50;

    hand.events.on("propertychanged", function (ev) {
      range0.endValue = ev.target.value;
      range1.value = ev.target.value;
      label.text = axis2.positionToValue(hand.currentPosition).toFixed(1);
      axis2.invalidate();
    });

    setInterval(function () {
      let value = Math.round(Math.random() * 100);
      let animation = new am4core.Animation(
        hand,
        {
          property: "value",
          to: value,
        },
        1000,
        am4core.ease.cubicOut
      ).start();
    }, 2000);
  }
}
