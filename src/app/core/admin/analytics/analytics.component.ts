import {
  Component,
  OnInit,
  OnDestroy,
  NgZone,
  TemplateRef,
} from "@angular/core";
import { User } from "src/assets/mock/admin-user/users.model";
import { MocksService } from "src/app/shared/services/mocks/mocks.service";

import * as moment from "moment";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
am4core.useTheme(am4themes_animated);

@Component({
  selector: "app-analytics",
  templateUrl: "./analytics.component.html",
  styleUrls: ["./analytics.component.scss"],
})
export class AnalyticsComponent implements OnInit, OnDestroy {
  // Chart
  chart: any;
  chart1: any;
  chart2: any;
  chart3: any;
  dataChart: any[] = [];
  dataChart2: any[] = [];
  dataChart3: any[] = [];

  // Datepicker
  bsDPConfig = {
    isAnimated: true,
    containerClass: "theme-default",
  };

  constructor(private mockService: MocksService, private zone: NgZone) {
    this.getData();
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
      if (this.chart1) {
        this.chart1.dispose();
      }
      if (this.chart2) {
        this.chart2.dispose();
      }
      if (this.chart3) {
        this.chart3.dispose();
      }
    });
  }

  getData() {
    this.mockService.getAll("admin-report/report-data-1.json").subscribe(
      (res) => {
        // Success
        this.dataChart = res;
      },
      () => {
        // Unsuccess
      },
      () => {
        // After
        this.mockService.getAll("admin-report/report-data-2.json").subscribe(
          (res) => {
            // Success
            this.dataChart2 = res;
          },
          () => {
            // Unsuccess
          },
          () => {
            // After
            this.mockService
              .getAll("admin-report/report-data-3.json")
              .subscribe(
                (res) => {
                  // Success
                  this.dataChart3 = res;
                },
                () => {
                  // Unsuccess
                },
                () => {
                  // After
                  this.getCharts();
                }
              );
          }
        );
      }
    );
  }

  getCharts() {
    this.zone.runOutsideAngular(() => {
      // this.getChart();
      this.getChart1();
      this.getChart2();
      this.getChart3();
      this.getChart4();
      this.getChart5();
      // this.getChart6();
      this.getChart7();
    });
  }

  getChart() {
    let chart = am4core.create("chartdivanalytic", am4charts.XYChart);
    chart.paddingRight = 20;

    let data = this.dataChart;

    chart.data = data;
    chart.dateFormatter.inputDateFormat = "yyyy";

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;
    dateAxis.baseInterval = { timeUnit: "year", count: 2 };
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;

    let series = chart.series.push(new am4charts.StepLineSeries());
    series.dataFields.dateX = "year";
    series.dataFields.valueY = "amount";
    series.tooltipText = "{valueY.amount}";
    series.strokeWidth = 3;
    console.log("gastbdgagd", series.dataFields.valueY);

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.cursor.fullWidthLineX = true;
    chart.cursor.lineX.strokeWidth = 0;
    chart.cursor.lineX.fill = chart.colors.getIndex(2);
    chart.cursor.lineX.fillOpacity = 0.1;

    chart.scrollbarX = new am4core.Scrollbar();

    this.chart = chart;
  }

  getChart1() {
    let chart = am4core.create("chartdivanalytic1", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    let data = [];
    let open = 100;
    let close = 250;

    for (var i = 1; i < 120; i++) {
      open += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 4);
      close = Math.round(
        open +
          Math.random() * 5 +
          i / 5 -
          (Math.random() < 0.5 ? 1 : -1) * Math.random() * 2
      );
      data.push({ date: new Date(2018, 0, i), open: open, close: close });
    }

    chart.data = data;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.openValueY = "open";
    series.dataFields.valueY = "close";
    series.tooltipText = "open: {openValueY.value} close: {valueY.value}";
    series.sequencedInterpolation = true;
    series.fillOpacity = 0.3;
    series.defaultState.transitionDuration = 1000;
    series.tensionX = 0.8;

    let series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.dateX = "date";
    series2.dataFields.valueY = "open";
    series2.sequencedInterpolation = true;
    series2.defaultState.transitionDuration = 1500;
    series2.stroke = chart.colors.getIndex(6);
    series2.tensionX = 0.8;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.scrollbarX = new am4core.Scrollbar();

    this.chart1 = chart;
  }

  getChart2() {
    let chart = am4core.create("chartdivanalytic2", am4charts.XYChart);

    // Add data
    chart.data = this.dataChart2;

    // Create axes
    let valueAxisX = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxisX.title.text = "X Axis";
    valueAxisX.renderer.minGridDistance = 40;

    // Create value axis
    let valueAxisY = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxisY.title.text = "Y Axis";

    // Create series
    let lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.valueY = "ay";
    lineSeries.dataFields.valueX = "ax";
    lineSeries.strokeOpacity = 0;

    let lineSeries2 = chart.series.push(new am4charts.LineSeries());
    lineSeries2.dataFields.valueY = "by";
    lineSeries2.dataFields.valueX = "bx";
    lineSeries2.strokeOpacity = 0;

    // Add a bullet
    let bullet = lineSeries.bullets.push(new am4charts.Bullet());

    // Add a triangle to act as am arrow
    let arrow = bullet.createChild(am4core.Triangle);
    arrow.horizontalCenter = "middle";
    arrow.verticalCenter = "middle";
    arrow.strokeWidth = 0;
    arrow.fill = chart.colors.getIndex(0);
    arrow.direction = "top";
    arrow.width = 12;
    arrow.height = 12;

    // Add a bullet
    let bullet2 = lineSeries2.bullets.push(new am4charts.Bullet());

    // Add a triangle to act as am arrow
    let arrow2 = bullet2.createChild(am4core.Triangle);
    arrow2.horizontalCenter = "middle";
    arrow2.verticalCenter = "middle";
    arrow2.rotation = 180;
    arrow2.strokeWidth = 0;
    arrow2.fill = chart.colors.getIndex(3);
    arrow2.direction = "top";
    arrow2.width = 12;
    arrow2.height = 12;

    //add the trendlines
    let trend = chart.series.push(new am4charts.LineSeries());
    trend.dataFields.valueY = "value2";
    trend.dataFields.valueX = "value";
    trend.strokeWidth = 2;
    trend.stroke = chart.colors.getIndex(0);
    trend.strokeOpacity = 0.7;
    trend.data = [
      { value: 1, value2: 2 },
      { value: 12, value2: 11 },
    ];

    let trend2 = chart.series.push(new am4charts.LineSeries());
    trend2.dataFields.valueY = "value2";
    trend2.dataFields.valueX = "value";
    trend2.strokeWidth = 2;
    trend2.stroke = chart.colors.getIndex(3);
    trend2.strokeOpacity = 0.7;
    trend2.data = [
      { value: 1, value2: 1 },
      { value: 12, value2: 19 },
    ];

    //scrollbars
    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarY = new am4core.Scrollbar();

    this.chart2 = chart;
  }

  getChart3() {
    let chart = am4core.create("chartdivanalytic3", am4charts.XYChart);

    // Add data
    chart.data = this.dataChart3;

    // Set input format for the dates
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.tooltipText = "{value}";
    series.strokeWidth = 2;
    series.minBulletDistance = 15;

    // Drop-shaped tooltips
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.strokeOpacity = 0;
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.label.minWidth = 40;
    series.tooltip.label.minHeight = 40;
    series.tooltip.label.textAlign = "middle";
    series.tooltip.label.textValign = "middle";

    // Make bullets grow on hover
    let bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.strokeWidth = 2;
    bullet.circle.radius = 4;
    bullet.circle.fill = am4core.color("#fff");
    console.log("cdesde = ", valueAxis);
    // if(){

    // }

    let bullethover = bullet.states.create("hover");
    bullethover.properties.scale = 1.3;

    // Make a panning cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "panXY";
    chart.cursor.xAxis = dateAxis;
    chart.cursor.snapToSeries = series;

    // Create vertical scrollbar and place it before the value axis
    chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarY.parent = chart.leftAxesContainer;
    chart.scrollbarY.toBack();

    // Create a horizontal scrollbar with previe and place it underneath the date axis
    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;
    chart.scrollbarX.parent = chart.bottomAxesContainer;

    dateAxis.start = 0.79;
    dateAxis.keepSelection = true;

    this.chart3 = chart;
  }

  getChart4() {
    let chart = am4core.create("chartdivanalytic4", am4charts.XYChart);

    // Add data
    chart.data = generateChartData();

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "visits";
    series.dataFields.dateX = "date";
    series.strokeWidth = 1;
    series.minBulletDistance = 10;
    series.tooltipText = "{valueY}";
    series.fillOpacity = 0.1;
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.fillOpacity = 0.5;
    series.tooltip.label.padding(12, 12, 12, 12);

    let seriesRange = dateAxis.createSeriesRange(series);
    seriesRange.contents.strokeDasharray = "2,3";
    seriesRange.contents.stroke = chart.colors.getIndex(8);
    seriesRange.contents.strokeWidth = 1;

    let pattern = new am4core.LinePattern();
    pattern.rotation = -45;
    pattern.stroke = seriesRange.contents.stroke;
    pattern.width = 1000;
    pattern.height = 1000;
    pattern.gap = 6;
    seriesRange.contents.fill = pattern;
    seriesRange.contents.fillOpacity = 0.5;

    // Add scrollbar
    chart.scrollbarX = new am4core.Scrollbar();

    function generateChartData() {
      let chartData = [];
      let firstDate = new Date();
      firstDate.setDate(firstDate.getDate() - 200);
      let visits = 1200;
      for (var i = 0; i < 200; i++) {
        // we create date objects here. In your data, you can have date strings
        // and then set format of your dates using chart.dataDateFormat property,
        // however when possible, use date objects, as this will speed up chart rendering.
        let newDate = new Date(firstDate);
        newDate.setDate(newDate.getDate() + i);

        visits += Math.round(
          (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10
        );

        chartData.push({
          date: newDate,
          visits: visits,
        });
      }
      return chartData;
    }

    // add range
    let range = dateAxis.axisRanges.push(new am4charts.DateAxisDataItem());
    range.grid.stroke = chart.colors.getIndex(0);
    range.grid.strokeOpacity = 1;
    range.bullet = new am4core.ResizeButton();
    // range.bullet.background.fill = chart.colors.getIndex(0);
    // range.bullet.
    // range.bullet.background.states.copyFrom(
    //   chart.zoomOutButton.background.states
    // );
    range.bullet.minX = 0;
    range.bullet.adapter.add("minY", function (minY, target) {
      target.maxY = chart.plotContainer.maxHeight;
      target.maxX = chart.plotContainer.maxWidth;
      return chart.plotContainer.maxHeight;
    });

    range.bullet.events.on("dragged", function () {
      range.value = dateAxis.xToValue(range.bullet.pixelX);
      seriesRange.value = range.value;
    });

    let firstTime = chart.data[0].date.getTime();
    let lastTime = chart.data[chart.data.length - 1].date.getTime();
    let date = new Date(firstTime + (lastTime - firstTime) / 2);

    range.date = date;

    seriesRange.date = date;
    seriesRange.endDate = chart.data[chart.data.length - 1].date;
  }

  getChart5() {
    let chart = am4core.create("chartdivanalytic5", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0;

    chart.padding(0, 0, 0, 0);

    chart.zoomOutButton.disabled = true;

    let data = [];
    let visits = 10;
    let i = 0;

    for (i = 0; i <= 30; i++) {
      visits -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      data.push({ date: new Date().setSeconds(i - 30), value: visits });
    }

    chart.data = data;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 30;
    dateAxis.dateFormats.setKey("second", "ss");
    dateAxis.periodChangeDateFormats.setKey("second", "[bold]h:mm a");
    dateAxis.periodChangeDateFormats.setKey("minute", "[bold]h:mm a");
    dateAxis.periodChangeDateFormats.setKey("hour", "[bold]h:mm a");
    dateAxis.renderer.inside = true;
    dateAxis.renderer.axisFills.template.disabled = true;
    dateAxis.renderer.ticks.template.disabled = true;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.interpolationDuration = 500;
    valueAxis.rangeChangeDuration = 500;
    valueAxis.renderer.inside = true;
    valueAxis.renderer.minLabelPosition = 0.05;
    valueAxis.renderer.maxLabelPosition = 0.95;
    valueAxis.renderer.axisFills.template.disabled = true;
    valueAxis.renderer.ticks.template.disabled = true;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";
    series.interpolationDuration = 500;
    series.defaultState.transitionDuration = 0;
    series.tensionX = 0.8;

    chart.events.on("datavalidated", function () {
      dateAxis.zoom({ start: 1 / 15, end: 1.2 }, false, true);
    });

    dateAxis.interpolationDuration = 500;
    dateAxis.rangeChangeDuration = 500;

    document.addEventListener(
      "visibilitychange",
      function () {
        if (document.hidden) {
          if (interval) {
            clearInterval(interval);
          }
        } else {
          startInterval();
        }
      },
      false
    );

    // add data
    let interval;
    function startInterval() {
      interval = setInterval(function () {
        visits =
          visits +
          Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 5);
        let lastdataItem = series.dataItems.getIndex(
          series.dataItems.length - 1
        );
        chart.addData(
          {
            date: new Date(lastdataItem.dateX.getTime() + 1000),
            value: visits,
          },
          1
        );
      }, 1000);
    }

    startInterval();

    // all the below is optional, makes some fancy effects
    // gradient fill of the series
    series.fillOpacity = 1;
    let gradient = new am4core.LinearGradient();
    gradient.addColor(chart.colors.getIndex(0), 0.2);
    gradient.addColor(chart.colors.getIndex(0), 0);
    series.fill = gradient;

    // this makes date axis labels to fade out
    dateAxis.renderer.labels.template.adapter.add("fillOpacity", function (
      fillOpacity,
      target
    ) {
      let dataItem = target.dataItem;
      return dataItem.position;
    });

    // need to set this, otherwise fillOpacity is not changed and not set
    dateAxis.events.on("validated", function () {
      am4core.iter.each(dateAxis.renderer.labels.iterator(), function (label) {
        label.fillOpacity = label.fillOpacity;
      });
    });

    // this makes date axis labels which are at equal minutes to be rotated
    dateAxis.renderer.labels.template.adapter.add("rotation", function (
      rotation,
      target
    ) {
      let dataItem = target.dataItem;
      // if (
      //   dataItem.date &&
      //   dataItem.date.getTime() ==
      //     am4core.time
      //       .round(new Date(dataItem.date.getTime()), "minute")
      //       .getTime()
      // ) {
      //   target.verticalCenter = "middle";
      //   target.horizontalCenter = "left";
      //   return -90;
      // } else {
      target.verticalCenter = "bottom";
      target.horizontalCenter = "middle";
      return 0;
      // }
    });

    // bullet at the front of the line
    let bullet = series.createChild(am4charts.CircleBullet);
    bullet.circle.radius = 5;
    bullet.fillOpacity = 1;
    bullet.fill = chart.colors.getIndex(0);
    bullet.isMeasured = false;

    series.events.on("validated", function () {
      bullet.moveTo(series.dataItems.last.point);
      bullet.validatePosition();
    });
  }

  getChart6() {
    let chart = am4core.create("chartdivanalytic6", am4charts.XYChart);

    // Create daily series and related axes
    let dateAxis1 = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis1.renderer.grid.template.location = 0;
    dateAxis1.renderer.minGridDistance = 40;

    let valueAxis1 = chart.yAxes.push(new am4charts.ValueAxis());

    let series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.dataFields.valueY = "value";
    series1.dataFields.dateX = "date";
    series1.data = generateDailyData();
    series1.xAxis = dateAxis1;
    series1.yAxis = valueAxis1;
    series1.tooltipText = "{dateX}: [bold]{valueY}[/]";

    // Create hourly series and related axes
    let dateAxis2 = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis2.renderer.grid.template.location = 0;
    dateAxis2.renderer.minGridDistance = 40;
    dateAxis2.renderer.labels.template.disabled = true;
    dateAxis2.renderer.grid.template.disabled = true;
    dateAxis2.renderer.tooltip.disabled = true;

    let valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis2.renderer.opposite = true;
    valueAxis2.renderer.grid.template.disabled = true;
    valueAxis2.renderer.labels.template.disabled = true;
    valueAxis2.renderer.tooltip.disabled = true;

    let series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.valueY = "value";
    series2.dataFields.dateX = "date";
    series2.data = generateHourlyData();
    series2.xAxis = dateAxis2;
    series2.yAxis = valueAxis2;
    series2.strokeWidth = 3;
    series2.tooltipText =
      "{dateX.formatDate('yyyy-MM-dd hh:00')}: [bold]{valueY}[/]";

    // Add cursor
    chart.cursor = new am4charts.XYCursor();

    function generateDailyData() {
      let firstDate = new Date();
      firstDate.setDate(firstDate.getDate() - 10);
      firstDate.setHours(0, 0, 0, 0);
      let data = [];
      for (var i = 0; i < 10; i++) {
        let newDate = new Date(firstDate);
        newDate.setDate(newDate.getDate() + i);
        data.push({
          date: newDate,
          value: Math.round(Math.random() * 12) + 1,
        });
      }
      return data;
    }

    function generateHourlyData() {
      let firstDate = new Date();
      firstDate.setDate(firstDate.getDate() - 10);
      let data = [];
      let value = [];
      for (var i = 0; i < 10 * 24; i++) {
        let newDate = new Date(firstDate);
        newDate.setHours(newDate.getHours() + i);
        if (i == 0) {
          let value = Math.round(Math.random() * 10) + 1;
        } else {
          let value =
            Math.round(
              (data[data.length - 1].value / 100) *
                (90 + Math.round(Math.random() * 20)) *
                100
            ) / 100;
        }
        data.push({
          date: newDate,
          value: value,
        });
      }
      return data;
    }
  }

  getChart7() {
    let chart = am4core.create("chartdivanalytic7", am4charts.XYChart);

    let data = [];

    chart.data = [
      {
        year: "2014",
        income: 23.5,
        expenses: 21.1,
        lineColor: chart.colors.next(),
      },
      {
        year: "2015",
        income: 26.2,
        expenses: 30.5,
      },
      {
        year: "2016",
        income: 30.1,
        expenses: 34.9,
      },
      {
        year: "2017",
        income: 20.5,
        expenses: 23.1,
      },
      {
        year: "2018",
        income: 30.6,
        expenses: 28.2,
        lineColor: chart.colors.next(),
      },
      {
        year: "2019",
        income: 34.1,
        expenses: 31.9,
      },
      {
        year: "2020",
        income: 34.1,
        expenses: 31.9,
      },
      {
        year: "2021",
        income: 34.1,
        expenses: 31.9,
        lineColor: chart.colors.next(),
      },
      {
        year: "2022",
        income: 34.1,
        expenses: 31.9,
      },
      {
        year: "2023",
        income: 34.1,
        expenses: 31.9,
      },
      {
        year: "2024",
        income: 34.1,
        expenses: 31.9,
      },
    ];

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.ticks.template.disabled = true;
    categoryAxis.renderer.line.opacity = 0;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.minGridDistance = 40;
    categoryAxis.dataFields.category = "year";
    categoryAxis.startLocation = 0.4;
    categoryAxis.endLocation = 0.6;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.line.opacity = 0;
    valueAxis.renderer.ticks.template.disabled = true;
    valueAxis.min = 0;

    let lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.categoryX = "year";
    lineSeries.dataFields.valueY = "income";
    lineSeries.tooltipText = "income: {valueY.value}";
    lineSeries.fillOpacity = 0.5;
    lineSeries.strokeWidth = 3;
    lineSeries.propertyFields.stroke = "lineColor";
    lineSeries.propertyFields.fill = "lineColor";

    let bullet = lineSeries.bullets.push(new am4charts.CircleBullet());
    bullet.circle.radius = 6;
    bullet.circle.fill = am4core.color("#fff");
    bullet.circle.strokeWidth = 3;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "panX";
    chart.cursor.lineX.opacity = 0;
    chart.cursor.lineY.opacity = 0;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.parent = chart.bottomAxesContainer;
  }
}
