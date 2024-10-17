import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, input, output } from '@angular/core';
import { primeNgModule } from '../../../shared/primeNg.module';
import { autoServiceComprobante } from '../../interfaces/autoServicioForm.interface';

@Component({
  selector: 'dialog-auto-service',
  standalone: true,
  imports: [
    CommonModule,
    ...primeNgModule
  ],
  templateUrl: './dialogAutoService.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAutoServiceComponent {

  @Input() visible: boolean = false;

  public comprobante = input.required<autoServiceComprobante>();
  public isValid = input.required<boolean>();
  public visibleEvent = output<boolean>();


  //emite un falso para que se pueda volver a generar un dialog, si el usuario quiere volver a ingresar otro producto
  closeDialog(): boolean {
    this.visible = false
    this.visibleEvent.emit(this.visible);
    return this.visible;
  }



}
