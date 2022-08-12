import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  loader = false;
  newForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.newForm = this.fb.group({
      file: [''],

    });
   }

  ngOnInit(): void {
  }
  enableClick() {
    const btnid = document.getElementById("fileID");
    if (btnid) {
      btnid.click();
    }
  }
  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      
      const file = event.target.files[0];
      // console.log('dsds')
      if (file) {
        // preview image starts
        const reader = new FileReader();
        reader.onload = (event: any) => { // called once readAsDataURL is completed
          const result = event.target.result.toString();//working
          // update on form
          this.newForm.patchValue({
            LOGO: file.name
          })
        }
        reader.readAsDataURL(file); // read file as data url
      }
    }

  }
}
