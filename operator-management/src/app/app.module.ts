import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AuthGuard } from './core/guards/auth.guard';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './core/components/home/home.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,    
    HttpClientModule
  ],
  providers: [
    {  
      provide: HTTP_INTERCEPTORS,  
      useClass: AuthInterceptor,  
      multi: true  
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
