import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {VideoListItemModel} from "../model/video-list-item.model";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'video-list',
  templateUrl: 'video-list.component.html',
  styleUrls: ['video-list.component.css']
})
export class VideoListComponent {
  constructor(private http: HttpClient,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  videoList: Observable<VideoListItemModel[]>;
  uploadForm: FormGroup;

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
    this.refreshVideoList();
  }

  private refreshVideoList() {
    this.videoList = this.http.get<VideoListItemModel[]>(`server/listVideos`);
  }

  onVideoChose(id: string) {
    console.log(`Chosen id: ${id}`);
    this.router.navigate([`/video`], {queryParams: {file: id}});
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);

    this.http.post<any>('server/upload', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
