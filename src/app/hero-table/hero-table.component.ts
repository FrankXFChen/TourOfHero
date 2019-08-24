import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GridOptions } from 'ag-grid';

import { Hero }         from '../hero';
import { HeroService }  from '../hero.service';

@Component({
  selector: 'app-hero-table',
  templateUrl: './hero-table.component.html',
  styleUrls: [ './hero-table.component.css' ]
})
export class HeroTableComponent implements OnInit {
  @Input() hero: Hero;
  attrClass: string;
  heroes: Hero[];
  private gridOptions: GridOptions;
  gridApi: any;
  
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {
    this.gridOptions = <GridOptions>{
      enableFilter : true,
    };
    this.gridOptions.columnDefs = [
      {
        headerName: 'ID',
        field: 'id',
        minWidth: 50,
      },
      {
        headerName: 'Name',
        field: 'name',
        minWidth: 50,
      },
      {
        headerName: 'Attribute',
        field: 'attribute',
        minWidth: 50,
      }
      // {
      //   headerName: 'ID',
      //   field: 'id',
      //   minWidth: 50,
      //   type: 'numberColumn'
      // },
      // {
      //   headerName: 'Name',
      //   field: 'name',
      //   filter: 'text',
      //   maxWidth: 75,
      // },
      // {
      //   headerName: 'Sex',
      //   field: 'sex',
      //   filter: 'text',
      //   width:50
      // },
      // {
      //   headerName: 'Age',
      //   field: 'age',
      //   filter: 'text',
      //   width: 50,
      //   // children: [
      //   //   {headerName: 'Birthday', field: 'birthday', columnGroupShow: 'closed', type: ['dateColumn', 'nonEditableColumn']},
      //   //   {headerName: 'Silver', field: 'silver', columnGroupShow: 'closed'},
      //   //   {headerName: 'Gold', field: 'bronze', columnGroupShow: 'open'},
      //   //   {headerName: 'Constellation', field: 'constellation', columnGroupShow: 'open'}
      //   // ]
      // },
      // {
      //   headerName: 'Tele',
      //   field: 'tele',
      //   filter: 'text',
      //   minWidth: 100,
      //   editable: true,
      // },
      // {
      //   headerName: 'Address',
      //   field: 'address',
      //   filter: 'text',
      //   minWidth: 200,
      //   editable: true,
      //   //pinned: 'right'
      // }

    ];
    // this.gridOptions.rowData = [
    //   {id: 1, name: '张三', sex: '女', age: '20', birthday: '1993-05-20', tele: '13564569874', address: '海淀区农大南路'},
    //   {id: 2, name: '李四', sex: '男', age: '40', birthday: '1992-08-18', tele: '15647893214', address: '丰台区'},
    //   {id: 3, name: '小明', sex: '男', age: '20', birthday: '2011-02-01', tele: '17788770858', address: '哈尔滨市南岗区'},
    //   {id: 4, name: '晓红', sex: '女', age: '25', birthday: '1978-11-20', tele: '18945620145', address: '北京西路的日子'},
    //   {id: 5, name: '老王', sex: '男', age: '30', birthday: '1997-07-08', tele: '13645713276', address: '中关村软件园'},
    //   {id: 6, name: '柜子', sex: '男', age: '35', birthday: '1999-03-15', tele: '18745016324', address: '海淀区后厂村路'},
    // ]
    this.gridOptions.columnTypes = {
      'numberColumn': {width: 50, filter: 'number'},
      'medalColumn': {width: 100, columnGroupShow: 'open', suppressFilter: true},
      'nonEditableColumn': {editable: false},
      'dateColumn': {
        // specify we want to use the date filter
        filter: 'date',
        filterParams: {
          // provide comparator function
          comparator: function (filterLocalDateAtMidnight, cellValue) {

            // In the example application, dates are stored as dd/mm/yyyy
            // We create a Date object for comparison against the filter date
            const dateParts = cellValue.split('-');
            const day = Number(dateParts[2]);
            const month = Number(dateParts[1]) - 1;
            const year = Number(dateParts[0]);
            const cellDate = new Date(year, month, day );
            // Now that both parameters are Date objects, we can compare
            if (cellDate < filterLocalDateAtMidnight) {
              return -1;
            } else if (cellDate > filterLocalDateAtMidnight) {
              return 1;
            } else {
              return 0;
            }
          }
        }
      }
    };
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.heroService.getHeroes()
    .subscribe(heroes => 
      {
        params.api.setRowData(heroes);
        //this.gridApi.sizeColumnsToFit();
    });
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => 
      {
        this.heroes = heroes;
    });
  }
}
