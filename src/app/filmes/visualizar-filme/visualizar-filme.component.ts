import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmesService } from 'src/app/core/filmes.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'app-visualizar-filme',
  templateUrl: './visualizar-filme.component.html',
  styleUrls: ['./visualizar-filme.component.scss']
})
export class VisualizarFilmeComponent implements OnInit {
  filme: Filme;
  readonly semFoto = 'https://www2.camara.leg.br/atividade-legislativa/comissoes/comissoes-permanentes/cindra/imagens/sem.jpg.gif/image';
  id: number;

  constructor(private activatedRoute: ActivatedRoute, private filmesSevice: FilmesService, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.visualizarFilme();
  }

  editar(): void {
    this.router.navigateByUrl('/filmes/cadastro/' + this.id)
  }

  excluir(): void {
    const config = {
      data: {
        titulo: "Você tem certeza que deseja excluir?",
        descricao: "Caso você tenha certeza que deseja excluir, clique no botão OK",        
        btnCancelar: "Cancelar",
        btnClose: true,
        colorBtnCancelar: "primary",
        colorBtnSucesso: "warn",
      } as Alerta
    };
    const dialogRef = this.dialog.open(AlertaComponent, config)

    dialogRef.afterClosed().subscribe((result: Boolean) => {
      if(result) {
        this.filmesSevice.excluir(this.id).subscribe( () => this.router.navigateByUrl('/filmes'));
      }
    });
  }
  private visualizarFilme(): void {
    this.filmesSevice.visualizar(this.id).subscribe( (filme: Filme) => this.filme = filme);
  }
}
