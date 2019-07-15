import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/User';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyServiceService } from 'src/app/_services/alertify-service.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor (
    private userService: UserService,
    private alertify: AlertifyServiceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user']
    }, err => this.alertify.error(err));

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];

    this.galleryImages = this.getImages();
  }

  getImages() {
    const imgUrls = [];
    for (let i = 0; i < this.user.photos.length; i++) {
      imgUrls.push({
        small: this.user.photos[i].url,
        medium: this.user.photos[i].url,
        large: this.user.photos[i].url,
        description: this.user.photos[i].description
      })
    }
    return imgUrls
  }

  // loadUser() {
  //   const id = +this.route.snapshot.params['id'];
  //   // '+' is used to convert id from string to number
  //   this.userService.getUser(id).subscribe(user => this.user = user,
  //     err => this.alertify.error(err)
  //   );
  // }
}
