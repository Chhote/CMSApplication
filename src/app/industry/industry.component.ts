import { Component, OnInit } from '@angular/core';
import { IndustryService } from './industry.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Industry } from './industry'
import { allIndustry } from './allIndustry'
import { Roll } from '../roll'
import { RollService } from '../roll.service';
import{RollInfo} from'../roll.info';
@Component({
  selector: 'app-industry',
  templateUrl: './industry.component.html',
  styleUrls: ['./industry.component.css']
})
export class IndustryComponent implements OnInit {

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
  rollValidation = false;
  roleInfoValidation = false;
  rolls: Roll[];
  //Create form
  industryForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  industryInfoForm = new FormGroup({
    indus_id: new FormControl('', Validators.required),
    // name: new FormControl('', Validators.required),
    employed: new FormControl('', Validators.required),
    growth: new FormControl('', Validators.required),
    req: new FormControl('', Validators.required),
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
    careet_path: new FormControl('', Validators.required),
    role_id:new FormControl('', Validators.required),
  
  });
  constructor(private industryService: IndustryService, private rollServe: RollService) { }


  ngOnInit() {

    this.fetchIndustry();
    // this.fetchRoll();
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
    // console.log(allIndust);
    this.industryService.saveIndustry(allIndust).subscribe(data =>
      this.statusCode = data)
    this.fetchIndustry();
  }

  //Load article by id to edit
  loadIndustryToEdit(industryId: string) {
    // this.preProcessConfigurations();
    this.industryService.getIndustryById(industryId)
      .subscribe(indus => {
        this.industryIdToUpdate = indus.name;
        this.industryForm.setValue({ name: indus.name });
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

  // fetchRole(): void {
  //   this.roleServe.getRole()
  //     .subscribe(roles => this.roles = roles,
  //     error => this.errorMessage = <any>error);
  // }

  // onRoleFormSubmit() {
  //   this.rollValidation = true;
  //   if (this.industryForm.invalid) {
  //     return; //Validation failed, exit from method.
  //   }
  //   //Form is valid, now perform create or update
  //   this.preProcessConfigurations();
  //   let roll = this.rollForm.value;
  //   this.rollServe.createRoll(roll).subscribe(successCode => {
  //     this.statusCode = successCode;
  //     this.fetchRoll();
  //     // this.backToCreateRoll();
  //   }, errorCode => this.statusCode = errorCode);
  // }


  saveRollInfo() {

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






