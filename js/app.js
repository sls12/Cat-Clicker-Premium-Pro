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


    this.catImageElem.addEventListener('click',function(e){
      octopus.incrementCounter();
    });

    this.render();
  },

  render:function(){

    var currentCat=octopus.getCurrentCat();
    this.countElem.textContent = currentCat.clickCount;
    this.catImageElem.src = currentCat.imgSrc;
    this.catNameElem.textContent = currentCat.name;


  }
};

  // Admin View
  var adminView ={
    init:function(){
      this.adminElem = document.getElementById('admin');
      this.buttonElem = document.getElementById('chgdetail');
      this.formElem = document.getElementById('details');
      this.nameElem = document.getElementById('name_lab');
      this.picElem = document.getElementById('pic_lab');
      this.clickElem = document.getElementById('click_lab');
    //  console.log(this.nameElem);

      this.render();
    },

    render:function(){
    //      var name_lab, chg_name,t;
          var currentCat=octopus.getCurrentCat();
    //      this.nameElem.setAttribute('value',currentCat.name);
    //      console.log(currentCat);
          var nameElem = this.nameElem;
          var picElem  = this.picElem;
          var clickElem=this.clickElem;
    //      console.log(hi);
          this.buttonElem.addEventListener('click',(function(currentCat){
            return function(){
              var currentCat=octopus.getCurrentCat();
              document.getElementById('details').style.display ='block';
              //octopus.setCurrentCat(cat);
              //name_lab = document.createElement('input');
              //t = document.createTextNode("Name");
              //name_lab.setAttribute("for", "chgdetail");
              //name_lab.appendChild(t);
              //name_lab.textContent = "Name";
              //chg_name = document.createElement('input');
              //console.log(currentCat);
              nameElem.setAttribute('value',currentCat.name);
              picElem.value = currentCat.imgSrc;
              clickElem.value= currentCat.clickCount;
              adminView.render();
            };
          })(currentCat));
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
    adminView.init();
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
