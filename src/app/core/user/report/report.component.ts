import { Component, OnInit, OnDestroy, NgZone, TemplateRef } from '@angular/core';
import { User } from 'src/assets/mock/admin-user/users.model'
import { MocksService } from 'src/app/shared/services/mocks/mocks.service';

import * as moment from 'moment';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit, OnDestroy {

  // Chart
  chart: any
  chart1: any
  chart2: any
  chart3: any
  dataChart: any[] = []
  dataChart2: any[] = []
  dataChart3: any[] = []

  // Datepicker
  bsDPConfig = { 
    isAnimated: true, 
    containerClass: 'theme-default'
  }

  constructor(
    private mockService: MocksService,
    private zone: NgZone
  ) {
    this.getData()
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose()
      }
      if (this.chart1) {
        this.chart1.dispose()
      }
      if (this.chart2) {
        this.chart2.dispose()
      }
      if (this.chart3) {
        this.chart3.dispose()
      }
    })
  }

  getData() {
    this.mockService.getAll('admin-report/report-data-1.json').subscribe(
      (res) => {
        // Success
        this.dataChart = res
      },
      () => {
        // Unsuccess
      },
      () => {
        // After
        this.mockService.getAll('admin-report/report-data-2.json').subscribe(
          (res) => {
            // Success
            this.dataChart2 = res
          },
          () => {
            // Unsuccess
          },
          () => {
            // After
            this.mockService.getAll('admin-report/report-data-3.json').subscribe(
              (res) => {
                // Success
                this.dataChart3 = res
              },
              () => {
                // Unsuccess
              },
              () => {
                // After
                this.getCharts()
              }
            )
          }
        )
      }
    )
  }

  getCharts() {
    this.zone.runOutsideAngular(() => {
      this.getChart()
      this.getChart1()
      this.getChart2()
      this.getChart3()
    })
  }

  getChart() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.paddingRight = 20;

    let data = this.dataChart

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

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.cursor.fullWidthLineX = true;
    chart.cursor.lineX.strokeWidth = 0;
    chart.cursor.lineX.fill = chart.colors.getIndex(2);
    chart.cursor.lineX.fillOpacity = 0.1;

    chart.scrollbarX = new am4core.Scrollbar();

    this.chart = chart
  }

  getChart1() {
    let chart = am4core.create("chartdiv1", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    let data = [];
    let open = 100;
    let close = 250;

    for (var i = 1; i < 120; i++) {
      open += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 4);
      close = Math.round(open + Math.random() * 5 + i / 5 - (Math.random() < 0.5 ? 1 : -1) * Math.random() * 2);
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

    this.chart1 = chart
  }

  getChart2() {
    let chart = am4core.create("chartdiv2", am4charts.XYChart);

    // Add data
    chart.data = this.dataChart2

    // Create axes
    let valueAxisX = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxisX.title.text = 'X Axis';
    valueAxisX.renderer.minGridDistance = 40;

    // Create value axis
    let valueAxisY = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxisY.title.text = 'Y Axis';

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
    trend.strokeWidth = 2
    trend.stroke = chart.colors.getIndex(0);
    trend.strokeOpacity = 0.7;
    trend.data = [
      { "value": 1, "value2": 2 },
      { "value": 12, "value2": 11 }
    ];

    let trend2 = chart.series.push(new am4charts.LineSeries());
    trend2.dataFields.valueY = "value2";
    trend2.dataFields.valueX = "value";
    trend2.strokeWidth = 2
    trend2.stroke = chart.colors.getIndex(3);
    trend2.strokeOpacity = 0.7;
    trend2.data = [
      { "value": 1, "value2": 1 },
      { "value": 12, "value2": 19 }
    ];

    //scrollbars
    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarY = new am4core.Scrollbar();

    this.chart2 = chart
  }

  getChart3() {
    let chart = am4core.create("chartdiv3", am4charts.XYChart);

    // Add data
    chart.data = this.dataChart3

    // Set input format for the dates
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.tooltipText = "{value}"
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

    this.chart3 = chart

  }

}
