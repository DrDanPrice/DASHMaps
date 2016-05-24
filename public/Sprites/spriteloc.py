#took names from sprite list in refill style then processed
#believe it's a common set for Mapzen, with svg from OSM available on a slightly different naming schema
#need to figure it out better
fname = 'refill-style-sprites.txt'
import ast
outcss = 'refill-style-sprites.css'
outname = 'poi-names.txt'
with open(fname, 'r') as f:
    cssout = ''
    poinames = ''
    for line in f.readlines():
	name = line.split(': ')[0]
	poinames += "%s\n" %(name)
	location = line.split(': ')[1]
	location = ast.literal_eval(location)
	cssout += ".%s {\n    width:%spx;\n    height:%spx;\n    background: url('images/poi_icons_18@2x.png') -%spx -%spx;\n}\n" %(name,location[2],location[3],location[0],location[1])
	
    o = open(outname,'w')
    o.write(poinames) 
    n = open(outcss,'w')
    n.write(cssout)
