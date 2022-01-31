import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PagesRoutes } from './pages.routing';
import { CredentialsComponent } from './components/credentials/credentials.component';
import { MessageComponent } from './components/message/message.component';
import { MaterialModule } from '../../material.module';
import { FlexModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    CredentialsComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PagesRoutes),
    MaterialModule,
    FlexModule
  ]
})
export class PagesModule { }
