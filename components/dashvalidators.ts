import { Control } from "@angular/common";

interface ValidationResult{
   [key:string]:boolean;
}

//for all toplevels, need to validate name is not reserved word - so need a control validator for addsource, etc.

export class DASHValidator {

    static GeoJSONtypes = ["Point", "MultiPoint", "LineString", "MultiLineString", "Polygon", "MultiPolygon", "GeometryCollection", "Feature", "FeatureCollection"];

    static startsWithNumber(control: Control): ValidationResult {
        if ( control.value !="" && !isNaN(control.value.charAt(0)) ){
            return { "startsWithNumber": true };
        }
        return null; //return null is success
    }
    static isValidTxt(control: Control): ValidationResult {
        //https://www.google.com/search?client=safari&rls=en&q=javascript+html+sanitizer&ie=UTF-8&oe=UTF-8
		//https://mapzen.com/documentation/tangram/yaml/#reserved-keywords
        if ( control.value !="" ){
            //console.log('how often does it hit?')
        }
        return null;
    }
    static isValidDate(control: Control): ValidationResult {
        if ( control.value !="" ){
            //console.log('how often does it hit?')
        }
        return null;
    }
    static isValidCoord(control: Control): ValidationResult {
		if ( control.value !="" ){
		    //console.log('how often does it hit?')
		}
        return null
    }

    static isValidZoom(control: Control): ValidationResult { //need to be between 0 and 26?
		if ( control.value > 26 || control.value < 0 || isNaN(control.value) ){
			return { "notNumber": true };
		}
        return null
    }
    static isBoolean(control: Control): ValidationResult {
		if ( control.value !="" ){
		    //console.log('how often does it hit?')
		}
        return null
    }

    static isStop(control: Control): ValidationResult {
		if ( control.value !="" ){
		    //console.log('how often does it hit?')
		}
        return null
    }
    static isValidLightName(control: Control): ValidationResult {
		if ( control.value !="" ){
		    //has to be _, not hyphen
		}
        return null
    }
    static usernameTaken(control: Control): Promise<ValidationResult> {
    //https://medium.com/@daviddentoom/angular-2-form-validation-9b26f73fcb81#.2k5o1f7pz
        //for the promise, there's a .pending you can attach to the html
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (control.value === "David") {
                    resolve({"usernameTaken": true})
                } else {
                    resolve(null);
                };

            }, 1000);
        });

    }
    static isValidURL(control: Control): ValidationResult {

    }
    static isValidType(control: Control): ValidationResult {
        if ( control.value !="" && DASHValidator.GeoJSONtypes.indexOf(control.value)>0){ //this is lost inside here
            return { 'notValidType': true }
        }
        return null
    }
    static isValidCoord(control: Control): ValidationResult {
        if ( control.value !=""){
            if (isNaN(control.value) ){
                return { "notNumber": true };  //returned as errors.notNumber in template
            }
            if( control.value > 180 || control.value < -180 ){
                return { "notLatLng": true}; //may want pure vector distances to be allowed?
            }
        }
        return null; //return null is success
    }
}
