import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Plant } from '../../models/plant';
import { MatSnackBar } from '@angular/material';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiPath: String = 'http://dig-it.rh-codes.com/api';
  // apiPath: String = 'http://localhost:3000/api';

  isImageLoaded: boolean = false;

  constructor( private http: Http, public snackBar: MatSnackBar, private auth: AuthenticationService, ) { }

  uploadfile(file, key) {
    const bucket = new S3(
      {
        accessKeyId: environment.AWS_ACCESS_ID,
        secretAccessKey: environment.AWS_SECRET_KEY,
        region: 'us-east-1'
      }
    );

    const params = {
      Bucket: 'dig-it-custom-images',
      Key: key,
      ContentType: 'image/jpeg',
      Body: file
    };

    bucket.upload(params, (err, data) => {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      console.log('Successfully uploaded file.', data);
      return true;
    });
  }

  getBackgroundImage(plant): string{
    if(plant.img) {
      return plant.img;
    } else if(plant.stage <= 1 && !plant.img){
      return '../../assets/icons/plant-stage/stage' + plant.stage + '.svg';
    } else {
      return '../../assets/icons/' + plant.type + '.svg';
    }
  }

  getAllPlants() {
    return this.http.get(this.apiPath + '/search')
      .pipe(map(res => res.json()));
  }

  addPlant(newPlant: Plant) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.apiPath + '/new_plant', newPlant, {headers: headers})
      .pipe(map(res => res.json()));
  }

  updatePlant(plant: Plant) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.apiPath + '/plant/' + plant._id, plant, {headers: headers})
      .pipe(map(res => res.json()));
  }

  imageSearchByName(plant: Plant, isRecurse?: boolean) {
    let queryString;

    if (!plant.botanicalName || isRecurse === true) {
      queryString = plant.commonName.toLocaleLowerCase().split(' ').join('_');
    } else {
      queryString = plant.botanicalName.toLocaleLowerCase().split(' ').join('_');
    }

    this.auth.doCORSRequest({
      method: 'GET',
      url: 'https://commons.wikimedia.org/w/api.php?action=query&generator=images&prop=imageinfo&gimlimit=1&redirects=1&titles=' + queryString + '&iiprop=url&format=json'
    }).subscribe( result => {
      result = JSON.parse(result);
      if (result.query) {
        plant.img = result.query.pages[Object.keys(result.query.pages)[0]].imageinfo[0].url;
        this.isImageLoaded = true;
      }
    }, (err) => {
      this.openSnackBar('fail');
      console.error(err);
    }, () => {
      if (!plant.img && !isRecurse) {
        this.imageSearchByName(plant, true);
      }
      if(plant.img){
        this.updatePlant(plant).subscribe( result => { }, err => {
          this.openSnackBar('fail');
        });
      }
    });
  }

  openSnackBar(status: 'fail' | 'success', message?: string) {
    if (status === 'fail') {
      this.snackBar.open(message ? message : 'Something went wrong! Please try again.', null, {
        duration: 1500,
        panelClass: 'snackbar-fail',
        verticalPosition: 'top'
      });
    } else {
      this.snackBar.open(message, null, {
        duration: 1500,
        panelClass: 'snackbar-success',
        verticalPosition: 'top'
      });
    }
  }

  getSowingMethodString(methodNum: number): string {
    let methodString: string;

    if (!methodNum) {
      return null;
    } else {
      switch (methodNum) {
        case 1: methodString = 'Rapid germination--less than 2 weeks at 68ºF.';
          break;
        case 2: methodString = 'Slow germination--more than 2 weeks at 68ºF.';
          break;
        case 3: methodString = 'Germination takes 3-4 weeks at 68ºF.';
          break;
        case 4: methodString = 'Keep 4-12 weeks at 40ºF, then move to 68ºF for germination.';
          break;
        case 5: methodString = 'Sow seeds at 39ºF. Germination is erratic, and can last many months.';
        break;
        case 6: methodString = 'Sow seeds at 68ºF. Germination is erratic, and can last many months.';
        break;
        case 7: methodString = 'Rapid germination. Sow seeds at 75ºF.';
          break;
        case 8: methodString = 'Keep 2-4 weeks at 68ºF, then keep 4-6 weeks at 39ºF, then move to 53ºF for germination.';
        break;
        case 9: methodString = 'Keep 2-4 weeks at 68ºF, then keep 4-6 weeks at 21ºF, then move to 53ºF for germination.';
        break;
        case 10: methodString = 'Sow outdoors in the fall for spring germination.';
        break;
        case 11: methodString = 'Keep 2-4 weeks at 68ºF, then keep 4-6 weeks at 39ºF, then move to 53ºF for germination.'
        + ' Very slow germination--may take one to two years.';
          break;
        case 12: methodString = 'Slow germination--up to a year or more. Store seeds in moist sand in the shade. '
        + 'Check seeds often in the spring, and sow them all as soon as radicals appear.';
          break;
        case 13: methodString = '6 weeks at 71ºF, then 6-8 weeks at 39ºF, then 4-6 weeks at 50ºF. Repeat cycle until seed has sprouted.';
          break;
        case 14: methodString = '4-6 days at 87ºF, 12 weeks in the dark at 35ºF. '
        + 'Slowly raise temperature and light levels until seed has sprouted.';
          break;
        case 15: methodString = 'Imprevious seed coats. Nick, grind or puncture seeds before sowing.';
          break;
        case 16: methodString = 'Pour hot water over seeds. Let soak 1-3 days until you notice the seeds swelling.';
          break;
        case 17: methodString = 'Wash and rinse seeds 3 times per day for 1 to 2 weeks.';
          break;
      }

      return methodString;
    }
  }

  getStageString(stage: number): string {
    let stageString: string;

    switch (stage) {
      case 0: stageString = 'Seed';
        break;
      case 1: stageString = 'Sproutling';
        break;
      case 2: stageString = 'Young Plant';
        break;
      case 3: stageString = 'Mature Plant';
        break;
    }

    return stageString;
  }
}
