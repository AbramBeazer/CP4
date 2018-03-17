

var app = new Vue({
  el: '#app',
  data: {
    partyName: "party",
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
  computed:{
    getPartyName: function() {
    if(this.partyName === '')
      {return "party";}
      else{
        return this.partyName;
      }
    }
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
    sendName: function() {
      axios.put("/api/name", {
        partyName: this.partyName
      }).then(response => {

      }).catch(err => {});
    },
    addCharacter: function() {
      if(this.newName !== "" && this.newClass !== "" && this.newStr !== ""
        && this.newDex !== "" && this.newCon !== "" && this.newInt !== ""
        && this.newWis !== "" && this.newCha !== "")
      {
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
      }
      else{
        this.error = "Please fill all fields."
      }
    },
    removeCharacter: function(character) {
      axios.delete("/api/items/" + character.id).then(response => {
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
    getName: function() {
      axios.get("/api/name").then(response => {
        this.partyName = response.data;
      }).catch(err => {});
    },
    getParty: function() {
      this.getName();
      axios.get("/api/items").then(response => {
      this.party = response.data;
      this.size = this.party.length;
      return true;
         }).catch(err => {});
    },
  }
});
