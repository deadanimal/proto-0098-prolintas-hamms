import { Component, OnInit, OnDestroy, NgZone, TemplateRef } from '@angular/core';
import { User } from 'src/assets/mock/admin-user/users.model'
import { MocksService } from 'src/app/shared/services/mocks/mocks.service';

import * as moment from 'moment';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
am4core.useTheme(am4themes_animated);

import swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox'
}

@Component({
  selector: 'app-management-user',
  templateUrl: './management-user.component.html',
  styleUrls: ['./management-user.component.scss']
})
export class ManagementUserComponent implements OnInit, OnDestroy {

  // Table
  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: User[] = []
  SelectionType = SelectionType;

  // Chart
  chart: any
  chartJan: number = 0
  chartFeb: number = 0
  chartMar: number = 0
  chartApr: number = 0
  chartMay: number = 0
  chartJun: number = 0
  chartJul: number = 0
  chartAug: number = 0
  chartSep: number = 0
  chartOct: number = 0
  chartNov: number = 0
  chartDec: number = 0

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered"
  };

  // Form
  registerForm: FormGroup
  registerFormMessages = {
    'name': [
      { type: 'required', message: 'Name is required' }
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'A valid email is required' }
    ]
  }

  constructor(
    private mockService: MocksService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private zone: NgZone
  ) {
    this.getData()
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ]))
    })
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose()
      }
    })
  }

  getData() {
    this.mockService.getAll('admin-user/users.data.json').subscribe(
      (res) => {
        // Success
        this.tableRows = [...res]
        this.tableTemp = this.tableRows.map((prop, key) => {
          return {
            ...prop,
            id: key
          };
        });
        // console.log('Svc: ', this.tableTemp)
        this.calculateCharts()
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

  getCharts() {
    this.zone.runOutsideAngular(() => {
      this.getChart()
    })
  }

  getChart() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    // Add data
    chart.data = [{
      "month": "Jan",
      "count": this.chartJan
    }, {
      "month": "Feb",
      "count": this.chartFeb
    }, {
      "month": "Mar",
      "count": this.chartMar
    }, {
      "month": "Apr",
      "count": this.chartApr
    }, {
      "month": "May",
      "count": this.chartMar
    }, {
      "month": "Jun",
      "count": this.chartJun
    }, {
      "month": "Jul",
      "count": this.chartJul
    }, {
      "month": "Aug",
      "count": this.chartAug
    }, {
      "month": "Sep",
      "count": this.chartSep
    }, {
      "month": "Oct",
      "count": this.chartOct
    }, {
      "month": "Nov",
      "count": this.chartNov
    }, {
      "month": "Dec",
      "count": this.chartDec
    }
  ];

    // Create axes

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "month";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
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
    series.columns.template.fillOpacity = .8;

    let columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;

    this.chart = chart
  }

  calculateCharts() {
    this.chartJan = 0
    this.chartFeb = 0
    this.chartMar = 0
    this.chartApr = 0
    this.chartMay = 0
    this.chartJun = 0
    this.chartJul = 0
    this.chartAug = 0
    this.chartSep = 0
    this.chartOct = 0
    this.chartNov = 0
    this.chartDec = 0
    this.tableRows.forEach(
      ((row) => {
        let checkerDate = moment(row.joined_at)
        let checkerDateMonth = checkerDate.month()
        if (checkerDateMonth == 0) {
          this.chartJan += 1
        }
        else if (checkerDateMonth == 1) {
          this.chartFeb += 1
        }
        else if (checkerDateMonth == 2) {
          this.chartMar += 1
        }
        else if (checkerDateMonth == 3) {
          this.chartApr += 1
        }
        else if (checkerDateMonth == 4) {
          this.chartMay += 1
        }
        else if (checkerDateMonth == 5) {
          this.chartJun += 1
        }
        else if (checkerDateMonth == 6) {
          this.chartJul += 1
        }
        else if (checkerDateMonth == 7) {
          this.chartAug += 1
        }
        else if (checkerDateMonth == 8) {
          this.chartSep += 1
        }
        else if (checkerDateMonth == 9) {
          this.chartOct += 1
        }
        else if (checkerDateMonth == 10) {
          this.chartNov += 1
        }
        else if (checkerDateMonth == 11) {
          this.chartDec += 1
        }
      })
    )
  }

  openModal(modalRef: TemplateRef<any>) {
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide()
    this.registerForm.reset()
  }

  confirm() {
    swal.fire({
      title: "Confirmation",
      text: "Are you sure to create this new user?",
      type: "info",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-info",
      confirmButtonText: "Confirm",
      showCancelButton: true,
      cancelButtonClass: "btn btn-danger",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.value) {
        this.register()
      }
    })
  }

  register() {
    swal.fire({
      title: "Success",
      text: "A new user has been created!",
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success",
      confirmButtonText: "Close"
    }).then((result) => {
      if (result.value) {
        this.modal.hide()
        this.registerForm.reset()
      }
    })
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

}
