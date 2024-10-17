import { CommonModule, CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { autoServiceForm } from '../../interfaces/autoServicioForm.interface';
import { primeNgModule } from '../../../shared/primeNg.module';

@Component({
  selector: 'auto-servicio-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CurrencyPipe,
    ...primeNgModule
  ],
  templateUrl: './autoServicioForm.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoServicioFormComponent {

  public valueForm = output<autoServiceForm>();

  private fb = inject(FormBuilder);

  public myForm = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(15)]],
    altura: [null, [Validators.required, Validators.minLength(1), Validators.pattern('^[1-9][0-9]*$')]],
    ancho: [null, [Validators.required, Validators.minLength(1), Validators.pattern('^[1-9][0-9]*$')]],
    longitud: [null, [Validators.required, Validators.minLength(1), Validators.pattern('^[1-9][0-9]*$')]],
    metros: [0],
    pesos: [0],
  }, {
    updateOn: 'blur'
  });

  private operacionCubica = toSignal(
    this.myForm.valueChanges.pipe(
      map(datos => {
        if (!datos) return;
        const { longitud = 0, altura = 0, ancho = 0 } = datos;
        const resultado = longitud! * altura! * ancho!;
        return resultado;
      })
    )
  )

  public resultadoMetros = computed(() => this.operacionCubica() || 0);

  public resultadoPesos = computed(() => {
    const volumenCubico = this.resultadoMetros();
    return volumenCubico / 20 * 2000;
  });

  public isValidField(field: string) {
    return this.myForm.get(field)?.errors && this.myForm.get(field)?.touched;
  }

  public onSubmit() {
    this.myForm.get('metros')?.setValue(this.resultadoMetros());
    this.myForm.get('pesos')?.setValue(this.resultadoPesos());
    const value = this.myForm.getRawValue();
    this.valueForm.emit(value);
    this.myForm.reset();
  }


  public preventLeadingZero(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.value.startsWith('0')) {
      input.value = input.value.replace(/^0+/, '');
    }
  }



}
