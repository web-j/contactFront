import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Contact } from '../contact-model/contact.model';
import { ContactService } from '../contact-service/contact.service';
import { DialogContactComponent } from '../dialog-contact/dialog-contact.component';
import { toast } from '../../constant/constant-message';
import { SpinnerComponent } from 'src/app/spinner/spinner.component';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.scss']
})
export class ContactManagerComponent implements OnInit {

  public displayedColumns: string[] = ['name', 'email', 'gender', 'phone', 'action'];
  public dataSource: Contact[] = [];
  public loading: any;

  constructor(
    private service: ContactService,

    public dialog: MatDialog,
    public snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllContacts();
  }

  getAllContacts(): void {
    this.loading = this.spinner();
    this.service.getAll().subscribe(success => {
      setTimeout(() => {
        this.loading.close();
        this.dataSource = success;
      }, 500);
    });
  }

  openDialog(id?: any): void {
    const dialogRef = this.dialog.open(DialogContactComponent, {
      width: '500px',
      data: id || null
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllContacts();
    });
  }

  delete(contact: Contact) {
    this.service.delete(contact.id).subscribe(success => {
      this.toast(toast.delete.message, toast.delete.action);
      this.getAllContacts();
    });
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
