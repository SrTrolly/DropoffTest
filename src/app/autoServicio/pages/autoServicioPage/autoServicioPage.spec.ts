import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { autoServiceForm } from '../../interfaces/autoServicioForm.interface';
import AutoServicioPageComponent from './autoServicioPage.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

const data: autoServiceForm = {
    altura: 2,
    ancho: 2,
    longitud: 2,
    metros: 8,
    nombre: 'Nintendo',
    pesos: 1000,
}

const dataFail: autoServiceForm = {
    altura: 10,
    ancho: 1000,
    longitud: 1000,
    metros: 1000,
    nombre: 'Nintendo',
    pesos: 1000,
}



describe('AutoServicioForm', () => {
    let fixture: ComponentFixture<AutoServicioPageComponent>;
    let compiled: HTMLElement;
    let component: AutoServicioPageComponent;

    // let mockCalculatorService: MockCalculatorService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AutoServicioPageComponent, BrowserAnimationsModule],
            declarations: [],
            providers: []
        }).compileComponents();
        fixture = TestBed.createComponent(AutoServicioPageComponent);
        compiled = fixture.nativeElement as HTMLElement;
        component = fixture.componentInstance;

    });

    it('should create the app', () => {
        console.log(compiled);
        expect(component).toBeTruthy();
    });

    it('return the correct cubic meter', () => {
        const isCorrect = component['esMetroCubicoCorrecto'](data);
        expect(isCorrect).toBeTruthy();
    });

    it('should generate random numbers', () => {
        const number = component['generarNumAleatorio']();
        expect(number.length).toBe(6);
    });

    it('onShowDialog works', () => {
        const spy = spyOn((component as any), 'esMetroCubicoCorrecto').and.callThrough();

        component.onShowDialog(data);
        fixture.detectChanges();

        expect(component.visible).toBeTruthy();
        expect(component.isValid()).toBeTruthy();
        expect(spy).toHaveBeenCalled();
    });

    it('onShowDialog not works', () => {
        const spy = spyOn((component as any), 'esMetroCubicoCorrecto').and.callThrough();

        component.onShowDialog(dataFail);
        fixture.detectChanges();

        expect(component.visible).toBeTruthy();
        expect(component.isValid()).toBeFalsy();
        expect(spy).toHaveBeenCalled();
    });


});