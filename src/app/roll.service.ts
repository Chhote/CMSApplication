
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions, RequestMethod } from '@angular/http';
import { Roll } from './roll'

@Injectable()
export class RollService {


    constructor(private http: Http) { }


    //CURD operation start
    
    
    // private crerollUrl = ""
 


    // createRoll(roll: Roll): Observable<number> {

    //     //Error handel  Access-Control-Allow-Origin
    //     let headersObj = new Headers({ 'Content-Type': 'application/json;' });
    //     headersObj.append('Access-Control-Allow-Origin', 'true');
    //     headersObj.append('Access-Control-Allow-Credentials', 'true');
    //     headersObj.append('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
    //     headersObj.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    //     // console.log(headers)

    //     let options = new RequestOptions({ headers: headersObj });
    //     let body = JSON.stringify(roll);
    //     return this.http.post(this.crerollUrl, body, options)
    //         .map(this.extractData)
    //         .catch(this.handleErrorObservable);

    // }
    // private getUrl = ""

    // getRoll(): Observable<Roll[]> {
    //     return this.http.get(this.getUrl)
    //         .map(this.extractData)
    //       .catch(this.handleErrorObservable);
    // }
    // private saveInfoUrl = ""
    // ssaveRollInfo(saveInfo: Roll): Observable<number> {
    //     //Error handel  Access-Control-Allow-Origin
    //     let headersObj = new Headers({ 'Content-Type': 'application/json;' });
    //     headersObj.append('Access-Control-Allow-Origin', 'true');
    //     headersObj.append('Access-Control-Allow-Credentials', 'true');
    //     headersObj.append('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
    //     headersObj.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    //     // console.log(headers)

    //     let options = new RequestOptions({ headers: headersObj });
    //     let body = JSON.stringify(saveInfo);
    //     console.log(body)
    //     return this.http.post(this.saveInfoUrl, body, options)
    //         .map(this.extractData)
    //         .catch(this.handleErrorObservable);

    // }

//End CURD operation
    //Error hendel code
    // private handleErrorObservable(error: Response | any) {
    //     console.error(error.message || error);
    //     return Observable.throw(error.status);
    // }


    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }
}
