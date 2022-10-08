import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommitListComponent } from './components/commit-list/commit-list.component';
import { OrganizationSearchComponent } from './components/organization-search/organization-search.component';
import { RepositoryListComponent } from './components/repository-list/repository-list.component';

const routes: Routes = [
  { path: '', component: OrganizationSearchComponent },
  { path: 'organization', component: RepositoryListComponent },
  { path: 'repository', component: CommitListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
