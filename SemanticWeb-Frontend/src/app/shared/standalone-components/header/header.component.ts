import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Injectable,
  OnDestroy,
  Input,
} from "@angular/core";
import { Subject } from "rxjs";
import { MaterialFormModule } from "../../material-form.module";
import { MaterialMinModule } from "../../material-min.module";
import { AppColors } from "src/assets/app-colors";
@Injectable()
@Component({
  standalone: true,
  imports: [MaterialFormModule, MaterialMinModule],
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggleMainSidebar: EventEmitter<any> = new EventEmitter();
  @Input("tog") checked!: boolean;
  toggleDashBoardViewText = "Agent";
  color = AppColors.electricBlue;
  status!: string;
  componentDestroyed$: Subject<boolean> = new Subject();
  user: any = {
    name: "Giannis",
    lastName: "Theocharakis",
  };
  isAdmin: boolean = true;
  userFullName$!: string;

  constructor() {}

  ngOnInit() {}

  toggleSideBar() {
    this.toggleMainSidebar.emit();
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300);
  }

  ngOnDestroy() {}
}
