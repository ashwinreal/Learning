new Vue({
    el: '#app',
    data: {
        title: 'hello world!',
        link: 'https://google.com',
        counter: 0
    },
    methods: {
        sayHello: function() {
            this.title = 'Hello ';
            return this.title;
        },
        increase: function(step, event) {
            console.log(event);
            this.counter+=step;
        }
    }
})