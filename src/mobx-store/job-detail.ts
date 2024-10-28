import { makeAutoObservable, runInAction } from 'mobx';
import { IJobInfo } from '../../types/job';


class JobDetailStore {
  currentJob: IJobInfo;

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentJob(value: IJobInfo) {
    this.currentJob = value;
  }
}

export default new JobDetailStore();