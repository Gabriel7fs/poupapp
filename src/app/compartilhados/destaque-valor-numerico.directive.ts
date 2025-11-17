import { afterRender, Directive, ElementRef, input } from '@angular/core';

@Directive({
  selector: '[appDestaqueValorNumerico]'
})

export class DestaqueValorNumericoDirective {
  appDestaqueValorNumerico = input.required<number>();
  corDeposito = input("var(--destaque-receita)");
  corSaque = input("var(--destaque-despesa)");

  constructor(element: ElementRef<HTMLElement>) {
    afterRender ( () => {
      if (this.appDestaqueValorNumerico() > 0) {
        element.nativeElement.style.color = this.corDeposito();
      } else if (this.appDestaqueValorNumerico() < 0) {
        element.nativeElement.style.color = this.corSaque();
      }
    });
  }

}
