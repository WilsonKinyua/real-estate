export interface Property {
    summary: {
        absenteeInd: string;
        propclass: string;
        propsubtype: string;
        yearbuilt: number;
        legal1: string;
    },
    area: {
        blockNum: string;
        loctype: string;
        countrysecsubd: string;
        countyuse1: string;
        munname: string;
        muncode: string;
        subdname: string;
        srvyRange?: string;
        srvySection?: string;
        srvyTownship?: string;
        taxcodearea?: string;
    },
    address: {
        country: string;
        oneLine: string;
    },
    building: {
        size: {
            bldgsize: number;
            grosssize: number;
            grosssizeadjusted: number;
            groundfloorsize: number;
            livingsize: number;
            sizeInd: string;
            universalsize: number;
        }
    },
}