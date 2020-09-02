import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Contact } from '../contact-model/contact.model';
import { SpinnerComponent } from 'src/app/spinner/spinner.component';
import { ContactService } from '../contact-service/contact.service';
import { toast } from 'src/app/constant/constant-message';

@Component({
  selector: 'app-dialog-contact',
  templateUrl: './dialog-contact.component.html',
  styleUrls: ['./dialog-contact.component.scss']
})
export class DialogContactComponent implements OnInit {

  public obj: Contact = new Contact();
  public loading: any;
  public edit = false;

  constructor(
    private service: ContactService,

    public snack: MatSnackBar,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Contact) { }

  ngOnInit(): void {
    if (this.data != null) {
      this.getOne(this.data);
    }
  }

  getOne(id: any): void {
    this.loading = this.spinner();
    this.service.getOne(id).subscribe(res => {
      setTimeout(() => {
        this.loading.close();
        this.obj = res;
      }, 500);

      this.edit = true;
    });
  }

  saveOrUpdate(): void {
    if (this.edit) {
      this.service.update(this.obj).subscribe(
        success => {
          this.obj = success;
          this.toast(toast.update.message, toast.update.action);
          this.close();
        }, error => {
          this.toast(toast.error.message, toast.error.action);
        }
      );
    } else {
      this.service.save(this.obj).subscribe(
        success => {
          this.obj = success;
          this.toast(toast.save.message, toast.save.action);
          this.close();
        }, error => {
          this.toast(toast.error.message, toast.error.action);
        }
      );
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  toast(message: string, action: string) {
    this.snack.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  spinner() {
    return this.dialog.open(SpinnerComponent, {
      width: '100%',
      height: '100%',
      disableClose: true,
      hasBackdrop: true,
      panelClass: 'panel',
    });
  }


}
