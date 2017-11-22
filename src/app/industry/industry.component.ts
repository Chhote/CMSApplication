import { Component, OnInit } from '@angular/core';
import { IndustryService } from './industry.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Industry } from './industry'
import { allIndustry } from './allIndustry'
import { Role } from '../role'
import { RoleService } from '../role.service';
import{RoleInfo} from'../role.info';
@Component({
  selector: 'app-industry',
  templateUrl: './industry.component.html',
  styleUrls: ['./industry.component.css']
})
export class IndustryComponent implements OnInit {
  prop = 'Industry';
  //Component properties Industry
  industryes: Industry[];
  allIndustrys: allIndustry[];
  statusCode: number;
  requestProcessing = false;
  industryIdToUpdate = null;
  processValidation = false;
  industryValidation = false;
  errorMessage: String;
  //Component properties Roll
  roleValidation = false;
  roleInfoValidation = false;
  roles: Role[];
  //Create form
  industryForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  industryInfoForm = new FormGroup({
    // name: new FormControl('', Validators.required),
    indus_id: new FormControl('', Validators.required),
    employed: new FormControl('', Validators.required),
    growth: new FormControl('', Validators.required),
    req: new FormControl('', Validators.required),
    video: new FormControl(''),
    audio: new FormControl(''),
    description: new FormControl(
      //    [
      //   '',Validators.required,
      //   Validators.minLength(4)

      // ]
      '', Validators.required),

  });


  //Create form Roll
  roleForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  //Create form for Job Roll

  roleInfoForm = new FormGroup({
    description: new FormControl('', Validators.required),
    qual_req: new FormControl('', Validators.required),
    indus_id: new FormControl('', Validators.required),
    skill: new FormControl('', Validators.required),
    career_path: new FormControl('', Validators.required),
    role_id:new FormControl('', Validators.required),
    video: new FormControl(''),
    audio: new FormControl(''),
  
  });
  constructor(private industryService: IndustryService, private roleServe: RoleService) { }


  ngOnInit() {

    this.fetchIndustry();
    this.fetchRole();
  }

  fetchIndustry(): void {
    this.industryService.getIndustryObservable()
      .subscribe(industryes => this.industryes = industryes,
      error => this.errorMessage = <any>error);
  }



  //Handle create and update article
  onIndustryFormSubmit() {
    //  console.log('log')
    this.processValidation = true;
    if (this.industryForm.invalid) {
      return; //Validation failed, exit from method.
    }
    //Form is valid, now perform create or update
    this.preProcessConfigurations();
    let industry = this.industryForm.value;
    if (this.industryIdToUpdate === null) {
      //Generate industry id then create industry
      this.industryService.getIndustryObservable()
        .subscribe(indu => {
          //Create industry
          this.industryService.createbservable(industry)
            .subscribe(successCode => {
              this.statusCode = successCode;
              this.fetchIndustry();
              this.backToCreateIndustry();
            },
            errorCode => this.statusCode = errorCode
            );
        });
    } else {
      //Handle update industry
      industry.id = this.industryIdToUpdate;
      this.industryService.updateIndustry(industry)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.fetchIndustry();
          this.backToCreateIndustry();
        },
        errorCode => this.statusCode = errorCode);
    }
  }

  saveIndustryInfo() {
    this.industryValidation = true;
    if (this.industryInfoForm.invalid) {
      return; //Validation failed, exit from method.
    }
    this.preProcessConfigurations();
    let allIndust = this.industryInfoForm.value;
    this.industryService.saveIndustry(allIndust).subscribe(data =>
      this.statusCode = data)
    this.fetchIndustry();
  }

  //Load article by id to edit
  loadIndustryToEdit(industryId: string) {
    this.preProcessConfigurations();
    this.industryService.getIndustryById(industryId)
      .subscribe(indus => {

        this.industryIdToUpdate = indus.id;
        this.industryForm.setValue({ name:name });
        this.processValidation = true;
        this.requestProcessing = false;
      },
      errorCode => this.statusCode = errorCode);
  }

  //Delete article
  deleteIndustry(articleId: string) {
    this.preProcessConfigurations();
    this.industryService.deleteArticleById(articleId)
      .subscribe(successCode => {
        // this.statusCode = successCode;
        //Expecting success code 204 from server
        this.statusCode = 204;
        this.fetchIndustry();
        this.backToCreateIndustry();
      },
      errorCode => this.statusCode = errorCode);
  }

  //  Job roll code Strat 
  // *************************

  fetchRole(): void {
    this.roleServe.getRole()
      .subscribe(roles => this.roles = roles,
      error => this.errorMessage = <any>error);
  }

  onRoleFormSubmit() {
    this.roleValidation = true;
    if (this.roleForm.invalid) {
      return; //Validation failed, exit from method.
    }
    //Form is valid, now perform create or update
    this.preProcessConfigurations();
    let role = this.roleForm.value;
    console.log(role);
    this.roleServe.createRole(role).subscribe(successCode => {
      this.statusCode = successCode;
       this.fetchRole();
      // this.backToCreateRoll();
    }, errorCode => this.statusCode = errorCode);
  }


  saveRoleInfo() {
    this.roleInfoValidation = true;
    if (this.roleInfoForm.invalid) {
      return; //Validation failed, exit from method.
    }
    this.preProcessConfigurations();
    let allrole = this.roleInfoForm.value;
    this.roleServe.saveRoleInfo(allrole).subscribe(data =>
      this.statusCode = data)
    this.fetchIndustry();
    

  }
  //Perform preliminary processing configurations
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }

  //Go back from update to create
  backToCreateIndustry() {
    this.industryIdToUpdate = null;
    this.industryForm.reset();
    this.processValidation = false;
  }

}






// function areNullOrUndefined(arr) {
//   for (var i = 0; i < arr.length; i++) {
//      var itm = arr[i];
//      if (itm === null || itm === undefined) {
//        return true;
//      }
//   }
//   return false;
// }