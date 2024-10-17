import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AutoServicioFormComponent } from '../../components/autoServicioForm/autoServicioForm.component';
import { primeNgModule } from '../../../shared/primeNg.module';
import { autoServiceComprobante, autoServiceForm } from '../../interfaces/autoServicioForm.interface';
import { DialogAutoServiceComponent } from '../../components/dialogAutoService/dialogAutoService.component';
import dayjs from 'dayjs';
import { TableAutoServicioComponent } from '../../components/tableAutoServicio/tableAutoServicio.component';


@Component({
  selector: 'app-auto-servicio-pa-ge',
  standalone: true,
  imports: [
    CommonModule,
    AutoServicioFormComponent,
    DialogAutoServiceComponent,
    TableAutoServicioComponent,
    ...primeNgModule
  ],
  templateUrl: './autoServicioPaGE.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AutoServicioPageComponent {

  public comprobante = signal<autoServiceComprobante | null>(null)
  public comprobantes = signal<autoServiceComprobante[]>([]);

  //intente usar signal para esta variable pero se rompia por alguna razon
  public visible: boolean = false;
  public isValid = signal<boolean>(false);

  public onShowDialog(event: autoServiceForm): void {

    //Vuelvo a verificar si el calculo es correcto para emitir
    const calculo = this.esMetroCubicoCorrecto(event);

    if (!calculo) {
      this.isValid.set(false);
      this.visible = true;
      return;
    }

    const newComp: autoServiceComprobante = {
      orden: this.generarNumAleatorio(),
      fecha: dayjs().format("DD/MM/YYYY").toString(),
      hora: dayjs().format("h:mm:ss A").toString(),
      // hora: `${dayjs().hour().toLocaleString()}:${dayjs().minute().toLocaleString()}`,
      ...event
    }


    //Muestro el comprobante y pusheo a la tabla
    this.comprobante.set(newComp);
    this.comprobantes.update(prev => [...prev, this.comprobante()!])
    this.visible = true;
    this.isValid.set(true);
  }

  private generarNumAleatorio(): string {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }


  private esMetroCubicoCorrecto(event: autoServiceForm): boolean {
    const { longitud, altura, ancho } = event;
    const resultado = longitud! * altura! * ancho!;
    return resultado >= 2000 ? false : true;

  }


}
