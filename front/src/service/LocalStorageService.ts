import {NavigatorStorageService} from "@p/service";

export default class LocalStorageService extends NavigatorStorageService{

	constructor(){
		super(localStorage);
	}
}