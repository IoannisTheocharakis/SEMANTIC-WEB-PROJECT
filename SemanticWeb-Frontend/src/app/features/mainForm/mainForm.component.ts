import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { LoaderService } from "src/app/loader/loader.service";
import { MaterialFormModule } from "src/app/shared/material-form.module";
import { InfoCardComponent } from "src/app/shared/standalone-components/info-card/info-card.component";
import { SpinnerComponent } from "src/app/shared/standalone-components/spinner/spinner.component";
import { AppColors } from "src/assets/app-colors";
import { MainFormService } from "./service/mainForm.service";
@Component({
  standalone: true,
  imports: [MaterialFormModule, InfoCardComponent, SpinnerComponent],
  selector: "app-mainForm",
  templateUrl: "./mainForm.component.html",
  styleUrls: ["./mainForm.component.scss"],
})
export class MainFormComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  title = "Add Database";
  form: UntypedFormGroup;
  color = AppColors.white;
  backgroundColor = AppColors.primaryGray;
  inputAppearance = "outline";
  inputColor = "accent";
  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private mainFormService: MainFormService,
    public loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.form = this.fb.group({
      datasetName: new UntypedFormControl(null, Validators.required),
      url: new UntypedFormControl(null, Validators.required),
      creator: new UntypedFormControl(null, Validators.required),
      description: new UntypedFormControl(null),
      numberOfTriples: new UntypedFormControl(null),
      numberOfEntities: new UntypedFormControl(null),
      numberOfDistinceSubjects: new UntypedFormControl(null),
    });
  }

  backToList() {
    this.router.navigate([""]);
  }
  resetForm() {
    this.form.reset();
  }

  onSubmit() {
    console.log(this.form.value);
  }
  testRequest() {
    this.mainFormService.requestDatasets().subscribe((data) => {
      console.log(data);
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
