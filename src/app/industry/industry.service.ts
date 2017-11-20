
// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import { Industry } from './industry';
import{allIndustry} from'./allIndustry';
import { Injectable } from '@angular/core';
// import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Http, Response, Headers, URLSearchParams, RequestOptions ,RequestMethod} from '@angular/http';


@Injectable()
export class IndustryService {
    private _producturl = 'https://staapak-cms.herokuapp.com/content/industry';

    private byIdurl = "https://staapak-cms.herokuapp.com/content/industry"


    // console.log(_producturl);
    constructor(private _http: Http) { }

    getIndustryObservable(): Observable<Industry[]> {
        return this._http.get(this._producturl)
            .map(this.extractData)
          .catch(this.handleErrorObservable);
    }


    private creUrl = "https://staapak-cms.herokuapp.com/content/create_industry";
    // createbservable(temp: Industry): Observable<Industry> {
    createbservable(temp: Industry): Observable<number> {    
          
        let headersObj = new Headers({ 'Content-Type': 'application/json;'});
        // let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        headersObj.append('Access-Control-Allow-Origin', 'true');
        headersObj.append('Access-Control-Allow-Credentials', 'true');
        headersObj.append('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
        headersObj.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
        // console.log(headers)
      
        let options = new RequestOptions({ headers: headersObj });
        let body = JSON.stringify(temp);
        return this._http.post(this.creUrl, body, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
                    
    }
      allUrl="https://staapak-cms.herokuapp.com/content/build_industry "
    getIndustryAll(): Observable<allIndustry[]> {
        return this._http.get(this.allUrl)
            .map(this.extractData)
          .catch(this.handleErrorObservable);
    }
    
    //Fetch article by id
    getIndustryById(industryId: string): Observable<Industry> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        console.log(this.byIdurl + "/" + industryId);
        return this._http.get(this.byIdurl + "/" + industryId)
            .map(this.extractData)
            .catch(this.handleErrorObservable);

    }

    private updateUrl = "https://staapak-cms.herokuapp.com/content/industry "

    //Update industry info
    updateIndustry(indu: Industry): Observable<number> {

        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        let body = JSON.stringify(indu);
        console.log(body);
        return this._http.put(this.updateUrl + "/" + indu.id, body, options)
            .map(success => success.status)
            .catch(this.handleErrorObservable);
    }

    //Delete article	
    deleteArticleById(industryId: string): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this._http.delete(this.byIdurl + "/" + industryId)
            .map(success => success.status)
            .catch(this.handleErrorObservable);
    }
    
    private handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.status);
    }


    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

}





// https://staapak-cms.herokuapp.com/content/create_industry

// https://staapak-cms.herokuapp.com/content/build_industry         (info)


// -- 

// https://staapak-cms.herokuapp.com/content/industry/1
// https://staapak-cms.herokuapp.com/content/industry  all


