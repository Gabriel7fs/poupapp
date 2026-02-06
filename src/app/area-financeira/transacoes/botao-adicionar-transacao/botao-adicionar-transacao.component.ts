import { Transacao } from './../../compartilhados/transacao.model';
import { Component, input, output, signal } from '@angular/core';
import { BotaoComponent } from "../../../compartilhados/botao/botao.component";
import { ModalComponent } from "../../../compartilhados/modal/modal.component";
import { FormsModule } from '@angular/forms';
import { KeyValuePipe } from '@angular/common';
import { TipoTransacao } from '../../compartilhados/transacao.model';
import { Conta } from '../../compartilhados/conta.model';

@Component({
  selector: 'app-botao-adicionar-transacao',
  imports: [BotaoComponent, ModalComponent, FormsModule, KeyValuePipe ],
  templateUrl: './botao-adicionar-transacao.component.html',
  styleUrl: './botao-adicionar-transacao.component.css'
})
export class BotaoAdicionarTransacaoComponent {

  modalOpened = signal(false);
  transacaoCriada = output<Transacao>();
  tiposTransacao = TipoTransacao;
  contas = input.required<Conta[]>();

  newTransaction = {
    nome: '',
    tipo: '',
    valor: 0,
    data: '',
    conta: ''
  }


  openMOdal() {
    this.modalOpened.set(true);
  }

  onSubmit() {
    const newTransaction = new Transacao(
      this.newTransaction.nome,
      this.newTransaction.tipo as TipoTransacao,
      this.newTransaction.valor,
      this.newTransaction.data,
      this.newTransaction.conta
    );

    this.transacaoCriada.emit(newTransaction);
    this.modalOpened.set(false);
  }
}
