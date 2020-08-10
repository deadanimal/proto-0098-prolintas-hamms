import { Component, OnInit, NgZone, OnDestroy } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Router } from "@angular/router";
am4core.useTheme(am4themes_animated);
import noUiSlider from "nouislider";

const mock = [
  {
    description: "Ampang",
    date: "04/03/2020",
    platform: "Twitter",
    likes: "01.3K",
    mentions: "09.6K",
    impact: "45.98",
  },
  {
    description: "Petaling Jaya",
    date: "08/19/2019",
    platform: "Twitter",
    likes: "03.9K",
    mentions: "55.9K",
    impact: "55.31",
  },
  {
    description: "Subang Jaya",
    date: "09/19/2019",
    platform: "Instagram",
    likes: "76.5K",
    mentions: "87.3K",
    impact: "10.54",
  },
  {
    description: "Petaling Jaya",
    date: "09/11/2019",
    platform: "Instagram",
    likes: "81.8K",
    mentions: "07.3K",
    impact: "54.27",
  },
  {
    description: "Gombak",
    date: "01/09/2020",
    platform: "Twitter",
    likes: "62.5K",
    mentions: "13.9K",
    impact: "74.74",
  },
  {
    description: "Gombak",
    date: "07/02/2019",
    platform: "Instagram",
    likes: "99.9K",
    mentions: "65.6K",
    impact: "41.86",
  },
  {
    description: "Cheras",
    date: "05/25/2019",
    platform: "Twitter",
    likes: "43.7K",
    mentions: "48.6K",
    impact: "62.68",
  },
  {
    description: "Subang Jaya",
    date: "08/09/2019",
    platform: "Twitter",
    likes: "32.6K",
    mentions: "80.1K",
    impact: "37.71",
  },
  {
    description: "Invest Smart",
    date: "10/16/2019",
    platform: "Facebook",
    likes: "32.0K",
    mentions: "19.4K",
    impact: "32.75",
  },
  {
    description: "Invest Smart",
    date: "04/18/2020",
    platform: "Instagram",
    likes: "79.1K",
    mentions: "85.6K",
    impact: "58.14",
  },
];

@Component({
  selector: "app-media-monitoring",
  templateUrl: "./media-monitoring.component.html",
  styleUrls: ["./media-monitoring.component.scss"],
})
export class MediaMonitoringComponent implements OnInit, OnDestroy {
  chart;
  datas = mock;

  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  constructor(private zone: NgZone) {}

  ngOnInit() {
    this.initChart();
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

  initChart() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    // Add data
    chart.data = [
      {
        news: "Jan",
        alerts: 2025,
      },
      {
        news: "Feb",
        alerts: 1882,
      },
      {
        news: "Mar",
        alerts: 1809,
      },
      {
        news: "Apr",
        alerts: 1322,
      },
      {
        news: "May",
        alerts: 1122,
      },
      {
        news: "Jun",
        alerts: 1114,
      },
      {
        news: "Jul",
        alerts: 984,
      },
      {
        news: "Aug",
        alerts: 711,
      },
      {
        news: "Sep",
        alerts: 665,
      },
      {
        news: "Oct",
        alerts: 580,
      },
      {
        news: "Nov",
        alerts: 443,
      },
      {
        news: "Dis",
        alerts: 441,
      },
    ];

    // Create axes

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "news";
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
    series.dataFields.valueY = "alerts";
    series.dataFields.categoryX = "news";
    series.name = "Alerts";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = 0.8;

    let columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;
  }
}
