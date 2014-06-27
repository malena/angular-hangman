app.factory("Animations", function(){
    return {
        firstAnimation: function(){
            alert('First Animation');
        },
        secondAnimation: function(){
            alert('Second Animation');
        },
        thirdAnimation: function(){
            alert('Third Animation');
        },
        flipCard: function(element){
            alert(element);
        }
    }
});
