

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
  },
  created: function() {
//
  },
  methods: {
    addCharacter: function() {
      axios.post("/api/items", {
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
    },
    removeCharacter: function(character) {
      axios.delete("/api/items/" + character.id).then(response => {
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
      axios.get("/api/items").then(response => {
      this.party = response.data;
      return true;
         }).catch(err => {});
    },
  }
});
