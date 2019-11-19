import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RepositoryListComponent } from './repositories/repository-list/repository-list.component';
import { FollowersComponent } from './followers/followers.component';
import { RepositoryComponent } from './repositories/repository/repository.component';
import { UploadComponent } from './upload/upload.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { AdComponent } from './ad/ad.component';
import { LoginComponent } from './login/login.component';
import { MantenimientoexamenComponent } from './mantenimientoexamen/mantenimientoexamen.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'upload', component: UploadComponent },
  { path: 'login', component: LoginComponent,  pathMatch: 'full' },
  { path: 'mantenimientotest', component: MantenimientoexamenComponent,  pathMatch: 'full' },
  { path: 'examen', component: RegisterComponent,  pathMatch: 'full' }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // enableTracing: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
