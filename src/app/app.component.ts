import { Component, ViewChild } from '@angular/core';
import { ColDef, GetRowNodeIdFunc, GridApi, GridReadyEvent, } from 'ag-grid-community';
import { CepServiceService } from './cep-service.service';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private gridApi!: GridApi;
  title = 'BuscaCep';
  cep = new FormControl('');
  dados:any = [];
  newRow: any = [];

  @ViewChild('cep') inputName:any;

  handleClear(){
    // clearing the input field
  this.inputName.nativeElement.value = ' ';
  }

  public getRowNodeId: GetRowNodeIdFunc = function (data) {
    return data.logradouro;
  }

  constructor(private cepService:CepServiceService){}

  consultaCep(valor:any){
    this.cepService.buscarCep(valor).subscribe(valor => {
      this.dados = valor;

      let newData = {logradouro:this.dados.logradouro,
      bairro:this.dados.bairro,
      localidade:this.dados.localidade,
      uf:this.dados.uf
      }

      var rowNode = this.gridApi.getRowNode('')!;

      rowNode.setData(newData);

      this.rowData.unshift(newData);
      this.gridApi.setRowData(this.rowData);


    });
  }

   columnDefs: ColDef[] = [
    { field: 'logradouro' },
    { field: 'bairro' },
    { field: 'localidade'},
    { field: 'uf'}
];
  rowData = [
    {logradouro:'', bairro:'', localidade:'', uf:''}
  ]

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}




