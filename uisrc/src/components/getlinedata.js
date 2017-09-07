import _ from 'lodash';
const getlinedata  =(currealtimedata,eeverifydata)=> {
	const {rawdata_55,rawdata_ee} = currealtimedata;
	let linedata = [];//结果线
    let linedatavt;//偏差线
	let eeverifydata_drawdata_ee_200;
	if(!!eeverifydata){
		linedatavt = [];
		eeverifydata_drawdata_ee_200 = _.slice(eeverifydata.rawdata_ee,50,250);
	}
    let linedataraw = [];//原始线
    let data_vt;
    const data_55_200 = _.slice(rawdata_55,50,250);
    const data_ee_200 = _.slice(rawdata_ee,50,250);
	console.log(`rawdata_55:${JSON.stringify(rawdata_55)}`);
	console.log(`data_55_200:${JSON.stringify(data_55_200)}`);
	let data_ee_final_200 = [];
	_.map(data_ee_200,(v,index)=>{
		let vfinal = v;
		if(!!eeverifydata_drawdata_ee_200){
			vfinal -= eeverifydata_drawdata_ee_200[index];
		}
		data_ee_final_200.push(vfinal);
	});
	let tee_eeverifydata_drawdata_ee= 0;
	let teeraw = 0;
	let teefinal = 0;
	_.map(data_55_200,(v,index)=>{
        teefinal += data_ee_final_200[index];
		teeraw += data_ee_200[index];
		tee_eeverifydata_drawdata_ee+=eeverifydata_drawdata_ee_200[index];
		if(!!eeverifydata_drawdata_ee_200){
			linedatavt.push({x:v,y:tee_eeverifydata_drawdata_ee});
		}
		linedataraw.push({x:v,y:teeraw});
		linedata.push({x:v,y:teefinal});
	});
	
	return {
		linedata,
		linedatavt,
		linedataraw
	}
};

export {getlinedata};