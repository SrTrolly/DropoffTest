import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AutoServicioFormComponent } from "./autoServicioForm.component";



describe('AutoServicioForm', () => {
    let fixture: ComponentFixture<AutoServicioFormComponent>;
    let compiled: HTMLElement;
    let component: AutoServicioFormComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AutoServicioFormComponent],
            providers: [
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(AutoServicioFormComponent);
        compiled = fixture.nativeElement as HTMLElement;
        component = fixture.componentInstance;

    });

    it('should create the app', () => {
        console.log(compiled);
        expect(component).toBeTruthy();
    });

    it('should onSubmit works', () => {
        const spy = spyOn(component.valueForm, 'emit');
        const spy2 = spyOn(component.myForm, 'reset');

        component.onSubmit();

        expect(spy).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
    });
});