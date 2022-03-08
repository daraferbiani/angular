import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {Kategori} from "../model/kategori.model";
import {MasterService} from "../services/master.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  formInput! : FormGroup;
  id! : number;

  constructor(private toastr: ToastrService
              private formBuild: FormBuilder, private mast: MasterService,
              private router: Router, private route: ActivatedRoute) {
    this.formInput = this.formBuild.group({
      // 'category_id' : [null],
      // 'department_id' : [null],
      'name' :new FormControl(null,[Validators.required, this.blankSpace]),
      'description' :new FormControl(null,[Validators.required])
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(rute=>{
      this.id =rute['id'];
      if (this.id){
        this.mast.getDeptById(this.id).subscribe({
          next: value => {
            this.formInput.controls['category_id'].setValue(value.category_id)
            this.formInput.controls['department_id'].setValue(value.department_id)
            this.formInput.controls['name'].setValue(value.name)
            this.formInput.controls['description'].setValue(value.description)
          }
        })
      }
    })
  }
    blankSpace(control: FormControl):{[s:String]:boolean}{
      if(control.value != null && control.value.trim().length === 0 ){
        return {'blankSpace':true}
      }
        return null;
    }
  simpan():void{
    console.log( this.formInput)
    if(this.formAdd.valid){
    let data = <Kategori>{};
    data.category_id =this.formInput.controls['category_id'].value
    data.department_id =this.formInput.controls['department_id'].value
    data.name =this.formInput.controls['name'].value
    data.description =this.formInput.controls['description'].value
    if(this.id){
      data.category_id = this.id;
    }
    this.mast.saveCategory(data).subscribe({
      next:hasil =>{
       //alert('simpan berhasil')
        this.toastr.success(hasil.status, 'success');
        this.router.navigateByUrl("update" +hasil.id);
      },
      error: err => {
        const pesan: any[] = err.status;
        let.msg = '';
        for (let i = 0; i< pesan.length ;i++){
        msg += pesan[i].field+':'+ pesan[i].defultMessage+"/n";
        }
        this.toastr.error('simpan gagal disimpan');
        console.log(err)
      }
    });
  }else{


  update():void{
    let data = <Kategori>{};
    data.category_id =this.formInput.controls['category_id'].value
    data.department_id =this.formInput.controls['department_id'].value
    data.name =this.formInput.controls['name'].value
    data.description =this.formInput.controls['description'].value
    if(this.id){
      data.category_id = this.id;
    }
    this.mast.updateCategory(data).subscribe({
      next:hasil =>{
        alert('simpan berhasil')
        this.router.navigateByUrl("update" +data.category_id);
      },
      error: err => {
        console.log(err)
      }
    })


  }

}
