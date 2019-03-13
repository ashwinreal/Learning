new Vue({
    el: '#app',
    data: {
        myhealth: 100,
        monsterhealth: 100,
        start: false,
        attackList: [],
    },
    methods: {
        startGame(){
            this.start = true;
            this.monsterhealth= 100; this.myhealth = 100;this.attackList = [];
        },
        attack(){
            console.log('attack');
            this.monsterhealth = Math.max(0, this.monsterhealth - 20)
            this.myhealth = Math.min(100, this.myhealth - 10)
            this.attackList.push('PLAYER hit MONSTER FOR ' + 20 )
            this.attackList.push('MONSTER hit PLAYER FOR ' + 10 )
            this.checkResult()
        },
        specialAttack(){
            this.monsterhealth = Math.max(0, this.monsterhealth - 30)
            this.myhealth = Math.min(100, this.myhealth - 20)
            this.attackList.push('PLAYER hit MONSTER FOR ' + 30 )
            this.attackList.push('MONSTER hit PLAYER FOR ' + 20 )
            this.checkResult()
        },
        heal(){
            this.myhealth = Math.min(100, this.myhealth + 10)
            this.attackList.push('PLAYER heals  FOR ' + 10 )
            this.myhealth = Math.min(100, this.myhealth - 20)
            this.attackList.push('MONSTER hit PLAYER FOR ' + 20 )
            this.checkResult()
        },
        giveUp(){
            alert('LOST!');
            this.start=false; this.monsterhealth= 100; this.myhealth = 100;this.attackList = [];
        },
        checkResult(){
            this.myhealth === 0 && alert('LOST!')
            this.monsterhealth === 0 && alert('WON!')
            if(this.myhealth === 0 || this.monsterhealth === 0) {
                this.start=false; this.monsterhealth= 100; this.myhealth = 100;this.attackList = [];
            }
            
        }
    },
    computed:{},
    watch: {}
});