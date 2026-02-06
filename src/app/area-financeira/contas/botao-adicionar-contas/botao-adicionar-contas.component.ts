import { Component, output, signal } from '@angular/core';
import { Conta } from '../../compartilhados/conta.model';
import { ModalComponent } from "../../../compartilhados/modal/modal.component";
import { BotaoComponent } from "../../../compartilhados/botao/botao.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-botao-adicionar-contas',
  imports: [ModalComponent, BotaoComponent, FormsModule],
  templateUrl: './botao-adicionar-contas.component.html',
  styleUrl: './botao-adicionar-contas.component.css'
})
export class BotaoAdicionarContasComponent {

  modalOpened = signal(false);
  contaCriada = output<Conta>();

  newAccount = {
    nome: '',
    saldo: '',
  }

  openMOdal() {
    this.modalOpened.set(true);
  }

  onSubmit() {
    const novaConta = new Conta(
      this.newAccount.nome,
      Number(this.newAccount.saldo)
    );

    this.contaCriada.emit(novaConta);
    this.modalOpened.set(false);
  }
}
