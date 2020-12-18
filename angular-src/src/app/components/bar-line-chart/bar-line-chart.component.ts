import {
  Component,
  OnInit,
  Input,
  NgZone,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-bar-line-chart',
  templateUrl: './bar-line-chart.component.html',
  styleUrls: ['./bar-line-chart.component.scss'],
})
export class BarLineChartComponent implements OnInit {
  @Input() item: any;
  noData = false;
  private chart: am4charts.XYChart;
  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone) {
    this.item = false
  }

  ngOnInit(): void {
    if(this.item.length > 0){
      this.noData = false;
    } else {
      this.noData = true;
    }
  }

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);
      if(this.item.length > 0){
        let chart = am4core.create('barLineDiv', am4charts.XYChart);
      console.log(this.item);
      chart.data = this.item;

      // Create axes
      var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = 'title';
      categoryAxis.renderer.inversed = true;
      categoryAxis.renderer.grid.template.location = 0;

      var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.opposite = true;

      //create columns
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.categoryY = 'title';
      series.dataFields.valueX = 'estimatedCost';
      series.name = 'Estimated cost';
      series.columns.template.fillOpacity = 0.5;
      series.columns.template.strokeOpacity = 0;
      series.tooltipText = 'Planned cost for {categoryY}: {valueX.value}';

      //create line
      let lineSeries = chart.series.push(new am4charts.LineSeries());
      lineSeries.dataFields.categoryY = 'title';
      lineSeries.dataFields.valueX = 'actualCost';
      lineSeries.name = 'Actual cost';
      lineSeries.strokeWidth = 3;
      lineSeries.tooltipText = 'Actual cost for {categoryY}: {valueX.value}';

      //add bullets
      let circleBullet = lineSeries.bullets.push(new am4charts.CircleBullet());
      circleBullet.circle.fill = am4core.color('#fff');
      circleBullet.circle.strokeWidth = 2;

      //add chart cursor
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.behavior = 'zoomY';

      //add legend
      chart.legend = new am4charts.Legend();
      }

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
