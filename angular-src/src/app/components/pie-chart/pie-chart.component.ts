import { Component, OnInit, Input, NgZone, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  @Input() item: any;
  private chart: am4charts.PieChart;
  constructor(
    @Inject(PLATFORM_ID) private platformId, private zone: NgZone
  ) { }

  ngOnInit(): void {

  }
  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit(){
    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);

      let chart = am4core.create("chartdiv", am4charts.PieChart);
      chart.data = this.item;
      var pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "cost";
      pieSeries.dataFields.category = "title";
      pieSeries.name = "Estimated Cost";
      //add legend
      chart.legend = new am4charts.Legend();
    });
  }
  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}
