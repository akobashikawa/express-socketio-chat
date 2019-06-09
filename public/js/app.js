const app = new Vue({
  el: '#app',
  data: function () {
    return {
      message: ''
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
        const result = aresult.data;
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  }
});