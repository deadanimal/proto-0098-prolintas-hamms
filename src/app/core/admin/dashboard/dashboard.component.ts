import { Component, OnInit, NgZone, OnDestroy } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Router } from "@angular/router";
am4core.useTheme(am4themes_animated);
import noUiSlider from "nouislider";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit, OnDestroy {
  chart;

  // data

  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  constructor(private zone: NgZone) {}

  ngOnInit() {
    this.initChart1();
    this.initChart2();
    this.initChart3();
    this.initChart4();
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

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        console.log("Chart disposed");
        this.chart.dispose();
      }
    });
  }

  initChart1() {
    let chart = am4core.create("chartDashboard1", am4charts.PieChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    // Export
    chart.exporting.menu = new am4core.ExportMenu();

    chart.data = [
      {
        country: "Project 1",
        value: 401,
      },
      {
        country: "Project 2",
        value: 300,
      },
      {
        country: "Project 3",
        value: 200,
      },
      {
        country: "Project 4",
        value: 280,
      },
    ];
    chart.radius = am4core.percent(70);
    chart.innerRadius = am4core.percent(40);
    chart.startAngle = 180;
    chart.endAngle = 360;

    let series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "value";
    series.dataFields.category = "country";

    series.slices.template.cornerRadius = 10;
    series.slices.template.innerCornerRadius = 7;
    series.slices.template.draggable = true;
    series.slices.template.inert = true;
    series.alignLabels = false;

    series.hiddenState.properties.startAngle = 90;
    series.hiddenState.properties.endAngle = 90;

    // chart.legend = new am4charts.Legend();
  }

  initChart2() {
    let chart = am4core.create("chartDashboard2", am4charts.XYChart);

    // Export
    chart.exporting.menu = new am4core.ExportMenu();

    chart.data = [
      {
        year: "Jan",
        income: 23.5,
        expenses: 18.1,
      },
      {
        year: "Feb",
        income: 26.2,
        expenses: 22.8,
      },
      {
        year: "Mar",
        income: 30.1,
        expenses: 23.9,
      },
      {
        year: "Apr",
        income: 29.5,
        expenses: 25.1,
      },
      {
        year: "May",
        income: 24.6,
        expenses: 25,
      },
      {
        year: "Jun",
        income: 31.6,
        expenses: 28,
      },
      {
        year: "Jul",
        income: 34,
        expenses: 30,
      },
      {
        year: "Aug",
        income: 48,
        expenses: 35,
      },
    ];

    //create category axis for years
    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.location = 0;

    //create value axis for income and expenses
    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.opposite = true;

    //create columns
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryY = "year";
    series.dataFields.valueX = "income";
    series.name = "Income";
    series.columns.template.fillOpacity = 0.5;
    series.columns.template.strokeOpacity = 0;
    series.tooltipText = "Income in {categoryY}: {valueX.value}";

    //create line
    let lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.categoryY = "year";
    lineSeries.dataFields.valueX = "expenses";
    lineSeries.name = "Expenses";
    lineSeries.strokeWidth = 3;
    lineSeries.tooltipText = "Expenses in {categoryY}: {valueX.value}";

    //add bullets
    let circleBullet = lineSeries.bullets.push(new am4charts.CircleBullet());
    circleBullet.circle.fill = am4core.color("#fff");
    circleBullet.circle.strokeWidth = 2;

    //add chart cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "zoomY";

    //add legend
    chart.legend = new am4charts.Legend();
  }

  initChart3() {
    let chart = am4core.create("chartDashboard3", am4charts.XYChart);
    chart.scrollbarX = new am4core.Scrollbar();

    // Export
    chart.exporting.menu = new am4core.ExportMenu();

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
    ];

    prepareParetoData();

    function prepareParetoData() {
      let total = 0;

      for (var i = 0; i < chart.data.length; i++) {
        let value = chart.data[i].visits;
        total += value;
      }

      let sum = 0;
      for (var i = 0; i < chart.data.length; i++) {
        let value = chart.data[i].visits;
        sum += value;
        chart.data[i].pareto = (sum / total) * 100;
      }
    }

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 60;
    categoryAxis.tooltip.disabled = true;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;
    valueAxis.min = 0;
    valueAxis.cursorTooltipEnabled = false;

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

    let paretoValueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    paretoValueAxis.renderer.opposite = true;
    paretoValueAxis.min = 0;
    paretoValueAxis.max = 100;
    paretoValueAxis.strictMinMax = true;
    paretoValueAxis.renderer.grid.template.disabled = true;
    paretoValueAxis.numberFormatter = new am4core.NumberFormatter();
    paretoValueAxis.numberFormatter.numberFormat = "#'%'";
    paretoValueAxis.cursorTooltipEnabled = false;

    let paretoSeries = chart.series.push(new am4charts.LineSeries());
    paretoSeries.dataFields.valueY = "pareto";
    paretoSeries.dataFields.categoryX = "country";
    paretoSeries.yAxis = paretoValueAxis;
    paretoSeries.tooltipText = "pareto: {valueY.formatNumber('#.0')}%[/]";
    paretoSeries.bullets.push(new am4charts.CircleBullet());
    paretoSeries.strokeWidth = 2;
    paretoSeries.stroke = new am4core.InterfaceColorSet().getFor(
      "alternativeBackground"
    );
    paretoSeries.strokeOpacity = 0.5;

    // Cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "panX";
  }

  initChart4() {
    let chart = am4core.create("chartDashboard4", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    // Export
    chart.exporting.menu = new am4core.ExportMenu();

    chart.paddingRight = 30;
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm";

    let colorSet = new am4core.ColorSet();
    colorSet.saturation = 0.4;

    chart.data = [
      {
        category: "Project #1",
        start: "2016-01-01",
        end: "2016-01-14",
        color: colorSet.getIndex(0).brighten(0),
        task: "Gathering requirements",
      },
      {
        category: "Project #1",
        start: "2016-01-16",
        end: "2016-01-27",
        color: colorSet.getIndex(0).brighten(0.4),
        task: "Producing specifications",
      },
      {
        category: "Project #1",
        start: "2016-02-05",
        end: "2016-04-18",
        color: colorSet.getIndex(0).brighten(0.8),
        task: "Development",
      },
      {
        category: "Project #1",
        start: "2016-04-18",
        end: "2016-04-30",
        color: colorSet.getIndex(0).brighten(1.2),
        task: "Testing and QA",
      },
      {
        category: "Project #2",
        start: "2016-01-08",
        end: "2016-01-10",
        color: colorSet.getIndex(2).brighten(0),
        task: "Gathering requirements",
      },
      {
        category: "Project #2",
        start: "2016-01-12",
        end: "2016-01-15",
        color: colorSet.getIndex(2).brighten(0.4),
        task: "Producing specifications",
      },
      {
        category: "Project #2",
        start: "2016-01-16",
        end: "2016-02-05",
        color: colorSet.getIndex(2).brighten(0.8),
        task: "Development",
      },
      {
        category: "Project #2",
        start: "2016-02-10",
        end: "2016-02-18",
        color: colorSet.getIndex(2).brighten(1.2),
        task: "Testing and QA",
      },
      {
        category: "Project #3",
        start: "2016-01-02",
        end: "2016-01-08",
        color: colorSet.getIndex(4).brighten(0),
        task: "Gathering requirements",
      },
      {
        category: "Project #3",
        start: "2016-01-08",
        end: "2016-01-16",
        color: colorSet.getIndex(4).brighten(0.4),
        task: "Producing specifications",
      },
      {
        category: "Project #3",
        start: "2016-01-19",
        end: "2016-03-01",
        color: colorSet.getIndex(4).brighten(0.8),
        task: "Development",
      },
      {
        category: "Project #3",
        start: "2016-03-12",
        end: "2016-04-05",
        color: colorSet.getIndex(4).brighten(1.2),
        task: "Testing and QA",
      },
      {
        category: "Project #4",
        start: "2016-01-01",
        end: "2016-01-19",
        color: colorSet.getIndex(6).brighten(0),
        task: "Gathering requirements",
      },
      {
        category: "Project #4",
        start: "2016-01-19",
        end: "2016-02-03",
        color: colorSet.getIndex(6).brighten(0.4),
        task: "Producing specifications",
      },
      {
        category: "Project #4",
        start: "2016-03-20",
        end: "2016-04-25",
        color: colorSet.getIndex(6).brighten(0.8),
        task: "Development",
      },
      {
        category: "Project #4",
        start: "2016-04-27",
        end: "2016-05-15",
        color: colorSet.getIndex(6).brighten(1.2),
        task: "Testing and QA",
      },
      {
        category: "Project #5",
        start: "2016-01-01",
        end: "2016-01-12",
        color: colorSet.getIndex(8).brighten(0),
        task: "Gathering requirements",
      },
      {
        category: "Project #5",
        start: "2016-01-12",
        end: "2016-01-19",
        color: colorSet.getIndex(8).brighten(0.4),
        task: "Producing specifications",
      },
      {
        category: "Project #5",
        start: "2016-01-19",
        end: "2016-03-01",
        color: colorSet.getIndex(8).brighten(0.8),
        task: "Development",
      },
      {
        category: "Project #5",
        start: "2016-03-08",
        end: "2016-03-30",
        color: colorSet.getIndex(8).brighten(1.2),
        task: "Testing and QA",
      },
    ];

    chart.dateFormatter.dateFormat = "yyyy-MM-dd";
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.inversed = true;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 70;
    dateAxis.baseInterval = { count: 1, timeUnit: "day" };
    // dateAxis.max = new Date(2018, 0, 1, 24, 0, 0, 0).getTime();
    //dateAxis.strictMinMax = true;
    dateAxis.renderer.tooltipLocation = 0;

    let series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.columns.template.height = am4core.percent(70);
    series1.columns.template.tooltipText =
      "{task}: [bold]{openDateX}[/] - [bold]{dateX}[/]";

    series1.dataFields.openDateX = "start";
    series1.dataFields.dateX = "end";
    series1.dataFields.categoryY = "category";
    series1.columns.template.propertyFields.fill = "color"; // get color from data
    series1.columns.template.propertyFields.stroke = "color";
    series1.columns.template.strokeOpacity = 1;

    chart.scrollbarX = new am4core.Scrollbar();
  }
}
