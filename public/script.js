

var app = new Vue({
  el: '#app',
  data: {
    party: [],
    size: 0,
    newName: "",
    newClass: "",
    newStr: "",
    newDex: "",
    newCon: "",
    newInt: "",
    newWis: "",
    newCha: "",
    error: "",
  },
  created: function() {
    this.getParty();
  },
  methods: {
    getRandomStats: function() {
      this.newStr = 1 + Math.floor(Math.random() * 20);
      this.newDex = 1 + Math.floor(Math.random() * 20);
      this.newCon = 1 + Math.floor(Math.random() * 20);
      this.newInt = 1 + Math.floor(Math.random() * 20);
      this.newWis = 1 + Math.floor(Math.random() * 20);
      this.newCha = 1 + Math.floor(Math.random() * 20);
    },
    addCharacter: function() {
      this.error = "";
      if(this.newName !== "" && this.newClass !== "" && this.newStr !== ""
        && this.newDex !== "" && this.newCon !== "" && this.newInt !== ""
        && this.newWis !== "" && this.newCha !== "")
      {
        axios.post("http://localhost:3000/api/items", {
      	name: this.newName,
        class: this.newClass,
        str: this.newStr,
        dex: this.newDex,
        con: this.newCon,
        int: this.newInt,
        wis: this.newWis,
        cha: this.newCha
            }).then(response => {
                              	this.size = this.size + 1;
                                this.newName = "";
                                this.newClass = "";
                                this.newStr = "";
                                this.newDex = "";
                                this.newCon = "";
                                this.newInt = "";
                                this.newWis = "";
                                this.newCha = "";
                              	this.getParty();
                              	return true;}).catch(err => {});
      }
      else{
        this.error = "Please fill all fields.";
      }
    },
    removeCharacter: function(character) {
      axios.delete("http://localhost:3000/api/items/" + character.id).then(response => {
        this.size = this.size - 1;
        this.getParty();
       	return true;
             }).catch(err => {});
    },
    clearParty: function() {
      this.party.forEach(character => {
        this.removeCharacter(character);
      });
    },
    getParty: function() {
      axios.get("http://localhost:3000/api/items").then(response => {
      this.party = response.data;
      this.size = this.party.length;
      return true;
         }).catch(err => {});
    },
  }
});
