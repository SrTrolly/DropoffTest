import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DialogAutoServiceComponent } from "./dialogAutoService.component";
import AutoServicioPageComponent from "../../pages/autoServicioPage/autoServicioPage.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


describe('dialogAutoServiceComponent', () => {
    let fixture: ComponentFixture<DialogAutoServiceComponent>;
    let compiled: HTMLElement;
    let component: DialogAutoServiceComponent;

    // let mockCalculatorService: MockCalculatorService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DialogAutoServiceComponent],
            declarations: [],
            providers: []
        }).compileComponents();
        fixture = TestBed.createComponent(DialogAutoServiceComponent);
        compiled = fixture.nativeElement as HTMLElement;
        component = fixture.componentInstance;

    });

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });

    it('should close dialog return false', () => {
        const close = component.closeDialog();
        expect(close).toBeFalsy();
    });




});