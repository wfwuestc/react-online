import {log} from './App'

export function save(key, value){
  log('保存中。。。')
  return window.localStorage.setItem(key, JSON.stringify(value))
}

export function load(key){
  log('读取中。。。')
  return JSON.parse(window.localStorage.getItem(key))
}