import { Component, OnInit } from '@angular/core';
import { IndustryService } from './industry.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Industry } from './industry'
import { allIndustry } from './allIndustry'
@Component({
  selector: 'app-industry',
  templateUrl: './industry.component.html',
  styleUrls: ['./industry.component.css']
})
export class IndustryComponent implements OnInit {

  //Component properties
  industryes: Industry[];
  allIndustry: allIndustry[];
  statusCode: number;
  requestProcessing = false;
  industryIdToUpdate = null;
  processValidation = false;
  errorMessage: String;
  industry = new Industry();
  //Create form
  industryForm = new FormGroup({
    name: new FormControl('', Validators.required),
    // category: new FormControl('', Validators.required)	   
  });

  constructor(private industryService: IndustryService) { }


  ngOnInit() {

    this.fetchIndustry();
  }

  fetchIndustry(): void {
    this.industryService.getIndustryObservable()
      .subscribe(industryes => this.industryes = industryes,
      error => this.errorMessage = <any>error);
      this.industryService.getIndustryAll()
      .subscribe(allIndustry =>this.allIndustry=allIndustry, 
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


  //Load article by id to edit
  loadIndustryToEdit(industryId: string) {
    // this.preProcessConfigurations();
    this.industryService.getIndustryById(industryId)
      .subscribe(indus => {
        this.industryIdToUpdate = indus.id;
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
        //this.statusCode = successCode;
        //Expecting success code 204 from server
        this.statusCode = 204;
        this.fetchIndustry();
        this.backToCreateIndustry();
      },
      errorCode => this.statusCode = errorCode);
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






