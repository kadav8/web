import Vue from 'vue'
import axios from 'axios'
import config from './config.js'

const http = axios.create({
    baseURL: config.apiBaseUrl,
    timeout: 1000
})

export default http