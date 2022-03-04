import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Kategori} from "../model/kategory.model";
import {MasterService} from "../services/master.service";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  formInput! : FormGroup;

  constructor(private formBuild: FormBuilder, private mast: MasterService) { }

  ngOnInit(): void {
    this.formInput = this.formBuild.group({
      'category_id' : [null],
      'department_id' : [null],
      'name' :[null],
      'description' :[null]
  })
  }
  simpan():void{
    let data = <Kategori>{};
    data.category_id =this.formInput.controls['category_id'].value
    data.department_id =this.formInput.controls['department_id'].value
    data.name =this.formInput.controls['name'].value
    data.description =this.formInput.controls['description'].value
    this.mast.saveCategory(data).subscribe({
      next:hasil =>{
       alert('simpan berhasil')
      },
      error: err => {
        console.log(err)
      }
    })
  }
}

