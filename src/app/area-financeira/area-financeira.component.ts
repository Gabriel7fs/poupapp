import { Component, computed, signal } from '@angular/core';
import { SaldoComponent } from "./saldo/saldo.component";
import { TransacoesComponent } from "./transacoes/transacoes.component";
import { ContasComponent } from "./contas/contas.component";
import { Conta } from './compartilhados/conta.model';
import { Transacao, TipoTransacao } from './compartilhados/transacao.model';

@Component({
  selector: 'app-area-financeira',
  imports: [SaldoComponent, TransacoesComponent, ContasComponent],
  templateUrl: './area-financeira.component.html',
  styleUrl: './area-financeira.component.css'
})
export class AreaFinanceiraComponent {

  saldo = computed(() => {
    return this.contas().reduce((saldoTotal, conta) => {
      return saldoTotal + conta.saldo;
    }, 0);
  });

  transacoes = signal<Transacao[]>([]);

  contasSaldoInicial = signal<Conta[]>([]);

  contas = computed(() => {
    return this.contasSaldoInicial().map((conta) => {
      const saldoAtualizado = this.calculaSaldo(conta);
      return {...conta, saldo: saldoAtualizado};
    });
  });

  calculaSaldo(contaInicial: Conta) {
    return this.transacoes().reduce((novoSaldo, transacao) => {
      if (transacao.conta === contaInicial.nome) {
        if (transacao.tipo === TipoTransacao.DEPOSITO) {
          return novoSaldo + transacao.valor;
        }
        return novoSaldo - transacao.valor;
      }
      return novoSaldo;
    }, contaInicial.saldo);
  }

  processarTransacao(transacao: Transacao) {
    this.transacoes.update((transacoes) => [transacao, ...transacoes]);
  }

  processarConta(conta: Conta) {
    this.contasSaldoInicial.update((contas) => [conta, ...contas]);
  }
}
