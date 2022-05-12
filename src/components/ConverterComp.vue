<template>
    <div class="main">
        <div class="container">
            <div class="block">
                <v-select
                    v-model="selected1"
                    :items="items"
                    label="Value"
                ></v-select>
                <v-text-field v-model="input" type="number"/>
            </div>
            <div class="block">
                <v-select
                    v-model="selected2"
                    :items="items"
                    label="Value"
                ></v-select>
                <v-text-field v-if="finalResult">{{input + ' ' + this.selected1}} equal {{this.finalResult + ' ' + selected2}}</v-text-field>
            </div>
        </div>
        <v-btn class="button" color="primary" @click="getResult">Result</v-btn>
    </div>
    <div class="list">
            <h2 v-if="detail">{{detail.name}}</h2>
            <v-select
                class="option"
                v-model="selectedDetail"
                :items="items"
            ></v-select>
            <div class="buttons" @click="Determiner">
                <v-btn color="primary">3h</v-btn>
                <v-btn color="primary">24h</v-btn>
                <v-btn color="primary">7d</v-btn>
                <v-btn color="primary">30d</v-btn>
            </div>
        
        <line-chart id="1" v-if="lineData[1]" :data="lineData" :min="mini - 50"></line-chart>
    </div>
</template>
<script>
import VueChartkick from 'vue-chartkick'
var chart = VueChartkick.charts;
export default {
    data(){
        return {
            selected1: null,
            selected2: null,
            obj: {'Bitcoin': 'Qwsogvtv82FCd', 'Ethereum': 'razxDUgYGNAdQ'},
            res1: null,
            res2: null,
            key: 'coinranking0edc21f93bc1d12ea7575706745a8c7671378b1d046aad55',
            proxyUrl: 'https://cors-anywhere.herokuapp.com/',
            input: 1,
            finalResult: null, 
            items: ['USD', 'Ethereum', 'Bitcoin'],
            detail: null,
            lineData: {},
            selectedDetail: 'Ethereum',
            mini: null,
            timePer: '24h'
        }
    },
    watch: {
        selected1(){
            this.getPrice1()
        },
        selected2(){
            this.getPrice2()
        },
        detail(){
            this.chart()
        },
        selectedDetail(){
            this.fetchData()
        },
        timePer(){
            this.fetchData()
        }
    },
    methods: {
        async getPrice1(){
            if(this.selected1 != 'USD'){
                await fetch(`${this.proxyUrl}https://api.coinranking.com/v2/coin/${this.obj[this.selected1]}/price`, {
                    method: 'GET',
                    Headers: {
                        "Content-Type": "applicaion/json",
                        'x-access-token': `${this.key}`,
                        'Access-Control-Allow-Origin': '*'
                    }
                }).then((response) => {
                    if(response.ok){
                        response.json().then((json)=> this.res1 = json.data.price)
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }
        },
        async getPrice2(){
            if(this.selected2 != 'USD'){
                await fetch(`${this.proxyUrl}https://api.coinranking.com/v2/coin/${this.obj[this.selected2]}/price`, {
                    method: 'GET',
                    Headers: {
                        "Content-Type": "applicaion/json",
                        'x-access-token': `${this.key}`,
                        'Access-Control-Allow-Origin': '*'
                    }
                }).then((response) => {
                    if(response.ok){
                        response.json().then((json)=>this.res2 = json.data.price)
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }
        },
        getResult(){
            if(this.selected1 != 'USD' && this.selected2 != 'USD'){
                this.finalResult = this.input * this.res1 / this.res2
            }
            else if(this.selected1 == 'USD' && this.selected2 != 'USD'){
                this.finalResult = this.input * 1 / this.res2
            }
            else if(this.selected2 == 'USD' && this.selected1 != 'USD'){
                this.finalResult = this.res1
            }
            else this.finalResult = this.input
        },
        async fetchData() {
            await fetch(`https://cors-anywhere.herokuapp.com/https://api.coinranking.com/v2/coin/${this.obj[this.selectedDetail]}?timePeriod=${this.timePer}`, {
                    method: 'GET',
                    Headers: {
                        "Content-Type": "applicaion/json",
                        'x-access-token': `coinranking747ec2d23e453eaf8d30288b73a0006e6f5a745e02c71b5b`,
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                .then((res) => {
                    if(res.ok){
                        res.json().then((json) => this.detail = json.data.coin)
                    }
                })
        },
        chart(){
            this.detail.sparkline.forEach((item, i) => this.lineData[i] = item)
            if(chart[1]){
                chart[1].updateData(this.lineData)
            }
            this.min()  
        },
        min(){
            this.mini = this.detail.sparkline[0];
            this.detail.sparkline.forEach((item)=>{
                if(this.mini > item) this.mini = Math.floor(item);
            })
        },
        Determiner(e){
            this.timePer = e.target.innerText.toLowerCase();
        }
    },
    mounted(){
        this.fetchData()
    }
}
</script>
<style scoped>      
    .main{
        max-height: 40vh;
        max-width: 800px;
        margin: 40px auto;
        background-color: rgb(7, 59, 94);
        color: white;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .block{
        margin: 20px;
        display: block;
    }
    .container{
        display: flex;
        flex-direction: row;
    }
    .button{
        margin-bottom: 20px;
    }
    .list{
        text-align: center;
        margin: 0 auto;
    }
    .option{
        width: 150px;
        margin: 0 auto;
    }
    .buttons:nth-child(1n){
        margin: 0 10px;
    }
</style>                            