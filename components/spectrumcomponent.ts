/*import {Component, View, ElementRef, Inject, OnInit, Input} from '@angular/core';
//import {MapSettings} from './mapsettings';
//import {TangramIntegration} from './tangram-integration';

declare var spectrum:any;
declare var jQuery:any;

@Component({
    selector: 'spectrum'
})

@View({
    template: `
		<input type='text' class="basic"/>
	`
})

export class SpectrumIntegration implements OnInit {
	//@Input() jsonLocation: array; //check spectrum's own api, if want location
	@Input() inputColor: string;
    elementRef: ElementRef;

    constructor(@Inject(ElementRef) elementRef: ElementRef) {
        this.elementRef = elementRef;
//		this.tangram = tangram
//		this.mapsets = mapsettings.tangram_settings; //use to test we're getting the same, then call a function to change?
    }

    ngOnInit() {
//		let mapsetCrumbs = this.mapsetCrumbs;
//		let targetcolor = this.mapsets[mapsetCrumbs];
//		let tangram = this.tangram;
		jQuery(this.elementRef.nativeElement).find(".basic").spectrum({
		    color: this.inputColor,
		    change: function(color) {
				targetcolor = color.toHexString();
//				tangram.updateMap(mapsetCrumbs,targetcolor);
  //              console.log(mapsetCrumbs)
                return false;
		    }
		});

    }
}*/
