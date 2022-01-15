import { LoginService } from '../../auth/shared/login.service';
import { Filtro } from '../../../shared/model/transiente/filtro';
import { UsuarioService } from 'src/app/pages/usuario/shared/usuario.service';
import { map } from 'rxjs/operators';
import { ElementRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FullCalendarOptions, EventObject, FullCalendarComponent } from 'ngx-fullcalendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

import ptBr from '@fullcalendar/core/locales/pt-br';
import { AgendamentoService } from '../shared/agendamento.service';
import { Agendamento } from '../shared/agendamento.model';
import { BsModalService } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import CalendarComponent from '@fullcalendar/core/CalendarComponent';
import { Agenda } from '../../minha-agenda/shared/agenda.model';

@Component({
  selector: 'app-agendamento-list',
  templateUrl: './agendamento-list.component.html',
  styleUrls: ['./agendamento-list.component.scss']
})
export class AgendamentoListComponent implements OnInit {
  options: FullCalendarOptions;
  events: any[] = [];
  eventsCopy: any[] = [];
  agenda: Agenda;
  agendas: any[] = [];
  usuarios: any[] = [];
  calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin];
  localep = ptBr;
  modalRef: BsModalRef;
  dataSelecionadaInicio: string;
  dataSelecionadaFinal: string;
  agendaEventoSelecionada: any;
  agendaSelecionada: any;
  eventoIndex: any;
  @ViewChild('calendar', {static: false}) calendar: FullCalendarComponent;

  // usuario atual do sistema
  currentUser;

  constructor(
    private agendamentoService: AgendamentoService,
    private usuarioService: UsuarioService,
    private modalService: BsModalService,
    private loginService: LoginService,
    private route: Router,
    private aRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.options = {
      editable: true,
    };


    this.loadUsuarios();
    this.loginService.currentUser.subscribe(result => {
      this.currentUser = result;
    });

    this.agenda = this.aRoute.snapshot.data.agenda;
    this.loadAgendamento(this.agenda.id);
  }

  handleEventClick(args: any, template: TemplateRef<any>) {
    this.eventoIndex = this.events.map(item => item.id).indexOf(parseInt(args.event.id));
    this.agendaSelecionada = this.agendas.filter(item => item.id == args.event.id)[0];
    this.agendaEventoSelecionada = args.event;
    this.modalRef = this.modalService.show(template);
  }

  handleSelectEvent(info, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.dataSelecionadaInicio = info.start;
    this.dataSelecionadaFinal = info.end;
  }

  handleChangeUsuario(value) {
    console.log(value);
    if (this.eventsCopy.length == 0) {
      this.eventsCopy = [...this.events];
    }
    if (value != 'todos') {
      const mapIdUsuario = this.agendas.filter(item => item.usuario_id == value).map(item => item.id);
      const eventos = [...this.eventsCopy];
      this.events = eventos.filter(item => mapIdUsuario.includes(item.id));
    } else {
      this.events = this.eventsCopy;
    }

  }

  agendar() {
    this.modalRef.hide();
    const horaInicio = this.pad(new Date(this.dataSelecionadaInicio).getHours());
    const minInicio = this.pad(new Date(this.dataSelecionadaInicio).getMinutes());
    const dataInicio = new Date(this.dataSelecionadaInicio);

    const horaFinal  = this.pad(new Date(this.dataSelecionadaFinal).getHours());
    const minFinal = this.pad(new Date(this.dataSelecionadaFinal).getMinutes());
    const dataFinal = new Date(this.dataSelecionadaInicio);

    this.route.navigate(['agenda/add', {
      horaInicio,
      minInicio,
      dataInicio,
      horaFinal,
      minFinal,
      dataFinal
    }]);
  }

  confirmarComparecimento() {
    this.agendamentoService.alterar({...this.agendaSelecionada, situacao: 'C'}).subscribe(
      (result) => {
        this.agendaSelecionada.situacao = 'C';
        this.events[this.eventoIndex].color = this.definirCorSituacaoEvento('C');
        this.modalRef.hide();
      }
    );
  }

  confirmarAtendimento() {
    this.agendamentoService.alterar({...this.agendaSelecionada, situacao: 'A'}).subscribe(
      (result) => {
        this.agendaSelecionada.situacao = 'A';
        this.events[this.eventoIndex].color = this.definirCorSituacaoEvento('A');
        this.modalRef.hide();
      }
    );
  }

  cancelarAgendamentomento() {
    this.agendamentoService.excluir(this.agendaSelecionada.id).subscribe(
      (result) => {
        const eventos = [...this.events];
        if (this.eventoIndex > 0) {
          eventos.splice(this.eventoIndex, 1);
          this.events = eventos;
        }
        this.modalRef.hide();
      }
    );
  }

  loadAgendamento(id: number) {
    this.agendas = null;

    const filtro: Filtro = new Filtro();
    filtro.campo = 'agenda_id';
    filtro.valor = id.toString();


    this.agendamentoService.consultarLista(filtro).subscribe(
      (result: any) => {
        this.agendas = result.data;
        result.data.forEach(element => {
          this.events = this.events.concat({ // add new event data. must create new array
            id: element.id,
            title: element.nome,
            start: new Date(element.data_inicio),
            end: new Date(element.data_final),
            color: this.definirCorSituacaoEvento(element.situacao)
          });
        });
      }
    );
  }

  loadUsuarios() {
    const filtro = new Filtro();
    filtro.campo = 'papel';
    filtro.valor = 'P';
    this.usuarioService.consultarLista(filtro, null, false).subscribe(
      (result) => {
        this.usuarios = result.data;
      }
    );
  }

  definirCorSituacaoEvento(s: string) {
    if (s === 'R') {
      return '#acacac';
    } else if (s === 'C') {
      return '#5dae5d';
    } else if (s === 'A') {
      return '#6ebeee';
    }
  }

  pad(s) {
    return (s < 10) ? '0' + s : s;
  }
}
