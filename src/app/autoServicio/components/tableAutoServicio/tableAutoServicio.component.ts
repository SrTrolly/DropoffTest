import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { primeNgModule } from '../../../shared/primeNg.module';
import { autoServiceComprobante } from '../../interfaces/autoServicioForm.interface';

@Component({
  selector: 'table-auto-servicio',
  standalone: true,
  imports: [
    CommonModule,
    ...primeNgModule
  ],
  templateUrl: './tableAutoServicio.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableAutoServicioComponent {

  public comprobantes = input.required<autoServiceComprobante[]>();


}
