import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AdminModule } from '../components/Admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorModule } from '../components/Author/author.module';
import { TouristModule } from '../components/Tourist/tourist.module';
import { UniversalModule } from '../components/Universal/universal.module';
import { NavbarComponent } from '../components/Universal/navbar/navbar.component';
import { FooterComponent } from '../components/Universal/footer/footer.component';
import { AuthModule } from '../auth/auth.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, NavbarComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    AdminModule,
    AuthorModule,
    TouristModule,
    UniversalModule,
    AuthModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
