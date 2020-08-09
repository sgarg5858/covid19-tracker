import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GoogleChartInterface } from 'ng2-google-charts';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

export interface StateData{
 region:string;
 confirmed:number;
 active:number;
 recovered:number;
 deaths:number ;
}

@Component({
  selector: 'app-india',
  templateUrl: './india.component.html',
  styleUrls: ['./india.component.css']
})
export class IndiaComponent implements OnInit {

  constructor(private dataService:DataServiceService) { }

  @ViewChild( MatSort,{static:true} ) sort:MatSort;
  
  panelOpenState=false;
  showConfirmed=false;
  showActive=false;
  showRecovered=false;
  showDeaths=false;
  infoChartLoading=true;
  totalActive;
  totalConfirmed;
  totalRecovered;
  totalDeaths;
  statesData=[];
  gotAPIError=false;
  dataSource= new MatTableDataSource<StateData>();
  showTable=false;
  displayedColumns: string[] = ['region','confirmed','active','recovered','deaths'];

  pieChartConfirmed:GoogleChartInterface ={
    chartType:'PieChart'
  }
  pieChartActive:GoogleChartInterface ={
    chartType:'PieChart'
  }
  pieChartRecovered:GoogleChartInterface ={
    chartType:'PieChart'
  }
  pieChartDeaths:GoogleChartInterface ={
    chartType:'PieChart'
  }
  columnChartConfirmed:GoogleChartInterface={
    chartType:'ColumnChart'
  }
  columnChartActive:GoogleChartInterface={
    chartType:'ColumnChart'
  }
  columnChartRecovered:GoogleChartInterface={
    chartType:'ColumnChart'
  }
  columnChartDeaths:GoogleChartInterface={
    chartType:'ColumnChart'
  }
  chartsInitialized=false;

  

  ngOnInit(): void {
    this.dataService.getIndiaData().subscribe((response)=>{
      console.log(response);
      this.totalConfirmed=response.totalCases;
      this.totalActive=response.activeCases;
      this.totalRecovered=response.recovered;
      this.totalDeaths=response.deaths;

      this.statesData=response.regionData;
      let states:StateData[]=[];

      for(let state of this.statesData)
      {
        let temp:StateData={
          region:state.region,
          active:state.totalInfected,
          recovered:state.recovered,
          deaths:state.deceased,
          confirmed:state.totalInfected+state.recovered+state.deceased,
};
        states.push(temp);
      }
      console.log(this.statesData);
      console.log(states);

      this.dataSource.data=states;
      this.dataSource.sort=this.sort;
      this.showTable=true;
      this.makeCharts('confirmed');

    },(error)=>{
      this.gotAPIError=true;
    })
    
  }
  doFilter(filterValue:string){
    console.log(filterValue)
    this.dataSource.filter=filterValue.trim().toLowerCase();
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
    this.makeCharts(event.value);
  }

  makeCharts(caseType:string)
  {
    this.infoChartLoading=true;
    this.chartsInitialized=false;
    this.closeAllCharts();
    let dataTable=[];

    if(caseType==='confirmed')
   {
    dataTable.push(['State','Confirmed cases']);
  this.statesData.sort((a,b)=>b.totalCases-a.totalCases);
  this.statesData.forEach((state)=>{
    dataTable.push([state.region,state.totalCases]);
  })

   this.pieChartConfirmed = {
    chartType: 'PieChart',
    dataTable: dataTable,
    options: {
      height:300
    }
    
  };
  this.columnChartConfirmed = {
    chartType: 'ColumnChart',
    dataTable: dataTable,
    options: {
      height:300
    }
  };
  this.showConfirmed=true;
   }

   if(caseType==='active')
   {
    dataTable.push(['State','Active cases']);
    this.statesData.sort((a,b)=>b.totalInfected-a.totalInfected)
  this.statesData.forEach((state)=>{
    dataTable.push([state.region,state.totalInfected]);
  })

   this.pieChartActive = {
    chartType: 'PieChart',
    dataTable: dataTable,
    options: {
      height:300
    }
    
  };
  this.columnChartActive = {
    chartType: 'ColumnChart',
    dataTable: dataTable,
    options: {
      height:300
    }
  };

  this.showActive=true;
   }

   if(caseType==='recovered')
   {
    dataTable.push(['State','Recovered cases']);
    this.statesData.sort((a,b)=>b.recovered-a.recovered)
  this.statesData.forEach((state)=>{
    dataTable.push([state.region,state.recovered]);
  })

   this.pieChartRecovered = {
    chartType: 'PieChart',
    dataTable: dataTable,
    options: {
      height:300
    }
    
  };
  this.columnChartRecovered = {
    chartType: 'ColumnChart',
    dataTable: dataTable,
    options: {
      height:300
    }
  };

  this.showRecovered=true;
   }

   if(caseType==='deaths')
   {
    dataTable.push(['State','Deceased cases']);
    this.statesData.sort((a,b)=>b.deceased-a.deceased)
  this.statesData.forEach((state)=>{
    dataTable.push([state.region,state.deceased]);
  })

   this.pieChartDeaths = {
    chartType: 'PieChart',
    dataTable: dataTable,
    options: {
      height:300
    }
    
  };
  this.columnChartDeaths = {
    chartType: 'ColumnChart',
    dataTable: dataTable,
    options: {
      height:300
    }
  };

  this.showDeaths=true;
   }
   this.chartsInitialized=true;
   this.infoChartLoading=false;
  }
}
