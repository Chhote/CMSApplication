
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions, RequestMethod } from '@angular/http';
import { Role } from './role'
import{RoleInfo} from'./role.info';

@Injectable()
export class RoleService {


    constructor(private http: Http) { }


    //CURD operation start
    
    
    private creroleUrl = "https://staapak-cms.herokuapp.com/content/create_role"
 


    createRole(role: Role): Observable<number> {

        //Error handel  Access-Control-Allow-Origin
        let headersObj = new Headers({ 'Content-Type': 'application/json;' });
        headersObj.append('Access-Control-Allow-Origin', 'true');
        headersObj.append('Access-Control-Allow-Credentials', 'true');
        headersObj.append('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
        headersObj.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
        // console.log(headers)

        let options = new RequestOptions({ headers: headersObj });
        let body = JSON.stringify(role);
        return this.http.post(this.creroleUrl, body, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);

    }
    private getUrl = "https://staapak-cms.herokuapp.com/content/role"

    getRole(): Observable<Role[]> {
        return this.http.get(this.getUrl)
            .map(this.extractData)
          .catch(this.handleErrorObservable);
    }
    // private saveInfoUrl = "https://staapak-cms.herokuapp.com/content/build_role"
    // saveRoleInfo(saveInfo: Role): Observable<number> {
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


    private saveInfoUrl = "https://staapak-cms.herokuapp.com/content/build_role"
    saveRoleInfo(saveInfo: RoleInfo): Observable<number> {
 

     
        //Error handel  Access-Control-Allow-Origin
        let headersObj = new Headers({ 'Content-Type': 'application/json;' });
        headersObj.append('Access-Control-Allow-Origin', 'true');
        headersObj.append('Access-Control-Allow-Credentials', 'true');
        headersObj.append('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
        headersObj.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
        // console.log(headers)
        let videoUrl="https://staapak-cms.herokuapp.com/content/create_video";
        let AudioUrl="https://staapak-cms.herokuapp.com/content/create_audio";
        let options = new RequestOptions({ headers: headersObj });
      
        if(saveInfo.video==""&&saveInfo.audio==""){
            console.log(saveInfo);
            let body = JSON.stringify(saveInfo);
            console.log(body);
            return this.http.post(this.saveInfoUrl, body, options)
                .map(this.extractData)
                .catch(this.handleErrorObservable);
              }
              else if(saveInfo.audio==""){
                  console.log('video part')
                  console.log(videoUrl)
                  let body = JSON.stringify(saveInfo);
            return this.http.post(videoUrl, body, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
                
              }
        else if(saveInfo.video==""){
            let body = JSON.stringify(saveInfo);
            return this.http.post(AudioUrl, body, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
        }

    }
    private updateUrl = "https://staapak-cms.herokuapp.com/content/industry "
    
        //Update industry info
        updateRole(role: Role): Observable<number> {
    
            let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: cpHeaders });
            let body = JSON.stringify(role);
            return this.http.put(this.updateUrl , body, options)
                .map(success => success.status)
                .catch(this.handleErrorObservable);
        }
    
         private byIdUrl=""
        //Delete industry	
        deleteRoleById(roleId: string): Observable<number> {
            let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: cpHeaders });
            return this.http.delete(this.byIdUrl + "/" + roleId)
                .map(success => success.status)
                .catch(this.handleErrorObservable);
        }



// End CURD operation
    // Error hendel code
    private handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.status);
    }


    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }
}
