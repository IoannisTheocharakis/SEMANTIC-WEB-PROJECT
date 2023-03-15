import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { BehaviorSubject, Subject, Subscription } from "rxjs";
import { LoaderService } from "src/app/loader/loader.service";
import { MaterialFormModule } from "src/app/shared/material-form.module";
import { InfoCardComponent } from "src/app/shared/standalone-components/info-card/info-card.component";
import { CommonElementsService } from "../service/common-elements.service";
import { AutocompleteComponent } from "src/app/shared/standalone-components/autocomplete/autocomplete.component";
import { CoreService } from "src/app/core/services/core.service";
import { Dataset } from "src/app/core/models/dataset.model";

@Component({
  standalone: true,
  imports: [MaterialFormModule, InfoCardComponent, AutocompleteComponent],
  selector: "app-common-elements-form",
  templateUrl: "./common-elements-form.component.html",
  styleUrls: ["./common-elements-form.component.scss"],
})
export class CommonElementsFormComponent implements OnInit {
  subscriptions: Subscription = new Subscription();
  datasets$: BehaviorSubject<Dataset[]> = new BehaviorSubject([]);
  resetSubject$ = new Subject();
  initDatasetAutocomplete$: BehaviorSubject<number> = new BehaviorSubject(0);

  form: UntypedFormGroup;
  inputAppearance = "outline";
  inputColor = "accent";
  constructor(
    private coreService: CoreService,
    private fb: UntypedFormBuilder,
    public loaderService: LoaderService,
    private commonElementsService: CommonElementsService
  ) {}

  ngOnInit() {
    this.initForm();
    this.setDatasetsAutocomplete();
  }
  setDatasetsAutocomplete() {
    this.subscriptions.add(
      this.coreService.datasets$.subscribe((data) => {
        if (data != null && data.length !== 0) {
          this.datasets$.next(data);
        }
      })
    );
  }

  initForm() {
    this.form = this.fb.group({
      endpoint1: new UntypedFormControl(null, Validators.required),
      endpoint2: new UntypedFormControl(null, Validators.required),
      onlyCIDOC: new UntypedFormControl(false, Validators.required),
      limit: new UntypedFormControl(10),
      page: new UntypedFormControl(0),
      totalEntries: new UntypedFormControl(0),
    });
  }
  resetForm() {
    this.resetSubject$.next(true);
    this.form.reset();
    this.form.get("onlyCIDOC").setValue(false);
    this.form.get("limit").setValue(10);
    this.form.get("page").setValue(0);
    this.form.get("totalEntries").setValue(0);
  }
  setDatasetAutocomplete($event: Dataset, inputName: string) {
    if (!$event) {
      this.form.get(inputName).setValue(null);
    } else {
      this.form.get(inputName).setValue($event.endpoint);
    }
  }
  onSubmit() {
    this.form.get("totalEntries").setValue(0);
    this.commonElementsService.setRDFClassesRequest(this.form.value);
    this.form.get("totalEntries").setValue(0);
    this.commonElementsService.setPropertiesRequest(this.form.value);
  }
}
