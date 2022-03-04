import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  formBuku!: FormGroup;
  constructor(
    private formBuild: FormBuilder,){}

  ngOnInit(): void {
    this.formBuku = this.formBuild.group({
      'nama' : [null],
      'email' : [null],
      'alamat' :[null]
    })
  }

  simpan():void{
    console.log(this.formBuku.controls)
  }
}
