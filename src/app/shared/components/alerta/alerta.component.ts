import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Alerta } from '../../models/alerta';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.scss']
})
export class AlertaComponent implements OnInit {

  alerta = {
    titulo: "Sucesso!",
    descricao: "Seu registro foi cadastrado com sucesso.",
    btnSucesso: "OK",
    btnCancelar: "Cancelar",
    colorBtnSucesso: "accent",
    colorBtnCancelar: "warn",
    btnClose: false
  } as Alerta

  constructor(
    public dialogRef: MatDialogRef<AlertaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  ngOnInit() {
    if( this.data ) {
      this.alerta.titulo = this.data.titulo || this.alerta.titulo
      this.alerta.descricao = this.data.descricao || this.alerta.descricao
      this.alerta.btnSucesso = this.data.btnSucesso || this.alerta.btnSucesso
      this.alerta.colorBtnSucesso = this.data.colorBtnSucesso || this.alerta.colorBtnSucesso
      this.alerta.colorBtnCancelar = this.data.colorBtnCancelar || this.alerta.colorBtnCancelar
      this.alerta.btnCancelar = this.data.btnCancelar || this.alerta.btnCancelar
      this.alerta.btnClose = this.data.btnClose || this.alerta.btnClose
    }
  }

}
