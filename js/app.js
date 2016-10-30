// Build Model, View and Octopus

// ------------Model--------------
var model ={
  currentCat:null,
  cats:[
    {
      clickCount:0,
      name:'Cat 1',
      imgSrc:'img/Cat.jpg'
    },
    {
      clickCount:0,
      name:'Cat 2',
      imgSrc:'img/Cat1.jpg'
    },
    {
      clickCount:0,
      name:'Cat 3',
      imgSrc:'img/Cat2.jpg'
    }
  ]
};

//---------View-------------------
var catView={
  init:function(){
    this.catElem = document.getElementById('cat');
    this.catNameElem = document.getElementById('name');
    this.catImageElem = document.getElementById('cat-img');
    this.countElem = document.getElementById('cnt');
    this.adminElem = document.getElementById('admin');
    this.buttonElem = document.getElementById('chgdetail');

    this.catImageElem.addEventListener('click',function(e){
      octopus.incrementCounter();
    });

    this.render();
  },

  render:function(){
    var name_lab, chg_name,t;
    var currentCat=octopus.getCurrentCat();
    this.countElem.textContent = currentCat.clickCount;
    this.catImageElem.src = currentCat.imgSrc;
    this.catNameElem.textContent = currentCat.name;


    // Admin Section
    this.buttonElem.addEventListener('click',(function(cat){
      return function(){
        octopus.setCurrentCat(cat);
        name_lab = document.createElement('label');
        t = document.createTextNode("Name");
        //name_lab.setAttribute("for", "chgdetail");
        name_lab.appendChild(t);
        //name_lab.textContent = "Name";
        chg_name = document.createElement('input');
        chg_name.value= cat.name;
      };

      this.adminElem.insertBefore(name_lab,"chgdetail");
      this.adminElem.appendChild(chg_name);
    })(cat));
  }
};

var catListView ={
    init:function(){
      this.catListElem = document.getElementById('cat-list');
      this.render();
    },

    render:function(){
      var cat, elem, chg_name, chg_picture, chg_count;
      var cats = octopus.getCats();
      this.catListElem.innerHTML='';
      for(var i=0;i<cats.length;i++){
        cat=cats[i];
        elem = document.createElement('li');
        elem.textContent = cat.name;
        // Closure Technique to display current cat info.
        elem.addEventListener('click',(function(cat){
          return function(){
            octopus.setCurrentCat(cat);
            catView.render();
          };
        })(cat));
        this.catListElem.appendChild(elem);
      }
    }
};


//---------Octopus---------------
var octopus={
  init: function(){
    //initialise current cat to the first cat in the list
    model.currentCat=model.cats[0];
    //initialise views
    catListView.init();
    catView.init();
  },

  getCurrentCat:function(){
    return model.currentCat;
  },

  getCats:function(){
    return model.cats;
  },

  setCurrentCat:function(cat){
    model.currentCat = cat;
  },

  incrementCounter:function(){
    model.currentCat.clickCount++;
    catView.render();
  }

};

octopus.init();
