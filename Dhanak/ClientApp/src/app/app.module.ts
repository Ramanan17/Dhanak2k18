import { EventDetailsComponent } from './components/event-details/event-details.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';



import { EditEventComponent } from './components/edit-event/edit-event.component';
import { NewEventComponent } from './components/new-event/new-event.component';
import { DataTablesModule } from 'angular-datatables';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {HttpModule} from '@angular/http'
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { DataService } from './services/data.service';
import { DatatableComponent } from './datatable/datatable.component';
import { EventComponent } from './components/event/event.component';


import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,

} from '@angular/material';
import { Response } from '@angular/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrgansisersComponent } from './organsisers/organsisers.component';
import { MatTreeModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import 'hammerjs';
import { RoleGuardService } from './services/role-guard.service';
import { ToolbarService } from './services/toolbar.service';
import { ScriptService } from './services/script.service';
import { MainComponent } from './components/main/main.component';
import { EventsComponent } from './components/events/events.component';

export const firebaseConfig ={
  apiKey: 'AIzaSyBTLixnmrPVB9x9EM3ilJb0rAmFQlLfKN0',
    authDomain: 'dhanak-cfdad.firebaseapp.com',
    databaseURL: 'https://dhanak-cfdad.firebaseio.com',
    projectId: 'dhanak-cfdad',
    storageBucket: 'dhanak-cfdad.appspot.com',
    messagingSenderId: '70648789644'
};
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    NewEventComponent,
    EditEventComponent,
    DatatableComponent,
    EventComponent,
    DashboardComponent,
    OrgansisersComponent,
    MainComponent,
    EventDetailsComponent,
    EventsComponent,



  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    NgbModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    DataTablesModule,
    FormsModule,

    CdkTableModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,

    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      {path:'new',component:NewEventComponent,canActivate:[AuthGuardService]},
      {path:'edit/:id',component:EditEventComponent,canActivate:[AuthGuardService]},
      {path:'data',component:DatatableComponent,canActivate:[RoleGuardService],data:{
        expectedRole: 'Admin'
      } },
      {path:'event',component:EventComponent},
      { path: 'events', component: MainComponent,
      children: [
        {
          path: ':event-name',
          component: EventDetailsComponent
        }
      ]
    },

      {path:'dash',component:DashboardComponent,canActivate:[AuthGuardService]},
      {path:'org',component:OrgansisersComponent,canActivate:[RoleGuardService],data:{
        expectedRole:'Organiser'
      }
}

    ])
  ],
  providers: [DataService,AuthService,ToolbarService,ScriptService],
  bootstrap: [AppComponent]
})
export class AppModule { }
