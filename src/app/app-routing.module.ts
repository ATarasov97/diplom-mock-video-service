import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VideoListComponent} from "./videos/video-list/video-list.component";
import {VideoPlayerComponent} from "./videos/video-player/video-player.component";

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'videos',
    pathMatch: 'full'
  },
  {
    path: 'videos',
    component: VideoListComponent
  },
  {
    path: 'video',
    component: VideoPlayerComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
