import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from 'src/app/core/services/message.service';
import { MessageResponse } from '../../../../core/models/message';
import { AddMessageComponent } from '../add-message/add-message.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  loading = true;
  form1: FormGroup;
  form2: FormGroup;

  dataSource: MessageResponse[] = [];

  displayedColumns: string[] = ['ID', 'message', 'tags'];
  constructor(
    private _snackBar: MatSnackBar,
    private messageService: MessageService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {

    //Getting all messages
    this.getAllMessages();

    this.form1 = new FormGroup({
      searchID: new FormControl(null, Validators.required),
    });
    this.form2 = new FormGroup({
      searchTAG: new FormControl(null, Validators.required),
    });
  }

  getAllMessages(): void {
    this.loading = true;
    this.messageService.getAllMessages().subscribe((res: any) => {
      this.dataSource = res.msgs;
      this.loading = false;
      console.log(this.dataSource);      
    });
  }

  addMessage(): void {
    
    const dialogo = this.dialog.open(AddMessageComponent);
    dialogo.afterClosed().subscribe( res => {
      this.getAllMessages();
    });
  }
}
