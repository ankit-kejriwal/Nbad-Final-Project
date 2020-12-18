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
  selector: 'app-stacked-chart',
  templateUrl: './stacked-chart.component.html',
  styleUrls: ['./stacked-chart.component.scss'],
})
export class StackedChartComponent implements OnInit {
  @Input() item: any;
  noData = false;
  private chart: am4charts.XYChart;
  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone) {
    this.noData = false;
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
      if(this.item.length > 0 ){
        let chart = am4core.create('stackedchartdiv', am4charts.XYChart);
      console.log(this.item);
      chart.data = this.item;

      // Create axes
      var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = 'title';
      categoryAxis.renderer.grid.template.location = 0;

      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.inside = true;
      valueAxis.renderer.labels.template.disabled = true;
      valueAxis.min = 0;

      // Create series
      function createSeries(field, name) {
        // Set up series
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.name = name;
        series.dataFields.valueY = field;
        series.dataFields.categoryX = 'title';
        series.sequencedInterpolation = true;

        // Make it stacked
        series.stacked = true;

        // Configure columns
        series.columns.template.width = am4core.percent(60);
        series.columns.template.tooltipText =
          '[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}';

        // Add label
        var labelBullet = series.bullets.push(new am4charts.LabelBullet());
        labelBullet.label.text = '{valueY}';
        labelBullet.locationY = 0.5;
        labelBullet.label.hideOversized = true;

        return series;
      }

      createSeries('estimatedCost', 'Estimated cost');
      createSeries('actualCost', 'Actual cost');

      // Legend
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
