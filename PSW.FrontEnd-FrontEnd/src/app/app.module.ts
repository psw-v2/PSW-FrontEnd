import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AdminModule } from '../components/Admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorModule } from '../components/Author/author.module';
import { TouristModule } from '../components/Tourist/tourist.module';
import { UniversalModule } from '../components/Universal/universal.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AdminModule,
    AuthorModule,
    TouristModule,
    UniversalModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
