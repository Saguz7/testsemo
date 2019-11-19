import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule , ReactiveFormsModule}   from '@angular/forms';

import { AppComponent } from './app.component';
// 共享模块
import { SharedModule } from './shared/shared.module';
// 路由模块
import { AppRoutingModule } from './app-routing.module';
// 核心模块
import { CoreModule } from './core/core.module';
// 特性模块
import { RepositoriesModule } from './repositories/repositories.module';
import { GraphqlModule } from './graphql/graphql.module';
import { MantenimientoexamenComponent } from './mantenimientoexamen/mantenimientoexamen.component';
import { RegisterComponent } from './register/register.component';

import { FollowersComponent } from './followers/followers.component';
import { UploadComponent } from './upload/upload.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { AdComponent } from './ad/ad.component';
import * as $ from "jquery";
import { LoginComponent } from './login/login.component';
import { CreateTetsComponent } from './createtets/createtets.component';
import { CreateQuestionComponent } from './createquestion/createquestion.component';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
@NgModule({
  declarations: [
    AppComponent,
    FollowersComponent,
    UploadComponent,
    SubscriptionComponent,
    AdComponent,
    LoginComponent,
    MantenimientoexamenComponent,
    CreateTetsComponent,
    CreateQuestionComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    FormsModule,
    AppRoutingModule,
    GraphqlModule,
    HttpClientModule,
    RepositoriesModule,
    SharedModule,
    ButtonModule,
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
