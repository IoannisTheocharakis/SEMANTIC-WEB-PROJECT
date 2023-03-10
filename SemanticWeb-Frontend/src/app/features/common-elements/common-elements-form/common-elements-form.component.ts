import { Component, OnInit } from "@angular/core";
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

@Component({
  standalone: true,
  imports: [MaterialFormModule, InfoCardComponent],
  selector: "app-common-elements-form",
  templateUrl: "./common-elements-form.component.html",
  styleUrls: ["./common-elements-form.component.scss"],
})
export class CommonElementsFormComponent implements OnInit {
  subscriptions: Subscription = new Subscription();
  form: UntypedFormGroup;
  inputAppearance = "outline";
  inputColor = "accent";
  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.form = this.fb.group({
      endpoint1: new UntypedFormControl(null, Validators.required),
      endpoint2: new UntypedFormControl(null, Validators.required),
      onlyCIDOC: new UntypedFormControl(null, Validators.required),
      limit: new UntypedFormControl(10),
      page: new UntypedFormControl(0),
    });
  }
  onSubmit() {}
}
