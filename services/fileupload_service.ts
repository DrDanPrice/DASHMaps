import 'reflect-metadata';
import { Injectable, NgZone } from '@angular/core';
import { Monitors } from '../collections/collects';
import { Mongo }     from 'meteor/mongo';
import { MeteorComponent } from 'angular2-meteor';

//mock a promise return first
//then build it up
@Injectable()
export class FileUploadService{//} extends MeteorComponent{
  //needs to handle images, YAML, GeoJSON, and save to right collections

  constructor(zone:NgZone){
    //I could not get it to work as extending MeteorComponent;
    //the error seemed to be related to library calls, which were solved by
    //putting in more recent versions of files in angular2-meteor,
    //but it kept introducing new problems - might try again after his update to npm
    //super();
    // Tracker.autorun(() => zone.run(() => {
		// this.subscribe('monitors', () => {
		// 	this.monitors = Monitors.find();
		// },true);
		// }));
  }
  //image upload handling
/* following feature-ctrl in CHGeoData

	imgsrc: Control = new Control(''); //can do validity checks? xss attacks?
	imageChangeEvent($event) : void {
		this.readInputImage($event.target);
		//not sure how the form control deals with images
	}*/
  readInputFile(inputValue: any) : void {

  	    var file:File = inputValue.files[0];
  	    self = this;
  	    var filetype = file.name.split('.')[file.name.split('.').length-1].toLowerCase();
  	    var filename = file.name.split('.')[0]
  	    if(filetype == 'yaml' || filetype == 'json'){
  	        var localReader:FileReader = new FileReader();

  	        localReader.onloadend = function(e){
  	                self.mapstyle = {};
  	                if (filetype == 'yaml'){
  	                    self.mapsets = self.tangram.readYAML(localReader.result)
  						 //https://github.com/nodeca/js-yaml
  	                }else{
  	                    self.mapsets = JSON.parse(localReader.result);
  	                }
  					    self.mapstyle.name = filename;
  					     self.ind = Object.keys(self.mapsets).length;
  					     self.numcol=self.alphanums[self.ind+2]; //can't figure out why index problems
  	                self.mapsettings.mapsets = self.mapsets;
  	                self.tangram.rebuildMap(self.mapsets);
  	        }

  	        localReader.readAsText(file);
  	    }else{
  	        console.log('can only parse yaml files; make sure filename ends with .yaml')
  	    }

  	}

    readInputImage(inputValue: any) : void {
        var file:File = inputValue.files[0];
		if(file.size>10000000){alert('Image must be less than 10mb');return};
//        self = this;
        var filetype = file.name.split('.')[file.name.split('.').length-1].toLowerCase();
        var filename = file.name.split('.')[0]
		//make list; if (filetypes.indexOf(filetype)>0){}
        if(filetype == 'png' || filetype == 'jpg' || filetype == 'svg' || filetype == 'gif'){
            var localReader:FileReader = new FileReader();
            localReader.onload = function(){
				console.log(localReader)
//				self.properties.controls['imgsrc'].updateValue(localReader.result);
				//self.properties.controls['imgsrc'].updateValue('images/addmore.svg');
            }
            localReader.readAsDataURL(file);
        }else{
            console.log('some sort of problem; must be png or jpg')
        }
    }
}
