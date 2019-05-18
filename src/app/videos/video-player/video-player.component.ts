import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {filter} from "rxjs/operators";
import {VideoMetadataModel} from "../model/video-metadata.model";
import {Observable} from "rxjs";

@Component({
  selector: 'video-player',
  templateUrl: 'video-player.component.html',
  styleUrls: ['video-player.component.css']
})
export class VideoPlayerComponent {
  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute) {
  }

  id: string = null;
  metadata: VideoMetadataModel = null;

  ngOnInit() {
    this.route.queryParams
      .pipe(
        filter(params => params.file)
      )
      .subscribe(params => {
        this.id = params.file;
      });
    this.getVideoMetadata()
  }

  private getVideoMetadata() {
    this.http.get<VideoMetadataModel>(`cache/metadata/${this.id}`).subscribe(val => this.metadata = val)
  }
}
