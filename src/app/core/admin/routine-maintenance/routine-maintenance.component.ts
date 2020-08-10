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
  selector: "app-routine-maintenance",
  templateUrl: "./routine-maintenance.component.html",
  styleUrls: ["./routine-maintenance.component.scss"],
})
export class RoutineMaintenanceComponent implements OnInit, OnDestroy {
  chart;

  // data
  // datas = mock;
  datas = [
    {
      name: "Routine 1",
      desc: "Routine Description 1",
      amount: "RM 300000",
      status: "Reviewed",
      created_at: "2019-07-27T01:07:14Z",
    },
    {
      name: "Routine 2",
      desc: "Routine Description 2",
      amount: "RM 20000",
      status: "Approved",
      created_at: "2019-07-27T01:07:14Z",
    },
    {
      name: "Routine 3",
      desc: "Routine Description 3",
      amount: "RM 780000",
      status: "Cancelled",
      created_at: "2019-07-27T01:07:14Z",
    },
  ];

  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  addModal: BsModalRef;
  editModal: BsModalRef;
  @ViewChild("modalAdd") modalAdd: ElementRef;
  @ViewChild("modalEdit") modalEdit: ElementRef;
  default = {
    keyboard: true,
    class: "modal-dialog-centered modal-secondary",
  };
  radios = "bg-danger";
  eventTitle = undefined;
  eventDescription;
  eventId;
  event;
  startDate;
  endDate;
  calendar;
  today = new Date();
  y = this.today.getFullYear();
  m = this.today.getMonth();
  d = this.today.getDate();
  events = [
    {
      id: 0,
      title: "Lunch meeting",
      start: "2018-11-21",
      end: "2018-11-22",
      className: "bg-orange",
    },
    {
      id: 1,
      title: "Call with Dave",
      start: new Date(this.y, this.m, 1),
      allDay: true,
      className: "bg-red",
      description:
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    },

    {
      id: 2,
      title: "Lunch meeting",
      start: new Date(this.y, this.m, this.d - 1, 10, 30),
      allDay: true,
      className: "bg-orange",
      description:
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    },

    {
      id: 3,
      title: "All day conference",
      start: new Date(this.y, this.m, this.d + 7, 12, 0),
      allDay: true,
      className: "bg-green",
      description:
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    },

    {
      id: 4,
      title: "Meeting with Mary",
      start: new Date(this.y, this.m, this.d - 2),
      allDay: true,
      className: "bg-blue",
      description:
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    },

    {
      id: 5,
      title: "Winter Hackaton",
      start: new Date(this.y, this.m, this.d + 1, 19, 0),
      allDay: true,
      className: "bg-red",
      description:
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    },

    {
      id: 6,
      title: "Digital event",
      start: new Date(this.y, this.m, 21),
      allDay: true,
      className: "bg-warning",
      description:
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    },

    {
      id: 7,
      title: "Marketing event",
      start: new Date(this.y, this.m, 21),
      allDay: true,
      className: "bg-purple",
      description:
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    },

    {
      id: 8,
      title: "Dinner with Family",
      start: new Date(this.y, this.m, 19),
      allDay: true,
      className: "bg-red",
      description:
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    },

    {
      id: 9,
      title: "Black Friday",
      start: new Date(this.y, this.m, 23),
      allDay: true,
      className: "bg-blue",
      description:
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    },

    {
      id: 10,
      title: "Cyber Week",
      start: new Date(this.y, this.m, 2),
      allDay: true,
      className: "bg-yellow",
      description:
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    },
  ];

  constructor(private zone: NgZone, private modalService: BsModalService) {}

  ngOnInit() {
    this.initCalendar();

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

  changeView(newView) {
    this.calendar.changeView(newView);

    currentDate: this.calendar.view.title;
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        console.log("Chart disposed");
        this.chart.dispose();
      }
    });
  }
  initCalendar() {
    this.calendar = new Calendar(document.getElementById("calendar"), {
      plugins: [interaction, dayGridPlugin],
      defaultView: "dayGridMonth",
      selectable: true,
      editable: true,
      events: this.events,
      views: {
        month: {
          titleFormat: { month: "long", year: "numeric" },
        },
        agendaWeek: {
          titleFormat: { month: "long", year: "numeric", day: "numeric" },
        },
        agendaDay: {
          titleFormat: { month: "short", year: "numeric", day: "numeric" },
        },
      },
      // Add new event
      select: (info) => {
        this.addModal = this.modalService.show(this.modalAdd, this.default);
        this.startDate = info.startStr;
        this.endDate = info.endStr;
      },
      // Edit calendar event action
      eventClick: ({ event }) => {
        this.eventId = event.id;
        this.eventTitle = event.title;
        this.eventDescription = event.extendedProps.description;
        this.radios = "bg-danger";
        this.event = event;
        this.editModal = this.modalService.show(this.modalEdit, this.default);
      },
    });
    this.calendar.render();
  }
  getNewEventTitle(e) {
    this.eventTitle = e.target.value;
  }

  getNewEventDescription(e) {
    this.eventDescription = e.target.value;
  }

  addNewEvent() {
    this.events.push({
      title: this.eventTitle,
      start: this.startDate,
      end: this.endDate,
      className: this.radios,
      id: this.events.length,
    });
    this.calendar.addEvent({
      title: this.eventTitle,
      start: this.startDate,
      end: this.endDate,
      className: this.radios,
      id: this.events.length,
    });
    this.addModal.hide();
    this.radios = "bg-danger";
    (this.eventTitle = undefined),
      (this.eventDescription = undefined),
      (this.eventId = undefined),
      (this.event = undefined);
  }

  deleteEventSweetAlert() {
    this.editModal.hide();
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-danger",
        cancelButtonClass: "btn btn-secondary",
        confirmButtonText: "Yes, delete it!",
        buttonsStyling: false,
      })
      .then((result) => {
        if (result.value) {
          this.events = this.events.filter(
            (prop) => prop.id + "" !== this.eventId
          );
          this.initCalendar();
          swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            type: "success",
            confirmButtonClass: "btn btn-primary",
            buttonsStyling: false,
          });
        }
      });
    this.radios = "bg-danger";
    (this.eventTitle = undefined),
      (this.eventDescription = undefined),
      (this.eventId = undefined),
      (this.event = undefined);
  }

  updateEvent() {
    this.events = this.events.map((prop, key) => {
      if (prop.id + "" === this.eventId + "") {
        return {
          ...prop,
          title: this.eventTitle,
          className: this.radios,
          description: this.eventDescription,
        };
      } else {
        return prop;
      }
    });
    this.radios = "bg-danger";
    (this.eventTitle = undefined),
      (this.eventDescription = undefined),
      (this.eventId = undefined),
      (this.event = undefined);
    this.initCalendar();
    this.editModal.hide();
  }

  initChart() {
    let chart = am4core.create(
      "chartdivTsa",
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
    let chart = am4core.create("chartdivTsa2", am4charts.XYChart3D);

    // Add data
    chart.data = [
      {
        country: "Jan",
        year2017: 2000,
        year2018: 1900,
      },
      {
        country: "Feb",
        year2017: 1700,
        year2018: 1600,
      },
      {
        country: "Mar",
        year2017: 2080,
        year2018: 2090,
      },
      {
        country: "Apr",
        year2017: 2060,
        year2018: 2030,
      },
      {
        country: "May",
        year2017: 1400,
        year2018: 2010,
      },
      {
        country: "Jun",
        year2017: 2060,
        year2018: 2090,
      },
      {
        country: "Jul",
        year2017: 3400,
        year2018: 3200,
      },
      {
        country: "Aug",
        year2017: 3000,
        year2018: 2900,
      },
      {
        country: "Sep",
        year2017: 3000,
        year2018: 2100,
      },
      {
        country: "Oct",
        year2017: 3800,
        year2018: 3600,
      },
      {
        country: "Nov",
        year2017: 2900,
        year2018: 3400,
      },
      {
        country: "Dec",
        year2017: 3800,
        year2018: 4000,
      },
    ];

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Value";
    valueAxis.renderer.labels.template.adapter.add("text", function (text) {
      return text + "%";
    });

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries3D());
    series.dataFields.valueY = "year2017";
    series.dataFields.categoryX = "country";
    series.name = "Year 2017";
    series.clustered = false;
    series.columns.template.tooltipText =
      "Value in {category} (2017): [bold]{valueY}[/]";
    series.columns.template.fillOpacity = 0.9;

    let series2 = chart.series.push(new am4charts.ColumnSeries3D());
    series2.dataFields.valueY = "year2018";
    series2.dataFields.categoryX = "country";
    series2.name = "Year 2018";
    series2.clustered = false;
    series2.columns.template.tooltipText =
      "Value in {category} (2018): [bold]{valueY}[/]";
  }

  initChart3() {
    let chart = am4core.create("chartdivTsa3", am4charts.GaugeChart);
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
