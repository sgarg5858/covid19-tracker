import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GoogleChartInterface } from 'ng2-google-charts';
import { GoogleChartsDataTable } from 'ng2-google-charts/lib/google-charts-datatable';
@Component({
  selector: 'app-time-series',
  templateUrl: './time-series.component.html',
  styleUrls: ['./time-series.component.css']
})
export class TimeSeriesComponent implements OnInit {

  constructor(private dataService:DataServiceService) { }
  timeSeriesData=[];
  chartInitialized=false;
  dateSeriesData=[];
  confirmedSeriesData=[];
  showRecovered=false;
  showConfirmed=false;
  showActive=false;
  showDeaths=false;
  timeSeriesLoading=true;


  lineChartConfirmed:GoogleChartInterface={
    chartType:'LineChart'
  }
  lineChartActive:GoogleChartInterface={
    chartType:'LineChart'
  }
  lineChartRecovered:GoogleChartInterface={
    chartType:'LineChart'
  }
  lineChartDeaths:GoogleChartInterface={
    chartType:'LineChart'
  }


  ngOnInit(): void {
    this.dataService.getDataForTimeSeries().subscribe((days)=>{
      console.log(days);
      
      for(let day of days)
      {
        this.timeSeriesData.push({
          totalConfirmed:day.totalCases,
          totalActive: +day.activeCases,
          totalRecovered: +day.recovered,
          totalDeaths: +day.deaths,
          date: day.lastUpdatedAtApify
        });
        this.dateSeriesData.push(day.lastUpdatedAtApify);
        this.confirmedSeriesData.push(day.totalCases);
      }
      console.log(this.timeSeriesData);
      this.makeChart('confirmed');
    })
  }

  closeAllCharts()
  {
    this.showRecovered=false;
    this.showConfirmed=false;
    this.showActive=false;
    this.showDeaths=false;
  }
  caseTypeChange(event)
  {
    // event.stopPropagation();
    this.makeChart(event.value);
  }

  makeChart(caseType)
  {
    this.closeAllCharts();
   let dataTable=[];
   if(caseType=='confirmed')
   {
        dataTable.push(['Date','Confirmed']);
        for(let i=0;i <this.timeSeriesData.length;i++)
        {
        dataTable.push([new Date(this.timeSeriesData[i].date),this.timeSeriesData[i].totalConfirmed]);
        }
        this.lineChartConfirmed = {
        chartType: 'LineChart',
        dataTable: dataTable,
        options: {
          height:300
        }
        };
        this.showConfirmed=true;
}

if(caseType=='active')
{
    dataTable.push(['Date','Active']);
    for(let i=0;i <this.timeSeriesData.length;i++)
    {
    dataTable.push([new Date(this.timeSeriesData[i].date),this.timeSeriesData[i].totalActive]);
    }
    this.lineChartActive = {
    chartType: 'LineChart',
    dataTable: dataTable,
    options: {
      height:300
    }
    };
    this.showActive=true;
}

if(caseType=='recovered')
{
    dataTable.push(['Date','Recovered']);
    for(let i=0;i <this.timeSeriesData.length;i++)
    {
    dataTable.push([new Date(this.timeSeriesData[i].date),this.timeSeriesData[i].totalRecovered]);
    }
    this.lineChartRecovered = {
    chartType: 'LineChart',
    dataTable: dataTable,
    options: {
      height:300
    }
    };
this.showRecovered=true;
}
if(caseType=='deaths')
{
    dataTable.push(['Date','Deceased']);
    for(let i=0;i <this.timeSeriesData.length;i++)
    {
    dataTable.push([new Date(this.timeSeriesData[i].date),this.timeSeriesData[i].totalDeaths]);
    }
    this.lineChartDeaths = {
    chartType: 'LineChart',
    dataTable: dataTable,
    options: {
      height:300
    }
};
this.showDeaths=true;
}
  this.chartInitialized=true;
  this.timeSeriesLoading=false;
  }

}
