import { TableItemDirective } from "./table-item.directive";
import {
  Component,
  OnInit,
  Input,
  ContentChild,
  TemplateRef
} from "@angular/core";

@Component({
  selector: "app-my-table",
  templateUrl: "./my-table.component.html",
  styleUrls: ["./my-table.component.scss"]
})
export class MyTableComponent {
  @Input()
  dados: any[];

  @Input()
  colunas: any[];

  @ContentChild(TableItemDirective, { read: TemplateRef, static: false })
  tableItemTemplate;
}
