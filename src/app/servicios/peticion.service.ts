import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeticionService {

  constructor(private http: HttpClient) { }

  urlHost:string = "http://localhost:3000"  //URL dependiendo de donde está 
  /* promesa */
  Post(url: string, data: {}) {

    let promise = new Promise((resolve, reject) => {

      this.http.post(url, data).toPromise().then(
        (res: any) => {
          resolve(res)
        }
      ).catch((error) => {
        reject(error)
      })


    })
    return promise
  }

  Put(url: string, data: {}) {

    let promise = new Promise((resolve, reject) => {

      this.http.put(url, data).toPromise().then(
        (res: any) => {
          resolve(res)
        }
      ).catch((error) => {
        reject(error)
      })


    })
    return promise
  }

  Delete(url: string, data: {}) {

    let promise = new Promise((resolve, reject) => {

      this.http.delete(url, data).toPromise().then(
        (res: any) => {
          resolve(res)
        }
      ).catch((error) => {
        reject(error)
      })


    })
    return promise
  }

  Get(url: string) {

    let promise = new Promise((resolve, reject) => {

      this.http.get(url).toPromise().then(
        (res: any) => {
          resolve(res)
        }
      ).catch((error) => {
        reject(error)
      })


    })
    return promise
  }

}
  