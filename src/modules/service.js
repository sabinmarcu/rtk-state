import { BehaviorSubject } from "rxjs";

export default class StateBrokerService {
    static _subjects: BehaviorSubject = [];

    static getChannel(channel: String): BehaviorSubject {
        if (!this._subjects[channel]) {
            this._subjects[channel] = new BehaviorSubject({ [channel]: null });
        }
        return this._subjects[channel];
    }
    static subscribe(channel: String, func: Function): BehaviorSubject {
        return this.getChannel(channel).subscribe(func);
    }

    static publish(channel: String, ...data: any[]) {
        this.getChannel(channel).next(...data);
    }
}
