import { Component, OnInit } from '@angular/core';
import { Agenda } from '../shared/agenda.model';
import { MedicoService } from '../../medico/shared/medico.service';
import { RouterStateSnapshot, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Medico } from '../../medico/shared/medico.model';

@Component({
  selector: 'app-minha-agenda-list',
  templateUrl: './minha-agenda-list.component.html',
  styleUrls: ['./minha-agenda-list.component.scss']
})
export class MinhaAgendaListComponent implements OnInit {

  agenda: Agenda;
  days: any[];

  constructor(private medicoService: MedicoService,     private route: ActivatedRoute  ) { }

  ngOnInit() {
    this.agenda = this.route.snapshot.data.agenda;
    if (Object.keys(this.agenda).length == 0) {
      this.agenda = null;
    } else {
      this.days = Agenda.mapToDays(this.agenda.dias_disponivel);
    }

  }
}
