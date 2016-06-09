//have so it supports a minimal default, and then have it write out
//single depth control groups, as called for...
export class MapSettings {
  constructor(
    public id: string = 'temp',
    public stylename: string = 'default',
    public styleowner: string = 'public',
    public styledescription: string = '',
    public styleattribution: string = '',
    public creationdate: string = 'todaydate - need to deserialize?',
    public collectiontype: string = 'fullmap',
    public configsettings: ConfigSettings
  ) {
      //id should be from the mongodb, or temp
      //styleowner - should set to meteor.user somewhere
      //collectiontype should allow for saving parts in places - fullmap, layerstyle, datasource, globals
        //if(stylename == 'ra'){console.log('ra');this.stylename = 'gafdfggf'}
    }
}
export class ConfigSettings {
  constructor(
    public test?: string,
    public test2: string = 'thisistest2default',
    public test3: string = 'testathird',
    public layers: Array<LayerSettings> = new Array(LayerSettings())
    //question is if you can have all the types in here:
    //
  ) {
        if(layers == undefined){
          console.log('undef');
          this.layers = new LayerSettings(undefined,undefined)
        }
    }
}
export class LayerSettings {
  constructor(
    private layer
  ) {
      console.log('type',typeof layer)
      return [layer]
      //return {[layername]:{test5}}
    }
}
