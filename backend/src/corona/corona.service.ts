import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch'

@Injectable()
export class CoronaService {

  async getAllHistoricalCases() {
    const data = await fetch('https://disease.sh/v3/covid-19/historical/denmark?lastdays=all').then(res => res.json())

    const labels = Object.keys(data.timeline.cases).filter((label, index) => index % 10 === 0);

    const numbers = Object.keys(data.timeline.cases).map(key => data.timeline.cases[key]).filter((value, index) => index % 10 === 0);
  
    return { labels, numbers }
  }

  async getTodayCases() {
    const data = await fetch('https://disease.sh/v3/covid-19/historical/denmark?lastdays=all').then(res => res.json())

    let amount = 0

    Object.keys(data.timeline.cases).map( obj => amount++);
    const previous = Object.keys(data.timeline.cases).map(key => data.timeline.cases[key]).filter((value, index) => index == amount - 2);
    const latest = Object.keys(data.timeline.cases).map(key => data.timeline.cases[key]).filter((value, index) => index == amount - 1);

    return Number(latest) - Number(previous)
  }

  async getAllHistoricalDeaths() {
    const data = await fetch('https://disease.sh/v3/covid-19/historical/denmark?lastdays=all').then(res => res.json())

    const labels = Object.keys(data.timeline.deaths).filter((label, index) => index % 10 === 0);
    const numbers = Object.keys(data.timeline.deaths).map(key => data.timeline.deaths[key]).filter((value, index) => index % 10 === 0);
  
    return { labels, numbers }
  }

  async getDeathsToday() {
    const data = await fetch('https://disease.sh/v3/covid-19/historical/denmark?lastdays=all').then(res => res.json())

    let amount = 0

    Object.keys(data.timeline.deaths).map( obj => amount++);

    const previous = Object.keys(data.timeline.deaths).map(key => data.timeline.deaths[key]).filter((value, index) => index == amount - 2);
    const latest = Object.keys(data.timeline.deaths).map(key => data.timeline.deaths[key]).filter((value, index) => index == amount - 1);

    return Number(latest) - Number(previous)
  }

}


