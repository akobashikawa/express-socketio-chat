var socket = io();

const app = new Vue({
  el: '#app',
  data: function () {
    return {
      message: '',
      messages: []
    };
  },
  methods: {
    send: async function() {
      const url = '/messages';
      const data = {
        message: this.message
      }
      try {
        const aresult = await axios.post(url, data);
        this.messages = aresult.data;
      } catch (error) {
        console.log(error);
      }
    },
    addMessages: function(message) {
      this.messages.push(message);
    }
  }
});

socket.on('message', app.addMessages);
